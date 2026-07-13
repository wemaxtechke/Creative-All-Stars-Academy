import {
  Student,
  Teacher,
  BlogPost,
  SchoolEvent,
  GalleryImage,
  Job,
  JobApplication,
  Testimonial,
  DownloadItem,
  FAQ,
  SchoolStats,
  Leadership,
  Subject,
  CoCurricularActivity,
  AdmissionApplication,
  ContactMessage,
  SchoolClass
} from '../types';

export const schoolStats: SchoolStats = {
  students: 820,
  teachers: 35,
  classrooms: 18,
  curriculum: '100% CBC Curriculum',
  founded: 2016
};

export const leadership: Leadership[] = [
  {
    id: 'l1',
    name: 'Mrs. Serah Wangari',
    role: 'School Director & Principal',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    bio: 'With over 20 years of experience in early childhood and primary education, Mrs. Wangari co-founded Creative All Stars Academy to deliver high-quality, creative-focused educational programs that empower every child to shine. She holds a Master’s Degree in Educational Leadership from Mount Kenya University.'
  },
  {
    id: 'l2',
    name: 'Mr. David Kiprop',
    role: 'Deputy Principal (Academics)',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    bio: 'Mr. Kiprop specializes in the implementation of the Competency-Based Curriculum (CBC) in Kenya. He leads academic scheduling, subject alignment, and teacher training programs, ensuring that our students acquire relevant 21st-century competencies.'
  },
  {
    id: 'l3',
    name: 'Ms. Beatrice Anyango',
    role: 'Head of Early Years Education',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    bio: 'Ms. Beatrice coordinates Playgroup, PP1, and PP2 classes, bringing warmth, creativity, and interactive play-based methodologies to help our youngest learner feel safe, welcomed, and eager to discover the world.'
  }
];

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'Mr. John Mwangi',
    role: 'Grade 3 Class Teacher & Mathematics Specialist',
    email: 'john.mwangi@creativeallstars.ac.ke',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    bio: 'John makes mathematics engaging using concrete objects and digital games under the CBC curriculum framework.',
    subjects: ['Mathematics', 'Science and Technology']
  },
  {
    id: 't2',
    name: 'Ms. Faith Chepkemoi',
    role: 'Grade 5 Class Teacher & Language Specialist',
    email: 'faith.chepkemoi@creativeallstars.ac.ke',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'Faith encourages creative writing, public speaking, and reading comprehension in both English and Kiswahili.',
    subjects: ['English Language', 'Kiswahili (Lugha)', 'Art & Craft']
  },
  {
    id: 't3',
    name: 'Mr. Emmanuel Mwaleso',
    role: 'ICT and Computer Science Teacher',
    email: 'emmanuel.mwaleso@creativeallstars.ac.ke',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Emmanuel introduces coding, digital safety, and basic computing tools to prepare students for the tech-driven global society.',
    subjects: ['Computer Club', 'Creative Arts (Music & Art)']
  },
  {
    id: 't4',
    name: 'Mrs. Janet Otieno',
    role: 'Grade 1 Class Teacher & Early Years Facilitator',
    email: 'janet.otieno@creativeallstars.ac.ke',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    bio: 'Janet specializes in early literacy development, phonics, and socialization skills, facilitating a seamless transition from PP2.',
    subjects: ['Literacy Activities', 'Mathematical Activities', 'Environmental Activities']
  },
  {
    id: 't5',
    name: 'Mr. Patrick Simiyu',
    role: 'Physical Health Education & Swimming Coach',
    email: 'patrick.simiyu@creativeallstars.ac.ke',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    bio: 'Coach Patrick is dedicated to physical fitness, teamwork, and coordinating co-curricular sports activities, including our championship soccer team.',
    subjects: ['Physical & Health Education', 'Swimming Co-curricular']
  }
];

export const subjects: Subject[] = [
  {
    id: 's1',
    name: 'Mathematics',
    code: 'MAT',
    description: 'Developing logical thinking, problem-solving, and numerical literacy through realistic challenges and visual aids.',
    learningOutcomes: ['Recognize and apply mathematical principles to daily situations', 'Utilize critical thinking for geometric and computational problems', 'Model and solve financial and algebraic equations']
  },
  {
    id: 's2',
    name: 'Language Activities (English & Kiswahili)',
    code: 'LNG',
    description: 'Honing communicative competencies, reading habits, grammar, composition, and public speaking in both national languages.',
    learningOutcomes: ['Listen and respond accurately to instructions and conversations', 'Read fluently and interpret literature texts effectively', 'Draft creative compositions, reports, and reflections']
  },
  {
    id: 's3',
    name: 'Science and Technology',
    code: 'SCI',
    description: 'Exploring environmental preservation, physical sciences, human anatomy, and introductory programming concepts.',
    learningOutcomes: ['Design and execute simple scientific experiments', 'Understand and apply ecological safety principles', 'Interact with digital devices and write basic scratch scripts']
  },
  {
    id: 's4',
    name: 'Social Studies & Religious Education',
    code: 'SSR',
    description: 'Instilling national values, historical awareness, geographical appreciation, and strong moral principles through PPI, CRE, or IRE.',
    learningOutcomes: ['Demonstrate knowledge of Kenyan heritage and governance', 'Incorporate moral and spiritual guidance in daily behavior', 'Appreciate regional and global cultures']
  },
  {
    id: 's5',
    name: 'Creative Arts (Music, Art & Craft)',
    code: 'CRT',
    description: 'Unlocking raw creativity and emotional intelligence via sculpture, sketching, musical performance, drama, and traditional songs.',
    learningOutcomes: ['Express emotions constructively through diverse physical media', 'Identify and perform scales, rhythm patterns, and instruments', 'Collaborate on theatrical and choreographic productions']
  }
];

