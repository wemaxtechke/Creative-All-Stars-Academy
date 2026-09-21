'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { getUpcomingEvents } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';

export function EventPopup() {
  const { schoolEvents } = useApp();
  const now = useCurrentTime();
  const event = getUpcomingEvents(schoolEvents, now).find((item) => item.showPopup);
  const eventId = event?.id;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    const key = `event-popup-dismissed:${eventId}`;
    try { if (sessionStorage.getItem(key)) return; } catch { /* Storage can be unavailable. */ }
    const timer = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(timer);
  }, [eventId]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (key: KeyboardEvent) => {
      if (key.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  if (!event || !open) return null;
  function dismiss() {
    setOpen(false);
    try { sessionStorage.setItem(`event-popup-dismissed:${event!.id}`, '1'); } catch { /* Keep the close action working. */ }
  }

  return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-blue-950/70 p-4" role="presentation" onMouseDown={(click) => { if (click.target === click.currentTarget) dismiss(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="event-popup-title" className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
      <button type="button" onClick={dismiss} aria-label="Close event announcement" className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-blue-950 shadow"><X className="h-5 w-5" /></button>
      {event.image && <div className="relative h-44 bg-slate-100 sm:h-56"><Image src={event.image} alt={event.title} fill sizes="(min-width: 640px) 512px, 100vw" className="object-cover" /></div>}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-widest text-red-600">Upcoming event</p>
        <h2 id="event-popup-title" className="mt-2 text-2xl font-extrabold text-blue-950">{event.title}</h2>
        <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">{event.description}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-700"><span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-600" />{event.date}</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" />{event.location}</span></div>
        <div className="mt-7 flex flex-wrap gap-3"><Link href={`/events/${event.id}`} onClick={dismiss} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800">View event details</Link><button type="button" onClick={dismiss} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">Maybe later</button></div>
      </div>
    </div>
  </div>;
}
