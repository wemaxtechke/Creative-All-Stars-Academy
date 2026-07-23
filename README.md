# Creative All Stars Academy website

Production-oriented school website and content administration workspace for Creative All Stars Academy, Nakuru. This is a public-facing website CMS, not a student information or school-management system.

## Architecture

- Next.js App Router, React and TypeScript
- OpenNext deployed as a Cloudflare Worker
- Cloudflare D1 for public content, enquiries, job applications and audit records
- Cloudflare R2 for gallery images, public PDFs and private candidate CVs
- Cloudflare Access for `/admin/dashboard/*` and all administrator APIs
- Cloudflare Turnstile on public contact, admission and career forms

Public CMS content is loaded during the server render so page HTML, metadata and the sitemap use the same current D1 records. Candidate documents use private R2 keys and are only streamed through an authenticated administrator route.

## Local development

Requires Node.js 22.13 or newer.

```powershell
npm install
Copy-Item .dev.vars.example .dev.vars
npm run dev
```

The regular Next.js development server uses safe fallback content when Cloudflare bindings are unavailable. To test D1, R2 and the Worker runtime locally:

```powershell
npm run preview
```

Apply local database migrations before testing forms or the admin workspace:

```powershell
npx wrangler d1 migrations apply creative-all-stars-cms --local
```

Local administrator bypass is permitted only outside production and only for the email in `LOCAL_ADMIN_EMAIL`.

## Required configuration

Copy `.dev.vars.example` for local work. Never commit `.dev.vars` or production secrets.

- `ADMIN_EMAILS`: comma-separated allowlist of administrator email addresses
- `LOCAL_ADMIN_EMAIL`: local-only administrator identity
- `ACCESS_TEAM_DOMAIN`: Cloudflare Access team URL
- `ACCESS_AUD`: Access application audience tag
- `TURNSTILE_SECRET`: Turnstile secret, set with `wrangler secret put`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public Turnstile widget key
- `NEXT_PUBLIC_SITE_URL`: canonical website origin

`NEXT_PUBLIC_*` values are embedded by Next.js at build time. Supply them to the CI/build environment as well as the Worker configuration.

## Cloudflare setup

The Wrangler configuration declares separate production and staging D1/R2 resources. Resource IDs are intentionally omitted so Wrangler can provision or resolve them for each account/environment.

The production Worker is configured for `creativeallstarsacademy.sc.ke`, and the staging Worker is configured for `staging.creativeallstarsacademy.sc.ke`. Both are Wrangler-managed Custom Domains, so deployment creates their DNS records and certificates after the `creativeallstarsacademy.sc.ke` zone is active in Cloudflare.

1. Activate `creativeallstarsacademy.sc.ke` in Cloudflare by installing the assigned Cloudflare nameservers at the registrar.
2. Add `creativeallstarsacademy.sc.ke` and `staging.creativeallstarsacademy.sc.ke` to the Turnstile widget's allowed hostnames.
3. Configure a Cloudflare Access self-hosted application protecting `/admin/dashboard/*` and `/api/admin/*`.
4. Set the Access domain, audience and administrator allowlist.
5. Set the Turnstile secret for each environment.
6. Apply D1 migrations remotely.
7. Build and deploy.

```powershell
npx wrangler secret put TURNSTILE_SECRET
npx wrangler d1 migrations apply creative-all-stars-cms --remote
npm run deploy
```

For staging, add `--env staging` to Wrangler commands and supply the staging public URL and Turnstile key during the build.

## Quality checks

```powershell
npm run check
```

This runs linting, TypeScript checks, architecture tests and the portable Next.js production build. Use `npm run cf:typegen` after changing Wrangler bindings.

Run the final Cloudflare Worker packaging step in Linux, CI or WSL because OpenNext requires filesystem symlinks that standard Windows sessions may reject:

```powershell
npm run check:cloudflare
```

## Operational boundaries

The dashboard manages website stories, events, staff profiles, gallery media, downloads, vacancies and incoming enquiries. It deliberately does not manage learners, attendance, grades, fees, payroll or academic records.
