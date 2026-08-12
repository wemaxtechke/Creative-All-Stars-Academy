import assert from 'node:assert/strict';
import test from 'node:test';

const { getEventEndTime, getUpcomingEvents, isPastEvent } = await import('../lib/events.ts');

const event = (overrides = {}) => ({
  id: 'event-1',
  title: 'School event',
  description: 'Details',
  date: '2026-07-28',
  time: '07:00 AM - 05:00 PM',
  location: 'School',
  category: 'Academic',
  ...overrides,
});

test('events expire at the end of their time span in the Nairobi timezone', () => {
  const item = event();
  assert.equal(getEventEndTime(item), Date.parse('2026-07-28T17:00:00+03:00'));
  assert.equal(isPastEvent(item, Date.parse('2026-07-28T13:59:59Z')), false);
  assert.equal(isPastEvent(item, Date.parse('2026-07-28T14:00:00Z')), true);
});

test('all-day or unparseable event times expire at the end of their Nairobi date', () => {
  const item = event({ time: 'All day' });
  assert.equal(getEventEndTime(item), Date.parse('2026-07-28T23:59:59+03:00'));
  assert.equal(isPastEvent(item, Date.parse('2026-07-28T20:59:59Z')), true);
});

test('upcoming event lists hide expired records and order the next events first', () => {
  const now = Date.parse('2026-08-12T09:00:00Z');
  const later = event({ id: 'later', date: '2026-08-15' });
  const next = event({ id: 'next', date: '2026-08-13' });
  const expired = event({ id: 'expired', date: '2026-07-28' });

  assert.deepEqual(getUpcomingEvents([later, expired, next], now).map((item) => item.id), ['next', 'later']);
});
