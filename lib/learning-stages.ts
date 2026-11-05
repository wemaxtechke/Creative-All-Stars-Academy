export const learningStages = [
  {
    id: 'playgroup', name: 'Playgroup', levels: 'A gentle beginning', classIds: ['playgroup'],
    description: 'A caring introduction to school, where play, conversation and everyday discoveries help children feel at home.',
    focus: ['Communication and early language', 'Making friends and sharing', 'Movement, creativity and independence'],
    approach: 'Young children build confidence through play and warm relationships. Early experiences support communication, social interaction and a growing sense of independence.',
  },
  {
    id: 'pre-primary', name: 'Pre-primary', levels: 'PP1 & PP2', classIds: ['pp1', 'pp2'],
    description: 'Space to be curious, find a voice and build the foundations for a confident move into primary school.',
    focus: ['Foundations in language and numeracy', 'Creative expression and discovery', 'Social development and readiness for primary'],
    approach: 'Play-based, age-appropriate learning connects language, early numeracy and creativity. PP1 and PP2 form one continuous foundation, with support matched to each learner’s development.',
  },
  {
    id: 'lower-primary', name: 'Lower Primary', levels: 'Grades 1–3', classIds: ['grade1', 'grade2', 'grade3'],
    description: 'Strong foundations in communication, numeracy and practical learning, with room for every child to grow.',
    focus: ['Reading, writing and confident communication', 'Numeracy and practical problem solving', 'Curiosity, collaboration and responsibility'],
    approach: 'The first years of primary school develop foundational knowledge, skills and values. Learner-centred experiences help children connect ideas, take part and develop independent learning habits.',
  },
  {
    id: 'upper-primary', name: 'Upper Primary', levels: 'Grades 4–6', classIds: ['grade4', 'grade5', 'grade6'],
    description: 'Deeper understanding, practical application and growing independence as learners prepare for their next stage.',
    focus: ['Applying knowledge through practical work', 'Analytical thinking and independent learning', 'Preparation for KPSEA and Junior School'],
    approach: 'Upper Primary brings greater depth to competency-based learning. Practical application, communication and collaboration support progress through Grades 4–6 and the transition to Junior School.',
  },
  {
    id: 'junior-school', name: 'Junior School', levels: 'Grade 7', classIds: ['juniorschool'],
    description: 'A new chapter in learning, with greater responsibility and opportunities to explore individual strengths.',
    focus: ['A confident transition from primary school', 'Practical skills and deeper understanding', 'Personal responsibility and learner agency'],
    approach: 'Junior School opened at Creative All Stars Academy in 2026 with Grade 7. It extends our competency-based pathway, helping learners develop their interests, skills and independence.',
  },
] as const;

export type LearningStage = (typeof learningStages)[number];

export function findLearningStage(id: string): LearningStage | undefined {
  return learningStages.find(stage => stage.id === id || (stage.classIds as readonly string[]).includes(id));
}

export const admissionGrades = [
  { id: 'playgroup', name: 'Playgroup' }, { id: 'pp1', name: 'PP1' }, { id: 'pp2', name: 'PP2' },
  ...Array.from({ length: 6 }, (_, i) => ({ id: `grade${i + 1}`, name: `Grade ${i + 1}` })),
  { id: 'juniorschool', name: 'Grade 7 — Junior School' },
];

export function admissionGradeFromQuery(value: string | null): string {
  return admissionGrades.find(grade => grade.id === value || grade.name === value)?.name ?? '';
}
