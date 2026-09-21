import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { schoolEvents } = await getPublicContent().catch(() => defaultPublicContent);
  const event = schoolEvents.find((item) => item.id === id);
  return event ? { title: event.title, description: event.description, alternates: { canonical: `/events/${id}` }, openGraph: { title: event.title, description: event.description, images: event.image ? [event.image] : [] } } : { title: 'School Event' };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
