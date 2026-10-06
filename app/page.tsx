'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Eye, Flag, MapPin, Phone, PlayCircle, Rocket } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { EventCard } from '@/components/EventCard';
import { EventPopup } from '@/components/EventPopup';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { ActivityMarquee, HomeHeroSlider } from '@/components/ActivityShowcase';
import { getUpcomingEvents } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { schoolStats } from '@/lib/verified-school-content';

const learningStages = [
  { title: 'Early years', description: 'Play, curiosity and a caring start to school life.', compactDescription: 'Play, curiosity and a caring start.' },
  { title: 'Primary school', description: 'Build strong foundations through practical, purposeful learning.', compactDescription: 'Strong foundations through practical learning.' },
  { title: 'Junior school', description: 'Discover interests, develop skills and grow in independence.', compactDescription: 'Discover skills and new interests.' },
];
const learningHighlights = [
  { text:'Purposeful, practical CBE experiences', accent:'bg-[#d50b12]', icon:'text-[#d50b12] bg-red-50' },
  { text:'Small moments of progress celebrated', accent:'bg-[#ffc400]', icon:'text-[#9b6500] bg-yellow-50' },
  { text:'Clubs and activities for varied interests', accent:'bg-[#0739a6]', icon:'text-[#0739a6] bg-blue-50' },
  { text:'Close partnership with parents and guardians', accent:'bg-[#d50b12]', icon:'text-[#d50b12] bg-red-50' },
];
const headingClass = 'brand-title mt-3 text-3xl font-extrabold leading-[1.15] text-[#031f66] sm:text-4xl lg:text-[2.75rem]';
const textLinkClass = 'inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0739a6] transition hover:text-[#d50b12]';
const compactStatLabels: Record<string, string> = {
  'Teaching & support staff': 'Staff',
  'Learning spaces': 'Spaces',
};

function PurposeRibbons() {
  const reduceMotion=useReducedMotion();
  const redRibbonPath='M-120 245C40 45 310 40 290 215C274 350 80 324 98 160C120-45 430 20 570 230';
  const yellowRibbonPath='M760 125C900-35 1040 18 1030 170C1020 300 1150 315 1200 165C1250 20 1380 25 1530 190';
  const blueRibbonPath='M-100 560C120 340 280 650 500 470C700 300 810 610 1010 455C1180 330 1340 520 1540 390';

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="purpose-ribbon-red" x1="-100" y1="80" x2="580" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7f0005"/>
          <stop offset=".48" stopColor="#d50b12"/>
          <stop offset=".72" stopColor="#ff5158"/>
          <stop offset="1" stopColor="#a50007"/>
        </linearGradient>
        <linearGradient id="purpose-ribbon-yellow" x1="760" y1="20" x2="1510" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b97800"/>
          <stop offset=".42" stopColor="#ffc400"/>
          <stop offset=".7" stopColor="#ffe47a"/>
          <stop offset="1" stopColor="#e99a00"/>
        </linearGradient>
        <linearGradient id="purpose-ribbon-blue" x1="-100" y1="350" x2="1540" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#031f66"/>
          <stop offset=".42" stopColor="#0739a6"/>
          <stop offset=".7" stopColor="#3978ff"/>
          <stop offset="1" stopColor="#031f66"/>
        </linearGradient>
        <filter id="purpose-ribbon-shadow" x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#031f66" floodOpacity=".14"/>
        </filter>
      </defs>

      <motion.g
        animate={reduceMotion?undefined:{x:[0,34,-18,22,0],y:[0,-20,12,-7,0],rotate:[0,2.5,-1.5,1,0]}}
        transition={{duration:15,ease:'easeInOut',repeat:Infinity}}
        style={{transformOrigin:'250px 190px'}}
        opacity=".52"
        filter="url(#purpose-ribbon-shadow)"
      >
        <path
          d={redRibbonPath}
          fill="none"
          stroke="url(#purpose-ribbon-red)"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <path d={redRibbonPath} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>

      <motion.g
        animate={reduceMotion?undefined:{x:[0,-28,20,-12,0],y:[0,18,-13,9,0],rotate:[0,-2,1.8,-1,0]}}
        transition={{duration:18,ease:'easeInOut',repeat:Infinity}}
        style={{transformOrigin:'1130px 170px'}}
        opacity=".58"
        filter="url(#purpose-ribbon-shadow)"
      >
        <path
          d={yellowRibbonPath}
          fill="none"
          stroke="url(#purpose-ribbon-yellow)"
          strokeWidth="27"
          strokeLinecap="round"
        />
        <path d={yellowRibbonPath} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>

      <motion.g
        animate={reduceMotion?undefined:{x:[0,24,-32,16,0],y:[0,-16,20,-10,0],rotate:[0,1.5,-2,1,0]}}
        transition={{duration:21,ease:'easeInOut',repeat:Infinity}}
        style={{transformOrigin:'720px 490px'}}
        opacity=".42"
        filter="url(#purpose-ribbon-shadow)"
      >
        <path
          d={blueRibbonPath}
          fill="none"
          stroke="url(#purpose-ribbon-blue)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path d={blueRibbonPath} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>
    </svg>
  </div>;
}

