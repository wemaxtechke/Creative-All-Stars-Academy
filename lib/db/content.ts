import { getCloudflareEnv } from "@/lib/cloudflare";
import { sanitizeRichText } from "@/lib/content/sanitize";
import {
  contentCollections,
  defaultPublicContent,
  type ContentCollection,
  type PublicContent,
} from "@/lib/site-content";

type StoredContentRow = {
  collection: ContentCollection;
  id: string;
  payload: string;
};

function normalizeRecord(collection: ContentCollection, value: Record<string, unknown>) {
  const record = Object.fromEntries(Object.entries(value).map(([key, item]) => {
    if (typeof item === "string") return [key, item.trim().slice(0, key === "content" ? 200_000 : 10_000)];
    if (Array.isArray(item)) {
      return [key, item.slice(0, 100).map((entry) => typeof entry === "string" ? entry.trim().slice(0, 1_000) : entry)];
    }
    return [key, item];
  })) as Record<string, unknown>;
  if (collection === "blogPosts" && typeof record.content === "string") {
    record.content = sanitizeRichText(record.content);
  }
  return record;
}

export async function getPublicContent(): Promise<PublicContent> {
  const result = await getCloudflareEnv().DB.prepare(`SELECT collection, id, payload
    FROM content_items WHERE is_published = 1
    ORDER BY collection, sort_order ASC, updated_at DESC`).all<StoredContentRow>();

  const content: PublicContent = {
    heroSlides: [], siteImages: [],
    teachers: [], blogPosts: [], schoolEvents: [], galleryImages: [],
    jobs: [], testimonials: [], downloads: [], settings: defaultPublicContent.settings,
  };

  for (const row of result.results) {
    const parsed: unknown = JSON.parse(row.payload);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
    switch (row.collection) {
      case "heroSlides": content.heroSlides.push(parsed as PublicContent["heroSlides"][number]); break;
      case "siteImages": content.siteImages.push(parsed as PublicContent["siteImages"][number]); break;
      case "teachers": content.teachers.push(parsed as PublicContent["teachers"][number]); break;
      case "blogPosts": content.blogPosts.push(parsed as PublicContent["blogPosts"][number]); break;
      case "schoolEvents": content.schoolEvents.push(parsed as PublicContent["schoolEvents"][number]); break;
      case "galleryImages": content.galleryImages.push(parsed as PublicContent["galleryImages"][number]); break;
      case "jobs": content.jobs.push(parsed as PublicContent["jobs"][number]); break;
      case "testimonials": content.testimonials.push(parsed as PublicContent["testimonials"][number]); break;
      case "downloads": content.downloads.push(parsed as PublicContent["downloads"][number]); break;
      case "settings": content.settings = parsed as PublicContent["settings"]; break;
    }
  }
  return content;
}

export async function upsertContent(
  collection: ContentCollection,
  input: Record<string, unknown>,
  actorEmail: string,
) {
  const db = getCloudflareEnv().DB;
  const id = String(input.id || crypto.randomUUID());
  const now = new Date().toISOString();
  const existing = await db.prepare("SELECT payload FROM content_items WHERE collection = ? AND id = ? LIMIT 1")
    .bind(collection, id)
    .first<{ payload: string }>();
  let existingRecord: Record<string, unknown> = {};
  if (existing) {
    try {
      const parsed: unknown = JSON.parse(existing.payload);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) existingRecord = parsed as Record<string, unknown>;
    } catch {
      existingRecord = {};
    }
  }
  const record = normalizeRecord(collection, { ...existingRecord, ...input, id });
  const validationError = validateContentInput(collection, record);
  if (validationError) throw new ContentValidationError(validationError);
  await db.batch([
    db.prepare(`INSERT INTO content_items
      (collection, id, payload, is_published, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, 1, 0, ?, ?)
      ON CONFLICT(collection, id) DO UPDATE SET payload = excluded.payload,
        is_published = excluded.is_published, updated_at = excluded.updated_at`)
      .bind(collection, id, JSON.stringify(record), now, now),
    db.prepare(`INSERT INTO audit_log
      (id, actor_email, action, resource_type, resource_id, details, created_at)
      VALUES (?, ?, 'upsert', ?, ?, '{}', ?)`)
      .bind(crypto.randomUUID(), actorEmail, collection, id, now),
  ]);
  return record;
}

export async function deleteContent(collection: ContentCollection, id: string, actorEmail: string) {
  const db = getCloudflareEnv().DB;
  const now = new Date().toISOString();
  const existing = await db.prepare("SELECT payload FROM content_items WHERE collection = ? AND id = ? LIMIT 1")
    .bind(collection, id)
    .first<{ payload: string }>();
  let mediaId: string | null = null;
  if (existing) {
    try {
      const payload = JSON.parse(existing.payload) as { mediaId?: unknown };
      if (typeof payload.mediaId === "string" && payload.mediaId) mediaId = payload.mediaId;
    } catch {
      mediaId = null;
    }
  }
  await db.batch([
    db.prepare("DELETE FROM blog_comments WHERE post_id = ? AND ? = 'blogPosts'").bind(id, collection),
    db.prepare("DELETE FROM content_items WHERE collection = ? AND id = ?").bind(collection, id),
    db.prepare(`INSERT INTO audit_log
      (id, actor_email, action, resource_type, resource_id, details, created_at)
      VALUES (?, ?, 'delete', ?, ?, '{}', ?)`)
      .bind(crypto.randomUUID(), actorEmail, collection, id, now),
  ]);
  return mediaId;
}

export function isContentCollection(value: string): value is ContentCollection {
  return contentCollections.includes(value as ContentCollection);
}

export class ContentValidationError extends Error {}

const requiredFields: Record<ContentCollection, string[]> = {
  heroSlides: ["mediaId", "image", "alt"],
  siteImages: ["mediaId", "url", "alt"],
  teachers: ["name", "role", "image", "email"],
  blogPosts: ["title", "summary", "content", "featuredImage", "category", "date", "author"],
  schoolEvents: ["title", "description", "date", "time", "location", "category"],
  galleryImages: ["title", "url", "category", "date"],
  jobs: ["title", "department", "type", "location", "deadline"],
  testimonials: ["name", "role", "content", "avatar"],
  downloads: ["title", "category", "fileType", "fileSize", "url"],
  settings: ["schoolName", "tagline", "email", "phone", "address", "officeHours"],
};

export function validateContentInput(collection: ContentCollection, input: Record<string, unknown>) {
  const missing = requiredFields[collection].find((field) => typeof input[field] !== "string" || !String(input[field]).trim());
  if (missing) return `The ${missing} field is required.`;
  if (input.id !== undefined && !/^[A-Za-z0-9_-]{1,100}$/.test(String(input.id))) return "Invalid content identifier.";
  if (collection === "jobs") {
    if (!Array.isArray(input.responsibilities) || !Array.isArray(input.requirements)) {
      return "Responsibilities and requirements must be lists.";
    }
  }
  return null;
}
