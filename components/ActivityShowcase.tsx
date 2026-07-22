'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const HERO_SLIDE_DURATION_MS=9000;

function ActivityImage({src,alt}:{src:string;alt:string}) {
  const [failed,setFailed]=useState(false);
  if(failed)return null;
  return <Image src={src} alt={alt} fill sizes="390px" onError={()=>setFailed(true)} className="object-cover transition duration-700 group-hover:scale-110"/>;
}

function HeroThemeWaves() {
  const reduceMotion=useReducedMotion();
  const redWave='M0 24V17C120 8 240 8 360 17C480 23 600 23 720 17C840 8 960 8 1080 17C1200 23 1320 23 1440 17V24H0Z';
  const yellowWave='M0 24V19C120 13 240 13 360 19C480 23 600 23 720 19C840 13 960 13 1080 19C1200 23 1320 23 1440 19V24H0Z';

  return <div aria-hidden="true" className="hero-theme-waves pointer-events-none absolute inset-x-0 bottom-1 z-30 h-5 overflow-hidden">
    <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="h-full w-full">
      <motion.path
        d={redWave}
        animate={reduceMotion?undefined:{d:[
          redWave,
          'M0 24V17C120 22 240 22 360 14C480 6 600 6 720 17C840 23 960 23 1080 14C1200 7 1320 7 1440 17V24H0Z',
          'M0 24V17C120 10 240 10 360 20C480 23 600 23 720 14C840 6 960 6 1080 18C1200 23 1320 23 1440 17V24H0Z',
          redWave,
        ]}}
        transition={{duration:5.2,ease:'easeInOut',repeat:Infinity}}
        fill="#d50b12"
      />
      <motion.path
        d={yellowWave}
        animate={reduceMotion?undefined:{d:[
          yellowWave,
          'M0 24V19C120 22 240 22 360 16C480 10 600 10 720 20C840 23 960 23 1080 16C1200 11 1320 11 1440 19V24H0Z',
          'M0 24V19C120 14 240 14 360 21C480 23 600 23 720 16C840 11 960 11 1080 20C1200 23 1320 23 1440 19V24H0Z',
          yellowWave,
        ]}}
        transition={{duration:4.1,ease:'easeInOut',repeat:Infinity}}
        fill="#ffc400"
      />
    </svg>
  </div>;
}

