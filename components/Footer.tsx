'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { displayPhone, officialPhone, schoolSocialLinks } from '@/lib/public-content';

export function Footer() {
  const pathname = usePathname();
  const { settings } = useApp();
  if (pathname.startsWith('/admin')) return null;
  const socials = schoolSocialLinks({ facebook: settings.facebook, twitter: settings.twitter, instagram: settings.instagram, youtube: settings.youtube });
  return <footer className="public-footer">
    <div className="container-shell footer-grid">
      <div className="footer-intro"><p className="footer-school-name">{settings.schoolName}</p><p className="footer-motto">Endeavour to Succeed</p><p>A thoughtful education.<br />A confident next step.</p>{socials.length > 0 && <div className="footer-socials">{socials.map(link => <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a>)}</div>}</div>
      <nav aria-label="School links"><h2>Discover</h2><Link href="/about">Our story & team</Link><Link href="/classes">Learning stages</Link><Link href="/co-curricular">Activities</Link><Link href="/admissions">Admissions</Link></nav>
      <nav aria-label="Community links"><h2>Community</h2><Link href="/parents-corner">For parents</Link><Link href="/blog">News & stories</Link><Link href="/events">School events</Link><Link href="/careers">Careers</Link></nav>
      <div className="footer-contact"><h2>Get in touch</h2><p>{settings.address}</p><a href={`tel:${officialPhone}`}>{displayPhone}</a><a href={`mailto:${settings.email}`}>{settings.email}</a><p className="footer-hours">{settings.officeHours}</p></div>
    </div>
    <div className="container-shell footer-bottom"><p>© {new Date().getFullYear()} {settings.schoolName}</p><div><Link href="/privacy">Privacy notice</Link><Link href="/admin/login">Staff login</Link></div></div>
  </footer>;
}
