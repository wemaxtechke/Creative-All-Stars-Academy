interface CloudflareEnv {
  ASSETS: Fetcher;
  DB: D1Database;
  MEDIA: R2Bucket;
  ADMIN_EMAILS: string;
  LOCAL_ADMIN_EMAIL: string;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  TURNSTILE_SECRET: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: string;
  NEXT_PUBLIC_SITE_URL: string;
}
