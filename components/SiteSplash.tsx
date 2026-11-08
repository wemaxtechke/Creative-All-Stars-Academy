'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SiteSplash() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const visibleUntil = performance.now() + 300;
    let dismissTimer: number;

    const dismiss = () => {
      dismissTimer = window.setTimeout(() => setLoaded(true), Math.max(0, visibleUntil - performance.now()));
    };

    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });

    return () => {
      window.clearTimeout(dismissTimer);
      window.removeEventListener('load', dismiss);
    };
  }, []);

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <div className="site-splash" data-loaded={loaded} aria-hidden="true">
      <Image src="/brand/creative-all-stars-academy-splash-full.webp" alt="" width={224} height={224} loading="eager" fetchPriority="high" />
    </div>
  );
}
