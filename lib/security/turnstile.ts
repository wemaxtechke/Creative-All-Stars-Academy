import { readRuntimeVariable } from "@/lib/cloudflare";

type TurnstileResponse = { success?: boolean };

export async function verifyTurnstile(request: Request, token: string) {
  const secret = readRuntimeVariable("TURNSTILE_SECRET");
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: request.headers.get("cf-connecting-ip") ?? "",
    }),
  });
  const result = await response.json<TurnstileResponse>();
  return result.success === true;
}
