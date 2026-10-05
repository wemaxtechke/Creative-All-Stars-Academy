'use client';

import React, { useId, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Clock, LockKeyhole, Mail, MapPin, Phone } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const navigation = [
  ['Our story and values','/about'],
  ['Learning and curriculum','/academics'],
  ['Admissions and fees','/admissions'],
  ['Classes and age groups','/classes'],
  ['Clubs and activities','/co-curricular'],
  ['Life at our school','/gallery'],
];

const community = [
  ['Parents corner','/parents-corner'],
  ['Blogs','/blog'],
  ['Events','/events'],
  ['Careers','/careers'],
  ['Contact our team','/contact'],
];

const socialButtonClass='grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.06] text-blue-100 transition hover:-translate-y-0.5 hover:border-[#ffc400] hover:bg-[#ffc400] hover:text-[#031f66] lg:h-10 lg:w-10';

function FooterSection({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return <div className={`min-w-0 border-t border-white/10 lg:border-0 ${className}`}>
    <h3 className="text-sm font-black uppercase tracking-[.16em] text-[#ffc400]">
      <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(!expanded)} className="flex min-h-12 w-full items-center justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc400] lg:hidden">
        {title}<ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}/>
      </button>
      <span className="hidden lg:inline">{title}</span>
    </h3>
    <div id={panelId} className={`${expanded ? 'block' : 'hidden'} pb-4 lg:block lg:pb-0`}>
      {children}
    </div>
  </div>;
}

export const Footer: React.FC = () => {
  const pathname=usePathname();
  const {settings,getSiteImage}=useApp();
  const logo=getSiteImage('brand-logo');

  if(pathname.startsWith('/admin'))return null;

  return <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#020d2b,#031f66_58%,#0739a6)] text-white">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
    <div aria-hidden="true" className="absolute -left-32 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[.035]"/>

    <div className="container-shell relative z-10 pb-4 pt-6 lg:pb-7 lg:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 pb-5 lg:col-span-5 lg:pb-0 lg:pr-8">
          <div className="flex items-center gap-3">
            {logo&&<Image src={logo.url} alt={logo.alt} width={64} height={64} className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-1 shadow-lg lg:h-16 lg:w-16"/>}
            <div>
              <p className="font-[var(--font-heading)] text-base font-extrabold leading-tight sm:text-xl">{settings.schoolName}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-[#ffc400]">Endeavour to Succeed</p>
            </div>
          </div>
          <p className="mt-5 hidden max-w-md text-sm leading-7 text-blue-100 lg:block">An inclusive education centre in Nakuru nurturing confident, creative and future-ready learners through holistic competency-based education.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            <a href={`tel:${settings.phone}`} className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#ffc400] px-3 text-sm font-bold text-[#031f66]"><Phone aria-hidden="true" className="h-4 w-4"/>Call us</a>
            <a href={`mailto:${settings.email}`} className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[.06] px-3 text-sm font-bold text-white"><Mail aria-hidden="true" className="h-4 w-4"/>Email us</a>
          </div>
          <div className="mt-3 flex items-center gap-2.5 lg:mt-6 lg:gap-3">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className={socialButtonClass} aria-label="Facebook">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-4 1.7-4 4v3z"/></svg>
            </a>
            <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className={socialButtonClass} aria-label="Twitter">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={socialButtonClass} aria-label="Instagram">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.8-10a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0ZM12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5a5 5 0 0 1 2.3 2.3c.2.4.4 1 .5 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2a5 5 0 0 1-2.3 2.3c-.4.2-1 .4-2.2.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5a5 5 0 0 1-2.3-2.3c-.2-.4-.4-1-.5-2.2C2 15.6 2 15.2 2 12s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2A5 5 0 0 1 4.9 2.6c.4-.2 1-.4 2.2-.5C8.4 2 8.8 2 12 2Z"/></svg>
            </a>
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className={socialButtonClass} aria-label="YouTube">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
            </a>
          </div>
        </div>

        <FooterSection title="Explore" className="lg:col-span-2">
          <ul className="grid grid-cols-2 gap-x-4 lg:mt-5 lg:grid-cols-1 lg:gap-y-3">{navigation.map(([label,href])=><li key={href}><Link href={href} className="group flex min-h-11 items-center gap-2 py-2 text-sm leading-5 text-blue-100 transition hover:text-white lg:min-h-0 lg:py-0"><ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#d50b12] transition-transform group-hover:translate-x-1"/>{label}</Link></li>)}</ul>
        </FooterSection>

        <FooterSection title="Community" className="lg:col-span-2">
          <ul className="grid grid-cols-2 gap-x-4 lg:mt-5 lg:grid-cols-1 lg:gap-y-3">{community.map(([label,href])=><li key={href}><Link href={href} className="group flex min-h-11 items-center gap-2 py-2 text-sm leading-5 text-blue-100 transition hover:text-white lg:min-h-0 lg:py-0"><ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#3978ff] transition-transform group-hover:translate-x-1"/>{label}</Link></li>)}</ul>
          <Link href="/admin/login" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#ffc400]/35 bg-[#ffc400]/10 px-3 py-2 text-xs font-bold text-[#ffe588] transition hover:border-[#ffc400] hover:bg-[#ffc400] hover:text-[#031f66] lg:mt-5 lg:min-h-0"><LockKeyhole className="h-3.5 w-3.5"/>Admin portal</Link>
        </FooterSection>

        <FooterSection title="Our campus" className="lg:col-span-3 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-white/[.06] lg:p-5 lg:backdrop-blur-sm">
            <ul className="grid grid-cols-1 gap-3 text-sm text-blue-100 lg:mt-5 lg:gap-4">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d50b12]"/><span className="leading-6">{settings.address}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 shrink-0 text-[#ffc400]"/><a href={`tel:${settings.phone}`} className="flex min-h-11 items-center break-all transition hover:text-white lg:min-h-0">{settings.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 shrink-0 text-[#3978ff]"/><a href={`mailto:${settings.email}`} className="flex min-h-11 items-center break-all transition hover:text-white lg:min-h-0">{settings.email}</a></li>
              <li className="flex items-start gap-3 border-t border-white/10 pt-3 lg:pt-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-200"/><span className="leading-6"><strong className="block text-white">Office hours</strong>{settings.officeHours}</span></li>
            </ul>
        </FooterSection>
      </div>

      <div className="border-t border-white/10 pt-4 text-center text-[10px] text-blue-200 lg:mt-8 lg:pt-6 lg:text-xs">
        <p>© {new Date().getFullYear()} {settings.schoolName}. All rights reserved.</p>
      </div>
    </div>
  </footer>;
};
