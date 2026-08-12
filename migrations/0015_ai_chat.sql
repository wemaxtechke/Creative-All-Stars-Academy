CREATE TABLE IF NOT EXISTS ai_chat_usage (
  bucket_key TEXT PRIMARY KEY,
  request_count INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_chat_usage_expiry ON ai_chat_usage(expires_at);
