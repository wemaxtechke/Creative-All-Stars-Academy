UPDATE content_items
SET payload = json_set(payload, '$.address', 'Ngata, Nakuru City, Kenya'),
    updated_at = CURRENT_TIMESTAMP
WHERE collection = 'settings' AND id = 'school';
