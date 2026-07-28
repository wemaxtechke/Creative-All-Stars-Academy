import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { classes } = await getPublicContent().catch(() => defaultPublicContent);
  const item = classes.find((schoolClass) => schoolClass.id === id);
  return item
    ? {
        title: `${item.name} Class`,
        description: `${item.description} Discover learning at Creative All Stars Academy in Nakuru.`,
        alternates: { canonical: `/classes/${id}` },
      }
    : { title: 'Classes' };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
