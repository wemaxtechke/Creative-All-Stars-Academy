'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function SiteSplash({ schoolName }: { schoolName: string }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <div className="site-splash" aria-hidden="true">
      <div className="site-splash-mark">
        <Image
          src="/brand/creative-all-stars-academy-splash-full.webp"
          alt=""
          width={224}
          height={224}
          loading="eager"
          fetchPriority="high"
        />
        <strong>{schoolName}</strong>
        <span>Welcome</span>
      </div>
    </div>
  );
}
