import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Cloudflare environments declare isolated D1, R2 and static asset bindings', async () => {
  const config = await read('wrangler.jsonc');
  assert.match(config, /"d1_databases"/);
  assert.match(config, /"r2_buckets"/);
  assert.match(config, /creative-all-stars-cms-staging/);
  assert.match(config, /creative-all-stars-media-staging/);
  assert.match(config, /\.open-next\/assets/);
});

test('administrator access verifies Cloudflare Access JWTs and an email allowlist', async () => {
  const auth = await read('lib/auth/admin.ts');
  assert.match(auth, /cf-access-jwt-assertion/);
  assert.match(auth, /jwtVerify/);
  assert.match(auth, /ACCESS_AUD/);
  assert.match(auth, /ADMIN_EMAILS/);
  assert.doesNotMatch(auth, /localStorage/);
});

test('public forms render Turnstile before submission', async () => {
  for (const path of ['app/contact/page.tsx', 'app/admissions/page.tsx', 'app/careers/[id]/page.tsx']) {
    const source = await read(path);
    const widget = source.lastIndexOf('<TurnstileWidget');
    const submit = source.lastIndexOf('type="submit"');
    assert.ok(widget > -1 && submit > widget, `${path} must render Turnstile inside its active form`);
  }
  const route = await read('app/api/forms/[type]/route.ts');
  assert.match(route, /verifyTurnstile/);
  assert.match(route, /checkRateLimit/);
});

test('candidate CVs are private and only available through the admin API', async () => {
  const publicMedia = await read('app/media/[...key]/route.ts');
  const formRoute = await read('app/api/forms/[type]/route.ts');
  const adminDocument = await read('app/api/admin/leads/[id]/document/route.ts');
  assert.match(publicMedia, /startsWith\("private\/"\)/);
  assert.match(formRoute, /private\/job-applications/);
  assert.match(adminDocument, /authorizeAdminRequest/);
  assert.match(adminDocument, /private, no-store/);
});

test('CMS content participates in server rendering, metadata and sitemap generation', async () => {
  const layout = await read('app/layout.tsx');
  const sitemap = await read('app/sitemap.ts');
  const blogMetadata = await read('app/blog/[id]/layout.tsx');
  assert.match(layout, /getPublicContent/);
  assert.match(layout, /initialContent=/);
  assert.match(sitemap, /getPublicContent/);
  assert.match(blogMetadata, /getPublicContent/);
});

test('database migration contains CMS, lead, private document, media and audit tables', async () => {
  const migration = await read('migrations/0001_website_cms.sql');
  for (const table of ['content_items', 'website_leads', 'lead_documents', 'media_assets', 'audit_log', 'request_limits']) {
    assert.match(migration, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`));
  }
});
