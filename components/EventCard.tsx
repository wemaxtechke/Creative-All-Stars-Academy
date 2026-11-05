import Image from 'next/image';
import Link from 'next/link';
import type { SchoolEvent } from '@/types';
import { formatSchoolDate } from '@/lib/display-date';

export function EventCard({ event }: { event: SchoolEvent; compact?: boolean }) {
  return <article className="event-card"><Link href={`/events/${event.id}`}>
    {event.image && <div className="event-card-image"><Image src={event.image} alt={event.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>}
    <div className="event-card-copy"><p className="eyebrow">{event.category}</p><h3>{event.title}</h3><p className="event-summary">{event.description}</p><div className="event-meta"><time dateTime={event.date}>{formatSchoolDate(event.date)}</time><span>{event.time}</span><span>{event.location}</span></div><span className="text-link">Event details </span></div>
  </Link></article>;
}
