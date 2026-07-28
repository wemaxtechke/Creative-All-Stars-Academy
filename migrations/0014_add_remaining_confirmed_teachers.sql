INSERT INTO content_items
  (collection, id, payload, is_published, sort_order, created_at, updated_at)
VALUES
  ('teachers', 'charity-achieng', json_object(
    'id', 'charity-achieng', 'name', 'Charity Achieng', 'role', 'Playgroup Teacher',
    'subjects', json('[]')
  ), 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'priscilla-mwende', json_object(
    'id', 'priscilla-mwende', 'name', 'Priscilla Mwende', 'role', 'PP1 Teacher',
    'subjects', json('[]')
  ), 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'lucy-kwamboka', json_object(
    'id', 'lucy-kwamboka', 'name', 'Lucy Kwamboka', 'role', 'PP1 Teacher',
    'subjects', json('[]')
  ), 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'sheila-matachi', json_object(
    'id', 'sheila-matachi', 'name', 'Sheila Matachi', 'role', 'PP2 Teacher',
    'subjects', json('[]')
  ), 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'rispa-j-korir', json_object(
    'id', 'rispa-j-korir', 'name', 'Rispa J. Korir', 'role', 'Grade 1 Teacher',
    'subjects', json('[]')
  ), 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'mercy-chepkoech', json_object(
    'id', 'mercy-chepkoech', 'name', 'Mercy Chepkoech', 'role', 'Grade 2 Teacher',
    'subjects', json('[]')
  ), 1, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'mercy-chebii', json_object(
    'id', 'mercy-chebii', 'name', 'Mercy Chebii', 'role', 'Grade 3 Teacher',
    'subjects', json('[]')
  ), 1, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(collection, id) DO UPDATE SET
  payload = excluded.payload,
  is_published = 1,
  sort_order = excluded.sort_order,
  updated_at = excluded.updated_at;

UPDATE content_items
SET sort_order = CASE id
  WHEN 'esther-muhemo' THEN 1
  WHEN 'charity-achieng' THEN 2
  WHEN 'angeline-masana' THEN 3
  WHEN 'priscilla-mwende' THEN 4
  WHEN 'lucy-kwamboka' THEN 5
  WHEN 'lavender-david' THEN 6
  WHEN 'sheila-matachi' THEN 7
  WHEN 'lilian-kamau' THEN 8
  WHEN 'rispa-j-korir' THEN 9
  WHEN 'sarah-lucas-nafula' THEN 10
  WHEN 'mercy-chepkoech' THEN 11
  WHEN 'esther-bosibori' THEN 12
  WHEN 'mercy-chebii' THEN 13
  WHEN 'viola-minayo' THEN 14
  WHEN 'vivian-nafula' THEN 15
  WHEN 'millicent-kezia' THEN 16
  WHEN 'collins-wainaina' THEN 17
  ELSE sort_order
END,
updated_at = CURRENT_TIMESTAMP
WHERE collection = 'teachers'
  AND id IN (
    'esther-muhemo', 'charity-achieng', 'angeline-masana',
    'priscilla-mwende', 'lucy-kwamboka', 'lavender-david',
    'sheila-matachi', 'lilian-kamau', 'rispa-j-korir',
    'sarah-lucas-nafula', 'mercy-chepkoech', 'esther-bosibori',
    'mercy-chebii', 'viola-minayo', 'vivian-nafula',
    'millicent-kezia', 'collins-wainaina'
  );
