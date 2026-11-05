'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { getUpcomingEvents } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { formatSchoolDate } from '@/lib/display-date';

function rememberDismissal(eventId: string) {
  try { sessionStorage.setItem(`event-popup-dismissed:${eventId}`, '1'); } catch { /* Dismissal still works without storage. */ }
}

export function EventPopup() {
  const { schoolEvents } = useApp();
  const now = useCurrentTime();
  const event = getUpcomingEvents(schoolEvents, now).find(item => item.showPopup);
  const eventId = event?.id;
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const open = Boolean(eventId && openEventId === eventId);

  function dismiss() {
    setOpenEventId(null);
    if (eventId) rememberDismissal(eventId);
  }

  useEffect(() => {
    if (!eventId) return;
    try { if (sessionStorage.getItem(`event-popup-dismissed:${eventId}`)) return; } catch { /* Storage is optional. */ }
    const timer = window.setTimeout(() => setOpenEventId(eventId), 4000);
    return () => window.clearTimeout(timer);
  }, [eventId]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.setProperty('overflow', 'hidden');
    const focusable = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') ?? []);
    focusable()[0]?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenEventId(null);
        if (eventId) rememberDismissal(eventId);
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.setProperty('overflow', previousOverflow);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, eventId]);

  if (!event || !open) return null;
  return <div className="event-popup-backdrop" role="presentation" onMouseDown={click => { if (click.target === click.currentTarget) dismiss(); }}>
    <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="event-popup-title" aria-describedby="event-popup-description" className="event-popup-panel">
      <button type="button" onClick={dismiss} aria-label="Close event announcement" className="event-popup-close">Close</button>
      {event.image && <div className="event-popup-image"><Image src={event.image} alt={event.title} fill sizes="(min-width: 640px) 540px, 100vw" className="object-cover" /></div>}
      <div className="event-popup-content"><p className="eyebrow">From our school calendar</p><h2 id="event-popup-title">{event.title}</h2><p id="event-popup-description">{event.description}</p>
        <dl><div><dt>Date</dt><dd>{formatSchoolDate(event.date)}</dd></div><div><dt>Time</dt><dd>{event.time}</dd></div><div><dt>Location</dt><dd>{event.location}</dd></div></dl>
        <div className="button-row"><Link href={`/events/${event.id}`} onClick={dismiss} className="button button-primary">View event details</Link><button type="button" onClick={dismiss} className="text-link">Maybe later</button></div>
      </div>
    </div>
  </div>;
}
