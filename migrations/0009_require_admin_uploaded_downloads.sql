-- Remove legacy mock download cards. A public document must have an R2 media
-- record created by an authenticated administrator upload.
DELETE FROM content_items
WHERE collection = 'downloads'
  AND (
    COALESCE(json_extract(payload, '$.mediaId'), '') = ''
    OR COALESCE(json_extract(payload, '$.url'), '') NOT LIKE '/media/%'
  );
