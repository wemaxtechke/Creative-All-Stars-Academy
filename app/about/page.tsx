'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { TeacherCard } from '@/components/TeacherCard';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { schoolHistory, schoolStats } from '@/lib/verified-school-content';
import { uniqueTeachers } from '@/lib/public-content';

export default function About() {
  const { teachers, getSiteImage, settings } = useApp();
  const image = getSiteImage('about-mission-board');
  const teamImage = getSiteImage('about-leadership');
  const team = uniqueTeachers(teachers);
  return <div className="public-page"><AboutSectionNav /><Breadcrumbs items={[{ name: 'Our school' }]} /><section className="container-shell">
    <PageIntro eyebrow="Rooted in care. Growing with purpose." title="A small beginning. A shared ambition."><p>Creative All Stars Academy began in Ngata, Nakuru in 2017 with 14 learners, three teachers and one driver. Today, our community supports a continuous journey from Playgroup to Junior School.</p></PageIntro>
    <div className="about-values"><div><p className="eyebrow">Our mission</p><h2>Every learner’s potential.</h2><p>To provide holistic development and education that enables every learner to realise their full potential.</p></div><div><p className="eyebrow">Our vision</p><h2>Growth in every direction.</h2><p>To be an inclusive education centre that develops learners in all aspects of growth.</p></div><div><p className="eyebrow">Our motto</p><h2>{settings.tagline}</h2><p>A shared purpose that connects our learners, teachers and families.</p></div></div>
    {teamImage && <figure className="about-team-image"><Image src={teamImage.url} alt={teamImage.alt} width={1400} height={800} sizes="(min-width: 1280px) 1200px, 100vw" className="h-auto w-full object-cover" />{teamImage.label && <figcaption>{teamImage.label}</figcaption>}</figure>}
    {image && <div className="about-board"><Image src={image.url} alt={image.alt} width={1400} height={800} className="h-auto w-full object-contain" /></div>}
    <dl className="about-stats">{schoolStats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}{stat.suffix}</dd></div>)}</dl>
    <section className="section-space"><p className="eyebrow">Our story so far</p><h2 className="section-title">Growing with our learners.</h2><ol className="school-timeline">{schoolHistory.map(event => <li key={event.year}><span>{event.year}</span><div><h3>{event.title}</h3><p>{event.description}</p></div></li>)}</ol></section>
    {team.length > 0 && <section id="teachers" className="team-section"><div className="section-heading-row"><div><p className="eyebrow">People who make the difference</p><h2 className="section-title">Meet our teaching team.</h2></div><p>The people supporting our learners from their first school days to their next big step.</p></div><div className="teacher-grid">{team.map(teacher => <TeacherCard key={teacher.id} teacher={teacher} />)}</div></section>}
    <div className="quiet-callout"><div><h2>Get to know our learning journey.</h2><p>Five connected stages, with space for every learner to develop.</p></div><Link href="/classes" className="button button-primary">Explore learning</Link></div>
  </section></div>;
}
