import type { MetadataRoute } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';
import { isJobOpen } from '@/lib/jobs';
import { learningStages } from '@/lib/learning-stages';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogPosts, schoolEvents, jobs } = await getPublicContent().catch(() => defaultPublicContent);
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeallstarsacademy.sc.ke';
  const routes = ['', '/about', '/academics', '/classes', '/co-curricular', '/admissions', '/blog', '/events', '/parents-corner', '/careers', '/contact', '/privacy'];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route, index) => ({ url: `${base}${route}`, changeFrequency: index === 0 ? 'weekly' : 'monthly', priority: index === 0 ? 1 : route === '/admissions' ? .9 : .7 }));
  const contentRoutes: MetadataRoute.Sitemap = [
    ...blogPosts.map(post => ({ url: `${base}/blog/${post.id}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: .6 })),
    ...schoolEvents.map(event => ({ url: `${base}/events/${event.id}`, lastModified: new Date(event.date), changeFrequency: 'monthly' as const, priority: .6 })),
    ...learningStages.map(stage => ({ url: `${base}/classes/${stage.id}`, changeFrequency: 'monthly' as const, priority: .6 })),
    ...jobs.filter((job) => isJobOpen(job)).map(job => ({ url: `${base}/careers/${job.id}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .5 })),
  ];
  return [...staticRoutes, ...contentRoutes];
}
