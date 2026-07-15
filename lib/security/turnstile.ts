import { readRuntimeVariable } from "@/lib/cloudflare";

type TurnstileResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(request: Request, token: string, expectedAction: string) {
  const secret = readRuntimeVariable("TURNSTILE_SECRET");
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: request.headers.get("cf-connecting-ip") ?? "",
        idempotency_key: crypto.randomUUID(),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return false;
    const result = await response.json() as TurnstileResponse;
    const expectedHostname = new URL(request.url).hostname;
    return result.success === true && result.action === expectedAction && result.hostname === expectedHostname;
  } catch (error) {
    console.error(JSON.stringify({
      event: "turnstile-validation-failed",
      error: error instanceof Error ? error.message : "unknown",
    }));
    return false;
  }
}
