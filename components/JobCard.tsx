import Link from 'next/link';
import type { Job } from '@/types';
import { formatSchoolDate } from '@/lib/display-date';

export function JobCard({ job }: { job: Job }) {
  return <article className="job-card"><div><p className="eyebrow">{job.department} · {job.type}</p><h2>{job.title}</h2><p>{job.description}</p><p>Applications close {formatSchoolDate(job.deadline)} · {job.location}</p></div><Link href={`/careers/${job.id}`} className="button button-primary">View opportunity</Link></article>;
}
