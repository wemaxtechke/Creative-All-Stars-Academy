PRAGMA foreign_keys = OFF;

CREATE TABLE content_items_next (
  collection TEXT NOT NULL CHECK (collection IN (
    'heroSlides', 'siteImages', 'teachers', 'classes', 'blogPosts',
    'schoolEvents', 'galleryImages', 'jobs', 'testimonials', 'downloads', 'settings'
  )),
  id TEXT NOT NULL,
  payload TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, id)
);

INSERT INTO content_items_next
  (collection, id, payload, is_published, sort_order, created_at, updated_at)
SELECT collection, id, payload, is_published, sort_order, created_at, updated_at
FROM content_items;

DROP TABLE content_items;
ALTER TABLE content_items_next RENAME TO content_items;

CREATE INDEX idx_content_public
  ON content_items(collection, is_published, sort_order, updated_at DESC);

PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO content_items
  (collection, id, payload, is_published, sort_order, created_at, updated_at)
VALUES
  ('classes', 'playgroup', json_object(
    'id', 'playgroup', 'name', 'Playgroup', 'ageGroup', '2 - 3 Years',
    'description', 'A warm, nurturing environment where kids develop language, fine motor skills, and social interaction through immersive sensory play.',
    'teacherId', 't4',
    'subjects', json_array('Sensory Activities', 'Language Play', 'Social Play', 'Creative Arts'),
    'activities', json_array('Finger Painting', 'Sand and Water Play', 'Storytime Sessions', 'Outdoor Obstacle Course')
  ), 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'pp1', json_object(
    'id', 'pp1', 'name', 'Pre-Primary 1 (PP1)', 'ageGroup', '4 Years',
    'description', 'Focusing on early literacy, math reasoning, creative expressions, and basic self-regulation through structured games and play.',
    'teacherId', 't4',
    'subjects', json_array('Mathematical Activities', 'Language Activities', 'Environmental Activities', 'Religious Activities'),
    'activities', json_array('Letter Tracing', 'Counting Games', 'Nature Walks', 'Role Playing')
  ), 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'pp2', json_object(
    'id', 'pp2', 'name', 'Pre-Primary 2 (PP2)', 'ageGroup', '5 Years',
    'description', 'Bridging the transition to Primary School by solidifying core phonics, elementary calculations, science, and group activities.',
    'teacherId', 't4',
    'subjects', json_array('Pre-Writing Skills', 'Number Operations', 'Creative Activities', 'Social Skills'),
    'activities', json_array('Spelling Bee Prep', 'Lego Engineering', 'Cultural Dance', 'Show and Tell')
  ), 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade1', json_object(
    'id', 'grade1', 'name', 'Grade 1', 'ageGroup', '6 Years',
    'description', 'Embracing the formal Competency-Based Curriculum (CBC) with specialized literacy, numeracy, environmental, and creative assignments.',
    'teacherId', 't4',
    'subjects', json_array('English Language', 'Kiswahili', 'Mathematics Activities', 'Environmental Studies', 'Creative Arts'),
    'activities', json_array('Reading Club', 'Drawing and Craft', 'Basic Gymnastics', 'Gardening Projects')
  ), 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade2', json_object(
    'id', 'grade2', 'name', 'Grade 2', 'ageGroup', '7 Years',
    'description', 'Deepening comprehension, expanding vocabulary, working on double-digit operations, and investigating local communities.',
    'teacherId', 't1',
    'subjects', json_array('Language Skills', 'Mathematics', 'Environmental Activities', 'Movement Activities', 'Hygiene & Nutrition'),
    'activities', json_array('Science Experiments', 'Word Games', 'Track Running', 'Baking Basics')
  ), 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade3', json_object(
    'id', 'grade3', 'name', 'Grade 3', 'ageGroup', '8 Years',
    'description', 'Nurturing self-guided problem solving and critical thinking, preparing learners for key diagnostic learning evaluations.',
    'teacherId', 't1',
    'subjects', json_array('English Activities', 'Kiswahili', 'Mathematics', 'Creative Arts', 'Indigenous Languages'),
    'activities', json_array('Spelling Bee', 'Board Games', 'Intro to Recorder (Flute)', 'Environmental Cleaning')
  ), 1, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade4', json_object(
    'id', 'grade4', 'name', 'Grade 4', 'ageGroup', '9 Years',
    'description', 'Upper Primary CBC introductory level with detailed concepts in Science and Technology, Agriculture, and Creative Arts.',
    'teacherId', 't2',
    'subjects', json_array('Mathematics', 'English', 'Kiswahili', 'Science and Technology', 'Agriculture', 'Home Science'),
    'activities', json_array('Farming Projects', 'Model Sculpting', 'Scouts Camp', 'Coding Tutorials')
  ), 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade5', json_object(
    'id', 'grade5', 'name', 'Grade 5', 'ageGroup', '10 Years',
    'description', 'Expanding analytical skills with comprehensive digital literacy, ecological preservation studies, and national geography.',
    'teacherId', 't2',
    'subjects', json_array('Mathematics', 'Social Studies', 'Science and Technology', 'Music', 'French Language'),
    'activities', json_array('Music Choir', 'Robotics Assembly', 'School Newspaper', 'Swimming Gala')
  ), 1, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'grade6', json_object(
    'id', 'grade6', 'name', 'Grade 6', 'ageGroup', '11 Years',
    'description', 'Concluding Primary School with a focus on critical KPSEA national exam readiness and deep creative projects.',
    'teacherId', 't2',
    'subjects', json_array('English', 'Kiswahili', 'Mathematics', 'Integrated Science', 'Creative Arts and Social Studies'),
    'activities', json_array('Debate Tournaments', 'Mock KPSEA Exams', 'Drama Festivals', 'Charity Fundraisers')
  ), 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('classes', 'juniorschool', json_object(
    'id', 'juniorschool', 'name', 'Junior School', 'ageGroup', '12 - 14 Years (Grades 7-9)',
    'description', 'Fostering teenage academic independence, advanced laboratory sciences, computers, career orientation, and sports excellence.',
    'teacherId', 't3',
    'subjects', json_array('Pre-Technical Studies', 'Integrated Science', 'Social Studies', 'Business Studies', 'Computer Science'),
    'activities', json_array('Science Congress', 'Football Tournaments', 'Computer Programming', 'Life Skills Clubs')
  ), 1, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
