import type { FAQ } from '@/types';

export const schoolStats = [
  { value: 320, suffix: '+', label: 'Learners' },
  { value: 35, suffix: '', label: 'Teaching & support staff' },
  { value: 15, suffix: '', label: 'Learning spaces' },
  { value: 2017, suffix: '', label: 'Founded' },
];

export const schoolHistory = [
  {
    year: '2017',
    title: 'Our Preschool Beginning',
    description: 'Creative All Stars Academy opened as a preschool with 14 learners, three teachers and one driver.',
  },
  {
    year: '2020',
    title: 'Primary Education Introduced',
    description: 'The school introduced Grade 1, marking its expansion from preschool into primary education.',
  },
  {
    year: '2023',
    title: 'School Expansion',
    description: 'The academy expanded its school operations and introduced upper primary classes.',
  },
  {
    year: '2025',
    title: 'First KPSEA Cohort',
    description: 'The school presented its first KPSEA candidates, who recorded an excellent performance.',
  },
  {
    year: '2026',
    title: 'Junior School Introduced',
    description: 'Creative All Stars Academy opened its Junior School and welcomed its first Grade 7 learners.',
  },
];

export const coCurricularActivities = [
  {
    name: 'Guidance and Counselling',
    description: 'Age-appropriate guidance that supports learners’ wellbeing, responsible choices and personal development.',
  },
  {
    name: 'Swimming',
    description: 'Swimming activities help learners develop confidence, coordination, fitness and water awareness.',
  },
  {
    name: 'Journalism',
    description: 'Learners practise observation, interviewing, writing and clear communication through school stories.',
  },
  {
    name: 'Games and Sports',
    description: 'Team games and physical activities build fitness, discipline, cooperation and sportsmanship.',
  },
  {
    name: 'Drama and Music',
    description: 'Performance activities give learners opportunities to develop creativity, expression and stage confidence.',
  },
  {
    name: 'Debate',
    description: 'Debate strengthens research, listening, public speaking and respectful presentation of ideas.',
  },
  {
    name: 'Scouting',
    description: 'Scouting develops practical life skills, service, teamwork, responsibility and leadership.',
  },
  {
    name: 'Health Club',
    description: 'The Health Club promotes hygiene, healthy choices and learner-led wellbeing awareness.',
  },
  {
    name: 'Modelling and Dance Club',
    description: 'Learners build confidence, rhythm, coordination and creative expression through modelling and dance.',
  },
];

export const uniformSections = [
  {
    title: 'ECDE Uniform',
    items: [
      'White short-sleeved shirt',
      'Grey trousers',
      'Grey socks with white and blue stripes',
      'Navy-blue sweater with the school logo',
      'Blue-and-white checked dress',
      'White socks or white stockings',
      'Black shoes',
    ],
  },
  {
    title: 'Primary Uniform — Girls',
    items: [
      'Navy-blue tunic with a white border at the bottom',
      'White shirt',
      'Grey sweater with the school logo',
      'White socks',
      'Bow tie',
      'Black shoes',
    ],
  },
  {
    title: 'Primary Uniform — Boys',
    items: [
      'Navy-blue trousers',
      'White shirt',
      'Grey socks with white and blue stripes',
      'Grey sweater with the school logo',
      'Navy-blue tie',
      'Black shoes',
    ],
  },
  {
    title: 'Primary Tracksuit',
    items: [
      'Navy-blue tracksuit with white side stripes and the school logo',
      'White T-shirt with the school logo',
      'Sports shoes of your choice',
    ],
  },
  {
    title: 'Junior School Tracksuit',
    items: [
      'Navy-blue tracksuit with red side stripes',
      'Navy-blue V-neck jersey with red stripes around the neck',
      'Sports shoes of your choice',
    ],
  },
  {
    title: 'Junior School Uniform — Boys and Girls',
    items: [
      'Royal-blue trousers',
      'Royal-blue skirt',
      'Long-sleeved white shirt',
      'Grey socks with white and blue stripes',
      'Red sweater with the school logo',
      'Red blazer with blue stripes and the school logo',
      'Royal-blue tie with the school logo',
      'Black shoes',
    ],
  },
];

export const schoolFaqs: FAQ[] = [
  {
    id: 'f1',
    question: 'Where is Creative All Stars Academy located?',
    answer: 'The school is located in Ngata, Nakuru. Visit the Contact page for the current Google Maps location, telephone number and office hours.',
    category: 'General',
  },
  {
    id: 'f2',
    question: 'Which education approach does the school follow?',
    answer: 'Creative All Stars Academy follows Kenya’s competency-based education approach. Learning is learner-centred and supports the development of knowledge, skills, values and attitudes. The exact curriculum designs and learning areas depend on the learner’s level.',
    category: 'Academics',
  },
  {
    id: 'f3',
    question: 'How can I get the current school fees?',
    answer: 'Please contact the school for the current fee structure or download the latest administrator-uploaded fee document when it is available in the Parents Corner.',
    category: 'Fees',
  },
  {
    id: 'f4',
    question: 'How do I apply for admission?',
    answer: 'Complete the enquiry form on the Admissions page or contact the school. The admissions team will guide you through the required documents, learner interaction and class placement.',
    category: 'Admissions',
  },
  {
    id: 'f5',
    question: 'Where can I buy the school uniform?',
    answer: 'All Creative All Stars Academy uniforms are available at Woolshop. The complete uniform requirements for ECDE, Primary and Junior School are listed in the Parents Corner.',
    category: 'Parents',
  },
  {
    id: 'f6',
    question: 'Which co-curricular activities are offered?',
    answer: 'Activities include guidance and counselling, swimming, journalism, games and sports, drama and music, debate, scouting, Health Club, and Modelling and Dance Club. Contact the school for the current activity schedule.',
    category: 'Parents',
  },
];
