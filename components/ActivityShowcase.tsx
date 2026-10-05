'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const HERO_SLIDE_DURATION_MS=9000;

function ActivityImage({src,alt}:{src:string;alt:string}) {
  const [failed,setFailed]=useState(false);
  if(failed)return null;
  return <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" onError={()=>setFailed(true)} className="object-cover transition duration-700 motion-safe:group-hover:scale-105"/>;
}

export function HomeHeroSlider() {
  const { heroSlides }=useApp();
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const timerRef=useRef<ReturnType<typeof setTimeout>|null>(null);
  const remainingRef=useRef(HERO_SLIDE_DURATION_MS);
  const startedAtRef=useRef(0);
  const reduceMotion=useReducedMotion();

  const clearTimer=useCallback(()=>{
    if(timerRef.current!==null) {
      clearTimeout(timerRef.current);
      timerRef.current=null;
    }
  },[]);

  useEffect(()=>{
    clearTimer();
    if(paused||heroSlides.length<2)return;
    startedAtRef.current=Date.now();
    timerRef.current=setTimeout(()=>{
      remainingRef.current=HERO_SLIDE_DURATION_MS;
      setActive(value=>(value+1)%heroSlides.length);
    },remainingRef.current);
    return clearTimer;
  },[active,clearTimer,heroSlides.length,paused]);

  const safeActive=heroSlides.length?active%heroSlides.length:0;
  const pauseSlider=()=>{
    if(paused)return;
    remainingRef.current=Math.max(0,remainingRef.current-(Date.now()-startedAtRef.current));
    clearTimer();
    setPaused(true);
  };
  const resumeSlider=()=>setPaused(false);
  const showSlide=(index:number)=>{
    if(index===safeActive)return;
    remainingRef.current=HERO_SLIDE_DURATION_MS;
    setActive(index);
  };
  const move=(step:number)=>{
    if(!heroSlides.length)return;
    remainingRef.current=HERO_SLIDE_DURATION_MS;
    setActive(value=>(value+step+heroSlides.length)%heroSlides.length);
  };
  const assignedStory=heroSlides[safeActive];
  const story=assignedStory??{
    id:'default-hero',
    image:'',
    alt:'',
    kicker:'Welcome to Creative All Stars Academy',
    title:'A confident start. A future full of possibility.',
    description:'Inclusive, holistic competency-based education that helps every learner discover their strengths and realise their full potential.',
    primary:'Discover our school',
    primaryHref:'/about',
  };
  const hasAssignedImage=Boolean(assignedStory?.image);
  const entrance=(delay:number)=>({duration:reduceMotion?0:.5,delay:reduceMotion?0:delay,ease:[.22,1,.36,1] as const});

  return <section aria-label="Creative All Stars Academy highlights" className="relative isolate overflow-hidden bg-[#031f66] text-white lg:min-h-[540px]" onMouseEnter={pauseSlider} onMouseLeave={resumeSlider}>
    {hasAssignedImage&&<AnimatePresence mode="sync">
      <motion.div key={story.id} initial={reduceMotion?false:{opacity:0,scale:1.025}} animate={reduceMotion?{opacity:1}:{opacity:1,scale:1.07,x:-6}} exit={reduceMotion?{opacity:0}:{opacity:0,scale:1.035}} transition={reduceMotion?{duration:0}:{opacity:{duration:.9,ease:[.22,1,.36,1]},scale:{duration:HERO_SLIDE_DURATION_MS/1000+.4,ease:'linear'},x:{duration:HERO_SLIDE_DURATION_MS/1000+.4,ease:'linear'}}} className="absolute inset-0 transform-gpu will-change-[opacity,transform]">
        <Image src={story.image} alt={story.alt} fill priority={safeActive===0} sizes="100vw" className="object-cover"/>
      </motion.div>
    </AnimatePresence>}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,65,.95)_0%,rgba(3,31,102,.83)_48%,rgba(3,31,102,.32)_100%)] sm:bg-[linear-gradient(90deg,rgba(3,20,65,.94)_0%,rgba(3,31,102,.78)_38%,rgba(3,31,102,.2)_72%,rgba(3,31,102,.1)_100%)]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/75 via-transparent to-[#020d2b]/20"/>
    <div className="absolute left-0 top-0 h-full w-2 bg-[#d50b12]"/>

    {!reduceMotion&&<motion.div key={`ribbon-${story.id}`} aria-hidden="true" initial={{x:'0%',opacity:0}} animate={{x:'430%',opacity:[0,.7,.7,0]}} transition={{duration:1.15,ease:[.65,0,.35,1]}} className="pointer-events-none absolute -left-[34%] top-0 z-30 h-full w-[24%] -skew-x-12 border-l-4 border-[#d50b12]/80 border-r-[6px] border-[#ffc400]/80 bg-gradient-to-r from-[#0739a6]/0 via-[#3978ff]/25 to-white/5 blur-[1px] transform-gpu will-change-[opacity,transform]"/>}

    <div className="container-shell relative z-10 flex items-start pb-20 pt-7 sm:pb-24 sm:pt-10 lg:min-h-[540px] lg:py-5">
      <div className="min-w-0 w-full max-w-4xl lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div key={story.id} initial={reduceMotion?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={reduceMotion?{opacity:0}:{opacity:0,y:-10}} transition={{duration:reduceMotion?0:.38,ease:[.22,1,.36,1]}} className="transform-gpu will-change-[opacity,transform]">
            <motion.div initial={reduceMotion?false:{opacity:0,x:-14}} animate={{opacity:1,x:0}} transition={entrance(.08)} className="mb-3 flex items-center gap-2.5 sm:mb-5 sm:gap-4"><motion.span initial={reduceMotion?false:{scaleX:0}} animate={{scaleX:1}} transition={entrance(.12)} className="h-[3px] w-7 origin-left bg-[#ffc400] sm:w-12"/><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#ffc400] sm:text-sm sm:tracking-[.28em]">{story.kicker}</p></motion.div>
            <motion.h1 initial={reduceMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={entrance(.14)} className="brand-title max-w-full break-words text-[2rem] font-extrabold leading-[1.03] drop-shadow-lg min-[390px]:text-[2.2rem] sm:text-5xl lg:max-w-4xl lg:text-[4.25rem]">{story.title}</motion.h1>
            <motion.p initial={reduceMotion?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={entrance(.2)} className="mt-3 max-w-full break-words text-[13px] leading-5 text-blue-50 drop-shadow sm:mt-5 sm:text-lg sm:leading-7 lg:max-w-2xl">{story.description}</motion.p>
            <motion.div initial={reduceMotion?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={entrance(.26)} className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:flex sm:gap-3">
              {story.primary&&story.primaryHref&&<Link href={story.primaryHref} className="group relative inline-flex min-h-10 min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-[#d50b12] px-2 py-2 text-center text-xs font-extrabold leading-tight text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:min-h-12 sm:gap-2 sm:rounded-sm sm:px-7 sm:py-3.5 sm:text-base">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-1 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]">{story.primary}</span>
                <motion.span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]" animate={reduceMotion?{}:{x:[0,4,0]}} transition={{duration:1.8,delay:1.2,repeat:Infinity,repeatDelay:1.2}}><ArrowRight className="h-4 w-4 sm:h-5 sm:w-5"/></motion.span>
              </Link>}
              <Link href="/admissions" className="group relative inline-flex min-h-10 min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg border border-l-[3px] border-white/50 border-l-[#ffc400] bg-white/10 px-2 py-2 text-center text-xs font-extrabold leading-tight text-white shadow-xl backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#ffc400] sm:min-h-12 sm:gap-2 sm:rounded-sm sm:border-l-4 sm:px-7 sm:py-3.5 sm:text-base">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 z-0 w-0 bg-[#ffc400] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"/>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]">Admission enquiry</span>
                <motion.span className="relative z-10 transition-colors duration-300 group-hover:text-[#031f66]" animate={reduceMotion?{}:{x:[0,4,0]}} transition={{duration:1.8,delay:1.2,repeat:Infinity,repeatDelay:1.2}}><ArrowRight className="h-4 w-4 sm:h-5 sm:w-5"/></motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    {heroSlides.length>1&&<><button onClick={()=>move(-1)} aria-label="Previous school highlight" className="absolute left-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:left-8"><ChevronLeft className="h-7 w-7"/></button>
    <button onClick={()=>move(1)} aria-label="Next school highlight" className="absolute right-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:right-8"><ChevronRight className="h-7 w-7"/></button></>}

    <div className="absolute inset-x-0 bottom-0 z-[60] lg:z-40 lg:border-t lg:border-white/15 lg:bg-[#020d2b]/55 lg:backdrop-blur-md">
      <div className="container-shell flex min-h-0 flex-col justify-center gap-0 py-0 lg:min-h-20 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
        <div className="hidden items-center gap-8 text-xs font-bold text-blue-100 lg:flex"><span>Ngata, Nakuru</span><span className="h-4 w-px bg-white/25"/><span>Competency-based education</span><span className="h-4 w-px bg-white/25"/><span className="text-[#ffc400]">Endeavour to Succeed</span></div>
        {heroSlides.length>0&&<div className="flex items-center gap-2 sm:gap-3">{heroSlides.map((item,index)=><button key={item.id} onClick={()=>showSlide(index)} aria-label={`Show slide ${index+1}: ${item.alt}`} className={`group flex items-center gap-2 py-1.5 sm:py-2 ${index===safeActive?'text-white':'text-blue-200/70'}`}><span className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 sm:h-2.5 ${index===safeActive?'w-7 bg-white/20 sm:w-9':'w-2 bg-white/50 group-hover:bg-white sm:w-2.5'}`}>{index===safeActive&&<span key={`progress-${safeActive}`} className="absolute inset-0 origin-left bg-[#ffc400] will-change-transform" style={{animation:`hero-progress ${HERO_SLIDE_DURATION_MS}ms linear forwards`,animationPlayState:paused?'paused':'running'}}/>}</span><span className="hidden text-[10px] font-black tabular-nums sm:block">0{index+1}</span></button>)}</div>}
      </div>
    </div>
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

export function HomeActivityGallery() {
  const { siteImages } = useApp();
  const activities = siteImages.filter(item => item.id.startsWith('activity-')).slice(0, 3);
  if (!activities.length) return null;

  return <section aria-labelledby="school-life-heading" className="border-b border-slate-200/80 py-12 lg:py-20">
    <div className="container-shell">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end sm:gap-8">
        <div><p className="eyebrow">Life beyond lessons</p><h2 id="school-life-heading" className="brand-title mt-3 text-3xl font-extrabold leading-tight text-[#031f66] sm:text-4xl">A little discovery, every day.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">Learning, friendships and the moments that make school memorable.</p></div>
        <Link href="/gallery" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#0739a6] hover:text-[#d50b12]">Explore the gallery <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
      <div className={`mobile-card-rail mt-6 grid snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:mt-8 sm:grid-flow-row sm:auto-cols-auto sm:overflow-visible sm:pb-0 ${activities.length > 1 ? 'auto-cols-[85%] grid-flow-col sm:grid-cols-2' : ''} ${activities.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {activities.map(item => <Link key={item.id} href="/gallery" className="group relative block aspect-[4/3] snap-start overflow-hidden rounded-2xl bg-[#031f66]">
          <ActivityImage src={item.url} alt={item.alt} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/95 via-[#031f66]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffc400]">{item.label || 'School life'}</p><h3 className="mt-2 text-lg font-bold leading-snug text-white">{item.alt}</h3></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
