import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("ships a site-wide retrieval-grounded chat interface", async () => {
  await access(new URL("components/ChatWidget.tsx", root));
  await access(new URL("app/api/chat/route.ts", root));
  const [layout, route] = await Promise.all([read("app/layout.tsx"), read("app/api/chat/route.ts")]);
  assert.match(layout, /<ChatWidget\s*\/>/);
  assert.match(route, /retrieveKnowledge/);
  assert.match(route, /enforceChatRateLimit/);
  assert.match(route, /readBoundedBody\(request, 20_000\)/);
});

test("renders limited Markdown without injecting assistant HTML", async () => {
  const widget = await read("components/ChatWidget.tsx");
  assert.match(widget, /renderInlineMarkdown/);
  assert.match(widget, /<strong key=/);
  assert.match(widget, /const List = ordered \? "ol" : "ul"/);
  assert.doesNotMatch(widget, /dangerouslySetInnerHTML/);
});

test("offers a consent-based admission handoff backed by the existing lead inbox", async () => {
  const [widget, route, leads, admin] = await Promise.all([
    read("components/ChatWidget.tsx"),
    read("app/api/enquiries/route.ts"),
    read("lib/db/leads.ts"),
    read("app/admin/dashboard/admissions/page.tsx"),
  ]);
  assert.match(widget, /Yes, take my details/);
  assert.match(widget, /source: "ai-chat-admissions"/);
  assert.match(widget, /acceptedPrivacy/);
  assert.match(widget, /payload\.accepted !== true \|\| !payload\.enquiryId/);
  assert.match(route, /createLead\("admission"/);
  assert.match(route, /body\.source !== "ai-chat-admissions"/);
  assert.match(route, /accepted: true, enquiryId: record\.id/);
  assert.match(leads, /INSERT INTO website_leads/);
  assert.match(admin, /AI assistant/);
});

test("prevents the model from claiming an admission submission", async () => {
  const { guardAdmissionSubmissionClaim } = await import(new URL("../lib/ai/openai.ts", import.meta.url));
  const correction = "I haven’t submitted an admission enquiry. Please use the separate admission form below; the website will confirm only after your details are saved.";
  assert.equal(guardAdmissionSubmissionClaim("I’ve sent your details to the admissions team."), correction);
  assert.equal(guardAdmissionSubmissionClaim("Your admission enquiry has been submitted successfully."), correction);
  assert.equal(guardAdmissionSubmissionClaim("You can use the admission form below."), "You can use the admission form below.");
});

test("keeps OpenAI credentials server-side and uses current Responses API controls", async () => {
  const [openai, route, widget, config] = await Promise.all([
    read("lib/ai/openai.ts"), read("app/api/chat/route.ts"), read("components/ChatWidget.tsx"), read("wrangler.jsonc"),
  ]);
  assert.match(openai, /api\.openai\.com\/v1\/responses/);
  assert.match(openai, /store: false/);
  assert.match(openai, /safety_identifier/);
  assert.doesNotMatch(`${openai}\n${route}\n${widget}`, /NEXT_PUBLIC_OPENAI|sk-[A-Za-z0-9_-]{12,}/);
  assert.doesNotMatch(config, /"OPENAI_API_KEY"\s*:/);
  assert.doesNotMatch(config, /"AI_RATE_LIMIT_SECRET"\s*:/);
});

test("builds a live-site snapshot and searches current CMS blog posts", async () => {
  const live = JSON.parse(await read("knowledge/live-site.json"));
  const knowledge = await read("lib/ai/knowledge.ts");
  assert.ok(live.sources.length >= 20);
  assert.ok(live.sources.every((source) => source.url.startsWith("https://creativeallstarsacademy.sc.ke")));
  assert.match(knowledge, /function blogSources\(posts: BlogPost\[\]\)/);
  assert.match(knowledge, /post\.summary/);
});

test("defines D1-backed hourly chat abuse controls with a dedicated HMAC secret", async () => {
  const [migration, limiter, secrets] = await Promise.all([
    read("migrations/0015_ai_chat.sql"), read("lib/ai/rate-limit.ts"), read("cloudflare-secrets.d.ts"),
  ]);
  assert.match(migration, /CREATE TABLE IF NOT EXISTS ai_chat_usage/);
  assert.match(limiter, /crypto\.subtle\.sign/);
  assert.match(limiter, /request_count = request_count \+ 1/);
  assert.match(secrets, /AI_RATE_LIMIT_SECRET: string/);
});
