import { getCloudflareEnv } from '@/lib/cloudflare';
import type { BlogComment } from '@/types';

type StoredComment = {
  id: string;
  post_id: string;
  name: string;
  message: string;
  created_at: string;
};

function toPublicComment(row: StoredComment): BlogComment {
  return { id: row.id, postId: row.post_id, name: row.name, message: row.message, createdAt: row.created_at };
}

export async function listBlogComments(postId: string) {
  const result = await getCloudflareEnv().DB.prepare(`SELECT id, post_id, name, message, created_at
    FROM blog_comments WHERE post_id = ? AND status = 'approved'
    ORDER BY created_at ASC LIMIT 200`).bind(postId).all<StoredComment>();
  return result.results.map(toPublicComment);
}

export async function createBlogComment(postId: string, name: string, message: string) {
  const db = getCloudflareEnv().DB;
  const post = await db.prepare(`SELECT id FROM content_items
    WHERE collection = 'blogPosts' AND id = ? AND is_published = 1 LIMIT 1`)
    .bind(postId).first<{ id: string }>();
  if (!post) return null;

  const record: BlogComment = {
    id: crypto.randomUUID(),
    postId,
    name,
    message,
    createdAt: new Date().toISOString(),
  };
  await db.prepare(`INSERT INTO blog_comments (id, post_id, name, message, status, created_at)
    VALUES (?, ?, ?, ?, 'approved', ?)`)
    .bind(record.id, record.postId, record.name, record.message, record.createdAt).run();
  return record;
}
