'use client';

import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { FAQAccordion } from '@/components/FAQAccordion';
import { uniformSections } from '@/lib/verified-school-content';

export default function ParentsCorner() {
  const { downloads, faqs } = useApp();
  const orderedDownloads = [...downloads].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return <div className="public-page"><Breadcrumbs items={[{ name: 'For parents' }]} /><section className="container-shell">
    <PageIntro eyebrow="Our school, together" title="The everyday details, all in one place."><p>Uniform guidance, school documents and answers to common questions, to make the school day a little easier.</p></PageIntro>
    <nav className="parent-jump-links" aria-label="Parent resources"><a href="#uniform">Uniform guide</a><a href="#questions">Common questions</a>{orderedDownloads.length > 0 && <a href="#documents">School documents</a>}</nav>
    {orderedDownloads.length > 0 && <section id="documents" className="parent-resource-section"><p className="eyebrow">From the school office</p><h2 className="section-title">Documents & resources.</h2><div className="document-list">{orderedDownloads.map(item => <a key={item.id} href={item.url} target="_blank" rel="noreferrer"><div><span>{item.category}</span><h3>{item.title}</h3></div><span>Download {item.fileType} · {item.fileSize} </span></a>)}</div></section>}
    <section id="uniform" className="parent-resource-section"><p className="eyebrow">Ready for the school day</p><h2 className="section-title">The school uniform guide.</h2><p className="resource-copy">Choose your child’s school section below. All official uniforms are available from Woolshop; confirm sizing, stock and supplier directions with our school team.</p><div className="uniform-list">{uniformSections.map(section => <details key={section.title}><summary>{section.title}</summary><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></details>)}</div></section>
    <section id="questions" className="parent-resource-section"><p className="eyebrow">A little guidance</p><h2 className="section-title">Common questions.</h2><FAQAccordion items={faqs} /></section>
    <div className="quiet-callout"><div><h2>Need a little more information?</h2><p>For current fees, transport, meals, collection arrangements or learning support, our team can explain the details directly.</p></div><Link href="/contact#contact-form" className="button button-primary">Contact our team</Link></div>
  </section></div>;
}
