PRAGMA foreign_keys = OFF;

CREATE TABLE content_items_next (
  collection TEXT NOT NULL CHECK (collection IN (
    'heroSlides', 'siteImages', 'teachers', 'blogPosts', 'schoolEvents',
    'galleryImages', 'jobs', 'testimonials', 'downloads', 'settings'
  )),
  id TEXT NOT NULL,
  payload TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, id)
);

INSERT INTO content_items_next
  (collection, id, payload, is_published, sort_order, created_at, updated_at)
SELECT collection, id, payload, is_published, sort_order, created_at, updated_at
FROM content_items
WHERE collection = 'settings'
   OR payload LIKE '%/media/uploads/%'
   OR id NOT IN (
     't1','t2','t3','t4','t5',
     'b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12',
     'e1','e2','e3','e4','e5',
     'g1','g2','g3','g4','g5','g6','g7','g8','g9',
     'j1','j2','j3','j4','j5','j6','j7','j8','j9',
     'te1','te2','te3',
     'd1','d2','d3','d4','d5','d6','d7'
   );

DROP TABLE content_items;
ALTER TABLE content_items_next RENAME TO content_items;

CREATE INDEX idx_content_public
  ON content_items(collection, is_published, sort_order, updated_at DESC);

PRAGMA foreign_keys = ON;
