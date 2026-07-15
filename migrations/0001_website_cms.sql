CREATE TABLE IF NOT EXISTS content_items (
  collection TEXT NOT NULL CHECK (collection IN (
    'teachers', 'blogPosts', 'schoolEvents', 'galleryImages',
    'jobs', 'testimonials', 'downloads', 'settings'
  )),
  id TEXT NOT NULL,
  payload TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, id)
);

CREATE INDEX IF NOT EXISTS idx_content_public
  ON content_items(collection, is_published, sort_order, updated_at DESC);

CREATE TABLE IF NOT EXISTS website_leads (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'admission', 'job_application')),
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  submitted_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_ip_hash TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_inbox
  ON website_leads(type, status, submitted_at DESC);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  r2_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  width INTEGER,
  height INTEGER,
  uploaded_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_created
  ON media_assets(created_at DESC);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_created
  ON audit_log(created_at DESC);

CREATE TABLE IF NOT EXISTS request_limits (
  key TEXT PRIMARY KEY,
  window_started_at INTEGER NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1
);
