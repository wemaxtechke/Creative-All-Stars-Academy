import type { SchoolEvent } from '@/types';

const NAIROBI_UTC_OFFSET = '+03:00';

function parseEventEndClock(time: string) {
  const twelveHourMatches = [...time.matchAll(/\b(\d{1,2})(?::([0-5]\d))?\s*(AM|PM)\b/gi)];
  const twelveHour = twelveHourMatches.at(-1);
  if (twelveHour) {
    const rawHour = Number(twelveHour[1]);
    if (rawHour >= 1 && rawHour <= 12) {
      const period = twelveHour[3].toUpperCase();
      const hour = rawHour % 12 + (period === 'PM' ? 12 : 0);
      return { hour, minute: Number(twelveHour[2] ?? 0) };
    }
  }

  const twentyFourHourMatches = [...time.matchAll(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g)];
  const twentyFourHour = twentyFourHourMatches.at(-1);
  if (twentyFourHour) {
    return { hour: Number(twentyFourHour[1]), minute: Number(twentyFourHour[2]) };
  }

  return null;
}

export function getEventEndTime(event: Pick<SchoolEvent, 'date' | 'time'>) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) return Number.POSITIVE_INFINITY;

  const clock = parseEventEndClock(event.time);
  const time = clock
    ? `${String(clock.hour).padStart(2, '0')}:${String(clock.minute).padStart(2, '0')}:00`
    : '23:59:59';
  const timestamp = Date.parse(`${event.date}T${time}${NAIROBI_UTC_OFFSET}`);
  return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY;
}

export function isPastEvent(event: Pick<SchoolEvent, 'date' | 'time'>, now = Date.now()) {
  return getEventEndTime(event) <= now;
}

export function getUpcomingEvents(events: SchoolEvent[], now = Date.now()) {
  return events
    .filter((event) => !isPastEvent(event, now))
    .sort((left, right) => getEventEndTime(left) - getEventEndTime(right));
}
