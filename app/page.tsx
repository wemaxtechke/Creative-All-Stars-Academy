'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, BookOpen, CheckCircle2, Eye, Flag, Laptop, MapPin,
  Palette, Phone, PlayCircle, Rocket, Trophy
} from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { BlogCard } from '@/components/BlogCard';
import { EventCard } from '@/components/EventCard';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { ActivityMarquee, HomeHeroSlider } from '@/components/ActivityShowcase';

const pillars = [
  { icon: BookOpen, number:'01', accent:'bg-[#d50b12]', title: 'Confident learners', text: 'A strong CBC foundation built through curiosity, practical learning and individual support.' },
  { icon: Palette, number:'02', accent:'bg-[#ffc400]', title: 'Creative expression', text: 'Music, art and performance give every child room to discover and share their unique strengths.' },
  { icon: Trophy, number:'03', accent:'bg-[#0739a6]', title: 'Active development', text: 'Sport, swimming and clubs nurture teamwork, resilience and healthy lifelong habits.' },
  { icon: Laptop, number:'04', accent:'bg-[#d50b12]', title: 'Future-ready skills', text: 'Age-appropriate digital literacy helps learners create, communicate and use technology responsibly.' },
];

const learningHighlights = [
  { text:'Purposeful, practical CBC experiences', accent:'bg-[#d50b12]', icon:'text-[#d50b12] bg-red-50' },
  { text:'Small moments of progress celebrated', accent:'bg-[#ffc400]', icon:'text-[#9b6500] bg-yellow-50' },
  { text:'Clubs and activities for varied interests', accent:'bg-[#0739a6]', icon:'text-[#0739a6] bg-blue-50' },
  { text:'Close partnership with parents and guardians', accent:'bg-[#d50b12]', icon:'text-[#d50b12] bg-red-50' },
];

const journey = [
  { number: '01', icon:Eye, accent:'bg-[#d50b12]', iconStyle:'bg-[#d50b12] text-white', labelStyle:'text-[#d50b12]', title: 'Discover the school', text: 'Explore our learning approach, classes, activities and campus life.' },
  { number: '02', icon:MapPin, accent:'bg-[#ffc400]', iconStyle:'bg-[#ffc400] text-[#031f66]', labelStyle:'text-[#9b6500]', title: 'Plan your visit', text: 'Talk to our admissions team and experience the school in person.' },
  { number: '03', icon:Rocket, accent:'bg-[#0739a6]', iconStyle:'bg-[#0739a6] text-white', labelStyle:'text-[#0739a6]', title: 'Apply with confidence', text: 'Submit a simple enquiry and our team will guide you through the next steps.' },
];

const schoolStats = [
  { value:800, suffix:'+', label:'Learners' },
  { value:35, suffix:'', label:'Qualified educators' },
  { value:18, suffix:'', label:'Learning spaces' },
  { value:100, suffix:'%', label:'CBC aligned' },
];

function AnimatedStat({value,suffix,label,index}:{value:number;suffix:string;label:string;index:number}) {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,amount:.6});
  const reduceMotion=useReducedMotion();
  const [displayValue,setDisplayValue]=useState(0);

  useEffect(()=>{
    if(!inView||reduceMotion)return;
    const count=animate(0,value,{duration:1.45,delay:index*.12,ease:[.22,1,.36,1],onUpdate:latest=>setDisplayValue(Math.round(latest))});
    return()=>count.stop();
  },[inView,index,reduceMotion,value]);

  return <motion.div
    ref={ref}
    initial={reduceMotion?false:{opacity:0,y:18}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true,amount:.6}}
    transition={{duration:reduceMotion?0:.55,delay:reduceMotion?0:index*.12,ease:[.22,1,.36,1]}}
    className="group relative flex min-h-12 items-center justify-center gap-2 transition-transform duration-300 hover:-translate-y-1"
  >
    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-12 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/0 blur-xl transition-colors duration-300 group-hover:bg-blue-300/25"/>
    <strong className="relative text-2xl font-extrabold tabular-nums text-[#0739a6] transition-colors duration-300 group-hover:text-[#d50b12]">
      {reduceMotion?value:displayValue}{suffix}
    </strong>
    <span className="relative text-sm font-semibold text-slate-500">{label}</span>
    {index<schoolStats.length-1&&<motion.span
      aria-hidden="true"
      initial={reduceMotion?false:{scaleY:0}}
      whileInView={{scaleY:1}}
      viewport={{once:true,amount:.8}}
      transition={{duration:reduceMotion?0:.5,delay:reduceMotion?0:.25+index*.12}}
      className="absolute right-0 hidden h-10 w-px origin-center bg-slate-200 lg:block"
    />}
  </motion.div>;
}

