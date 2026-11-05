'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { isJobOpen } from '@/lib/jobs';
import { formatSchoolDate } from '@/lib/display-date';
import { useHydrated } from '@/lib/use-hydrated';

function CareerDetailsContent() {
  const hydrated = useHydrated();
  const { id } = useParams() as { id: string };
  const params = useSearchParams();
  const { jobs, addJobApplication } = useApp();
  const job = jobs.find(item => item.id === id && isJobOpen(item));
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (params.get('apply') === 'true') document.getElementById('apply-form-block')?.scrollIntoView({ behavior: 'smooth' }); }, [params]);
  if (!job) notFound();
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    if (!resumeFile || resumeFile.size > 3 * 1024 * 1024) { setError('Please attach a PDF CV smaller than 3 MB.'); return; }
    setError(''); setSubmitting(true);
    try {
      await addJobApplication({ jobId: job!.id, jobTitle: job!.title, applicantName, email, phone, resumeFile, turnstileToken });
      setSubmitted(true); setTurnstileToken('');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Your application could not be sent. Please try again.'); }
    finally { setSubmitting(false); }
  }
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Careers', href: '/careers' }, { name: job.title }]} /><section className="container-shell"><PageIntro eyebrow={`${job.department} · ${job.type}`} title={job.title}><p>{job.description}</p></PageIntro><p className="story-meta">{job.location} · Applications close {formatSchoolDate(job.deadline)}</p>
    <div className="vacancy-layout"><div className="vacancy-copy"><section><h2>Responsibilities</h2><ul>{job.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Requirements & qualifications</h2><ul>{job.requirements.map(item => <li key={item}>{item}</li>)}</ul></section><Link href="/careers" className="text-link">All career opportunities</Link></div>
      <div id="apply-form-block" className="enquiry-panel">{submitted ? <div role="status" className="submission-success"><p className="eyebrow">Application received</p><h2>Thank you for your interest.</h2><p>The school team will review your application and contact shortlisted candidates.</p><Link href="/careers" className="text-link">Return to careers</Link></div> : <form method="post" onSubmit={submit} aria-labelledby="application-title" aria-busy={submitting}><h2 id="application-title">Apply for this role.</h2><p className="form-note">Fields marked * are required. Attach your CV as a PDF smaller than 3 MB.</p>{error && <p role="alert" className="form-error">{error}</p>}<fieldset disabled={submitting || !hydrated}>
        <div className="form-field"><label htmlFor="applicant-name">Your name *</label><input id="applicant-name" value={applicantName} onChange={event => setApplicantName(event.target.value)} maxLength={200} autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="applicant-email">Email address *</label><input id="applicant-email" type="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={200} autoComplete="email" required /></div>
        <div className="form-field"><label htmlFor="applicant-phone">Phone number *</label><input id="applicant-phone" type="tel" value={phone} onChange={event => setPhone(event.target.value)} maxLength={30} autoComplete="tel" required /></div>
        <div className="form-field"><label htmlFor="applicant-cv">Your CV *</label><input id="applicant-cv" type="file" accept="application/pdf,.pdf" aria-describedby="cv-guidance" required onChange={event => setResumeFile(event.target.files?.[0] ?? null)} /><p id="cv-guidance" className="form-note">PDF only, up to 3 MB.</p></div>
        <p className="form-note">The school uses your details and CV to review this application. <Link href="/privacy">Read our privacy notice.</Link></p><TurnstileWidget onToken={setTurnstileToken} />
        <button type="submit" className="button button-primary" disabled={submitting || !resumeFile || (process.env.NODE_ENV === 'production' && !turnstileToken)}>{submitting ? 'Sending your application…' : 'Send application'}</button>
      </fieldset></form>}</div>
    </div></section></div>;
}
export default function CareerDetails() { return <Suspense fallback={<div className="container-shell section-space">Loading opportunity…</div>}><CareerDetailsContent /></Suspense>; }
