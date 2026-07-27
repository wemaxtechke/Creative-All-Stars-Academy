'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

interface PageHeroProps { eyebrow: string; title: string; description: string; image?: string; imageSlot?: string; imageAlt?: string; cta?: { label: string; href: string } }

export function PageHero({ eyebrow, title, description, image, imageSlot, imageAlt, cta }: PageHeroProps) {
  const { getSiteImage }=useApp();
  const assigned=imageSlot?getSiteImage(imageSlot):undefined;
  const resolvedImage=image||assigned?.url;
  const resolvedAlt=imageAlt||assigned?.alt||'';
  return <section className="relative overflow-hidden border-b border-blue-100 bg-[#f7f9ff]">
    <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-red-100/60 blur-3xl"/><div className="absolute right-0 top-0 h-full w-1/3 bg-[#ffc400]/10"/>
    <div className="container-shell relative grid items-center gap-7 py-10 sm:min-h-[500px] sm:gap-12 sm:py-16 lg:grid-cols-12 lg:py-20">
      <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} className="lg:col-span-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="brand-title mt-3 text-[2.15rem] font-extrabold leading-[1.05] text-[#031f66] sm:mt-5 sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">{description}</p>
        {cta&&<Link href={cta.href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#d50b12] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-red-900/10 transition hover:-translate-y-1 hover:bg-red-700 sm:mt-8 sm:px-6 sm:py-3.5 sm:text-base">{cta.label}<ArrowRight className="h-4 w-4"/></Link>}
      </motion.div>
      {resolvedImage&&<motion.div initial={{opacity:0,scale:.96,x:24}} animate={{opacity:1,scale:1,x:0}} transition={{delay:.1}} className="relative lg:col-span-6">
        <div className="relative h-[230px] overflow-hidden rounded-2xl border-[6px] border-white shadow-xl sm:h-[360px] sm:rounded-[2rem] sm:border-[10px] sm:shadow-2xl md:h-[410px]"><Image src={resolvedImage} alt={resolvedAlt} fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/45 via-transparent to-transparent"/></div>
        <div className="absolute -bottom-3 left-3 rounded-xl bg-[#0739a6] px-4 py-2.5 text-white shadow-xl sm:-bottom-5 sm:-left-4 sm:rounded-2xl sm:px-6 sm:py-4"><p className="text-[8px] font-black uppercase tracking-[.14em] text-[#ffc400] sm:text-[10px] sm:tracking-[.17em]">Creative All Stars Academy</p><p className="mt-0.5 text-xs font-extrabold sm:mt-1 sm:text-base">Endeavour to Succeed</p></div>
        <div className="absolute -right-2 -top-3 h-12 w-12 rounded-full border-[7px] border-[#ffc400] bg-[#d50b12] shadow-xl sm:-right-3 sm:-top-4 sm:h-20 sm:w-20 sm:border-[12px]"/>
      </motion.div>}
    </div>
  </section>;
}
