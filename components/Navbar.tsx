'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, LockKeyhole, Mail, Menu, Phone, X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const links = [
  { name: 'About', href: '/about' },
  { name: 'Learning', href: '/academics' },
  { name: 'Classes', href: '/classes' },
  { name: 'Activities', href: '/co-curricular' },
  { name: 'School Life', href: '/gallery' },
  { name: 'Admissions', href: '/admissions' },
];

export function Navbar() {
  const pathname = usePathname();
  const { settings, getSiteImage } = useApp();
  const logo=getSiteImage('brand-logo');
  const [open, setOpen] = useState(false);
  if (pathname.startsWith('/admin')) return null;

  return <header className="sticky top-0 z-[100] isolate border-b border-slate-200 bg-white shadow-[0_4px_18px_rgba(3,31,102,.06)]">
    <div className="hidden bg-[#031f66] text-xs text-blue-100 md:block">
      <div className="container-shell flex h-9 items-center justify-between">
        <div className="flex items-center gap-5"><span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#ffc400]"/>{settings.phone}</span><span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#ffc400]"/>{settings.email}</span></div>
        <div className="flex items-center gap-5"><Link href="/blog" className="hover:text-white">News & events</Link><Link href="/parents-corner" className="hover:text-white">Parent resources</Link><Link href="/careers" className="hover:text-white">Careers</Link><Link href="/admin/login" className="font-bold text-[#ffc400] hover:text-white">Staff website login</Link></div>
      </div>
    </div>
    <div className="container-shell flex h-16 items-center justify-between sm:h-20">
      <Link href="/" className="flex min-w-0 max-w-[calc(100%-3.5rem)] flex-1 items-center gap-2.5 sm:gap-3 xl:max-w-none xl:flex-none" onClick={()=>setOpen(false)}>
        {logo&&<Image src={logo.url} alt={logo.alt} width={58} height={58} priority className="h-11 w-11 shrink-0 rounded-full object-contain sm:h-14 sm:w-14"/>}
        <div className="min-w-0"><span className="block truncate font-[var(--font-heading)] text-[13px] font-extrabold leading-tight text-[#031f66] min-[380px]:text-sm sm:text-lg">{settings.schoolName}</span><span className="block truncate text-[8px] font-black uppercase tracking-[.13em] text-[#d50b12] min-[380px]:text-[9px] sm:text-[10px] sm:tracking-[.16em]">Endeavour to Succeed</span></div>
      </Link>
      <nav className="hidden items-center gap-1 xl:flex">{links.map(link=>{const active=pathname===link.href||pathname.startsWith(link.href+'/');return <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2 text-sm font-bold transition ${active?'bg-blue-50 text-[#0739a6]':'text-slate-600 hover:bg-slate-50 hover:text-[#031f66]'}`}>{link.name}</Link>})}</nav>
      <div className="hidden items-center gap-3 xl:flex"><Link href="/contact" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#031f66] hover:border-[#0739a6]">Book a visit</Link><Link href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-[#d50b12] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-red-900/10 hover:bg-red-700">Enquire now <ArrowRight className="h-4 w-4"/></Link></div>
      <button className="ml-2 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-[#031f66] xl:hidden" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open}>{open?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}</button>
    </div>
    {open && <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 xl:hidden"><nav className="container-shell grid grid-cols-2 gap-2">{[...links,{name:'News & events',href:'/blog'},{name:'Parent resources',href:'/parents-corner'},{name:'Contact',href:'/contact'}].map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50">{link.name}</Link>)}<Link href="/admissions" onClick={()=>setOpen(false)} className="col-span-2 mt-1 rounded-xl bg-[#d50b12] px-4 py-3 text-center text-sm font-extrabold text-white">Start an admission enquiry</Link><Link href="/admin/login" onClick={()=>setOpen(false)} className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-[#0739a6]/20 bg-blue-50 px-4 py-3 text-sm font-extrabold text-[#031f66]"><LockKeyhole className="h-4 w-4"/>Admin portal</Link></nav></div>}
  </header>;
}
