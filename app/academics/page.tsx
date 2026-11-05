import Link from 'next/link';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';

const areas = [
  ['Mathematics', 'Numerical understanding, logical thinking and practical problem solving.'],
  ['English and Kiswahili', 'The confidence to listen, speak, read and write.'],
  ['Science and Technology', 'Curiosity, investigation and an understanding of the world around us.'],
  ['Social Studies', 'An understanding of community, citizenship, culture and the wider world.'],
  ['Religious Education', 'Values, character development and respect for others.'],
  ['Creative Arts', 'Imagination, expression, collaboration and an appreciation of the arts.'],
];

export default function Academics() {
  return <div className="public-page"><AboutSectionNav /><Breadcrumbs items={[{ name: 'Our approach' }]} /><section className="container-shell"><PageIntro eyebrow="Competency-based education" title="Learning that stays with them."><p>Knowledge matters. So do the confidence to ask questions, the skills to solve problems and the values to make thoughtful choices.</p></PageIntro>
    <div className="approach-intro"><h2 className="section-title">Understanding through experience.</h2><p>Our learner-centred approach brings academic, practical, creative and values-based learning together. Classroom observation, learner tasks and projects help teachers understand progress and guide each next step.</p></div>
    <div className="learning-areas">{areas.map(([name, description]) => <article key={name}><h2>{name}</h2><p>{description}</p></article>)}</div><p className="form-note">Learning areas and curriculum designs vary by level. The school can explain the current programme for your child’s class.</p>
    <div className="quiet-callout"><div><h2>From Playgroup to Junior School.</h2><p>Explore how the learning journey develops across our five stages.</p></div><Link className="button button-primary" href="/classes">Explore learning stages</Link></div>
  </section></div>;
}
