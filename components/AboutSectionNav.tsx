'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const aboutSectionLinks = [
  { name: 'Our school', href: '/about' }, { name: 'Our approach', href: '/academics' },
  { name: 'Learning stages', href: '/classes' }, { name: 'Activities', href: '/co-curricular' },
];

export function AboutSectionNav() {
  const pathname = usePathname();
  return <nav aria-label="About section" className="school-section-nav"><div className="container-shell">{aboutSectionLinks.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'page' : undefined}>{link.name}</Link>)}</div></nav>;
}
