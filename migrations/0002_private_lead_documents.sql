-- Upgrade databases that applied the original CMS migration before private CV storage was added.
CREATE TABLE IF NOT EXISTS lead_documents (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE,
  r2_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type = 'application/pdf'),
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES website_leads(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lead_documents_lead
  ON lead_documents(lead_id);
