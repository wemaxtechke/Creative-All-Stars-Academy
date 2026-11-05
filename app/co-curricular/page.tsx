import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { PageIntro } from '@/components/PageIntro';
import { coCurricularActivities } from '@/lib/verified-school-content';

const groups = [
  { label: 'Wellbeing', title: 'Feeling good. Growing strong.', names: ['Guidance and Counselling', 'Health Club'] },
  { label: 'Expression', title: 'Every learner has a voice.', names: ['Journalism', 'Drama and Music', 'Debate'] },
  { label: 'Teamwork', title: 'Discover what we can do together.', names: ['Games and Sports', 'Scouting'] },
];

export default function CoCurricular() {
  return <div className="public-page"><AboutSectionNav /><Breadcrumbs items={[{ name: 'Activities' }]} /><section className="container-shell">
    <PageIntro eyebrow="Life beyond lessons" title="Find what sparks their interest."><p>Opportunities to express an idea, discover a talent and be part of something together. Our activities complement classroom learning and support the whole child.</p></PageIntro>
    <div className="activity-groups">{groups.map(group => <section key={group.label}><div><p className="eyebrow">{group.label}</p><h2 className="section-title">{group.title}</h2></div><div>{group.names.map(name => { const activity = coCurricularActivities.find(item => item.name === name)!; return <article key={name}><h3>{name}</h3><p>{activity.description}</p></article>; })}</div></section>)}</div>
    <div className="quiet-callout"><div><h2>A little curiosity goes a long way.</h2><p>Ask our team about this term’s schedules, available sessions and how your child can take part.</p></div><Link href="/contact?subject=Activities%20enquiry#contact-form" className="button button-primary">Ask about activities</Link></div>
  </section></div>;
}
