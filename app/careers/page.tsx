'use client';

import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { JobCard } from '@/components/JobCard';
import { isJobOpen } from '@/lib/jobs';

export default function Careers() {
  const { jobs, settings } = useApp();
  const activeJobs = jobs.filter(job => isJobOpen(job));
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Careers' }]} /><section className="container-shell"><PageIntro eyebrow="Grow with our community" title="Help shape their next chapter."><p>Explore opportunities to join the teaching and support team at Creative All Stars Academy.</p></PageIntro>
    <div className="space-y-6">{activeJobs.map(job => <JobCard key={job.id} job={job} />)}</div>{activeJobs.length === 0 && <div className="empty-state"><h2>No openings at the moment.</h2><p>Current vacancies will be published here when available.</p></div>}
    <div className="quiet-callout"><div><h2>Interested in working with us?</h2><p>Contact our school team to ask about future opportunities and the documents required for your role.</p></div><a href={`mailto:${settings.email}?subject=Career%20enquiry`} className="button button-primary">Email the school</a></div>
  </section></div>;
}
