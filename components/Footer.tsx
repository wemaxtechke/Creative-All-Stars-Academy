'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Clock, Heart, Mail, MapPin, Phone } from 'lucide-react';
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
  ['School news','/blog'],
  ['Careers','/careers'],
  ['Contact our team','/contact'],
];

const socialButtonClass='grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.06] text-blue-100 transition hover:-translate-y-0.5 hover:border-[#ffc400] hover:bg-[#ffc400] hover:text-[#031f66]';

export const Footer: React.FC = () => {
  const pathname=usePathname();
  const {settings,getSiteImage}=useApp();
  const logo=getSiteImage('brand-logo');

  if(pathname.startsWith('/admin'))return null;

  return <footer className="relative overflow-hidden bg-[linear-gradient(145deg,#020d2b,#031f66_58%,#0739a6)] text-white">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#3978ff]"/>
    <div aria-hidden="true" className="absolute -left-32 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[.035]"/>

    <div className="container-shell relative z-10 pb-7 pt-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pr-8">
          <div className="flex items-center gap-3">
            {logo&&<Image src={logo.url} alt={logo.alt} width={64} height={64} className="h-16 w-16 rounded-full bg-white object-contain p-1 shadow-lg"/>}
            <div>
              <p className="font-[var(--font-heading)] text-xl font-extrabold leading-tight">{settings.schoolName}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-[#ffc400]">Endeavour to Succeed</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100">An inclusive education centre in Nakuru nurturing confident, creative and future-ready learners through holistic CBC education.</p>
          <div className="mt-6 flex items-center gap-3">
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

        <div className="lg:col-span-2">
          <h3 className="text-sm font-black uppercase tracking-[.16em] text-[#ffc400]">Explore</h3>
          <ul className="mt-5 space-y-3">{navigation.map(([label,href])=><li key={href}><Link href={href} className="group flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"><ArrowRight className="h-3.5 w-3.5 text-[#d50b12] transition-transform group-hover:translate-x-1"/>{label}</Link></li>)}</ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-black uppercase tracking-[.16em] text-[#ffc400]">Community</h3>
          <ul className="mt-5 space-y-3">{community.map(([label,href])=><li key={href}><Link href={href} className="group flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"><ArrowRight className="h-3.5 w-3.5 text-[#3978ff] transition-transform group-hover:translate-x-1"/>{label}</Link></li>)}</ul>
          <Link href="/admin/login" className="mt-5 inline-flex rounded-lg border border-white/10 bg-white/[.05] px-3 py-2 text-xs font-bold text-blue-100 transition hover:border-[#ffc400] hover:text-[#ffc400]">Staff portal</Link>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[.06] p-5 backdrop-blur-sm">
            <h3 className="text-sm font-black uppercase tracking-[.16em] text-[#ffc400]">Our campus</h3>
            <ul className="mt-5 space-y-4 text-sm text-blue-100">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d50b12]"/><span className="leading-6">{settings.address}</span></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 shrink-0 text-[#ffc400]"/><a href={`tel:${settings.phone}`} className="transition hover:text-white">{settings.phone}</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#3978ff]"/><a href={`mailto:${settings.email}`} className="break-all transition hover:text-white">{settings.email}</a></li>
              <li className="flex items-start gap-3 border-t border-white/10 pt-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-200"/><span className="leading-6"><strong className="block text-white">Office hours</strong>{settings.officeHours}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-11 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-blue-200 md:flex-row">
        <p>© {new Date().getFullYear()} {settings.schoolName}. All rights reserved.</p>
        <p className="flex items-center gap-1.5">Proudly serving families in Nakuru <Heart className="h-3.5 w-3.5 fill-current text-[#d50b12]"/></p>
      </div>
    </div>
  </footer>;
};
