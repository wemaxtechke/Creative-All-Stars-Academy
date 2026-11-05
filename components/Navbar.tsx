'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

const links = [
  { name: 'Our school', href: '/about' }, { name: 'Learning', href: '/classes' },
  { name: 'Admissions', href: '/admissions' }, { name: 'For parents', href: '/parents-corner' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { settings, getSiteImage } = useApp();
  const [open, setOpen] = useState(false);
  const logo = getSiteImage('brand-logo');
  if (pathname.startsWith('/admin')) return null;
  return <header className="public-header sticky top-0 z-[100] isolate border-slate-200 bg-white">
    <div className="container-shell public-header-inner">
      <Link href="/" className="school-brand" onClick={() => setOpen(false)} aria-label={`${settings.schoolName} home`}>
        {logo && <Image src={logo.url} alt="" width={52} height={52} priority className="school-logo" />}
        <span><strong>{settings.schoolName}</strong><small>Endeavour to Succeed</small></span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-navigation">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'page' : undefined}>{link.name}</Link>)}
      </nav>
      <Link href="/admissions#enquiry" className="button button-primary header-enquiry">Enquire now</Link>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation container-shell" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
      {[...links, { name: 'Activities', href: '/co-curricular' }, { name: 'News & stories', href: '/blog' }, { name: 'Events', href: '/events' }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? 'page' : undefined}>{link.name}</Link>)}
      <Link href="/admissions#enquiry" className="button button-primary" onClick={() => setOpen(false)}>Start an enquiry</Link>
    </nav>}
  </header>;
}
