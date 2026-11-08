'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/lib/AppContext';

export function SiteSplash() {
  const pathname = usePathname();
  const { getSiteImage, settings } = useApp();
  const logo = getSiteImage('brand-logo');
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
      {logo ? <Image src={logo.url} alt="" width={192} height={192} loading="eager" fetchPriority="high" /> : <span className="school-logo-text">{settings.logoText}</span>}
    </div>
  );
}
