'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SiteSplash() {
  const pathname = usePathname();
  const [logoStatus, setLogoStatus] = useState<'loading' | 'zooming' | 'finished'>('loading');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (logoStatus !== 'finished') return;

    const dismiss = () => setLoaded(true);
    if (document.readyState === 'complete') {
      const frame = window.requestAnimationFrame(dismiss);
      return () => window.cancelAnimationFrame(frame);
    }

    window.addEventListener('load', dismiss, { once: true });
    return () => window.removeEventListener('load', dismiss);
  }, [logoStatus]);

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <div className="site-splash" data-loaded={loaded} aria-hidden="true">
      <Image
        src="/brand/creative-all-stars-academy-splash-full.webp"
        alt=""
        width={224}
        height={224}
        loading="eager"
        fetchPriority="high"
        data-ready={logoStatus !== 'loading'}
        onLoad={() => setLogoStatus('zooming')}
        onError={() => setLogoStatus('finished')}
        onAnimationEnd={() => setLogoStatus('finished')}
      />
    </div>
  );
}
