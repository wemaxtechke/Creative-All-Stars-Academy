'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { formatSchoolDate } from '@/lib/display-date';
import { isPastEvent } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';

export default function EventDetails() {
  const { id } = useParams() as { id: string };
  const { schoolEvents } = useApp();
  const now = useCurrentTime();
  const event = schoolEvents.find(item => item.id === id);
  if (!event) return <div className="container-shell public-page"><PageIntro eyebrow="School events" title="Event unavailable."><p>This event may have been removed.</p></PageIntro><Link href="/events" className="text-link">See all events</Link></div>;
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Events', href: '/events' }, { name: event.title }]} /><article className="container-shell"><PageIntro eyebrow={isPastEvent(event, now) ? 'Past event' : event.category} title={event.title} />
    {isPastEvent(event, now) && <p className="past-event-note">This event has already taken place. The details below are kept for reference.</p>}
    {event.image && <div className="event-cover"><Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 1200px, 100vw" className="object-cover" priority /></div>}
    <dl className="event-detail-meta"><div><dt>Date</dt><dd><time dateTime={event.date}>{formatSchoolDate(event.date)}</time></dd></div><div><dt>Time</dt><dd>{event.time}</dd></div><div><dt>Location</dt><dd>{event.location}</dd></div></dl>
    <div className="event-description">{event.description}</div><Link href="/events" className="text-link mt-8">All school events</Link>
  </article></div>;
}
