UPDATE content_items
SET payload = json_set(
      payload,
      '$.description', COALESCE(NULLIF(json_extract(payload, '$.description'), ''), 'Join Creative All Stars Academy and help learners thrive through excellent education and care.'),
      '$.isActive', json('true')
    ),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'jobs';
