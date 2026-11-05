'use client';

import { useApp } from '@/lib/AppContext';
import { getUpcomingEvents, isPastEvent } from '@/lib/events';
import { useCurrentTime } from '@/lib/use-current-time';
import { EventCard } from '@/components/EventCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';

export default function EventsPage() {
  const { schoolEvents } = useApp();
  const now = useCurrentTime();
  const upcoming = getUpcomingEvents(schoolEvents, now);
  const past = schoolEvents.filter(event => isPastEvent(event, now)).sort((a, b) => b.date.localeCompare(a.date));
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Events' }]} /><div className="container-shell"><PageIntro eyebrow="Our school calendar" title="Moments that bring us together."><p>Dates, activities and shared experiences from our school community.</p></PageIntro>
    <section aria-labelledby="upcoming-events"><h2 id="upcoming-events" className="section-title mb-7">Coming up.</h2>{upcoming.length > 0 ? <div className="grid gap-6 md:grid-cols-2">{upcoming.map(event => <EventCard key={event.id} event={event} />)}</div> : <p className="empty-state">New dates will appear here when announced. Please contact the school for current calendar information.</p>}</section>
    {past.length > 0 && <section aria-labelledby="past-events" className="mt-14"><h2 id="past-events" className="section-title mb-7">Past events.</h2><div className="grid gap-6 md:grid-cols-2">{past.map(event => <EventCard key={event.id} event={event} />)}</div></section>}
  </div></div>;
}
