UPDATE content_items
SET payload = json_set(
      payload,
      '$.phone', '+254724838674',
      '$.email', 'info@creativeallstarsacademy.sc.ke'
    ),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'settings' AND id = 'school';

UPDATE content_items
SET payload = replace(
      payload,
      '@creativeallstars.ac.ke',
      '@creativeallstarsacademy.sc.ke'
    ),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'teachers'
  AND payload LIKE '%@creativeallstars.ac.ke%';
