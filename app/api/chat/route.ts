import { NextResponse } from "next/server";
import { answerWithOpenAI, OpenAIRequestError } from "@/lib/ai/openai";
import { formatKnowledgeContext, retrieveKnowledge } from "@/lib/ai/knowledge";
import { enforceChatRateLimit } from "@/lib/ai/rate-limit";
import { readRuntimeVariable } from "@/lib/cloudflare";
import { getPublicContent } from "@/lib/db/content";
import { parseJsonBytes, readBoundedBody } from "@/lib/security/request-body";

export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

function json(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });
}

function validMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 10) return null;
  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const role = (item as Record<string, unknown>).role;
    const content = String((item as Record<string, unknown>).content ?? "").trim();
    if ((role !== "user" && role !== "assistant") || !content || content.length > 1_500) return null;
    messages.push({ role, content });
  }
  return messages.at(-1)?.role === "user" ? messages : null;
}

export async function POST(request: Request) {
  const bounded = await readBoundedBody(request, 20_000);
  if (!bounded.ok) return json({ error: bounded.reason === "too-large" ? "That message is too large." : "Unable to read that message." }, bounded.reason === "too-large" ? 413 : 400);
  const body = parseJsonBytes(bounded.bytes);
  const messages = validMessages(body?.messages);
  const pagePath = String(body?.page ?? "/").slice(0, 200);
  if (!messages) return json({ error: "Please send a short question about Creative All Stars Academy." }, 400);

  const apiKey = readRuntimeVariable("OPENAI_API_KEY");
  const rateLimitSecret = readRuntimeVariable("AI_RATE_LIMIT_SECRET");
  if (!apiKey || !rateLimitSecret) return json({ error: "The school assistant is not configured yet." }, 503);

  const hourlyLimit = Math.min(Math.max(Number(readRuntimeVariable("AI_CHAT_HOURLY_LIMIT")) || 20, 1), 100);
  try {
    const rateLimit = await enforceChatRateLimit(request, rateLimitSecret, hourlyLimit);
    if (!rateLimit.allowed) return json({ error: "You have reached the chat limit for this hour. Please try again later or contact the school directly." }, 429);

    const { blogPosts } = await getPublicContent();
    const latestQuestion = messages.at(-1)?.content ?? "";
    const retrieved = retrieveKnowledge(latestQuestion, pagePath, blogPosts);
    const history = messages.map((message) => `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`).join("\n");
    const input = `Conversation:\n${history}\n\nCreative All Stars Academy knowledge excerpts:\n${formatKnowledgeContext(retrieved)}\n\nAnswer the visitor’s latest question.`;
    const model = readRuntimeVariable("OPENAI_MODEL") || "gpt-5.6-luna";
    const answer = await answerWithOpenAI({
      apiKey,
      model,
      input,
      safetyIdentifier: rateLimit.safetyIdentifier,
    });
    const sources = [...new Map(retrieved.map((source) => [source.url, {
      title: source.title,
      url: source.url,
      kind: source.kind,
    }])).values()].slice(0, 4);
    return json({ answer, sources });
  } catch (error) {
    console.error(JSON.stringify({
      event: "ai_chat_error",
      error: error instanceof Error ? error.message : "Unknown chat error",
      upstreamStatus: error instanceof OpenAIRequestError ? error.status : undefined,
    }));
    if (error instanceof OpenAIRequestError && (error.status === 401 || error.status === 403)) {
      return json({ error: "The school assistant needs its API credentials updated." }, 503);
    }
    if (error instanceof OpenAIRequestError && error.status === 429) {
      return json({ error: "The assistant is busy right now. Please try again shortly." }, 503);
    }
    return json({ error: "The assistant is temporarily unavailable. Please call +254 724 838 674 or email info@creativeallstarsacademy.sc.ke." }, 503);
  }
}
