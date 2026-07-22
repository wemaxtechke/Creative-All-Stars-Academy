import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';
import { isJobOpen } from '@/lib/jobs';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const { jobs } = await getPublicContent().catch(() => defaultPublicContent); const job = jobs.find(item => item.id === id && isJobOpen(item)); return job ? { title: `${job.title} Vacancy`, description: job.description, alternates: { canonical: `/careers/${id}` } } : { title: 'Careers' }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
