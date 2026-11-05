'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { learningStages } from '@/lib/learning-stages';
import { schoolStats } from '@/lib/verified-school-content';
import { getUpcomingEvents } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { EventCard } from '@/components/EventCard';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { HomeHeroSlider } from '@/components/HomeHeroSlider';
import { EventPopup } from '@/components/EventPopup';

export default function Home() {
  const { getSiteImage, siteImages, schoolEvents, galleryImages, testimonials, settings } = useApp();
  const learningImage = getSiteImage('home-learning');
  const now = useCurrentTime();
  const upcomingEvents = getUpcomingEvents(schoolEvents, now).slice(0, 2);
  const assignedMoments = siteImages.filter(item => item.id.startsWith('activity-')).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })).map(item => ({ id: item.id, url: item.url, alt: item.alt, title: item.alt, label: item.label }));
  const galleryMoments = [...galleryImages].filter(moment => moment.url.startsWith('/media/') || moment.url.startsWith('https://creativeallstarsacademy.sc.ke/media/')).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(item => ({ ...item, label: item.category }));
  const moments = [...assignedMoments, ...galleryMoments].filter((item, index, items) => items.findIndex(other => other.url === item.url) === index);
  return <div className="public-home">
    <EventPopup />
    <HomeHeroSlider />
    <section className="school-statistics" aria-label="Our school at a glance"><dl className="container-shell">{schoolStats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}{stat.suffix}</dd></div>)}</dl></section>
    <section className="container-shell section-space" aria-labelledby="home-learning-heading"><div className="section-heading-row"><div><p className="eyebrow">A continuous learning journey</p><h2 id="home-learning-heading" className="section-title">A place for every stage.</h2></div><p>Small beginnings, strong foundations and new horizons. Find the right next step for your child.</p></div><p className="mobile-stage-hint" id="home-stage-scroll-hint">Swipe to explore all five stages.</p><div className="learning-stage-grid home-learning-stage-grid" role="region" aria-label="Learning stages" aria-describedby="home-stage-scroll-hint" tabIndex={0}>{learningStages.map((stage, index) => <Link key={stage.id} href={`/classes/${stage.id}`} className="learning-stage-card"><span className="stage-number">0{index + 1}</span><p className="stage-levels">{stage.levels}</p><h3>{stage.name}</h3><p>{stage.description}</p><span className="stage-link">Explore {stage.name} </span></Link>)}</div></section>
    <section className="purpose-section"><div className="container-shell purpose-layout"><div><p className="eyebrow">More than the classroom</p><h2 className="editorial-title">An education for<br /><em>the whole child.</em></h2>{learningImage && <figure className="home-learning-photograph"><Image src={learningImage.url} alt={learningImage.alt} width={900} height={600} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full object-cover" />{learningImage.label && <figcaption>{learningImage.label}</figcaption>}</figure>}</div><div><p>Learning is about understanding the world and finding your place in it. Our competency-based approach brings together knowledge, practical skills and values, with space for each learner’s interests.</p><p>Through sport, music, drama, scouting and shared experiences, children discover the confidence to participate, create and lead.</p><Link href="/co-curricular" className="text-link">Discover life beyond lessons </Link></div></div></section>
    {moments.length > 0 && <section className="container-shell section-space"><div className="section-heading-row"><div><p className="eyebrow">{settings.galleryEyebrow}</p><h2 className="section-title">{settings.galleryTitle}</h2></div><p>{settings.galleryDescription}</p></div><div className="school-moments">{moments.map(moment => <figure key={moment.id}><div><Image src={moment.url} alt={moment.alt || moment.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div><figcaption>{moment.label && <span>{moment.label}</span>}{moment.title}</figcaption></figure>)}</div></section>}
    {testimonials.length > 0 && <section className="parent-stories"><div className="container-shell parent-stories-layout"><div><p className="eyebrow">In our community’s words</p><h2 className="section-title">Growing together.</h2></div><TestimonialsCarousel /></div></section>}
    {upcomingEvents.length > 0 && <section className="container-shell section-space"><div className="section-heading-row"><div><p className="eyebrow">School calendar</p><h2 className="section-title">Coming up at CASA.</h2></div><Link href="/events" className="text-link">All events </Link></div><div className="grid gap-6 md:grid-cols-2">{upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}</div></section>}
    <section className="container-shell section-space home-enquiry"><p className="eyebrow">Your next chapter starts here</p><h2 className="editorial-title">Let’s talk about<br /><em>your child’s next step.</em></h2><p>Ask about classes, admissions or the current fee structure.<br />Our team will guide you personally.</p><Link href="/admissions#enquiry" className="button button-primary">Start an enquiry</Link></section>
  </div>;
}