export const schoolClasses: SchoolClass[] = [
  {
    id: 'playgroup',
    name: 'Playgroup',
    ageGroup: '2 - 3 Years',
    description: 'A warm, nurturing environment where kids develop language, fine motor skills, and social interaction through immersive sensory play.',
    teacherId: 't4',
    subjects: ['Sensory Activities', 'Language Play', 'Social Play', 'Creative Arts'],
    activities: ['Finger Painting', 'Sand and Water Play', 'Storytime Sessions', 'Outdoor Obstacle Course'],
    gallery: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pp1',
    name: 'Pre-Primary 1 (PP1)',
    ageGroup: '4 Years',
    description: 'Focusing on early literacy, math reasoning, creative expressions, and basic self-regulation through structured games and play.',
    teacherId: 't4',
    subjects: ['Mathematical Activities', 'Language Activities', 'Environmental Activities', 'Religious Activities'],
    activities: ['Letter Tracing', 'Counting Games', 'Nature Walks', 'Role Playing'],
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pp2',
    name: 'Pre-Primary 2 (PP2)',
    ageGroup: '5 Years',
    description: 'Bridging the transition to Primary School by solidifying core phonics, elementary calculations, science, and group activities.',
    teacherId: 't4',
    subjects: ['Pre-Writing Skills', 'Number Operations', 'Creative Activities', 'Social Skills'],
    activities: ['Spelling Bee Prep', 'Lego Engineering', 'Cultural Dance', 'Show and Tell'],
    gallery: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade1',
    name: 'Grade 1',
    ageGroup: '6 Years',
    description: 'Embracing the formal Competency-Based Curriculum (CBC) with specialized literacy, numeracy, environmental, and creative assignments.',
    teacherId: 't4',
    subjects: ['English Language', 'Kiswahili', 'Mathematics Activities', 'Environmental Studies', 'Creative Arts'],
    activities: ['Reading Club', 'Drawing and Craft', 'Basic Gymnastics', 'Gardening Projects'],
    gallery: [
      'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade2',
    name: 'Grade 2',
    ageGroup: '7 Years',
    description: 'Deepening comprehension, expanding vocabulary, working on double-digit operations, and investigating local communities.',
    teacherId: 't1',
    subjects: ['Language Skills', 'Mathematics', 'Environmental Activities', 'Movement Activities', 'Hygiene & Nutrition'],
    activities: ['Science Experiments', 'Word Games', 'Track Running', 'Baking Basics'],
    gallery: [
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade3',
    name: 'Grade 3',
    ageGroup: '8 Years',
    description: 'Nurturing self-guided problem solving and critical thinking, prepping for key diagnostic learning evaluations.',
    teacherId: 't1',
    subjects: ['English Activities', 'Kiswahili', 'Mathematics', 'Creative Arts', 'Indigenous Languages'],
    activities: ['Spelling Bee', 'Board Games', 'Intro to Recorder (Flute)', 'Environmental Cleaning'],
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade4',
    name: 'Grade 4',
    ageGroup: '9 Years',
    description: 'Upper Primary CBC introductory level with detailed concepts in Science & Technology, Agriculture, and Creative Arts.',
    teacherId: 't2',
    subjects: ['Mathematics', 'English', 'Kiswahili', 'Science and Technology', 'Agriculture', 'Home Science'],
    activities: ['Farming Projects', 'Model Sculpting', 'Scouts Camp', 'Coding Tutorials'],
    gallery: [
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade5',
    name: 'Grade 5',
    ageGroup: '10 Years',
    description: 'Expanding analytical skills with comprehensive digital literacy, ecological preservation studies, and national geography.',
    teacherId: 't2',
    subjects: ['Mathematics', 'Social Studies', 'Science & Technology', 'Music', 'French Language'],
    activities: ['Music Choir', 'Robotics Assembly', 'School Newspaper', 'Swimming Gala'],
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'grade6',
    name: 'Grade 6',
    ageGroup: '11 Years',
    description: 'Concluding Primary school with focus on critical KPSEA national exam readiness and deep creative projects.',
    teacherId: 't2',
    subjects: ['English', 'Kiswahili', 'Mathematics', 'Integrated Science', 'Creative Arts & Social Studies'],
    activities: ['Debate Tournaments', 'Mock KPSEA Exams', 'Drama Festivals', 'Charity Fundraisers'],
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'juniorschool',
    name: 'Junior School',
    ageGroup: '12 - 14 Years (Grades 7-9)',
    description: 'Fostering teenage academic independence, advanced laboratory sciences, computers, career orientation, and sports excellence.',
    teacherId: 't3',
    subjects: ['Pre-Technical Studies', 'Integrated Science', 'Social Studies', 'Business Studies', 'Computer Science'],
    activities: ['Science Congress', 'Football Tournaments', 'Computer Programming', 'Life Skills Clubs'],
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'
  }
];

export const coCurricularActivities: CoCurricularActivity[] = [
  {
    id: 'football',
    name: 'Football Club',
    description: 'Our stellar Academy Stars FC participates in regional Nakuru schools championships, training in teamwork, strategy, and agility.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
    schedule: 'Mondays & Wednesdays (3:30 PM - 5:00 PM)',
    instructor: 'Coach Patrick Simiyu'
  },
  {
    id: 'music',
    name: 'Music & Instrument Choir',
    description: 'From classical recorders to Kenyan keyboard tunes, students explore pitch, rhythm, vocal coaching, and public concert performance.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop',
    schedule: 'Tuesdays & Thursdays (3:30 PM - 4:45 PM)',
    instructor: 'Mr. Emmanuel Mwaleso'
  },
  {
    id: 'drama',
    name: 'Drama & Elocution',
    description: 'Empowering children to articulate their thoughts with confidence, performing outstanding plays at the annual National Drama Festivals.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
    schedule: 'Wednesdays (3:30 PM - 5:00 PM)',
    instructor: 'Ms. Beatrice Anyango'
  },
  {
    id: 'swimming',
    name: 'Swimming Association',
    description: 'Coached training sessions in our safe, custom-heated, medium-sized pool to teach foundational swimming techniques and lifesaver safety.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
    schedule: 'Fridays (2:00 PM - 4:00 PM)',
    instructor: 'Coach Patrick Simiyu'
  },
  {
    id: 'art',
    name: 'Creative Art & Craft Club',
    description: 'Exploring pottery, weaving, painting, and recycling creations. Encouraging eco-friendly innovations following CBC core criteria.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    schedule: 'Mondays (3:30 PM - 4:45 PM)',
    instructor: 'Ms. Faith Chepkemoi'
  },
  {
    id: 'computers',
    name: 'Computer & Coding Club',
    description: 'Practical exploration of game development, HTML/CSS, graphic modeling, and robotics elements using child-friendly interfaces.',
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ea29?q=80&w=600&auto=format&fit=crop',
    schedule: 'Tuesdays & Thursdays (3:30 PM - 5:00 PM)',
    instructor: 'Mr. Emmanuel Mwaleso'
  },
  {
    id: 'scouts',
    name: 'Scouts & Girl Guides Movement',
    description: 'Instilling survival mechanics, leadership skills, national patriotism, community relief outreach, and holiday camping.',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?q=80&w=600&auto=format&fit=crop',
    schedule: 'Fridays (3:15 PM - 4:45 PM)',
    instructor: 'Mr. John Mwangi'
  },
  {
    id: 'chess',
    name: 'Strategic Chess Club',
    description: 'Improving spatial capacity, patience, concentration, and predictive analysis. Ideal for analytical mental practice.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop',
    schedule: 'Thursdays (3:30 PM - 4:30 PM)',
    instructor: 'Mr. David Kiprop'
  },
  {
    id: 'trips',
    name: 'Outdoor Excursions & Field Trips',
    description: 'Termly excursions to national parks, historical archives, tech parks, and regional agricultural farms around Nakuru.',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=600&auto=format&fit=crop',
    schedule: 'Scheduled Termly (Saturdays)',
    instructor: 'School Management'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'How the CBC Curriculum Prepares Learners for Real-World Problem Solving',
    summary: 'Discover how Kenya’s Competency-Based Curriculum shifts the educational focus from rote memorization to skill mastery and creative solutions.',
    content: `
      <p>The transition from the traditional 8-4-4 education system to the Competency-Based Curriculum (CBC) marks one of the most progressive educational shifts in Kenyan history. For parents and teachers at <strong>Creative All Stars Academy</strong>, located in the heart of Nakuru, this shift is more than just a structural change—it is a cultural revolution in how children learn, think, and interact with the world.</p>

      <h3>The Heart of CBC: Skill Over Memorization</h3>
      <p>Under the old curriculum, students were largely assessed based on their ability to memorize formulas, dates, and spelling lists. CBC flips this script. It focuses on seven core competencies:</p>
      <ul>
        <li>Communication and Collaboration</li>
        <li>Critical Thinking and Problem Solving</li>
        <li>Imagination and Creativity</li>
        <li>Citizenship and Patriotism</li>
        <li>Learning to Learn</li>
        <li>Self-efficacy</li>
        <li>Digital Literacy</li>
      </ul>

      <h3>Practical Application in Action</h3>
      <p>Take, for instance, a recent Grade 4 Agriculture project at our campus. Instead of reading about plant lifecycle solely from textbooks, students planted seedlings in recycled plastic containers, monitored daily growth, calculated water metrics, and discussed ecological impact. They applied mathematics, environmental conservation, and manual craftsmanship in a single project. This hands-on, multi-disciplinary approach ensures that knowledge is not merely stored, but lived.</p>

      <h3>Preparing for the Future</h3>
      <p>The modern global economy values adaptable individuals who can think on their feet, code, collaborate, and design. At Creative All Stars Academy, we embrace the CBC with open arms, integrating high-tech tools like computer labs and creative activities like dramatic elocution. We are not just training children to pass exams; we are nurturing the future leaders, innovators, and thinkers of Nakuru and the world.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    category: 'Learning',
    date: '2025-05-10',
    author: 'Mrs. Serah Wangari',
    authorRole: 'School Director & Principal',
    readTime: '5 min read',
    popular: true
  },
  {
    id: 'b2',
    title: 'Unlocking Creative Genius: The Role of Music and Drama in Early Childhood',
    summary: 'Explore why performance arts are not just "extras" at Creative All Stars, but critical pillars for developing speech, self-assurance, and emotional control.',
    content: `
      <p>At many schools, music, theater, and drawing are categorized as co-curricular extras—activities children engage in only when "real work" is finished. At <strong>Creative All Stars Academy</strong>, we reject this distinction. We view the arts as central pillars of foundational mental growth and emotional intelligence.</p>

      <h3>Confidence and Public Voice</h3>
      <p>When a Pre-Primary 2 (PP2) student stands on a stage during our termly concerts, singing or acting, a profound psychological transformation occurs. They overcome the fear of public judgment, develop voice modulation skills, and learn that their contributions are valued. This self-assurance directly translates into classroom activities, making them more active participants in logical debates and question-and-answer periods.</p>

      <h3>Cognitive Benefits of Musical Practice</h3>
      <p>Neurological studies have consistently shown that learning to play an instrument, such as the recorder, keyboard, or percussion, creates dense neural networks in a child’s brain. Reading notes requires spatial awareness and fractional mathematical comprehension. Following a rhythmic tempo teaches concentration and temporal discipline. In other words, a child practicing a musical melody is simultaneously priming their brain for complex algebra and language syntax.</p>

      <h3>Nurturing Well-Rounded Stars</h3>
      <p>Our dedicated music room and vibrant drama clubs give students access to professional coaching. The results speak for themselves: our students are expressive, empathetic, and uniquely capable of dealing with academic stresses with a positive attitude. We are incredibly proud of our creative stars!</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    category: 'Arts',
    date: '2025-05-04',
    author: 'Ms. Beatrice Anyango',
    authorRole: 'Head of Early Years',
    readTime: '4 min read',
    popular: true
  },
  {
    id: 'b3',
    title: 'Integrating Technology in Primary Classrooms Safely and Productively',
    summary: 'An inside look at our modern Computer Club and how we balance digital skills with physical activity and internet safety guidelines.',
    content: `
      <p>Digital literacy is no longer an optional skill; it is as essential as basic reading and writing. However, the introduction of screens to young children is a topic that demands careful balance, safety guards, and productive pedagogical structures.</p>

      <h3>Interactive Learning Over Passive Consumption</h3>
      <p>At Creative All Stars Academy, we draw a clear line between passive digital consumption (scrolling through entertainment feeds) and active creation (coding, digital sculpting, and typing). In our custom ICT lab, students use tools like Scratch and educational logic games. They do not just interact with programs; they learn how programs are built, shifting their mindset from consumers to technological creators.</p>

      <h3>Strict Digital Safety and Protection</h3>
      <p>Our school network features advanced content filtering, ensuring that children only access verified, child-friendly learning environments. Additionally, our ICT curriculum teaches "cyber safety" from Grade 1, coaching children on password protection, avoiding digital scams, and reporting uncomfortable online interactions.</p>

      <h3>Physical and Outdoor Harmony</h3>
      <p>To prevent physical issues associated with prolonged screen time, screen sessions are capped and strictly paired with physical activities. For every hour spent in the computer lab, our students are guaranteed outdoor play, whether it is swimming, soccer, or a tour of our school gardens. This comprehensive approach keeps our tech-savvy students healthy, active, and fully balanced.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ea29?q=80&w=800&auto=format&fit=crop',
    category: 'Learning',
    date: '2025-04-28',
    author: 'Mr. Emmanuel Mwaleso',
    authorRole: 'ICT and Computer Science Teacher',
    readTime: '6 min read',
    popular: false
  },
  {
    id: 'b4',
    title: 'Nurturing Healthy Habits: Nutrition and Fitness Guidelines for Growing Kids',
    summary: 'Our school physical health coordinator shares essential nutritional guidelines and simple exercises parents can practice with their children at home.',
    content: `<p>A healthy mind resides in a healthy body. We detail practical tips for balanced African traditional diets, adequate hydration, and active exercises.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    category: 'Sports',
    date: '2025-04-15',
    author: 'Coach Patrick Simiyu',
    authorRole: 'PE Coordinator',
    readTime: '4 min read',
    popular: false
  },
  {
    id: 'b5',
    title: 'The Great Outdoors: Why Termly Field Trips Matter in the Learning Process',
    summary: 'From visits to Lord Egerton Castle to hiking the Menengai Crater, discover how we use Nakuru’s geographical beauty to reinforce classroom lessons.',
    content: `<p>Detailing our excursions to local reserves and historical sites to provide real-world learning contexts.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=800&auto=format&fit=crop',
    category: 'Trips',
    date: '2025-04-02',
    author: 'Mr. David Kiprop',
    authorRole: 'Deputy Principal',
    readTime: '5 min read',
    popular: false
  },
  {
    id: 'b6',
    title: 'Preparing for KPSEA: A Comprehensive Study Guide and Stress-Free Plan for Grade 6',
    summary: 'A roadmap for parents and Grade 6 candidates navigating the Kenya Primary School Education Assessment with calmness and confidence.',
    content: `<p>Essential preparation timetables, revision websites, wellness and nutritional advice for Grade 6 KPSEA candidates.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop',
    category: 'Learning',
    date: '2025-03-20',
    author: 'Mr. John Mwangi',
    authorRole: 'Grade 3 Teacher & Math Specialist',
    readTime: '7 min read',
    popular: true
  },
  {
    id: 'b7',
    title: 'Celebrating Heritage: Highlights from our Annual National Culture Day Festival',
    summary: 'See how our students represented different cultural heritages of Kenya through traditional regalia, poetry, dance, and authentic dishes.',
    content: `<p>A colorful review of our Cultural Day, emphasizing patriotism, unity, and multi-cultural appreciation.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
    category: 'School Events',
    date: '2025-03-05',
    author: 'Mrs. Serah Wangari',
    authorRole: 'School Director & Principal',
    readTime: '3 min read',
    popular: false
  },
  {
    id: 'b8',
    title: 'The Importance of Parental Involvement in Competency-Based Assignments',
    summary: 'Under CBC, parents are partners in learning. Here are 5 practical ways to assist your child without doing the work for them.',
    content: `<p>Actionable advice on setting up reading stations, supervising eco-projects, and using the parents portal effectively.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    category: 'Campus',
    date: '2025-02-18',
    author: 'Mr. David Kiprop',
    authorRole: 'Deputy Principal',
    readTime: '5 min read',
    popular: false
  },
  {
    id: 'b9',
    title: 'Outstanding Win: Academy Stars Soccer Team Clinches Nakuru County Trophy',
    summary: 'Relive the thrilling finals match where our under-11 football stars triumphed with a stunning 2-1 victory, bringing the cup home.',
    content: `<p>Highlights from the local championships, individual player features, and photos of our celebrations.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    category: 'Sports',
    date: '2025-02-01',
    author: 'Coach Patrick Simiyu',
    authorRole: 'PE Coordinator',
    readTime: '4 min read',
    popular: false
  },
  {
    id: 'b10',
    title: 'Welcome Back to School: What’s New in the 2025 Academic Calendar year',
    summary: 'An introductory note detailing the newly upgraded heated swimming pool, advanced computer tablets, and key dynamic study modules.',
    content: `<p>Updates on campus improvements, teaching additions, and security enhancements for the new school year.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop',
    category: 'Campus',
    date: '2025-01-05',
    author: 'Mrs. Serah Wangari',
    authorRole: 'School Director & Principal',
    readTime: '3 min read',
    popular: false
  },
  {
    id: 'b11',
    title: 'The Psychological Science of Play: How Playgroup Builds Future Genius',
    summary: 'A deep scientific look at why playgroup programs are critical for visual motor coordination, early linguistic skills, and social development.',
    content: `<p>Exploring child development theories, motor skills growth, sensory classrooms, and playgroup curriculums.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
    category: 'Learning',
    date: '2024-12-12',
    author: 'Ms. Beatrice Anyango',
    authorRole: 'Head of Early Years',
    readTime: '6 min read',
    popular: false
  },
  {
    id: 'b12',
    title: 'Creative All Stars Academy Graduates Class of 2024 in Spectacular Ceremony',
    summary: 'Relive the joy and emotional moments as our top PP2 and Grade 6 performers transitioned to their next academic milestones.',
    content: `<p>A beautiful look back at our graduation ceremony, highlighting student speeches, trophies, and future hopes.</p>`,
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    category: 'Graduation',
    date: '2024-11-28',
    author: 'Mrs. Serah Wangari',
    authorRole: 'School Director & Principal',
    readTime: '5 min read',
    popular: true
  }
];

export const schoolEvents: SchoolEvent[] = [
  {
    id: 'e1',
    title: 'Term 2 Annual Athletic Sports Day',
    description: 'A thrilling day of track and field events, tug-of-war, and parent-teacher relay races at the Nakuru Athletics Club.',
    date: '2025-06-12',
    time: '08:00 AM - 04:00 PM',
    location: 'Nakuru Athletics Club, Nakuru',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'e2',
    title: 'Annual Creative Music & Drama Gala',
    description: 'Students perform their award-winning choral verses, modern plays, and musical instruments for parents and guests.',
    date: '2025-07-18',
    time: '02:00 PM - 05:30 PM',
    location: 'Main School Auditorium',
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'e3',
    title: 'Parents Academic Consultation & CBC Exhibition',
    description: 'One-on-one sessions with teachers to discuss students performance portfolios and view outstanding student-made crafts.',
    date: '2025-08-01',
    time: '09:00 AM - 03:00 PM',
    location: 'Classroom Blocks',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'e4',
    title: 'Junior School Science & Innovation Fair',
    description: 'Our junior school pupils present creative projects in coding, solar setups, robotic arms, and environmental recycling concepts.',
    date: '2025-09-15',
    time: '10:00 AM - 04:00 PM',
    location: 'School Science Labs',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'e5',
    title: 'Grade 5 & 6 Educational Excursion to Naivasha',
    description: 'A study tour covering geothermal setups, freshwater lake ecosystems, and bird watching around Lake Naivasha.',
    date: '2025-10-10',
    time: '07:00 AM - 06:00 PM',
    location: 'Naivasha (Departure from School)',
    category: 'Trip',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=600&auto=format&fit=crop'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop',
    title: 'Creative playgroup painting class',
    category: 'Learning',
    date: '2025-04-10'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
    title: 'Under-11 soccer team finals',
    category: 'Sports',
    date: '2025-02-01'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
    title: 'Grade 6 graduation caps ceremony',
    category: 'Graduation',
    date: '2024-11-28'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=600&auto=format&fit=crop',
    title: 'Hiking Naivasha craters field trip',
    category: 'Trips',
    date: '2024-10-14'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop',
    title: 'Violin and piano rehearsal',
    category: 'School Events',
    date: '2025-03-05'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop',
    title: 'Modern and safe playground block',
    category: 'Campus',
    date: '2025-01-10'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    title: 'Preschool interactive smart board session',
    category: 'Learning',
    date: '2025-03-12'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
    title: 'Swimming pool lessons',
    category: 'Sports',
    date: '2025-04-18'
  },
  {
    id: 'g9',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
    title: 'Annual culture day national dances',
    category: 'School Events',
    date: '2025-03-05'
  }
];

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'CBC Teacher (Primary School)',
    department: 'Primary School Academics',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Implement CBC classroom activities and student assessments.',
      'Maintain digital records of children’s progress portfolios.',
      'Incorporate experiential learning, critical thinking, and artistic integrations in lesson structures.',
      'Organize parent-teacher feedback consultations termly.'
    ],
    requirements: [
      'Diploma or Bachelor’s Degree in Early Childhood or Primary Education.',
      'Registered with the Teachers Service Commission (TSC).',
      'Strong practical understanding of Competency-Based Assessment (CBA) frameworks.',
      'Proficient in using computer tablets, educational apps, and interactive screens.'
    ],
    deadline: '2025-08-15'
  },
  {
    id: 'j2',
    title: 'Mathematics Teacher (Junior School)',
    department: 'Junior School Academics',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Prepare comprehensive lesson plans for Grades 7 and 8 mathematics.',
      'Train students in analytical calculations, spatial geometry, and introductory statistics.',
      'Facilitate math logic clubs and prepare candidates for regional competitions.',
      'Integrate math concepts with digital tools and computer programming loops.'
    ],
    requirements: [
      'Bachelor’s Degree in Education (Mathematics/Science combination).',
      'Registered with the TSC.',
      'Minimum of 2 years experience teaching mathematics in senior primary or junior secondary blocks.',
      'Patient, creative, and skilled in utilizing concrete models.'
    ],
    deadline: '2025-08-20'
  },
  {
    id: 'j3',
    title: 'English Teacher (Junior School)',
    department: 'Junior School Academics',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Instruct junior school students in grammar, literature reviews, creative writing, and phonetics.',
      'Coordinate the school journalism club and termly newsletter editor activities.',
      'Coach students in debating tournaments and dramatic reading.',
      'Evaluate essays and continuous assessment tests strictly under TSC regulations.'
    ],
    requirements: [
      'Bachelor’s Degree in Education (English & Literature combination).',
      'TSC registered.',
      'Excellent verbal and written communication in English.',
      'Passion for literature and mentoring youth leaders.'
    ],
    deadline: '2025-08-22'
  },
  {
    id: 'j4',
    title: 'ICT & Creative Computing Teacher',
    department: 'Information Technology',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Teach basic programming (Scratch/HTML/CSS), computer usage, and cyber safety to Grades 1 to 8.',
      'Maintain security configurations in the computer lab and assist teachers with technical setups.',
      'Run the co-curricular Coding & Robotics Club.',
      'Conduct basic digital literacy training sessions for staff members.'
    ],
    requirements: [
      'Degree in Computer Science, ICT, or Education with ICT specialization.',
      'Proficiency in Scratch, Python, Google Workspace, and network troubleshooting.',
      'Energetic, child-friendly teaching approach.'
    ],
    deadline: '2025-08-25'
  },
  {
    id: 'j5',
    title: 'Registered School Nurse',
    department: 'Student Welfare & Health',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Provide immediate first aid and medical care to students and staff.',
      'Manage the school sanatorium, maintain health records, and administer prescribed medicines.',
      'Conduct regular health, hygiene, and wellness seminars for students.',
      'Coordinate emergency responses and partner with local Nakuru hospitals.'
    ],
    requirements: [
      'Diploma/Degree in Community Health Nursing (KRCHN).',
      'Registered with the Nursing Council of Kenya with a valid practice license.',
      'At least 3 years experience in a school environment or busy pediatric clinic.',
      'Empathetic, calm under pressure, and highly structured.'
    ],
    deadline: '2025-08-30'
  },
  {
    id: 'j6',
    title: 'School Bus Driver',
    department: 'Operations & Logistics',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Safely transport students along designated morning and evening routes around Nakuru.',
      'Perform daily pre-trip vehicle checks and maintain strict cleanliness in the bus.',
      'Adhere to school transport regulations, speed caps, and road safety laws.',
      'Maintain polite communication with parents during pick-ups and drops.'
    ],
    requirements: [
      'Valid driving license (Class D-Heavy Commercial/Passenger Bus endorsement).',
      'Valid PSV badge and Certificate of Good Conduct.',
      'Clean driving record of at least 5 years.',
      'Patient and extremely safety-focused.'
    ],
    deadline: '2025-08-10'
  },
  {
    id: 'j7',
    title: 'School Cook & Caterer',
    department: 'Catering & Dining',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Prepare nutritious, delicious breakfasts, snacks, and lunches for students and staff.',
      'Maintain impeccable cleanliness and sanitization in the school kitchen and pantry.',
      'Plan menus focusing on child nutritional guidelines and dietary allergies.',
      'Assist in unloading food supplies and managing inventories.'
    ],
    requirements: [
      'Certificate/Diploma in Food Production, Culinary Arts, or Catering.',
      'Valid public health food handling certificate.',
      'Experience cooking large-scale meals in a school, college, or hotel.',
      'Punctual, cooperative, and hygienic.'
    ],
    deadline: '2025-08-10'
  },
  {
    id: 'j8',
    title: 'School Accountant',
    department: 'Finance & Administration',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Process school fee receipts, issue balances, and coordinate with bank channels.',
      'Manage payroll, statutory filings (KRA, NSSF, NHIF), and vendor invoices.',
      'Draft monthly and terminal financial reports for school directors.',
      'Maintain secure, audited accounting records on accounting software.'
    ],
    requirements: [
      'Degree in Commerce (Accounting/Finance) or equivalent.',
      'Certified Public Accountant (CPA-K qualification).',
      'Proficiency in QuickBooks, Tally, or similar ERP software.',
      'Absolute integrity and excellent analytical skills.'
    ],
    deadline: '2025-08-20'
  },
  {
    id: 'j9',
    title: 'Support Cleanliness Operator (Cleaner)',
    department: 'Maintenance & Sanitation',
    type: 'Full-time',
    location: 'Nakuru, Kenya',
    responsibilities: [
      'Clean and sanitize classrooms, restrooms, corridors, and administrative offices.',
      'Ensure trash bins are emptied hourly and eco-waste sorting guidelines are followed.',
      'Assist in setting up chairs and decorations for assemblies and events.',
      'Report any broken items, water leaks, or safety hazards immediately.'
    ],
    requirements: [
      'Kenya Certificate of Secondary Education (KCSE).',
      'Previous experience cleaning institutions, hotels, or corporate offices.',
      'Polite, hardworking, and able to work with minimum supervision.'
    ],
    deadline: '2025-08-10'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'te1',
    name: 'Wanjiku Kamau',
    role: 'Parent',
    content: 'Creative All Stars Academy has completely transformed my son’s outlook on learning. His confidence has rocketed because of the drama and coding clubs. Under the CBC curriculum, he actually loves doing his practical agriculture assignments!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'te2',
    name: 'Dr. Kiprotich Langat',
    role: 'Parent',
    content: 'We moved our two daughters to this academy three years ago, and the academic progress combined with swimming training has been phenomenal. The teachers are incredibly professional, and they keep us fully involved in school activities.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'te3',
    name: 'Joy Wambui',
    role: 'Alumni',
    content: 'As a graduate of Creative All Stars, I am currently doing incredibly well in high school. The leadership skills, programming lessons, and music choir training I got here set me years ahead of my peers. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

export const downloads: DownloadItem[] = [
  {
    id: 'd1',
    title: 'Comprehensive 2025 Fee Structure (All Grades)',
    category: 'Admission',
    fileSize: '420 KB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd2',
    title: 'Student Admission & Bio-Data Registration Form',
    category: 'Admission',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd3',
    title: 'Official Term 2 School Calendar and Events planner',
    category: 'Calendar',
    fileSize: '280 KB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd4',
    title: 'Holiday Assignment - Grade 3 (All Subjects Activities)',
    category: 'Assignment',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd5',
    title: 'Holiday Assignment - Grade 5 (Science & Social Projects)',
    category: 'Assignment',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd6',
    title: 'School Rules, Dress Codes & Code of Conduct Guidebook',
    category: 'Policy',
    fileSize: '510 KB',
    fileType: 'PDF',
    url: '#'
  },
  {
    id: 'd7',
    title: 'Official Uniform Purchase, Styling, and Brand Guidelines',
    category: 'Uniform',
    fileSize: '890 KB',
    fileType: 'PDF',
    url: '#'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'Where exactly in Nakuru is the academy located?',
    answer: 'We are located in a clean, quiet, and highly secure environment in Milimani, Nakuru, Kenya, just a few minutes drive from the Nakuru City Center. Our location is ideal for child learning, away from noise and congestion.',
    category: 'General'
  },
  {
    id: 'f2',
    question: 'Does the school offer transportation for students?',
    answer: 'Yes. We operate a fleet of modern, highly maintained school buses driven by qualified, vetted drivers. Our bus routes cover Milimani, Section 58, Kiamunyi, Lanet, Naka, Shabaab, and surrounding Nakuru suburbs.',
    category: 'General'
  },
  {
    id: 'f3',
    question: 'How does the school implement the CBC Curriculum?',
    answer: 'We are a fully compliant, pioneer CBC school. We focus on continuous learner-centered assessment, digital literacy (using computer labs), creative arts (music, crafts, drama), and experiential learning through gardening, field trips, and science models.',
    category: 'Academics'
  },
  {
    id: 'f4',
    question: 'What are the school fees for Pre-Primary vs Primary grades?',
    answer: 'Our school fees are highly competitive and offer incredible value for the high-end facilities provided. Early Childhood (Playgroup, PP1, PP2) ranges between KES 25,000 and 32,000 per term, while Primary and Junior School ranges between KES 35,000 and 45,000 per term. Please download our official Fee Structure PDF for specific breakdowns.',
    category: 'Fees'
  },
  {
    id: 'f5',
    question: 'How do I apply for admission for my child?',
    answer: 'Admissions are open throughout the year. You can start by filling the admission form on our Admissions page, or visit our Milimani campus for a guided tour and interview. Children are assessed to determine proper placement.',
    category: 'Admissions'
  },
  {
    id: 'f6',
    question: 'What co-curricular clubs are active at the school?',
    answer: 'We offer a wide variety of activities, including Football Club (Academy Stars FC), Heated Swimming, Music & Choir, Drama & Elocution, Computer Coding Club, Scouts & Girl Guides, Strategic Chess, and termly Educational Trips.',
    category: 'Parents'
  }
];

export const mockStudents: Student[] = [
  { id: 'st1', name: 'Alvin Kamau', classId: 'grade3', admissionNo: 'CASA/2022/104', parentName: 'Wanjiku Kamau', parentPhone: '+254 712 345 678', status: 'Active' },
  { id: 'st2', name: 'Mercy Langat', classId: 'grade5', admissionNo: 'CASA/2021/309', parentName: 'Kiprotich Langat', parentPhone: '+254 722 987 654', status: 'Active' },
  { id: 'st3', name: 'Liam Mwangi', classId: 'pp2', admissionNo: 'CASA/2024/012', parentName: 'Grace Mwangi', parentPhone: '+254 733 445 566', status: 'Active' },
  { id: 'st4', name: 'Zuri Anyango', classId: 'playgroup', admissionNo: 'CASA/2025/002', parentName: 'Mark Anyango', parentPhone: '+254 701 112 233', status: 'Active' },
  { id: 'st5', name: 'Ethan Kiprop', classId: 'juniorschool', admissionNo: 'CASA/2020/215', parentName: 'David Kiprop', parentPhone: '+254 711 223 344', status: 'Active' }
];

export const initialAdmissions: AdmissionApplication[] = [
  {
    id: 'app1',
    studentName: 'Shadrack Kipkoech',
    dateOfBirth: '2020-04-12',
    gender: 'Male',
    gradeApplied: 'PP2',
    parentName: 'Mercy Chepkorir',
    parentEmail: 'mercy.chep@gmail.com',
    parentPhone: '+254 705 123 456',
    address: 'Kiamunyi, Nakuru',
    status: 'Pending',
    dateSubmitted: '2025-05-12'
  },
  {
    id: 'app2',
    studentName: 'Clara Muthoni',
    dateOfBirth: '2016-08-25',
    gender: 'Female',
    gradeApplied: 'Grade 3',
    parentName: 'George Kamau',
    parentEmail: 'gkamau@yahoo.com',
    parentPhone: '+254 721 456 789',
    address: 'Milimani, Nakuru',
    status: 'Approved',
    dateSubmitted: '2025-05-10'
  },
  {
    id: 'app3',
    studentName: 'Faraj Omar',
    dateOfBirth: '2013-11-02',
    gender: 'Male',
    gradeApplied: 'Junior School',
    parentName: 'Omar Hussein',
    parentEmail: 'ohussein@gmail.com',
    parentPhone: '+254 733 998 877',
    address: 'Shabaab, Nakuru',
    status: 'Pending',
    dateSubmitted: '2025-05-14'
  }
];

export const initialJobApplications: JobApplication[] = [
  {
    id: 'ja1',
    jobId: 'j1',
    jobTitle: 'CBC Teacher (Primary School)',
    applicantName: 'Sarah Wambui',
    email: 'sarah.wambui@yahoo.com',
    phone: '+254 712 111 222',
    resumeUrl: '#',
    status: 'Pending',
    dateApplied: '2025-05-09'
  },
  {
    id: 'ja2',
    jobId: 'j4',
    jobTitle: 'ICT & Creative Computing Teacher',
    applicantName: 'Dennis Kipkemboi',
    email: 'dennis.kip@outlook.com',
    phone: '+254 722 333 444',
    resumeUrl: '#',
    status: 'Shortlisted',
    dateApplied: '2025-05-05'
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Josephine Njoroge',
    email: 'jnjoroge@gmail.com',
    phone: '+254 700 000 111',
    subject: 'School bus transport routes section 58',
    message: 'Hello, I want to enroll my child in PP1 but I reside in Section 58. Does your school bus pick up kids from that side of Nakuru in the morning? What are the charges?',
    status: 'Unread',
    dateSubmitted: '2025-05-14'
  },
  {
    id: 'm2',
    name: 'Wilson Koskei',
    email: 'wkoskei@gmail.com',
    phone: '+254 711 555 666',
    subject: 'Inquiry on heated pool training fees',
    message: 'Hello academy, is swimming lessons fee included in the main school tuition fees or is it paid separately as an extracurricular club charge? Thank you.',
    status: 'Read',
    dateSubmitted: '2025-05-12'
  }
];
