'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps { eyebrow: string; title: string; description: string; image: string; imageAlt: string; cta?: { label: string; href: string } }

export function PageHero({ eyebrow, title, description, image, imageAlt, cta }: PageHeroProps) {
  return <section className="relative overflow-hidden border-b border-blue-100 bg-[#f7f9ff]">
    <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-red-100/60 blur-3xl"/><div className="absolute right-0 top-0 h-full w-1/3 bg-[#ffc400]/10"/>
    <div className="container-shell relative grid min-h-[500px] items-center gap-12 py-16 lg:grid-cols-12 lg:py-20">
      <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} className="lg:col-span-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="brand-title mt-5 text-5xl font-extrabold leading-[1.06] text-[#031f66] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{description}</p>
        {cta&&<Link href={cta.href} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#d50b12] px-6 py-3.5 font-extrabold text-white shadow-lg shadow-red-900/10 transition hover:-translate-y-1 hover:bg-red-700">{cta.label}<ArrowRight className="h-4 w-4"/></Link>}
      </motion.div>
      <motion.div initial={{opacity:0,scale:.96,x:24}} animate={{opacity:1,scale:1,x:0}} transition={{delay:.1}} className="relative lg:col-span-6">
        <div className="relative h-[360px] overflow-hidden rounded-[2rem] border-[10px] border-white shadow-2xl md:h-[410px]"><Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#031f66]/45 via-transparent to-transparent"/></div>
        <div className="absolute -bottom-5 -left-4 rounded-2xl bg-[#0739a6] px-6 py-4 text-white shadow-xl"><p className="text-[10px] font-black uppercase tracking-[.17em] text-[#ffc400]">Creative All Stars Academy</p><p className="mt-1 font-extrabold">Endeavour to Succeed</p></div>
        <div className="absolute -right-3 -top-4 h-20 w-20 rounded-full border-[12px] border-[#ffc400] bg-[#d50b12] shadow-xl"/>
      </motion.div>
    </div>
  </section>;
}
