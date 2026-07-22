UPDATE content_items
SET payload = json_set(payload, '$.phone', '+254733590116'),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'settings' AND id = 'school';
