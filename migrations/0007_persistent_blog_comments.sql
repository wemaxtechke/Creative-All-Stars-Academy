CREATE TABLE IF NOT EXISTS blog_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'hidden')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_public
  ON blog_comments(post_id, status, created_at ASC);

INSERT OR IGNORE INTO blog_comments (id, post_id, name, message, status, created_at)
VALUES
  ('seed-comment-b1-kiprono', 'b1', 'Kiprono Langat', 'This was an incredibly well-articulated read! The practical agricultural models explain why my daughter is suddenly eager to help in our garden.', 'approved', '2025-05-12T09:00:00.000Z'),
  ('seed-comment-b1-grace', 'b1', 'Grace Njoroge', 'Truly stellar, co-founding this academy was a huge blessing for the Ngata community.', 'approved', '2025-05-11T09:00:00.000Z');