function PurposeRibbons() {
  const reduceMotion=useReducedMotion();
  const redRibbonPaths=[
    'M-120 245C40 45 310 40 290 215C274 350 80 324 98 160C120-45 430 20 570 230',
    'M-120 260C60 25 330 62 285 225C250 352 62 306 110 145C170-42 445 50 575 215',
    'M-120 245C40 45 310 40 290 215C274 350 80 324 98 160C120-45 430 20 570 230',
  ];
  const yellowRibbonPaths=[
    'M760 125C900-35 1040 18 1030 170C1020 300 1150 315 1200 165C1250 20 1380 25 1530 190',
    'M750 150C880-55 1060 4 1045 180C1030 325 1175 298 1210 145C1245-8 1405 48 1540 170',
    'M760 125C900-35 1040 18 1030 170C1020 300 1150 315 1200 165C1250 20 1380 25 1530 190',
  ];
  const blueRibbonPaths=[
    'M-100 560C120 340 280 650 500 470C700 300 810 610 1010 455C1180 330 1340 520 1540 390',
    'M-110 535C105 385 300 625 520 445C690 305 825 635 1025 470C1205 322 1360 555 1550 370',
    'M-100 560C120 340 280 650 500 470C700 300 810 610 1010 455C1180 330 1340 520 1540 390',
  ];

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
        <motion.path
          d={redRibbonPaths[0]}
          animate={reduceMotion?undefined:{d:redRibbonPaths}}
          transition={{duration:8,ease:'easeInOut',repeat:Infinity}}
          fill="none"
          stroke="url(#purpose-ribbon-red)"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <motion.path d={redRibbonPaths[0]} animate={reduceMotion?undefined:{d:redRibbonPaths}} transition={{duration:8,ease:'easeInOut',repeat:Infinity}} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>

      <motion.g
        animate={reduceMotion?undefined:{x:[0,-28,20,-12,0],y:[0,18,-13,9,0],rotate:[0,-2,1.8,-1,0]}}
        transition={{duration:18,ease:'easeInOut',repeat:Infinity}}
        style={{transformOrigin:'1130px 170px'}}
        opacity=".58"
        filter="url(#purpose-ribbon-shadow)"
      >
        <motion.path
          d={yellowRibbonPaths[0]}
          animate={reduceMotion?undefined:{d:yellowRibbonPaths}}
          transition={{duration:9.5,ease:'easeInOut',repeat:Infinity}}
          fill="none"
          stroke="url(#purpose-ribbon-yellow)"
          strokeWidth="27"
          strokeLinecap="round"
        />
        <motion.path d={yellowRibbonPaths[0]} animate={reduceMotion?undefined:{d:yellowRibbonPaths}} transition={{duration:9.5,ease:'easeInOut',repeat:Infinity}} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>

      <motion.g
        animate={reduceMotion?undefined:{x:[0,24,-32,16,0],y:[0,-16,20,-10,0],rotate:[0,1.5,-2,1,0]}}
        transition={{duration:21,ease:'easeInOut',repeat:Infinity}}
        style={{transformOrigin:'720px 490px'}}
        opacity=".42"
        filter="url(#purpose-ribbon-shadow)"
      >
        <motion.path
          d={blueRibbonPaths[0]}
          animate={reduceMotion?undefined:{d:blueRibbonPaths}}
          transition={{duration:11,ease:'easeInOut',repeat:Infinity}}
          fill="none"
          stroke="url(#purpose-ribbon-blue)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <motion.path d={blueRibbonPaths[0]} animate={reduceMotion?undefined:{d:blueRibbonPaths}} transition={{duration:11,ease:'easeInOut',repeat:Infinity}} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="3" strokeLinecap="round"/>
      </motion.g>
    </svg>
  </div>;
}

