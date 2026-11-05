'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { PageIntro } from '@/components/PageIntro';
import { learningStages } from '@/lib/learning-stages';

export default function Classes() {
  return <div className="public-page">
    <AboutSectionNav /><Breadcrumbs items={[{ name: 'Learning stages' }]} />
    <section className="container-shell"><PageIntro eyebrow="From first steps to new horizons" title="One school. Five stages of growth."><p>A continuous journey from Playgroup to Grade 7. Explore the learning, people and possibilities at each stage.</p></PageIntro>
      <div className="stage-directory">{learningStages.map((stage, index) => <article key={stage.id}><span className="stage-number">0{index + 1}</span><div><p className="eyebrow">{stage.levels}</p><h2 className="section-title"><Link href={`/classes/${stage.id}`}>{stage.name}</Link></h2><p>{stage.description}</p></div><Link className="text-link" href={`/classes/${stage.id}`}>Explore {stage.name} </Link></article>)}</div>
      <div className="quiet-callout"><div><h2>Not sure where to start?</h2><p>Tell us your child’s age and previous learning experience. Our admissions team will guide you on suitable placement.</p></div><Link href="/admissions#enquiry" className="button button-primary">Ask about admission</Link></div>
    </section>
  </div>;
}
