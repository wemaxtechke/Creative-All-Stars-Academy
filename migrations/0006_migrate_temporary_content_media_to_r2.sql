INSERT OR IGNORE INTO media_assets
  (id, r2_key, filename, content_type, size_bytes, alt_text, width, height, uploaded_by)
VALUES
  ('seed-media-alumni-portrait', 'uploads/seed/alumni-portrait.jpg', 'alumni-portrait.jpg', 'image/jpeg', 73409, 'Alumni profile portrait', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-classroom-teacher', 'uploads/seed/classroom-teacher.jpg', 'classroom-teacher.jpg', 'image/jpeg', 171553, 'Teacher supporting learners in a classroom', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-culture-day', 'uploads/seed/culture-day.jpg', 'culture-day.jpg', 'image/jpeg', 123300, 'School culture day celebration', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-early-years-play', 'uploads/seed/early-years-play.jpg', 'early-years-play.jpg', 'image/jpeg', 384449, 'Early years learners playing together', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-field-trip', 'uploads/seed/field-trip.jpg', 'field-trip.jpg', 'image/jpeg', 145501, 'Learners on an educational field trip', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-graduation', 'uploads/seed/graduation.jpg', 'graduation.jpg', 'image/jpeg', 223825, 'Learners celebrating graduation', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-learning-classroom', 'uploads/seed/learning-classroom.jpg', 'learning-classroom.jpg', 'image/jpeg', 107751, 'Learner participating in a classroom lesson', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-music-drama', 'uploads/seed/music-drama.jpg', 'music-drama.jpg', 'image/jpeg', 161712, 'Music and drama performance', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-parent-portrait-one', 'uploads/seed/parent-portrait-one.jpg', 'parent-portrait-one.jpg', 'image/jpeg', 171255, 'Parent profile portrait', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-parent-portrait-two', 'uploads/seed/parent-portrait-two.jpg', 'parent-portrait-two.jpg', 'image/jpeg', 99150, 'Parent profile portrait', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-school-campus', 'uploads/seed/school-campus.jpg', 'school-campus.jpg', 'image/jpeg', 167933, 'Creative school campus environment', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-school-sports', 'uploads/seed/school-sports.jpg', 'school-sports.jpg', 'image/jpeg', 439239, 'Learners participating in school sports', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-science-fair', 'uploads/seed/science-fair.jpg', 'science-fair.jpg', 'image/jpeg', 212681, 'Learners collaborating at a science fair', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-study-guide', 'uploads/seed/study-guide.jpg', 'study-guide.jpg', 'image/jpeg', 236842, 'Learners studying together', NULL, NULL, 'cms-seed@creativeallstars.ac.ke'),
  ('seed-media-technology-classroom', 'uploads/seed/technology-classroom.jpg', 'technology-classroom.jpg', 'image/jpeg', 162125, 'Learner using technology for education', NULL, NULL, 'cms-seed@creativeallstars.ac.ke');

UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/learning-classroom.jpg', '$.mediaId', 'seed-media-learning-classroom'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b1';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/music-drama.jpg', '$.mediaId', 'seed-media-music-drama'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b2';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/technology-classroom.jpg', '$.mediaId', 'seed-media-technology-classroom'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b3';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/parent-portrait-one.jpg', '$.mediaId', 'seed-media-parent-portrait-one'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b4';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/field-trip.jpg', '$.mediaId', 'seed-media-field-trip'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b5';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/study-guide.jpg', '$.mediaId', 'seed-media-study-guide'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b6';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/culture-day.jpg', '$.mediaId', 'seed-media-culture-day'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b7';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/classroom-teacher.jpg', '$.mediaId', 'seed-media-classroom-teacher'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b8';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/school-sports.jpg', '$.mediaId', 'seed-media-school-sports'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b9';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/school-campus.jpg', '$.mediaId', 'seed-media-school-campus'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b10';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/early-years-play.jpg', '$.mediaId', 'seed-media-early-years-play'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b11';
UPDATE content_items SET payload = json_set(payload, '$.featuredImage', '/media/uploads/seed/graduation.jpg', '$.mediaId', 'seed-media-graduation'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'blogPosts' AND id = 'b12';

UPDATE content_items SET payload = json_set(payload, '$.image', '/media/uploads/seed/school-sports.jpg', '$.mediaId', 'seed-media-school-sports'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'schoolEvents' AND id = 'e1';
UPDATE content_items SET payload = json_set(payload, '$.image', '/media/uploads/seed/music-drama.jpg', '$.mediaId', 'seed-media-music-drama'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'schoolEvents' AND id = 'e2';
UPDATE content_items SET payload = json_set(payload, '$.image', '/media/uploads/seed/classroom-teacher.jpg', '$.mediaId', 'seed-media-classroom-teacher'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'schoolEvents' AND id = 'e3';
UPDATE content_items SET payload = json_set(payload, '$.image', '/media/uploads/seed/science-fair.jpg', '$.mediaId', 'seed-media-science-fair'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'schoolEvents' AND id = 'e4';
UPDATE content_items SET payload = json_set(payload, '$.image', '/media/uploads/seed/field-trip.jpg', '$.mediaId', 'seed-media-field-trip'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'schoolEvents' AND id = 'e5';

UPDATE content_items SET payload = json_set(payload, '$.avatar', '/media/uploads/seed/parent-portrait-one.jpg', '$.mediaId', 'seed-media-parent-portrait-one'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'testimonials' AND id = 'te1';
UPDATE content_items SET payload = json_set(payload, '$.avatar', '/media/uploads/seed/parent-portrait-two.jpg', '$.mediaId', 'seed-media-parent-portrait-two'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'testimonials' AND id = 'te2';
UPDATE content_items SET payload = json_set(payload, '$.avatar', '/media/uploads/seed/alumni-portrait.jpg', '$.mediaId', 'seed-media-alumni-portrait'), updated_at = CURRENT_TIMESTAMP WHERE collection = 'testimonials' AND id = 'te3';
