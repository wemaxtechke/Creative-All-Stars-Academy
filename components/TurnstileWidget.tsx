'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  // Turnstile site keys are public. Keep the environment override for local
  // testing while ensuring Cloudflare builds receive the production key.
  const productionSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAD7PawXOFdXkKOsZ';
  const siteKey = process.env.NODE_ENV === 'development'
    ? '1x00000000000000000000AA'
    : productionSiteKey;
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const renderWidget = useCallback(() => {
    if (!siteKey || !container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      action: 'turnstile-spin-v2',
      theme: 'light',
      size: 'flexible',
      callback: (token: string) => onToken(token),
      'expired-callback': () => onToken(''),
      'error-callback': () => onToken(''),
    });
  }, [onToken, siteKey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [renderWidget]);

  if (!siteKey) {
    return process.env.NODE_ENV === 'development'
      ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">Security check is bypassed in local development.</p>
      : <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">Online submissions are temporarily unavailable. Please contact the school directly.</p>;
  }

  return <>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => { setLoaded(true); renderWidget(); }} />
    <div ref={container} data-action="turnstile-spin-v2" aria-label="Security verification" className="min-w-0 max-w-full overflow-hidden" />
    {loaded && <span className="sr-only">Security verification loaded</span>}
  </>;
}
