import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const { jobs } = await getPublicContent().catch(() => defaultPublicContent); const job = jobs.find(j => j.id === id); return job ? { title: `${job.title} Vacancy`, description: `Apply for the ${job.title} position at Creative All Stars Academy in ${job.location}.`, alternates: { canonical: `/careers/${id}` } } : { title: 'Careers' }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
