import type { Job } from '@/types';

export function isJobOpen(job: Job, today = new Date().toISOString().slice(0, 10)) {
  return job.isActive !== false && job.deadline >= today;
}
