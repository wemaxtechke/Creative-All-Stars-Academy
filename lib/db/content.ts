import { getCloudflareEnv } from "@/lib/cloudflare";
import { sanitizeRichText } from "@/lib/content/sanitize";
import {
  contentCollections,
  defaultPublicContent,
  type ContentCollection,
} from "@/lib/site-content";

type StoredContentRow = {
  collection: ContentCollection;
  id: string;
  payload: string;
};

function normalizeRecord(collection: ContentCollection, value: Record<string, unknown>) {
  const record = { ...value };
  if (collection === "blogPosts" && typeof record.content === "string") {
    record.content = sanitizeRichText(record.content);
  }
  return record;
}

async function seedContentIfEmpty() {
  const db = getCloudflareEnv().DB;
  const existing = await db.prepare("SELECT 1 AS found FROM content_items LIMIT 1").first<{ found: number }>();
  if (existing) return;

  const statements: D1PreparedStatement[] = [];
  for (const collection of contentCollections) {
    const records = collection === "settings"
      ? [{ id: "school", ...defaultPublicContent.settings }]
      : defaultPublicContent[collection];
    records.forEach((record, index) => {
      const value = record as Record<string, unknown>;
      statements.push(
        db.prepare(`INSERT OR IGNORE INTO content_items
          (collection, id, payload, is_published, sort_order, created_at, updated_at)
          VALUES (?, ?, ?, 1, ?, ?, ?)`)
          .bind(collection, String(value.id ?? "school"), JSON.stringify(value), index, new Date().toISOString(), new Date().toISOString()),
      );
    });
  }

  for (let index = 0; index < statements.length; index += 50) {
    await db.batch(statements.slice(index, index + 50));
  }
}

export async function getPublicContent() {
  await seedContentIfEmpty();
  const result = await getCloudflareEnv().DB.prepare(`SELECT collection, id, payload
    FROM content_items WHERE is_published = 1
    ORDER BY collection, sort_order ASC, updated_at DESC`).all<StoredContentRow>();

  const content: Record<string, unknown> = {
    teachers: [], blogPosts: [], schoolEvents: [], galleryImages: [],
    jobs: [], testimonials: [], downloads: [], settings: defaultPublicContent.settings,
  };

  for (const row of result.results) {
    const parsed = JSON.parse(row.payload) as Record<string, unknown>;
    if (row.collection === "settings") content.settings = parsed;
    else (content[row.collection] as Record<string, unknown>[]).push(parsed);
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
  const record = normalizeRecord(collection, { ...input, id });
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
  await db.batch([
    db.prepare("DELETE FROM content_items WHERE collection = ? AND id = ?").bind(collection, id),
    db.prepare(`INSERT INTO audit_log
      (id, actor_email, action, resource_type, resource_id, details, created_at)
      VALUES (?, ?, 'delete', ?, ?, '{}', ?)`)
      .bind(crypto.randomUUID(), actorEmail, collection, id, now),
  ]);
}

export function isContentCollection(value: string): value is ContentCollection {
  return contentCollections.includes(value as ContentCollection);
}
