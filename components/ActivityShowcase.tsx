'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const activities = [
  { title:'Learning through discovery', label:'CBC Learning', image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=1200&auto=format&fit=crop' },
  { title:'Confidence on the field', label:'Sports', image:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=85&w=1200&auto=format&fit=crop' },
  { title:'Creativity takes centre stage', label:'Music & Arts', image:'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=85&w=1200&auto=format&fit=crop' },
  { title:'Friendships beyond the classroom', label:'School Trips', image:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=85&w=1200&auto=format&fit=crop' },
  { title:'Technology for tomorrow', label:'Digital Skills', image:'https://images.unsplash.com/photo-1484417894907-623942c8ea29?q=85&w=1200&auto=format&fit=crop' },
];

const heroStories = [
  { kicker:'Learning with purpose', title:'A joyful foundation for lifelong learning.', description:'Our CBC classrooms turn questions into discovery, helping every learner build strong skills, independence and a genuine love of learning.', image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=90&w=1800&auto=format&fit=crop', primary:'Explore our learning', primaryHref:'/academics' },
  { kicker:'Creativity and expression', title:'Where imagination becomes confidence.', description:'Music, performance and visual arts give children the courage to express ideas, discover talent and proudly share what makes them unique.', image:'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=90&w=1800&auto=format&fit=crop', primary:'Discover our activities', primaryHref:'/co-curricular' },
  { kicker:'Sport and wellbeing', title:'Strong bodies. Brave minds. Better teamwork.', description:'Through sport, swimming and active play, learners develop discipline, resilience, healthy habits and the confidence to work as one team.', image:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=90&w=1800&auto=format&fit=crop', primary:'See school life', primaryHref:'/gallery' },
  { kicker:'Future-ready learning', title:'Digital skills for a changing world.', description:'Age-appropriate technology experiences help our learners create, solve problems and understand how to participate responsibly in a digital future.', image:'https://images.unsplash.com/photo-1484417894907-623942c8ea29?q=90&w=1800&auto=format&fit=crop', primary:'View our curriculum', primaryHref:'/academics' },
  { kicker:'Inclusive by design', title:'Every learner known, supported and encouraged.', description:'We create a caring community where children are respected as individuals and guided to realize their full academic, social and creative potential.', image:'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=90&w=1800&auto=format&fit=crop', primary:'About our school', primaryHref:'/about' },
];

export function HomeHeroSlider() {
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{if(paused)return;const id=setInterval(()=>setActive(value=>(value+1)%heroStories.length),6000);return()=>clearInterval(id)},[paused]);
  const move=(step:number)=>setActive(value=>(value+step+heroStories.length)%heroStories.length);
  const story=heroStories[active];

  return <section aria-label="Creative All Stars Academy highlights" className="relative min-h-[680px] overflow-hidden bg-[#031f66] text-white lg:min-h-[760px]" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    <AnimatePresence mode="sync">
      <motion.div key={story.image} initial={{opacity:0,scale:1.07}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{opacity:{duration:.7},scale:{duration:7,ease:'linear'}}} className="absolute inset-0">
        <Image src={story.image} alt={story.title} fill priority={active===0} sizes="100vw" className="object-cover"/>
      </motion.div>
    </AnimatePresence>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,65,.94)_0%,rgba(3,31,102,.78)_38%,rgba(3,31,102,.2)_72%,rgba(3,31,102,.1)_100%)]"/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/75 via-transparent to-[#020d2b]/20"/>
    <div className="absolute left-0 top-0 h-full w-2 bg-[#d50b12]"/>

    <div className="container-shell relative z-10 flex min-h-[680px] items-center py-20 lg:min-h-[760px]">
      <div className="max-w-4xl pb-16 pt-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} transition={{duration:.55,ease:'easeOut'}}>
            <div className="mb-7 flex items-center gap-4"><span className="h-[3px] w-12 bg-[#ffc400]"/><p className="text-xs font-black uppercase tracking-[.28em] text-[#ffc400] sm:text-sm">{story.kicker}</p></div>
            <h1 className="brand-title max-w-4xl text-5xl font-extrabold leading-[1.03] drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-[5.35rem]">{story.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-50 drop-shadow sm:text-lg lg:text-xl">{story.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={story.primaryHref} className="inline-flex items-center justify-center gap-2 rounded-sm border-l-4 border-[#ffc400] bg-[#d50b12] px-7 py-4 font-extrabold text-white shadow-xl transition hover:-translate-y-1 hover:bg-red-700">{story.primary}<ArrowRight className="h-5 w-5"/></Link>
              <Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/50 bg-white/10 px-7 py-4 font-extrabold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#031f66]">Admission enquiry<ArrowRight className="h-5 w-5"/></Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    <button onClick={()=>move(-1)} aria-label="Previous school highlight" className="absolute left-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:left-8"><ChevronLeft className="h-7 w-7"/></button>
    <button onClick={()=>move(1)} aria-label="Next school highlight" className="absolute right-4 top-1/2 z-20 hidden h-20 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-[#031f66]/35 text-white backdrop-blur-sm transition hover:bg-[#d50b12] md:grid lg:right-8"><ChevronRight className="h-7 w-7"/></button>

    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#020d2b]/55 backdrop-blur-md">
      <div className="container-shell flex min-h-20 flex-col justify-center gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <div className="hidden items-center gap-8 text-xs font-bold text-blue-100 lg:flex"><span>Milimani, Nakuru</span><span className="h-4 w-px bg-white/25"/><span>CBC-aligned education</span><span className="h-4 w-px bg-white/25"/><span className="text-[#ffc400]">Endeavour to Succeed</span></div>
        <div className="flex items-center gap-3">{heroStories.map((item,index)=><button key={item.title} onClick={()=>setActive(index)} aria-label={`Show slide ${index+1}: ${item.kicker}`} className={`group flex items-center gap-2 py-2 ${index===active?'text-white':'text-blue-200/70'}`}><span className={`h-2.5 rounded-full transition-all ${index===active?'w-9 bg-[#ffc400]':'w-2.5 bg-white/50 group-hover:bg-white'}`}/><span className="hidden text-[10px] font-black tabular-nums sm:block">0{index+1}</span></button>)}</div>
      </div>
    </div>
  </section>;
}

export function ActivityCarousel() {
  const [active,setActive]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setActive(value=>(value+1)%activities.length),4500);return()=>clearInterval(id)},[]);
  const move=(step:number)=>setActive(value=>(value+step+activities.length)%activities.length);
  const item=activities[active];
  return <div className="relative h-[500px] overflow-hidden rounded-[2rem] border-[10px] border-white shadow-2xl">
    <AnimatePresence mode="wait"><motion.div key={item.image} initial={{opacity:0,scale:1.08,x:35}} animate={{opacity:1,scale:1,x:0}} exit={{opacity:0,x:-35}} transition={{duration:.65,ease:'easeOut'}} className="absolute inset-0"><Image src={item.image} alt={item.title} fill priority sizes="(min-width: 1024px) 42vw, 92vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/90 via-[#031f66]/10 to-transparent"/></motion.div></AnimatePresence>
    <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8"><motion.p key={`${active}-label`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-xs font-black uppercase tracking-[.18em] text-[#ffc400]">{item.label}</motion.p><motion.h2 key={`${active}-title`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mt-2 max-w-md text-2xl font-extrabold text-white sm:text-3xl">{item.title}</motion.h2><div className="mt-5 flex items-center justify-between"><div className="flex gap-2">{activities.map((_,i)=><button key={i} aria-label={`Show activity ${i+1}`} onClick={()=>setActive(i)} className={`h-2 rounded-full transition-all ${i===active?'w-8 bg-[#ffc400]':'w-2 bg-white/50'}`}/>)}</div><div className="flex gap-2"><button onClick={()=>move(-1)} aria-label="Previous activity" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-[#031f66]"><ChevronLeft className="h-5 w-5"/></button><button onClick={()=>move(1)} aria-label="Next activity" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-[#031f66]"><ChevronRight className="h-5 w-5"/></button></div></div></div>
  </div>;
}

export function ActivityMarquee() {
  const repeated=[...activities,...activities];
  return <section className="overflow-hidden bg-[#031f66] py-20 text-white"><div className="container-shell mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#ffc400]">Every day is different</p><h2 className="brand-title mt-3 text-4xl font-extrabold md:text-5xl">See our learners in action.</h2></div><Link href="/gallery" className="inline-flex items-center gap-2 font-extrabold text-[#ffc400]">Explore the gallery <ArrowRight className="h-4 w-4"/></Link></div><div className="flex w-max animate-[activity-scroll_36s_linear_infinite] gap-5 hover:[animation-play-state:paused]">{repeated.map((item,index)=><div key={`${item.title}-${index}`} className="group relative h-72 w-[340px] shrink-0 overflow-hidden rounded-3xl sm:w-[430px]"><Image src={item.image} alt={item.title} fill sizes="430px" className="object-cover transition duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/90 via-transparent to-transparent"/><div className="absolute bottom-0 p-6"><p className="text-xs font-black uppercase tracking-wider text-[#ffc400]">{item.label}</p><h3 className="mt-2 text-xl font-extrabold">{item.title}</h3></div></div>)}</div></section>;
}
