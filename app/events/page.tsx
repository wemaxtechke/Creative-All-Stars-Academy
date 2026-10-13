'use client';

import { useApp } from '@/lib/AppContext';
import { getUpcomingEvents, isPastEvent } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { EventCard } from '@/components/EventCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function EventsPage() {
  const { schoolEvents } = useApp();
  const now = useCurrentTime();
  const upcoming = getUpcomingEvents(schoolEvents, now);
  const past = schoolEvents.filter((event) => isPastEvent(event, now)).sort((a, b) => b.date.localeCompare(a.date));

  return <div className="pb-20">
    <Breadcrumbs items={[{ name: 'Events' }]} />
    <div className="container-shell mt-6 sm:mt-8 space-y-14">
      <section aria-labelledby="upcoming-events"><h1 id="upcoming-events" className="mb-6 text-2xl font-extrabold text-blue-950">Upcoming events</h1>
        {upcoming.length ? <div className="grid gap-5 lg:grid-cols-2">{upcoming.map((event) => <EventCard key={event.id} event={event} />)}</div> : <p className="rounded-2xl border border-blue-100 bg-white p-6 text-slate-600">No upcoming events have been announced yet.</p>}
      </section>
      {past.length > 0 && <section aria-labelledby="past-events"><h2 id="past-events" className="mb-6 text-2xl font-extrabold text-blue-950">Past events</h2><div className="grid gap-5 lg:grid-cols-2">{past.map((event) => <EventCard key={event.id} event={event} />)}</div></section>}
    </div>
  </div>;
}
