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
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const renderWidget = useCallback(() => {
    if (!siteKey || !container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      action: 'turnstile-spin-v2',
      theme: 'light',
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
    <div ref={container} data-action="turnstile-spin-v2" aria-label="Security verification" />
    {loaded && <span className="sr-only">Security verification loaded</span>}
  </>;
}
