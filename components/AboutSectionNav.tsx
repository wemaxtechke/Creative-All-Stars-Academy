'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const aboutSectionLinks = [
  { name: 'About', href: '/about' },
  { name: 'Learning', href: '/academics' },
  { name: 'Classes', href: '/classes' },
  { name: 'Activities', href: '/co-curricular' },
  { name: 'School Life', href: '/gallery' },
];

export function AboutSectionNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="About section" className="border-b border-blue-100 bg-white">
      <div className="container-shell flex gap-2 overflow-x-auto py-3 sm:justify-center">
        {aboutSectionLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${active ? 'bg-[#0739a6] text-white' : 'text-slate-600 hover:bg-blue-50 hover:text-[#031f66]'}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
