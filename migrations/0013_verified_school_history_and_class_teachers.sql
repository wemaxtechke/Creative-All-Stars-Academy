DELETE FROM content_items
WHERE collection = 'teachers'
  AND id IN ('t1', 't2', 't3', 't4', 't5');

INSERT INTO content_items
  (collection, id, payload, is_published, sort_order, created_at, updated_at)
VALUES
  ('teachers', 'esther-muhemo', json_object(
    'id', 'esther-muhemo', 'name', 'Esther Muhemo', 'role', 'Playgroup Class Teacher',
    'subjects', json('[]')
  ), 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'angeline-masana', json_object(
    'id', 'angeline-masana', 'name', 'Angeline Masana', 'role', 'PP1 Class Teacher',
    'subjects', json('[]')
  ), 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'lavender-david', json_object(
    'id', 'lavender-david', 'name', 'Lavender David', 'role', 'PP2 Class Teacher',
    'subjects', json('[]')
  ), 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'lilian-kamau', json_object(
    'id', 'lilian-kamau', 'name', 'Lilian Kamau', 'role', 'Grade 1 Class Teacher',
    'subjects', json('[]')
  ), 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'sarah-lucas-nafula', json_object(
    'id', 'sarah-lucas-nafula', 'name', 'Sarah Lucas Nafula', 'role', 'Grade 2 Class Teacher',
    'subjects', json('[]')
  ), 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'esther-bosibori', json_object(
    'id', 'esther-bosibori', 'name', 'Esther Bosibori', 'role', 'Grade 3 Class Teacher',
    'subjects', json('[]')
  ), 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'viola-minayo', json_object(
    'id', 'viola-minayo', 'name', 'Viola Minayo', 'role', 'Grade 4 Class Teacher',
    'subjects', json('[]')
  ), 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'vivian-nafula', json_object(
    'id', 'vivian-nafula', 'name', 'Vivian Nafula', 'role', 'Grade 5 Class Teacher',
    'subjects', json('[]')
  ), 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'millicent-kezia', json_object(
    'id', 'millicent-kezia', 'name', 'Millicent Kezia', 'role', 'Grade 6 Class Teacher',
    'subjects', json('[]')
  ), 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('teachers', 'collins-wainaina', json_object(
    'id', 'collins-wainaina', 'name', 'Collins Wainaina', 'role', 'Grade 7 Class Teacher',
    'subjects', json('[]')
  ), 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(collection, id) DO UPDATE SET
  payload = excluded.payload,
  is_published = 1,
  sort_order = excluded.sort_order,
  updated_at = excluded.updated_at;

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'A welcoming play-based environment that supports early communication, social interaction and learner confidence.',
  '$.teacherId', 'esther-muhemo',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'playgroup';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'An early-years learning environment that develops foundational language, numeracy, creativity and personal independence.',
  '$.teacherId', 'angeline-masana',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'pp1';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'A supportive pre-primary programme that prepares learners for a confident transition into primary education.',
  '$.teacherId', 'lavender-david',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'pp2';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'The beginning of primary education, with learner-centred experiences that strengthen foundational knowledge, skills and values.',
  '$.teacherId', 'lilian-kamau',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade1';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'A competency-based primary programme that develops communication, numeracy, curiosity and growing learner independence.',
  '$.teacherId', 'sarah-lucas-nafula',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade2';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'Learner-centred primary education that builds confident communication, problem-solving and responsible participation.',
  '$.teacherId', 'esther-bosibori',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade3';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'Upper-primary learning that deepens understanding through practical work, collaboration and application of knowledge.',
  '$.teacherId', 'viola-minayo',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade4';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'Upper-primary education that strengthens analytical thinking, communication and independent learning habits.',
  '$.teacherId', 'vivian-nafula',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade5';

UPDATE content_items SET payload = json_set(
  payload,
  '$.description', 'The final primary level, supporting well-rounded competency development and preparation for KPSEA and Junior School.',
  '$.teacherId', 'millicent-kezia',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'grade6';

UPDATE content_items SET payload = json_set(
  payload,
  '$.name', 'Grade 7 — Junior School',
  '$.ageGroup', 'Grade 7',
  '$.description', 'Creative All Stars Academy introduced Junior School in 2026, beginning with a competency-based Grade 7 programme.',
  '$.teacherId', 'collins-wainaina',
  '$.subjects', json('[]'),
  '$.activities', json('[]')
), updated_at = CURRENT_TIMESTAMP WHERE collection = 'classes' AND id = 'juniorschool';
