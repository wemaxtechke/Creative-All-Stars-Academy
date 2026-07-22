'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
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

  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
    <div className="hidden bg-[#031f66] text-xs text-blue-100 md:block">
      <div className="container-shell flex h-9 items-center justify-between">
        <div className="flex items-center gap-5"><span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#ffc400]"/>{settings.phone}</span><span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#ffc400]"/>{settings.email}</span></div>
        <div className="flex items-center gap-5"><Link href="/blog" className="hover:text-white">News & events</Link><Link href="/parents-corner" className="hover:text-white">Parent resources</Link><Link href="/careers" className="hover:text-white">Careers</Link><Link href="/admin/login" className="font-bold text-[#ffc400] hover:text-white">Staff website login</Link></div>
      </div>
    </div>
    <div className="container-shell flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center gap-3" onClick={()=>setOpen(false)}>
        {logo&&<Image src={logo.url} alt={logo.alt} width={58} height={58} priority className="h-14 w-14 rounded-full object-contain"/>}
        <div><span className="block font-[var(--font-heading)] text-base font-extrabold leading-tight text-[#031f66] sm:text-lg">{settings.schoolName}</span><span className="text-[10px] font-black uppercase tracking-[.16em] text-[#d50b12]">Endeavour to Succeed</span></div>
      </Link>
      <nav className="hidden items-center gap-1 xl:flex">{links.map(link=>{const active=pathname===link.href||pathname.startsWith(link.href+'/');return <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2 text-sm font-bold transition ${active?'bg-blue-50 text-[#0739a6]':'text-slate-600 hover:bg-slate-50 hover:text-[#031f66]'}`}>{link.name}</Link>})}</nav>
      <div className="hidden items-center gap-3 xl:flex"><Link href="/contact" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#031f66] hover:border-[#0739a6]">Book a visit</Link><Link href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-[#d50b12] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-red-900/10 hover:bg-red-700">Enquire now <ArrowRight className="h-4 w-4"/></Link></div>
      <button className="rounded-lg p-2 text-slate-700 xl:hidden" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
    </div>
    {open && <div className="border-t border-slate-200 bg-white px-4 py-5 xl:hidden"><nav className="container-shell grid gap-1">{[...links,{name:'News & events',href:'/blog'},{name:'Parent resources',href:'/parents-corner'},{name:'Contact',href:'/contact'}].map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 font-bold text-slate-700 hover:bg-slate-50">{link.name}</Link>)}<Link href="/admissions" onClick={()=>setOpen(false)} className="mt-3 rounded-xl bg-[#d50b12] px-4 py-3 text-center font-extrabold text-white">Start an admission enquiry</Link></nav></div>}
  </header>;
}
