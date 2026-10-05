'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Check, MapPin, Phone } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { EventCard } from '@/components/EventCard';
import { EventPopup } from '@/components/EventPopup';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { HomeActivityGallery, HomeHeroSlider } from '@/components/ActivityShowcase';
import { getUpcomingEvents } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { schoolStats } from '@/lib/verified-school-content';

const learningStages = [
  { title: 'Early years', description: 'Play, curiosity and a caring start to school life.', compactDescription: 'Play, curiosity and a caring start.' },
  { title: 'Primary school', description: 'Build strong foundations through practical, purposeful learning.', compactDescription: 'Strong foundations through practical learning.' },
  { title: 'Junior school', description: 'Discover interests, develop skills and grow in independence.', compactDescription: 'Discover skills and new interests.' },
];
const learningHighlights = [
  'Practical, competency-based learning',
  'Creativity, sport and discovery',
  'Every learner’s progress celebrated',
  'Close partnership with families',
];
const headingClass = 'brand-title mt-3 text-3xl font-extrabold leading-[1.15] text-[#031f66] sm:text-4xl lg:text-[2.75rem]';
const textLinkClass = 'inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0739a6] transition hover:text-[#d50b12]';
const compactStatLabels: Record<string, string> = {
  'Teaching & support staff': 'Staff',
  'Learning spaces': 'Spaces',
};

export default function Home() {
  const { schoolEvents, settings, testimonials, getSiteImage } = useApp();
  const learningImage = getSiteImage('home-learning');
  const now = useCurrentTime();
  const upcomingEvents = getUpcomingEvents(schoolEvents, now).slice(0, 2);

  return (
    <div className="bg-white">
      <EventPopup />
      <HomeHeroSlider />
      <section aria-label="Our school at a glance" className="border-b border-slate-200/80 bg-white">
        <dl className="container-shell grid grid-cols-4 py-4 sm:py-8">
          {schoolStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 border-l border-slate-200 px-1 text-center first:border-0 sm:px-6 sm:text-left">
              <dt className="order-last text-[10px] leading-4 text-slate-500 sm:text-sm sm:leading-5">
                <span aria-hidden="true" className="sm:hidden">{compactStatLabels[stat.label] ?? stat.label}</span>
                <span className="sr-only sm:not-sr-only">{stat.label}</span>
              </dt>
              <dd className="brand-title text-xl font-extrabold tabular-nums text-[#031f66] sm:text-3xl">{stat.value}{stat.suffix}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="pathways-heading" className="container-shell py-12 lg:py-20">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end sm:gap-8">
          <div className="max-w-xl">
            <p className="eyebrow">Growing together</p>
            <h2 id="pathways-heading" className={headingClass}>A place for every stage.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">From the first day of school to the next big step, there’s room to learn, explore and become.</p>
          </div>
          <Link href="/classes" className={`${textLinkClass} shrink-0`}>Explore our classes <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-5">
          {learningStages.map(({ title, description, compactDescription }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white px-2 py-3 sm:rounded-2xl sm:p-6">
              <h3 className="brand-title min-h-10 text-[13px] font-extrabold leading-5 text-[#031f66] sm:min-h-0 sm:text-xl sm:leading-7">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                <span className="sm:hidden">{compactDescription}</span>
                <span className="hidden sm:inline">{description}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="learning-heading" className="bg-[#f4f7fb] py-12 lg:py-20">
        <div className="container-shell">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="eyebrow">The CASA experience</p>
              <h2 id="learning-heading" className={headingClass}>Big possibilities.<br />Everyday discoveries.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">An inclusive education centre in Nakuru, nurturing confident, creative learners through holistic competency-based education.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {learningHighlights.map((text) => <li key={text} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#0739a6]" />{text}</li>)}
              </ul>
              <Link href="/academics" className={`${textLinkClass} mt-5`}>Our approach to learning <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            {learningImage ? (
              <Link href="/gallery" className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200">
                <Image src={learningImage.url} alt={learningImage.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 text-sm font-bold text-white">A glimpse of life at CASA <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" /></span>
              </Link>
            ) : (
              <div className="rounded-3xl bg-[#031f66] p-6 text-white sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffc400]">Beyond the classroom</p>
                <h3 className="brand-title mt-4 text-2xl font-extrabold sm:text-3xl">Room to discover what you love.</h3>
                <p className="mt-4 text-sm leading-7 text-blue-100">Music, swimming, sport and digital discovery help learners build skills and confidence beyond their lessons.</p>
                <Link href="/co-curricular" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#ffc400] hover:text-white">Explore clubs & activities <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
          <div className="mt-9 grid gap-6 border-t border-slate-200 pt-7 sm:mt-12 sm:grid-cols-2 lg:grid-cols-[.7fr_1fr_1fr] lg:gap-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="eyebrow">Our purpose</p>
              <h3 className="brand-title mt-2 text-xl font-extrabold text-[#031f66]">Endeavour to Succeed.</h3>
              <Link href="/about" className={`${textLinkClass} mt-1`}>Our story & values <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            <div><h3 className="text-sm font-bold text-[#031f66]">Our mission</h3><p className="mt-2 text-sm leading-6 text-slate-600">To provide holistic development and education that helps every learner realise their full potential.</p></div>
            <div><h3 className="text-sm font-bold text-[#031f66]">Our vision</h3><p className="mt-2 text-sm leading-6 text-slate-600">To be an inclusive education centre that develops learners in every aspect of growth.</p></div>
          </div>
        </div>
      </section>

      <HomeActivityGallery />

      <section aria-labelledby="community-heading" className="container-shell py-12 lg:py-20">
        <div className={`grid gap-10 ${testimonials.length > 0 ? 'lg:grid-cols-2 lg:gap-12' : ''}`}>
          <div>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div><p className="eyebrow">Our school community</p><h2 id="community-heading" className={headingClass}>Coming up at CASA.</h2></div>
              <Link href="/events" className={textLinkClass}>All events <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className={`mt-6 grid gap-4 ${testimonials.length === 0 ? 'lg:grid-cols-2' : ''}`}>
                {upcomingEvents.map(event => <EventCard key={event.id} event={event} compact />)}
              </div>
            ) : (
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <CalendarDays aria-hidden="true" className="h-6 w-6 shrink-0 text-[#0739a6]" />
                <div><h3 className="text-sm font-bold text-[#031f66]">More school moments to come</h3><p className="mt-1 text-sm leading-6 text-slate-600">New events will appear here when announced. In the meantime, explore resources for your family.</p><Link href="/parents-corner" className={`${textLinkClass} mt-2`}>Visit parents corner <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
              </div>
            )}
          </div>
          {testimonials.length > 0 && <div><p className="eyebrow">In their words</p><h2 className={`${headingClass} mb-6`}>From our families.</h2><TestimonialsCarousel /></div>}
        </div>
      </section>

      <section aria-labelledby="visit-heading" className="container-shell pb-12 lg:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#031f66] p-6 text-white sm:p-10 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[50px] border-white/[.04]" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffc400]">Your next step</p><h2 id="visit-heading" className="brand-title mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Come and meet your school.</h2><p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">Meet our team, explore the learning spaces and ask the questions that matter to your family.</p></div>
            <div className="flex flex-wrap gap-3 lg:flex-col">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ffc400] px-5 py-3 text-sm font-bold text-[#031f66] transition hover:bg-[#ffe588]"><MapPin aria-hidden="true" className="h-4 w-4" />Book a school visit</Link>
              <a href={`tel:${settings.phone}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"><Phone aria-hidden="true" className="h-4 w-4" />Talk to admissions</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
