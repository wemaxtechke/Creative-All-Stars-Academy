// Worker secrets are configured with `wrangler secret put` and are not emitted by `wrangler types`.
interface CloudflareEnv {
  TURNSTILE_SECRET: string;
}
