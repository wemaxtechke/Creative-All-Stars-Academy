-- Keep the CMS setting aligned with the director-confirmed official number.
UPDATE content_items
SET payload = json_set(payload, '$.phone', '+254114813030'),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'settings' AND id = 'school';
