import type { MetadataRoute } from 'next';
import { blogPosts, jobs, schoolClasses } from '@/data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeallstars.ac.ke';
  const routes = ['', '/about', '/academics', '/classes', '/co-curricular', '/admissions', '/gallery', '/blog', '/parents-corner', '/careers', '/contact'];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: index === 0 ? 'weekly' : 'monthly', priority: index === 0 ? 1 : route === '/admissions' ? .9 : .7 }));
  const contentRoutes: MetadataRoute.Sitemap = [
    ...blogPosts.map(post => ({ url: `${base}/blog/${post.id}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: .6 })),
    ...schoolClasses.map(item => ({ url: `${base}/classes/${item.id}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .6 })),
    ...jobs.map(job => ({ url: `${base}/careers/${job.id}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .5 })),
  ];
  return [...staticRoutes, ...contentRoutes];
}
