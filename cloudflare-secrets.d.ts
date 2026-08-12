// Worker secrets are configured with `wrangler secret put` and are not emitted by `wrangler types`.
interface CloudflareEnv {
  TURNSTILE_SECRET: string;
  CLOUDFLARE_ANALYTICS_TOKEN: string;
  OPENAI_API_KEY: string;
  AI_RATE_LIMIT_SECRET: string;
}
