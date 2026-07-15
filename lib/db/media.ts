import { getCloudflareEnv } from "@/lib/cloudflare";

export type MediaAsset = {
  id: string;
  r2_key: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  alt_text: string;
  width: number | null;
  height: number | null;
  uploaded_by: string;
  created_at: string;
};

export async function listMedia() {
  const result = await getCloudflareEnv().DB.prepare(`SELECT id, r2_key, filename, content_type,
    size_bytes, alt_text, width, height, uploaded_by, created_at
    FROM media_assets ORDER BY created_at DESC LIMIT 300`).all<MediaAsset>();
  return result.results;
}

export async function saveMedia(asset: Omit<MediaAsset, "created_at">) {
  await getCloudflareEnv().DB.prepare(`INSERT INTO media_assets
    (id, r2_key, filename, content_type, size_bytes, alt_text, width, height, uploaded_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(asset.id, asset.r2_key, asset.filename, asset.content_type, asset.size_bytes,
      asset.alt_text, asset.width, asset.height, asset.uploaded_by)
    .run();
}

export async function getMedia(id: string) {
  return getCloudflareEnv().DB.prepare(`SELECT id, r2_key, filename, content_type,
    size_bytes, alt_text, width, height, uploaded_by, created_at
    FROM media_assets WHERE id = ? LIMIT 1`).bind(id).first<MediaAsset>();
}

export async function deleteMediaRecord(id: string, actorEmail: string) {
  const asset = await getMedia(id);
  if (!asset) return null;
  const db = getCloudflareEnv().DB;
  const now = new Date().toISOString();
  await db.batch([
    db.prepare("DELETE FROM media_assets WHERE id = ?").bind(id),
    db.prepare(`INSERT INTO audit_log
      (id, actor_email, action, resource_type, resource_id, details, created_at)
      VALUES (?, ?, 'delete', 'media', ?, ?, ?)`)
      .bind(crypto.randomUUID(), actorEmail, id, JSON.stringify({ key: asset.r2_key }), now),
  ]);
  return asset;
}