export default function Home() {
  const { schoolEvents, settings, getSiteImage } = useApp();
  const learningImage = getSiteImage('home-learning');
  const now = useCurrentTime();
  const upcomingEvents = getUpcomingEvents(schoolEvents, now).slice(0, 4);

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

      <section className="relative overflow-hidden py-12 sm:py-24" aria-labelledby="purpose-heading">
        <div className="hidden sm:block"><PurposeRibbons/></div>
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Driven by purpose</p><h2 id="purpose-heading" className="brand-title mt-3 text-3xl font-extrabold text-[#031f66] sm:mt-4 sm:text-4xl md:text-5xl">Endeavour to Succeed.</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">Our motto, mission and vision shape every learning experience and every relationship within our school community.</p></div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-3">
            <article className="group relative overflow-hidden rounded-2xl bg-[#d50b12] p-4 text-white shadow-lg transition duration-300 hover:-translate-y-2 sm:rounded-3xl sm:p-8 sm:shadow-xl"><Flag className="h-6 w-6 text-[#ffc400] sm:h-8 sm:w-8"/><p className="mt-6 text-[9px] font-black uppercase tracking-[.14em] text-red-100 sm:mt-10 sm:text-xs sm:tracking-[.18em]">Our motto</p><h3 className="mt-2 text-lg font-extrabold leading-tight sm:mt-3 sm:text-3xl">Endeavour to Succeed</h3></article>
            <article className="group relative overflow-hidden rounded-2xl bg-[#ffc400] p-4 text-[#031f66] shadow-lg transition duration-300 hover:-translate-y-2 sm:rounded-3xl sm:p-8 sm:shadow-xl"><Rocket className="h-6 w-6 text-[#d50b12] sm:h-8 sm:w-8"/><p className="mt-6 text-[9px] font-black uppercase tracking-[.14em] text-[#8a3600] sm:mt-10 sm:text-xs sm:tracking-[.18em]">Our mission</p><h3 className="mt-2 text-[13px] font-extrabold leading-5 sm:mt-3 sm:text-xl sm:leading-8">To provide holistic development and education that helps every learner realise their full potential.</h3></article>
            <article className="group relative col-span-2 overflow-hidden rounded-2xl bg-[#0739a6] p-4 text-white shadow-lg transition duration-300 hover:-translate-y-2 sm:rounded-3xl sm:p-8 sm:shadow-xl lg:col-span-1"><Eye className="h-6 w-6 text-[#ffc400] sm:h-8 sm:w-8"/><p className="mt-5 text-[9px] font-black uppercase tracking-[.14em] text-blue-100 sm:mt-10 sm:text-xs sm:tracking-[.18em]">Our vision</p><h3 className="mt-2 text-base font-extrabold leading-6 sm:mt-3 sm:text-xl sm:leading-8">To be an inclusive education centre that develops learners in every aspect of growth.</h3></article>
          </div>
          <div className="mt-8 text-center"><Link href="/about" className="inline-flex items-center gap-2 font-extrabold text-[#0739a6] hover:text-[#d50b12]">Discover who we are <ArrowRight className="h-4 w-4"/></Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f2f6f8] py-12 sm:py-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
        <div className={`container-shell relative z-10 grid items-center gap-10 lg:gap-14 ${learningImage?'lg:grid-cols-2':'max-w-6xl'}`}>
          {learningImage&&<div className="relative h-[310px] sm:h-[520px]">
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-28 w-28 rounded-bl-[2.25rem] border-b-4 border-l-4 border-[#d50b12]"/>
            <div aria-hidden="true" className="absolute -right-3 -top-3 h-28 w-28 rounded-tr-[2.25rem] border-r-4 border-t-4 border-[#ffc400]"/>
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_28px_65px_rgba(3,31,102,.16)]">
              <Image src={learningImage.url} alt={learningImage.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/35 via-transparent to-transparent"/>
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#031f66]/80 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-white backdrop-blur-sm">CBE learning in action</span>
              <Link href="/gallery" className="group/link absolute bottom-5 left-5 right-5 flex items-center justify-between overflow-hidden rounded-2xl bg-white/95 p-5 font-bold text-[#031f66] shadow-lg backdrop-blur">
                <span className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 group-hover/link:w-full"/>
                <span className="relative z-10">See life at Creative All Stars</span><PlayCircle className="relative z-10 h-6 w-6 text-[#d50b12] transition-transform group-hover/link:scale-110" />
              </Link>
            </div>
          </div>}
          <div className={learningImage?'':'mx-auto w-full max-w-5xl text-center'}>
            <p className="eyebrow inline-flex items-center gap-3">Learning that comes alive<span aria-hidden="true" className="h-0.5 w-12 bg-[#ffc400]"/></p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#031f66] sm:mt-4 sm:text-4xl md:text-5xl">More than lessons. A childhood full of possibility.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">From practical classroom projects to music, swimming, sport and digital discovery, learners build skills they can use far beyond school.</p>
            <ul className={`mt-5 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:mt-7 ${learningImage?'':'lg:grid-cols-4'}`}>{learningHighlights.map(item=><li key={item.text} className="relative overflow-hidden rounded-xl border border-blue-100 bg-white/85 p-3 text-left shadow-[0_10px_25px_rgba(3,31,102,.06)] sm:rounded-2xl sm:p-4"><span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${item.accent}`}/><span className="flex items-center gap-3"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.icon}`}><CheckCircle2 className="h-4 w-4"/></span><span className="text-xs font-bold leading-5 text-slate-700 sm:text-sm sm:leading-6">{item.text}</span></span></li>)}</ul>
            <Link href="/academics" className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0739a6] px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
              <span className="relative z-10 transition-colors group-hover:text-[#031f66]">Explore our learning approach</span><ArrowRight className="relative z-10 h-4 w-4 transition-[color,transform] group-hover:translate-x-1 group-hover:text-[#031f66]" />
            </Link>
          </div>
        </div>
      </section>

      <ActivityMarquee/>

      <section className="relative overflow-hidden bg-[#031f66] py-10 text-white sm:py-14">
        <div aria-hidden="true" className="absolute -left-28 -top-28 h-80 w-80 rounded-full border-[52px] border-[#0739a6]/35"/>
        <div aria-hidden="true" className="absolute -bottom-24 right-[8%] h-64 w-64 rounded-full bg-[#d50b12]/10 blur-3xl"/>
        <div className="container-shell relative z-10">
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-extrabold leading-tight sm:text-4xl">Parent stories and reviews</h2>
          <div className="mt-5 sm:mt-7"><TestimonialsCarousel /></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f7f9ff)] py-10 sm:py-14">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
        <div className="container-shell relative z-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">What’s happening</p><h2 className="mt-3 font-[var(--font-heading)] text-3xl font-extrabold text-[#0b1f3a] sm:text-4xl">Events at our school.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">See upcoming moments from our classrooms, clubs and community.</p></div>
            <Link href="/events" className="inline-flex items-center gap-2 self-start rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-extrabold text-[#0739a6] shadow-sm hover:border-[#0739a6]">View all events <ArrowRight className="h-4 w-4"/></Link>
          </div>
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-[#d50b12]"/><h3 className="text-sm font-black uppercase tracking-[.16em] text-[#031f66]">Upcoming events</h3></div>
            {upcomingEvents.length>0?<div className="mobile-card-rail grid grid-cols-2 gap-2 sm:-mx-4 sm:flex sm:snap-x sm:snap-mandatory sm:gap-3 sm:overflow-x-auto sm:px-4 sm:pb-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0">{upcomingEvents.map(event=><div key={event.id} className="min-w-0 sm:w-[84vw] sm:max-w-[32rem] sm:shrink-0 sm:snap-start lg:w-auto lg:max-w-none"><EventCard event={event} compact/></div>)}</div>:<p className="rounded-2xl border border-blue-100 bg-white p-5 text-sm text-slate-500">No upcoming events have been announced yet.</p>}
          </div>
        </div>
      </section>

      <section className="container-shell py-8 sm:py-16">
        <div className="brand-gradient relative overflow-hidden rounded-[1.5rem] border border-white/10 px-5 py-6 text-white shadow-[0_28px_70px_rgba(3,31,102,.2)] sm:rounded-[2rem] sm:px-7 sm:py-10 md:px-12">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[38px] border-[#d50b12]/15"/>
          <div aria-hidden="true" className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ffc400]/15 blur-3xl"/>
          <div className="relative grid items-center gap-5 sm:gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-[#ffe588] sm:text-sm">Come and experience our school</p>
              <h2 className="mt-2 font-[var(--font-heading)] text-[1.75rem] font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-4xl">The best way to know us is to visit.</h2>
              <p className="mt-3 text-sm leading-5 text-blue-100 sm:mt-4 sm:text-base sm:leading-6">Meet our team, explore the learning spaces and get your questions answered.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1 xl:grid-cols-2">
                <Link href="/contact" className="group relative inline-flex min-h-11 items-center justify-center gap-1 overflow-hidden rounded-xl bg-[#ffc400] px-2 py-3 text-[11px] font-extrabold text-[#031f66] shadow-lg transition-transform duration-300 hover:-translate-y-0.5 min-[380px]:text-xs sm:gap-2 sm:px-5 sm:py-3.5 sm:text-base">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#d50b12] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                  <MapPin className="relative z-10 h-4 w-4 shrink-0 transition-colors group-hover:text-white sm:h-5 sm:w-5"/><span className="relative z-10 transition-colors group-hover:text-white">Book a visit</span>
                </Link>
                <a href={`tel:${settings.phone}`} className="group relative inline-flex min-h-11 items-center justify-center gap-1 overflow-hidden rounded-xl border border-white/30 px-2 py-3 text-[11px] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 min-[380px]:text-xs sm:gap-2 sm:px-5 sm:py-3.5 sm:text-base">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                  <Phone className="relative z-10 h-4 w-4 shrink-0 transition-colors group-hover:text-[#031f66] sm:h-5 sm:w-5"/><span className="relative z-10 transition-colors group-hover:text-[#031f66]">Call admissions</span>
                </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
