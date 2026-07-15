'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  { icon: BookOpen, title: 'Confident learners', text: 'A strong CBC foundation built through curiosity, practical learning and individual support.' },
  { icon: Palette, title: 'Creative expression', text: 'Music, art and performance give every child room to discover and share their unique strengths.' },
  { icon: Trophy, title: 'Active development', text: 'Sport, swimming and clubs nurture teamwork, resilience and healthy lifelong habits.' },
  { icon: Laptop, title: 'Future-ready skills', text: 'Age-appropriate digital literacy helps learners create, communicate and use technology responsibly.' },
];

const journey = [
  { number: '01', title: 'Discover the school', text: 'Explore our learning approach, classes, activities and campus life.' },
  { number: '02', title: 'Plan your visit', text: 'Talk to our admissions team and experience the school in person.' },
  { number: '03', title: 'Apply with confidence', text: 'Submit a simple enquiry and our team will guide you through the next steps.' },
];

export default function Home() {
  const { blogPosts, schoolEvents, settings } = useApp();

  return (
    <div className="overflow-hidden bg-white">
      <HomeHeroSlider/>

      <section className="border-b border-slate-200 bg-slate-50 py-7">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[['800+','Learners'],['35','Qualified educators'],['18','Learning spaces'],['100%','CBC aligned']].map(([value,label]) => <div key={label} className="flex items-baseline justify-center gap-2 border-slate-200 lg:border-r last:border-0"><strong className="text-2xl font-extrabold text-[#0739a6]">{value}</strong><span className="text-sm font-semibold text-slate-500">{label}</span></div>)}
        </div>
      </section>

      <section className="container-shell py-24" aria-labelledby="purpose-heading">
        <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Driven by purpose</p><h2 id="purpose-heading" className="brand-title mt-4 text-4xl font-extrabold text-[#031f66] md:text-5xl">Endeavour to Succeed.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Our motto, mission and vision shape every learning experience and every relationship within our school community.</p></div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-3xl bg-[#d50b12] p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2"><Flag className="h-8 w-8 text-[#ffc400]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-red-100">Our motto</p><h3 className="mt-3 text-3xl font-extrabold">Endeavour to Succeed</h3></article>
          <article className="group relative overflow-hidden rounded-3xl bg-[#ffc400] p-8 text-[#031f66] shadow-xl transition duration-300 hover:-translate-y-2"><Rocket className="h-8 w-8 text-[#d50b12]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-[#8a3600]">Our mission</p><h3 className="mt-3 text-xl font-extrabold leading-8">To provide holistic development and education to the learner that enable him/her to realize his/her full potential.</h3></article>
          <article className="group relative overflow-hidden rounded-3xl bg-[#0739a6] p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2"><Eye className="h-8 w-8 text-[#ffc400]"/><p className="mt-10 text-xs font-black uppercase tracking-[.18em] text-blue-100">Our vision</p><h3 className="mt-3 text-xl font-extrabold leading-8">To be an inclusive Education Centre that develops learners in all aspects of growth.</h3></article>
        </div>
        <div className="mt-8 text-center"><Link href="/about" className="inline-flex items-center gap-2 font-extrabold text-[#0739a6] hover:text-[#d50b12]">Discover who we are <ArrowRight className="h-4 w-4"/></Link></div>
      </section>

      <section className="container-shell py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5"><p className="eyebrow">The CASA experience</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#031f66] md:text-5xl">Education designed around the whole child.</h2></div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:col-span-6 lg:col-start-7">Children learn best when they feel safe, seen and excited to participate. Our approach balances academic confidence with character, creativity and movement.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({icon:Icon,title,text},index) => <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{delay:index*.08}} key={title} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"><div className="mb-8 inline-flex rounded-xl bg-blue-50 p-3 text-[#0739a6] transition group-hover:bg-[#d50b12] group-hover:text-white"><Icon className="h-6 w-6" /></div><h3 className="text-xl font-extrabold text-[#031f66]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></motion.article>)}
        </div>
      </section>

      <section className="bg-[#f2f6f8] py-24">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
          <div className="relative h-[560px] overflow-hidden rounded-[2rem]"><Image src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=85&w=1100&auto=format&fit=crop" alt="Children learning together in a modern classroom" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><Link href="/gallery" className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/95 p-5 font-bold text-[#031f66] shadow-lg backdrop-blur">See life at Creative All Stars <PlayCircle className="h-6 w-6 text-[#d50b12]" /></Link></div>
          <div><p className="eyebrow">Learning that comes alive</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#031f66] md:text-5xl">More than lessons. A childhood full of possibility.</h2><p className="mt-6 text-lg leading-8 text-slate-600">From practical classroom projects to music, swimming, sport and digital discovery, learners build skills they can use far beyond school.</p><ul className="mt-8 space-y-4">{['Purposeful, practical CBC experiences','Small moments of progress celebrated','Clubs and activities for varied interests','Close partnership with parents and guardians'].map(x=><li key={x} className="flex items-center gap-3 font-semibold text-slate-700"><CheckCircle2 className="h-5 w-5 text-[#d50b12]" />{x}</li>)}</ul><Link href="/academics" className="mt-9 inline-flex items-center gap-2 font-extrabold text-[#0739a6] hover:text-[#d50b12]">Explore our learning approach <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <ActivityMarquee/>

      <section className="container-shell py-24">
        <div className="text-center"><p className="eyebrow">Your admission journey</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold text-[#031f66]">A simple, welcoming way to get started.</h2></div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">{journey.map(step=><div key={step.number} className="rounded-2xl border border-slate-200 p-7"><span className="text-sm font-black text-[#d50b12]">{step.number}</span><h3 className="mt-8 text-xl font-extrabold text-[#031f66]">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></div>)}</div>
        <div className="mt-10 text-center"><Link href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-[#d50b12] px-6 py-4 font-extrabold text-white hover:bg-red-700">View admissions information <ArrowRight className="h-5 w-5" /></Link></div>
      </section>

      <section className="bg-[#031f66] py-24 text-white"><div className="container-shell"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#ffc400]">Parent stories</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold">Trusted by families across Nakuru.</h2></div><div className="mt-12"><TestimonialsCarousel /></div></div></section>

      <section className="container-shell py-24"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">What’s happening</p><h2 className="mt-4 font-[var(--font-heading)] text-4xl font-extrabold text-[#0b1f3a]">School life, news and events.</h2></div><Link href="/blog" className="inline-flex items-center gap-2 font-bold text-blue-700">View all updates <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-12 grid gap-8 lg:grid-cols-2">{schoolEvents.slice(0,2).map(event=><EventCard key={event.id} event={event}/>)}</div><div className="mt-12 grid gap-8 md:grid-cols-3">{blogPosts.slice(0,3).map(post=><BlogCard key={post.id} post={post}/>)}</div></section>

      <section className="container-shell pb-24"><div className="brand-gradient relative overflow-hidden rounded-[2rem] px-7 py-14 text-white md:px-14"><div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ffc400]/20 blur-3xl"/><div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="text-sm font-bold text-[#ffe588]">Come and experience our school</p><h2 className="mt-3 font-[var(--font-heading)] text-4xl font-extrabold tracking-tight">The best way to know us is to visit.</h2><p className="mt-4 text-blue-100">Meet our team, explore the learning spaces and ask every question that matters to your family.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffc400] px-6 py-4 font-extrabold text-[#031f66]"><MapPin className="h-5 w-5"/>Book a visit</Link><a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 font-bold"><Phone className="h-5 w-5"/>Call admissions</a></div></div></div></section>
    </div>
  );
}
