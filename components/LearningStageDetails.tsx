'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { admissionGrades, findLearningStage, learningStages } from '@/lib/learning-stages';
import { uniqueTeachers, teacherIdentity } from '@/lib/public-content';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { PageIntro } from '@/components/PageIntro';

export function LearningStageDetails({ stageId }: { stageId: string }) {
  const { classes, teachers, getSiteImage } = useApp();
  const stage = findLearningStage(stageId)!;
  const profiles = uniqueTeachers(teachers);
  const image = stage.classIds.map(id => getSiteImage(`class-${id}`)).find(Boolean);
  const nextStage = learningStages[learningStages.findIndex(item => item.id === stage.id) + 1];
  return <div className="public-page"><AboutSectionNav /><Breadcrumbs items={[{ name: 'Learning stages', href: '/classes' }, { name: stage.name }]} />
    <section className="container-shell"><PageIntro eyebrow={stage.levels} title={stage.name}><p>{stage.description}</p></PageIntro>
      {image && stage.classIds.length === 1 && <div className="stage-cover"><Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 1200px, 100vw" className="object-cover" priority /></div>}
      <div className="stage-overview"><div><p className="eyebrow">Learning with purpose</p><h2 className="section-title">Growing at their own pace.</h2><p>{stage.approach}</p><p>Placement takes account of the learner’s age, previous learning and readiness. Our admissions team can discuss the right class for your child.</p></div><div className="learning-focus"><h2>What this stage develops</h2><ul>{stage.focus.map(item => <li key={item}>{item}</li>)}</ul><Link href="/academics" className="text-link">Our approach to learning </Link></div></div>
      <div className="stage-classes">{stage.classIds.map(id => {
        const selectedClass = classes.find(item => item.id === id);
        const grade = admissionGrades.find(item => item.id === id)!;
        const classImage = getSiteImage(`class-${id}`);
        const assigned = teachers.find(t => t.id === selectedClass?.teacherId);
        const leadTeacher = assigned && profiles.find(t => teacherIdentity(t.name) === teacherIdentity(assigned.name));
        return <article key={id} id={id} className="class-row"><div>{classImage && stage.classIds.length > 1 && <div className="class-row-image"><Image src={classImage.url} alt={classImage.alt} width={900} height={600} sizes="(min-width: 1024px) 65vw, 100vw" className="h-auto w-full object-cover" /></div>}<p className="eyebrow">Within {stage.name}</p><h2>{selectedClass?.name || grade.name}</h2>{selectedClass?.ageGroup && <p className="class-age-group">{selectedClass.ageGroup}</p>}<p>{selectedClass?.description || stage.description}</p>
          {selectedClass && selectedClass.subjects.length > 0 && <div className="class-content"><h3>Learning areas</h3><ul>{selectedClass.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul></div>}
          {selectedClass && selectedClass.activities.length > 0 && <div className="class-content"><h3>Classroom experiences</h3><ul>{selectedClass.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></div>}
          <Link href={`/admissions?class=${encodeURIComponent(id)}#enquiry`} className="text-link">Enquire about {grade.name} </Link>
        </div>{leadTeacher && <aside className="class-teacher">{leadTeacher.image && <Image src={leadTeacher.image} alt={leadTeacher.name} width={72} height={72} className="teacher-portrait" />}<span className="eyebrow">Your class teacher</span><h3>{leadTeacher.name}</h3><p>{leadTeacher.role}</p>{leadTeacher.bio && <p>{leadTeacher.bio}</p>}</aside>}</article>;
      })}</div>
      <div className="quiet-callout"><Link href="/classes" className="text-link">All learning stages</Link>{nextStage && <Link href={`/classes/${nextStage.id}`} className="text-link">Next: {nextStage.name} </Link>}</div>
    </section>
  </div>;
}