export default function Home() {
  const { blogPosts, schoolEvents, settings } = useApp();

  return (
    <div className="overflow-hidden bg-white">
      <HomeHeroSlider/>

      <section className="border-b border-slate-200 bg-slate-50 py-7">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {schoolStats.map((stat,index)=><AnimatedStat key={stat.label} {...stat} index={index}/>)}
        </div>
      </section>

      <section className="relative overflow-hidden py-24" aria-labelledby="purpose-heading">
        <PurposeRibbons/>
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Driven by purpose</p><h2 id="purpose-heading" className="brand-title mt-4 text-4xl font-extrabold text-[#031f66] md:text-5xl">Endeavour to Succeed.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Our motto, mission and vision shape every learning experience and every relationship within our school community.</p></div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <article className="group relative overflow-hidden rounded-3xl bg-[#d50b12] p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2"><Flag className="h-8 w-8 text-[#ffc400]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-red-100">Our motto</p><h3 className="mt-3 text-3xl font-extrabold">Endeavour to Succeed</h3></article>
            <article className="group relative overflow-hidden rounded-3xl bg-[#ffc400] p-8 text-[#031f66] shadow-xl transition duration-300 hover:-translate-y-2"><Rocket className="h-8 w-8 text-[#d50b12]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-[#8a3600]">Our mission</p><h3 className="mt-3 text-xl font-extrabold leading-8">To provide holistic development and education to the learner that enable him/her to realize his/her full potential.</h3></article>
            <article className="group relative overflow-hidden rounded-3xl bg-[#0739a6] p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2"><Eye className="h-8 w-8 text-[#ffc400]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-blue-100">Our vision</p><h3 className="mt-3 text-xl font-extrabold leading-8">To be an inclusive Education Centre that develops learners in all aspects of growth.</h3></article>
          </div>
          <div className="mt-8 text-center"><Link href="/about" className="inline-flex items-center gap-2 font-extrabold text-[#0739a6] hover:text-[#d50b12]">Discover who we are <ArrowRight className="h-4 w-4"/></Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f9ff] py-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-[.45] [background-image:radial-gradient(#cbd8f1_1px,transparent_1px)] [background-size:28px_28px]"/>
        <Image aria-hidden="true" src="/brand/creative-all-stars-academy-logo.png" alt="" width={440} height={440} className="pointer-events-none absolute -right-28 -top-16 h-[440px] w-[440px] object-contain opacity-[.035] grayscale"/>
        <div className="container-shell relative z-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5"><p className="eyebrow inline-flex items-center gap-3">The CASA experience<span aria-hidden="true" className="h-0.5 w-12 bg-[#ffc400]"/></p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#031f66] md:text-5xl">Education designed around the whole child.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:col-span-6 lg:col-start-7">Children learn best when they feel safe, seen and excited to participate. Our approach balances academic confidence with character, creativity and movement.</p>
          </div>
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-12 hidden border-t-2 border-dashed border-blue-200/80 lg:block"/>
            <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map(({icon:Icon,number,accent,title,text},index) => <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{delay:index*.08}} key={title} className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-7 shadow-[0_18px_45px_rgba(3,31,102,.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_rgba(3,31,102,.14)]"><span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${accent}`}/><span aria-hidden="true" className="absolute right-5 top-3 font-[var(--font-heading)] text-5xl font-black text-slate-100 transition-colors group-hover:text-blue-50">{number}</span><div className="relative mb-8 inline-flex rounded-xl border border-blue-100 bg-blue-50 p-3 text-[#0739a6] shadow-sm transition group-hover:bg-[#d50b12] group-hover:text-white"><Icon className="h-6 w-6" /></div><h3 className="relative text-xl font-extrabold text-[#031f66]">{title}</h3><p className="relative mt-3 text-sm leading-7 text-slate-600">{text}</p></motion.article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f2f6f8] py-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
        <Image aria-hidden="true" src="/brand/creative-all-stars-academy-logo.png" alt="" width={460} height={460} className="pointer-events-none absolute -right-24 top-1/2 h-[460px] w-[460px] -translate-y-1/2 object-contain opacity-[.035] grayscale"/>
        <div className="container-shell relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <div className="relative h-[520px]">
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-28 w-28 rounded-bl-[2.25rem] border-b-4 border-l-4 border-[#d50b12]"/>
            <div aria-hidden="true" className="absolute -right-3 -top-3 h-28 w-28 rounded-tr-[2.25rem] border-r-4 border-t-4 border-[#ffc400]"/>
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_28px_65px_rgba(3,31,102,.16)]">
              <Image src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=85&w=1100&auto=format&fit=crop" alt="Children learning together in a modern classroom" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/35 via-transparent to-transparent"/>
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#031f66]/80 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-white backdrop-blur-sm">CBC learning in action</span>
              <Link href="/gallery" className="group/link absolute bottom-5 left-5 right-5 flex items-center justify-between overflow-hidden rounded-2xl bg-white/95 p-5 font-bold text-[#031f66] shadow-lg backdrop-blur">
                <span className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 group-hover/link:w-full"/>
                <span className="relative z-10">See life at Creative All Stars</span><PlayCircle className="relative z-10 h-6 w-6 text-[#d50b12] transition-transform group-hover/link:scale-110" />
              </Link>
            </div>
          </div>
          <div>
            <p className="eyebrow inline-flex items-center gap-3">Learning that comes alive<span aria-hidden="true" className="h-0.5 w-12 bg-[#ffc400]"/></p>
            <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#031f66] md:text-5xl">More than lessons. A childhood full of possibility.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">From practical classroom projects to music, swimming, sport and digital discovery, learners build skills they can use far beyond school.</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">{learningHighlights.map(item=><li key={item.text} className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white/85 p-4 shadow-[0_10px_25px_rgba(3,31,102,.06)]"><span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${item.accent}`}/><span className="flex items-start gap-3"><span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.icon}`}><CheckCircle2 className="h-4 w-4"/></span><span className="text-sm font-bold leading-6 text-slate-700">{item.text}</span></span></li>)}</ul>
            <Link href="/academics" className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0739a6] px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
              <span className="relative z-10 transition-colors group-hover:text-[#031f66]">Explore our learning approach</span><ArrowRight className="relative z-10 h-4 w-4 transition-[color,transform] group-hover:translate-x-1 group-hover:text-[#031f66]" />
            </Link>
          </div>
        </div>
      </section>

      <ActivityMarquee/>

      <section className="relative overflow-hidden bg-[#f5f8ff] py-24">
        <div aria-hidden="true" className="absolute -left-32 top-20 h-80 w-80 rounded-full border-[42px] border-[#0739a6]/5"/>
        <div aria-hidden="true" className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#ffc400]/10 blur-3xl"/>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Your admission journey</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold text-[#031f66]">A simple, welcoming way to get started.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">From your first look at the school to submitting an enquiry, our admissions team will guide your family at every stage.</p></div>
          <div className="relative mt-20">
            <div aria-hidden="true" className="absolute -top-4 left-[16.66%] right-[16.66%] hidden h-1 rounded-full bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6] lg:block"/>
            <div className="relative grid gap-14 md:grid-cols-3 md:gap-6">
              {journey.map(({icon:Icon,...step})=><article key={step.number} className="group relative rounded-3xl border border-blue-100 bg-white px-7 pb-8 pt-14 shadow-[0_18px_45px_rgba(3,31,102,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(3,31,102,.15)]">
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl ${step.accent}`}/>
                <div className={`absolute -top-8 left-1/2 z-10 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-[6px] border-[#f5f8ff] shadow-lg ${step.iconStyle}`}><Icon className="h-6 w-6"/></div>
                <span aria-hidden="true" className="absolute right-6 top-8 font-[var(--font-heading)] text-6xl font-black text-slate-100 transition-colors group-hover:text-blue-50">{step.number}</span>
                <p className={`relative text-xs font-black uppercase tracking-[.18em] ${step.labelStyle}`}>Step {step.number}</p>
                <h3 className="relative mt-7 text-xl font-extrabold text-[#031f66]">{step.title}</h3>
                <p className="relative mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>)}
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/admissions" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#d50b12] px-6 py-4 font-extrabold text-white shadow-xl transition-transform duration-300 hover:-translate-y-1">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]">View admissions information</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-[#031f66]"/>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#031f66] py-16 text-white">
        <div aria-hidden="true" className="absolute -left-28 -top-28 h-80 w-80 rounded-full border-[52px] border-[#0739a6]/35"/>
        <div aria-hidden="true" className="absolute -bottom-24 right-[8%] h-64 w-64 rounded-full bg-[#d50b12]/10 blur-3xl"/>
        <div className="container-shell relative z-10 grid items-center gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
          <div className="max-w-md">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ffc400]">Parent stories</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold leading-tight">Trusted by families across Nakuru.</h2>
            <p className="mt-5 leading-7 text-blue-100">Hear how a caring school community, practical CBC learning and varied activities help children grow in confidence.</p>
            <ul className="mt-7 grid gap-3 text-sm font-semibold text-blue-50">
              {['Confidence families can see','Learning children enjoy','A community that listens'].map((item,index)=><li key={item} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${index===0?'bg-[#d50b12]':index===1?'bg-[#ffc400]':'bg-[#3978ff]'}`}/>{item}</li>)}
            </ul>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f7f9ff)] py-16">
        <Image aria-hidden="true" src="/brand/creative-all-stars-academy-logo.png" alt="" width={520} height={520} className="pointer-events-none absolute -right-28 top-1/2 h-[520px] w-[520px] -translate-y-1/2 object-contain opacity-[.035] grayscale"/>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
        <div className="container-shell relative z-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">What’s happening</p><h2 className="mt-3 font-[var(--font-heading)] text-4xl font-extrabold text-[#0b1f3a]">School life, news and events.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Upcoming school moments and the latest stories from our classrooms, clubs and community.</p></div>
            <Link href="/blog" className="group inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-extrabold text-[#0739a6] shadow-sm transition hover:border-[#0739a6] hover:shadow-md">View all updates <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></Link>
          </div>
          <div className="mt-9 grid gap-7 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-[#d50b12]"/><h3 className="text-sm font-black uppercase tracking-[.16em] text-[#031f66]">Upcoming events</h3></div>
              <div className="grid gap-5">{schoolEvents.slice(0,2).map(event=><EventCard key={event.id} event={event} compact/>)}</div>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-[#ffc400]"/><h3 className="text-sm font-black uppercase tracking-[.16em] text-[#031f66]">Latest stories</h3></div>
              <div className="grid gap-4">{blogPosts.slice(0,3).map(post=><BlogCard key={post.id} post={post} compact/>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="brand-gradient relative overflow-hidden rounded-[2rem] border border-white/10 px-7 py-10 text-white shadow-[0_28px_70px_rgba(3,31,102,.2)] md:px-12">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[38px] border-[#d50b12]/15"/>
          <div aria-hidden="true" className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ffc400]/15 blur-3xl"/>
          <Image aria-hidden="true" src="/brand/creative-all-stars-academy-logo.png" alt="" width={300} height={300} className="pointer-events-none absolute right-[28%] top-1/2 h-72 w-72 -translate-y-1/2 object-contain opacity-[.065] grayscale"/>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[#ffe588]">Come and experience our school</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight">The best way to know us is to visit.</h2>
              <p className="mt-4 text-blue-100">Meet our team, explore the learning spaces and ask every question that matters to your family.</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-blue-100">
                {['Explore the campus','Meet our educators','Get personal guidance'].map((item,index)=><span key={item} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${index===0?'bg-[#d50b12]':index===1?'bg-[#ffc400]':'bg-[#3978ff]'}`}/>{item}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[.07] p-4 backdrop-blur-sm">
              <p className="mb-3 text-center text-[10px] font-black uppercase tracking-[.18em] text-blue-100">Speak with our admissions team</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#ffc400] px-5 py-3.5 font-extrabold text-[#031f66] shadow-lg transition-transform duration-300 hover:-translate-y-0.5">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#d50b12] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                  <MapPin className="relative z-10 h-5 w-5 transition-colors group-hover:text-white"/><span className="relative z-10 transition-colors group-hover:text-white">Book a visit</span>
                </Link>
                <a href={`tel:${settings.phone}`} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/30 px-5 py-3.5 font-bold text-white transition-transform duration-300 hover:-translate-y-0.5">
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                  <Phone className="relative z-10 h-5 w-5 transition-colors group-hover:text-[#031f66]"/><span className="relative z-10 transition-colors group-hover:text-[#031f66]">Call admissions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
