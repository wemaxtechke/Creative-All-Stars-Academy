import { getCloudflareEnv } from "@/lib/cloudflare";

export async function checkRateLimit(request: Request, scope: string, limit = 8, windowSeconds = 600) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
  const rawKey = `${scope}:${ip}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawKey));
  const key = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSeconds);
  const db = getCloudflareEnv().DB;
  await db.batch([
    db.prepare(`INSERT INTO request_limits (key, window_started_at, request_count)
      VALUES (?, ?, 1)
      ON CONFLICT(key) DO UPDATE SET
        window_started_at = CASE WHEN request_limits.window_started_at = excluded.window_started_at
          THEN request_limits.window_started_at ELSE excluded.window_started_at END,
        request_count = CASE WHEN request_limits.window_started_at = excluded.window_started_at
          THEN request_limits.request_count + 1 ELSE 1 END`)
      .bind(key, windowStart),
    db.prepare("DELETE FROM request_limits WHERE window_started_at < ?")
      .bind(now - 86_400),
  ]);
  const row = await db.prepare("SELECT request_count FROM request_limits WHERE key = ?").bind(key).first<{ request_count: number }>();
  return (row?.request_count ?? limit + 1) <= limit;
}
