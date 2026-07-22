import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
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

test('blog comments persist in D1 and blog editing uses a sanitized rich text workflow', async () => {
  const migration = await read('migrations/0007_persistent_blog_comments.sql');
  const route = await read('app/api/blog/[id]/comments/route.ts');
  const page = await read('app/blog/[id]/page.tsx');
  const editor = await read('components/admin/RichTextEditor.tsx');
  const sanitizer = await read('lib/content/sanitize.ts');
  assert.match(migration, /CREATE TABLE IF NOT EXISTS blog_comments/);
  assert.match(route, /createBlogComment/);
  assert.match(route, /checkRateLimit/);
  assert.match(route, /verifyTurnstile/);
  assert.match(page, /\/comments/);
  assert.match(page, /TurnstileWidget/);
  assert.match(editor, /insertHTML/);
  assert.match(editor, /createLink/);
  assert.match(sanitizer, /sanitizeHtml/);
  assert.match(sanitizer, /startsWith\("\/media\/"\)/);
});

async function sourceFiles(directory) {
  const root = new URL(`../${directory}/`, import.meta.url);
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'admin') continue;
    if (entry.isDirectory()) files.push(...await sourceFiles(`${directory}/${entry.name}`));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(`${directory}/${entry.name}`);
  }
  return files;
}

test('public website images come only from CMS media records', async () => {
  const paths = [...await sourceFiles('app'), ...await sourceFiles('components'), ...await sourceFiles('lib')];
  for (const path of paths) {
    const source = await read(path);
    assert.doesNotMatch(source, /images\.unsplash\.com|["']\/images\/|["']\/brand\//, `${path} contains a static public image`);
  }
  const content = await read('lib/site-content.ts');
  for (const collection of ['heroSlides', 'siteImages', 'teachers', 'classes', 'blogPosts', 'schoolEvents', 'galleryImages', 'jobs', 'testimonials', 'downloads']) {
    assert.match(content, new RegExp(`${collection}: \\[\\]`), `${collection} must not have demo fallback records`);
  }
  const migration = await read('migrations/0005_dynamic_visual_content.sql');
  assert.match(migration, /'heroSlides', 'siteImages'/);
  const temporaryMediaMigration = await read('migrations/0006_migrate_temporary_content_media_to_r2.sql');
  for (const collection of ['blogPosts', 'schoolEvents', 'testimonials']) {
    assert.match(temporaryMediaMigration, new RegExp(`collection = '${collection}'`));
  }
  assert.doesNotMatch(temporaryMediaMigration, /images\.unsplash\.com/);
  const eventAdmin = await read('app/admin/dashboard/events/page.tsx');
  assert.match(eventAdmin, /uploadMedia\(eventImage, title\)/);
  assert.match(eventAdmin, /mediaId: asset\.id/);
});

test('teachers and class lead assignments are fully administered through D1 CMS content', async () => {
  const migration = await read('migrations/0008_dynamic_classes_and_teacher_assignments.sql');
  const content = await read('lib/db/content.ts');
  const context = await read('lib/AppContext.tsx');
  const staffAdmin = await read('app/admin/dashboard/staff/page.tsx');
  const classesAdmin = await read('app/admin/dashboard/classes/page.tsx');
  const classPage = await read('app/classes/[id]/page.tsx');

  assert.match(migration, /'classes'/);
  assert.match(migration, /'teacherId', 't4'/);
  assert.match(content, /case "classes"/);
  assert.match(content, /Reassign or remove this teacher/);
  assert.match(context, /updateSchoolClass/);
  assert.match(staffAdmin, /updateTeacher/);
  assert.match(staffAdmin, /Replace staff photograph/);
  assert.match(classesAdmin, /No lead educator/);
  assert.match(classesAdmin, /updateSchoolClass/);
  assert.match(classPage, /teachers\.find\(t => t\.id === selectedClass\.teacherId\)/);
  assert.doesNotMatch(context, /schoolClasses as initialSchoolClasses/);
});

test('School Life gallery media and page presentation are fully controlled by the D1 CMS', async () => {
  const types = await read('types/index.ts');
  const defaults = await read('lib/site-content.ts');
  const content = await read('lib/db/content.ts');
  const context = await read('lib/AppContext.tsx');
  const galleryAdmin = await read('app/admin/dashboard/gallery/page.tsx');
  const galleryPage = await read('app/gallery/page.tsx');

  assert.match(types, /category: string/);
  assert.match(types, /order\?: number/);
  assert.match(defaults, /galleryCategories/);
  assert.match(content, /\.\.\.defaultPublicContent\.settings/);
  assert.match(context, /updateGalleryImage/);
  assert.match(galleryAdmin, /Replace image \(optional\)/);
  assert.match(galleryAdmin, /Display order/);
  assert.match(galleryAdmin, /updateSettings/);
  assert.match(galleryAdmin, /removeCategory/);
  assert.match(galleryPage, /settings\.galleryCategories/);
  assert.match(galleryPage, /settings\.galleryTitle/);
  assert.match(galleryPage, /a\.order \?\? 0/);
  assert.doesNotMatch(galleryPage, /const categories = \['All', 'School Events'/);
});

test('public PDF downloads require administrator-uploaded R2 files', async () => {
  const types = await read('types/index.ts');
  const content = await read('lib/db/content.ts');
  const context = await read('lib/AppContext.tsx');
  const admin = await read('app/admin/dashboard/downloads/page.tsx');
  const admissions = await read('app/admissions/page.tsx');
  const parents = await read('app/parents-corner/page.tsx');
  const migration = await read('migrations/0009_require_admin_uploaded_downloads.sql');
  const mocks = await read('data/mockData.ts');

  assert.match(types, /mediaId: string/);
  assert.match(content, /download\.mediaId && download\.url\.startsWith\("\/media\/"\)/);
  assert.match(content, /Downloads must use an administrator-uploaded PDF file/);
  assert.match(context, /updateDownload/);
  assert.match(admin, /Replace PDF \(optional\)/);
  assert.match(admin, /updateDownload/);
  assert.match(admin, /uploadMedia\(document, title\.trim\(\)\)/);
  assert.match(admissions, /admissionDownloads\.length > 0/);
  assert.match(parents, /orderedDownloads\.length > 0/);
  assert.match(migration, /DELETE FROM content_items/);
  assert.doesNotMatch(mocks, /export const downloads/);
  assert.doesNotMatch(mocks, /Comprehensive 2025 Fee Structure/);
});
//good code//
