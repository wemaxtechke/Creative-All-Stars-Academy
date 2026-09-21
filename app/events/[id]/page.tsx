'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function EventDetails() {
  const { id } = useParams() as { id: string };
  const { schoolEvents } = useApp();
  const event = schoolEvents.find((item) => item.id === id);

  if (!event) return <div className="container-shell py-24 text-center"><h1 className="text-2xl font-extrabold text-blue-950">Event not found</h1><p className="mt-3 text-slate-600">This event may have been removed.</p><Link href="/events" className="mt-6 inline-block font-bold text-blue-700">See all events</Link></div>;

  return <div className="pb-20">
    <PageHero eyebrow={event.category} title={event.title} description={event.description} image={event.image} imageAlt={event.title} />
    <Breadcrumbs items={[{ name: 'Events', href: '/events' }, { name: event.title }]} />
    <article className="container-shell mt-8 max-w-5xl">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft className="h-4 w-4" /> All events</Link>
      {event.image && <div className="relative mt-6 h-64 overflow-hidden rounded-3xl bg-slate-100 sm:h-[440px]"><Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" /></div>}
      <div className="mt-6 grid gap-4 rounded-3xl border border-blue-100 bg-white p-6 text-sm font-bold text-blue-950 shadow-sm sm:grid-cols-3">
        <p className="flex items-center gap-3"><Calendar className="h-5 w-5 text-blue-600" /><span><span className="block text-xs text-slate-500">Date</span><time dateTime={event.date}>{event.date}</time></span></p>
        <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-blue-600" /><span><span className="block text-xs text-slate-500">Time</span>{event.time}</span></p>
        <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-red-600" /><span><span className="block text-xs text-slate-500">Location</span>{event.location}</span></p>
      </div>
      <div className="mt-8 whitespace-pre-line text-base leading-8 text-slate-700">{event.description}</div>
    </article>
  </div>;
}