export function HomeHeroSlider() {
  const { heroSlides }=useApp();
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const reduceMotion=useReducedMotion();
  useEffect(()=>{if(paused||heroSlides.length<2)return;const id=setInterval(()=>setActive(value=>(value+1)%heroSlides.length),HERO_SLIDE_DURATION_MS);return()=>clearInterval(id)},[paused,active,heroSlides.length]);
  const move=(step:number)=>setActive(value=>(value+step+heroSlides.length)%heroSlides.length);
  const story=heroSlides[active%Math.max(heroSlides.length,1)];
  const entrance=(delay:number)=>({duration:reduceMotion?0:.55,delay:reduceMotion?0:delay,ease:[.22,1,.36,1] as const});

  if(!story)return null;

  return <section aria-label="Creative All Stars Academy highlights" className="relative min-h-[640px] overflow-hidden bg-[#031f66] text-white lg:min-h-[540px]" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    <AnimatePresence mode="sync">
      <motion.div key={story.image} initial={reduceMotion?{opacity:0}:{opacity:0,scale:1.02,x:8}} animate={reduceMotion?{opacity:1}:{opacity:1,scale:1.075,x:-8}} exit={{opacity:0}} transition={reduceMotion?{duration:0}:{opacity:{duration:.75},scale:{duration:HERO_SLIDE_DURATION_MS/1000+.4,ease:'linear'},x:{duration:HERO_SLIDE_DURATION_MS/1000+.4,ease:'linear'}}} className="absolute inset-0">
        <Image src={story.image} alt={story.alt} fill priority={active===0} sizes="100vw" className="object-cover"/>
      </motion.div>
    </AnimatePresence>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,65,.94)_0%,rgba(3,31,102,.78)_38%,rgba(3,31,102,.2)_72%,rgba(3,31,102,.1)_100%)]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/75 via-transparent to-[#020d2b]/20"/>
    <div className="absolute left-0 top-0 h-full w-2 bg-[#d50b12]"/>

    {!reduceMotion&&<motion.div key={`ribbon-${active}`} aria-hidden="true" initial={{x:'0%'}} animate={{x:'300%'}} transition={{duration:.92,ease:[.76,0,.24,1]}} className="pointer-events-none absolute -left-[60%] top-0 z-30 h-full w-[58%] -skew-x-12 border-l-[10px] border-[#d50b12] border-r-[14px] border-[#ffc400] bg-[#0739a6] shadow-[28px_0_70px_rgba(3,31,102,.45)]"><div className="absolute inset-y-0 right-12 w-24 bg-white/10 blur-2xl"/></motion.div>}

    <div className="container-shell relative z-10 flex min-h-[640px] items-start py-6 lg:min-h-[540px] lg:py-5">
      <div className="max-w-4xl pb-24 pt-0">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduceMotion?0:.2}}>
            <motion.div initial={reduceMotion?{opacity:1}:{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={entrance(.28)} className="mb-5 flex items-center gap-4"><motion.span initial={reduceMotion?{scaleX:1}:{scaleX:0}} animate={{scaleX:1}} transition={entrance(.34)} className="h-[3px] w-12 origin-left bg-[#ffc400]"/><p className="text-xs font-black uppercase tracking-[.28em] text-[#ffc400] sm:text-sm">{story.kicker}</p></motion.div>
            <motion.h1 initial={reduceMotion?{opacity:1}:{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={entrance(.38)} className="brand-title max-w-4xl text-5xl font-extrabold leading-[1.03] drop-shadow-lg sm:text-6xl lg:text-[4.25rem]">{story.title}</motion.h1>
            <motion.p initial={reduceMotion?{opacity:1}:{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={entrance(.48)} className="mt-5 max-w-2xl text-base leading-7 text-blue-50 drop-shadow sm:text-lg">{story.description}</motion.p>
            <motion.div initial={reduceMotion?{opacity:1}:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={entrance(.58)} className="mt-7 flex flex-col gap-3 sm:flex-row">
              {story.primary&&story.primaryHref&&<Link href={story.primaryHref} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm bg-[#d50b12] px-7 py-3.5 font-extrabold text-white shadow-xl transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]">{story.primary}</span>
                <motion.span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]" animate={reduceMotion?{}:{x:[0,4,0]}} transition={{duration:1.8,delay:1.2,repeat:Infinity,repeatDelay:1.2}}><ArrowRight className="h-5 w-5"/></motion.span>
              </Link>}
              <Link href="/admissions" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm border border-l-4 border-white/50 border-l-[#ffc400] bg-white/10 px-7 py-3.5 font-extrabold text-white shadow-xl backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#ffc400]">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]">Admission enquiry</span>
                <motion.span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]" animate={reduceMotion?{}:{x:[0,4,0]}} transition={{duration:1.8,delay:1.2,repeat:Infinity,repeatDelay:1.2}}><ArrowRight className="h-5 w-5"/></motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    <button onClick={()=>move(-1)} aria-label="Previous school highlight" className="absolute left-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:left-8"><ChevronLeft className="h-7 w-7"/></button>
    <button onClick={()=>move(1)} aria-label="Next school highlight" className="absolute right-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:right-8"><ChevronRight className="h-7 w-7"/></button>

    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#020d2b]/55 backdrop-blur-md">
      <div className="container-shell flex min-h-20 flex-col justify-center gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <div className="hidden items-center gap-8 text-xs font-bold text-blue-100 lg:flex"><span>Ngata, Nakuru</span><span className="h-4 w-px bg-white/25"/><span>CBC-aligned education</span><span className="h-4 w-px bg-white/25"/><span className="text-[#ffc400]">Endeavour to Succeed</span></div>
        <div className="flex items-center gap-3">{heroSlides.map((item,index)=><button key={item.id} onClick={()=>setActive(index)} aria-label={`Show slide ${index+1}: ${item.alt}`} className={`group flex items-center gap-2 py-2 ${index===active?'text-white':'text-blue-200/70'}`}><span className={`relative h-2.5 overflow-hidden rounded-full transition-all ${index===active?'w-9 bg-white/20':'w-2.5 bg-white/50 group-hover:bg-white'}`}>{index===active&&<span key={`progress-${active}-${paused?'paused':'running'}`} className="absolute inset-0 origin-left bg-[#ffc400]" style={{animation:`hero-progress ${HERO_SLIDE_DURATION_MS}ms linear forwards`,animationPlayState:paused?'paused':'running'}}/>}</span><span className="hidden text-[10px] font-black tabular-nums sm:block">0{index+1}</span></button>)}</div>
      </div>
    </div>
    <HeroThemeWaves/>
  </section>;
}

export function ActivityCarousel() {
  const { siteImages }=useApp();
  const activities=siteImages.filter((item)=>item.id.startsWith('activity-')).map((item)=>({title:item.alt,label:item.label||'School life',image:item.url}));
  const [active,setActive]=useState(0);
  useEffect(()=>{if(activities.length<2)return;const id=setInterval(()=>setActive(value=>(value+1)%activities.length),4500);return()=>clearInterval(id)},[activities.length]);
  const move=(step:number)=>setActive(value=>(value+step+activities.length)%activities.length);
  const item=activities[active%Math.max(activities.length,1)];
  if(!item)return null;
  return <div className="relative h-[500px] overflow-hidden rounded-[2rem] border-[10px] border-white shadow-2xl">
    <AnimatePresence mode="wait"><motion.div key={item.image} initial={{opacity:0,scale:1.08,x:35}} animate={{opacity:1,scale:1,x:0}} exit={{opacity:0,x:-35}} transition={{duration:.65,ease:'easeOut'}} className="absolute inset-0"><Image src={item.image} alt={item.title} fill priority sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/90 via-[#031f66]/10 to-transparent"/></motion.div></AnimatePresence>
    <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8"><motion.p key={`${active}-label`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-xs font-black uppercase tracking-[.18em] text-[#ffc400]">{item.label}</motion.p><motion.h2 key={`${active}-title`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mt-2 max-w-md text-2xl font-extrabold text-white sm:text-3xl">{item.title}</motion.h2><div className="mt-5 flex items-center justify-between"><div className="flex gap-2">{activities.map((_,i)=><button key={i} aria-label={`Show activity ${i+1}`} onClick={()=>setActive(i)} className={`h-2 rounded-full transition-all ${i===active?'w-8 bg-[#ffc400]':'w-2 bg-white/50'}`}/>)}</div><div className="flex gap-2"><button onClick={()=>move(-1)} aria-label="Previous activity" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-[#031f66]"><ChevronLeft className="h-5 w-5"/></button><button onClick={()=>move(1)} aria-label="Next activity" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-[#031f66]"><ChevronRight className="h-5 w-5"/></button></div></div></div>
  </div>;
}

export function ActivityMarquee() {
  const { siteImages }=useApp();
  const activities=siteImages.filter((item)=>item.id.startsWith('activity-')).map((item)=>({title:item.alt,label:item.label||'School life',image:item.url}));
  if(!activities.length)return null;
  const repeated=[...activities,...activities];
  return <section className="relative overflow-hidden bg-[linear-gradient(145deg,#020d2b,#031f66_48%,#0739a6)] py-16 text-white">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
    <div aria-hidden="true" className="absolute -left-32 top-16 h-72 w-72 rounded-full border-[44px] border-white/[.035]"/>
    <div className="container-shell relative z-10 mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc400]">Every day is different</p><h2 className="brand-title mt-3 text-4xl font-extrabold md:text-5xl">See our learners in action.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">A glimpse of the learning, creativity, teamwork and discovery that fill each school day.</p></div>
      <Link href="/gallery" className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#ffc400]/40 bg-[#ffc400]/10 px-5 py-3 font-extrabold text-[#ffc400] transition hover:bg-[#ffc400] hover:text-[#031f66]">Explore the gallery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></Link>
    </div>
    <div className="relative z-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#020d2b] to-transparent sm:w-32"/>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#0739a6] to-transparent sm:w-32"/>
      <div className="flex w-max animate-[activity-scroll_42s_linear_infinite] gap-5 py-2 hover:[animation-play-state:paused]">{repeated.map((item,index)=><article key={`${item.title}-${index}`} className="group relative h-64 w-[320px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0739a6] shadow-[0_22px_50px_rgba(0,0,0,.25)] sm:w-[390px]">
        <ActivityImage src={item.image} alt={item.title}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/95 via-[#031f66]/20 to-[#020d2b]/10"/>
        <span className={`absolute inset-x-0 top-0 h-1 ${index%3===0?'bg-[#d50b12]':index%3===1?'bg-[#ffc400]':'bg-[#3978ff]'}`}/>
        <span className="absolute right-5 top-5 text-4xl font-black text-white/20">0{index%activities.length+1}</span>
        <div className="absolute bottom-0 p-6"><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#ffc400]">{item.label}</p><h3 className="mt-2 text-xl font-extrabold">{item.title}</h3><span className="mt-4 block h-0.5 w-10 bg-[#d50b12] transition-[width] duration-300 group-hover:w-20"/></div>
      </article>)}</div>
    </div>
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#3978ff] via-[#ffc400] to-[#d50b12]"/>
  </section>;
}
