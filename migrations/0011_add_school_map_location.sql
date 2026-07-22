UPDATE content_items
SET payload = json_set(
      payload,
      '$.mapUrl', 'https://maps.app.goo.gl/6yFsBYC5fGmtHNpa7',
      '$.mapLatitude', '-0.2592805',
      '$.mapLongitude', '35.9917215'
    ),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'settings' AND id = 'school';
