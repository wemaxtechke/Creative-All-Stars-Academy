'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';



function ActivityImage({src,alt}:{src:string;alt:string}) {
  const [failed,setFailed]=useState(false);
  if(failed)return null;
  return <Image src={src} alt={alt} fill sizes="390px" onError={()=>setFailed(true)} className="object-cover transition duration-700 group-hover:scale-110"/>;
}

export { HomeHeroSlider } from '@/components/HomeHeroSlider';

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
  return <section className="relative overflow-hidden bg-[linear-gradient(145deg,#020d2b,#031f66_48%,#0739a6)] py-12 text-white sm:py-16">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
    <div aria-hidden="true" className="absolute -left-32 top-16 h-72 w-72 rounded-full border-[44px] border-white/[.035]"/>
    <div className="container-shell relative z-10 mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#ffc400] sm:text-xs">Every day is different</p><h2 className="brand-title mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">See our learners in action.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">A glimpse of the learning, creativity, teamwork and discovery that fill each school day.</p></div>
    </div>
    <div className="relative z-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#020d2b] to-transparent sm:w-32"/>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#0739a6] to-transparent sm:w-32"/>
      <div className="flex w-max animate-[activity-scroll_42s_linear_infinite] gap-3 py-2 hover:[animation-play-state:paused] sm:gap-5">{repeated.map((item,index)=><article key={`${item.title}-${index}`} className="group relative h-48 w-[230px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#0739a6] shadow-[0_22px_50px_rgba(0,0,0,.25)] sm:h-64 sm:w-[390px] sm:rounded-[1.75rem]">
        <ActivityImage src={item.image} alt={item.title}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d2b]/95 via-[#031f66]/20 to-[#020d2b]/10"/>
        <span className={`absolute inset-x-0 top-0 h-1 ${index%3===0?'bg-[#d50b12]':index%3===1?'bg-[#ffc400]':'bg-[#3978ff]'}`}/>
        <span className="absolute right-5 top-5 text-4xl font-black text-white/20">0{index%activities.length+1}</span>
        <div className="absolute bottom-0 p-4 sm:p-6"><p className="text-[9px] font-black uppercase tracking-[.16em] text-[#ffc400] sm:text-[10px]">{item.label}</p><h3 className="mt-1.5 text-base font-extrabold sm:mt-2 sm:text-xl">{item.title}</h3><span className="mt-3 block h-0.5 w-10 bg-[#d50b12] transition-[width] duration-300 group-hover:w-20 sm:mt-4"/></div>
      </article>)}</div>
    </div>
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#3978ff] via-[#ffc400] to-[#d50b12]"/>
  </section>;
}
