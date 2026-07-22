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
    teachers: [], classes: [], blogPosts: [], schoolEvents: [], galleryImages: [],
    jobs: [], testimonials: [], downloads: [], settings: defaultPublicContent.settings,
  };

  for (const row of result.results) {
    const parsed: unknown = JSON.parse(row.payload);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
    switch (row.collection) {
      case "heroSlides": content.heroSlides.push(parsed as PublicContent["heroSlides"][number]); break;
      case "siteImages": content.siteImages.push(parsed as PublicContent["siteImages"][number]); break;
      case "teachers": content.teachers.push(parsed as PublicContent["teachers"][number]); break;
      case "classes": content.classes.push(parsed as PublicContent["classes"][number]); break;
      case "blogPosts": content.blogPosts.push(parsed as PublicContent["blogPosts"][number]); break;
      case "schoolEvents": content.schoolEvents.push(parsed as PublicContent["schoolEvents"][number]); break;
      case "galleryImages": content.galleryImages.push(parsed as PublicContent["galleryImages"][number]); break;
      case "jobs": content.jobs.push(parsed as PublicContent["jobs"][number]); break;
      case "testimonials": content.testimonials.push(parsed as PublicContent["testimonials"][number]); break;
      case "downloads": {
        const download = parsed as PublicContent["downloads"][number];
        if (download.mediaId && download.url.startsWith("/media/")) content.downloads.push(download);
        break;
      }
      case "settings": content.settings = {
        ...defaultPublicContent.settings,
        ...(parsed as Partial<PublicContent["settings"]>),
      }; break;
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
  if (collection === "classes" && typeof record.teacherId === "string" && record.teacherId) {
    const teacher = await db.prepare(`SELECT id FROM content_items
      WHERE collection = 'teachers' AND id = ? AND is_published = 1 LIMIT 1`)
      .bind(record.teacherId).first<{ id: string }>();
    if (!teacher) throw new ContentValidationError("Select an existing teacher or leave the class unassigned.");
  }
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
  if (collection === "teachers") {
    const assigned = await db.prepare(`SELECT id, json_extract(payload, '$.name') AS name
      FROM content_items
      WHERE collection = 'classes' AND is_published = 1
        AND json_extract(payload, '$.teacherId') = ?
      ORDER BY sort_order ASC LIMIT 5`).bind(id).all<{ id: string; name: string | null }>();
    if (assigned.results.length > 0) {
      const classNames = assigned.results.map((item) => item.name || item.id).join(", ");
      throw new ContentConflictError(`Reassign or remove this teacher from ${classNames} before deleting the profile.`);
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
export class ContentConflictError extends Error {}

const requiredFields: Record<ContentCollection, string[]> = {
  heroSlides: ["mediaId", "image", "alt"],
  siteImages: ["mediaId", "url", "alt"],
  teachers: ["name", "role", "image", "email"],
  classes: ["name", "ageGroup", "description"],
  blogPosts: ["title", "summary", "content", "featuredImage", "category", "date", "author"],
  schoolEvents: ["title", "description", "date", "time", "location", "category"],
  galleryImages: ["title", "url", "category", "date"],
  jobs: ["title", "description", "department", "type", "location", "deadline"],
  testimonials: ["name", "role", "content", "avatar"],
  downloads: ["mediaId", "title", "category", "fileType", "fileSize", "url"],
  settings: ["schoolName", "tagline", "email", "phone", "address", "mapUrl", "mapLatitude", "mapLongitude", "officeHours"],
};

export function validateContentInput(collection: ContentCollection, input: Record<string, unknown>) {
  const missing = requiredFields[collection].find((field) => typeof input[field] !== "string" || !String(input[field]).trim());
  if (missing) return `The ${missing} field is required.`;
  if (input.id !== undefined && !/^[A-Za-z0-9_-]{1,100}$/.test(String(input.id))) return "Invalid content identifier.";
  if (collection === "jobs") {
    if (!Array.isArray(input.responsibilities) || input.responsibilities.length === 0 ||
        !Array.isArray(input.requirements) || input.requirements.length === 0) {
      return "Add at least one responsibility and one requirement.";
    }
    if (!['Full-time', 'Part-time', 'Contract'].includes(String(input.type))) return "Choose a valid contract type.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(input.deadline))) return "Choose a valid application deadline.";
    if (typeof input.isActive !== "boolean") return "Choose whether the vacancy is published.";
  }
  if (collection === "classes") {
    if (!Array.isArray(input.subjects) || !Array.isArray(input.activities)) {
      return "Subjects and activities must be lists.";
    }
    if (input.teacherId !== undefined && typeof input.teacherId !== "string") {
      return "The class lead assignment is invalid.";
    }
  }
  if (collection === "downloads") {
    if (input.fileType !== "PDF" || typeof input.url !== "string" || !input.url.startsWith("/media/")) {
      return "Downloads must use an administrator-uploaded PDF file.";
    }
  }
  if (collection === "settings") {
    const mapUrl = String(input.mapUrl);
    const latitude = Number(input.mapLatitude);
    const longitude = Number(input.mapLongitude);
    if (!/^https:\/\/(?:maps\.app\.goo\.gl|(?:www\.)?google\.[^/]+\/maps)\//i.test(mapUrl)) {
      return "Enter a valid Google Maps share link.";
    }
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
        !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return "Enter valid map latitude and longitude coordinates.";
    }
  }
  return null;
}
