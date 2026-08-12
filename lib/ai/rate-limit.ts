import { getCloudflareEnv } from "@/lib/cloudflare";

function hourBucket(now = new Date()) {
  return now.toISOString().slice(0, 13);
}

async function hmac(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function enforceChatRateLimit(request: Request, secret: string, hourlyLimit: number) {
  const ip = request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "local";
  const [bucketKey, safetyIdentifier] = await Promise.all([
    hmac(`chat-bucket:${ip}:${hourBucket()}`, secret),
    hmac(`openai-user:${ip}`, secret),
  ]);
  const env = getCloudflareEnv();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM ai_chat_usage WHERE expires_at < CURRENT_TIMESTAMP"),
    env.DB.prepare(`INSERT INTO ai_chat_usage (bucket_key, request_count, expires_at)
      VALUES (?, 1, datetime('now', '+1 hour'))
      ON CONFLICT(bucket_key) DO UPDATE SET request_count = request_count + 1`).bind(bucketKey),
  ]);
  const usage = await env.DB.prepare("SELECT request_count FROM ai_chat_usage WHERE bucket_key = ?")
    .bind(bucketKey)
    .first<{ request_count: number }>();
  return {
    allowed: Number(usage?.request_count ?? 0) <= hourlyLimit,
    limit: hourlyLimit,
    safetyIdentifier,
  };
}
