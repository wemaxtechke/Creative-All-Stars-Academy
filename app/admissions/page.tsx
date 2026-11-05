'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { admissionGradeFromQuery, admissionGrades } from '@/lib/learning-stages';
import { displayPhone, officialPhone } from '@/lib/public-content';
import { useHydrated } from '@/lib/use-hydrated';

function AdmissionContent() {
  const hydrated = useHydrated();
  const { addAdmissionApplication, downloads } = useApp();
  const params = useSearchParams();
  const [formData, setFormData] = useState({ studentName: '', gradeApplied: admissionGradeFromQuery(params.get('class')), parentName: '', parentEmail: '', parentPhone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const admissionDownloads = downloads.filter(item => item.category === 'Admission' || item.category === 'Uniform').sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function change(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await addAdmissionApplication({ ...formData, dateOfBirth: '', gender: '', address: '', acceptedPrivacy, turnstileToken });
      setSubmitted(true);
      setTurnstileToken('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Your enquiry could not be sent. Please try again or call the school.');
    } finally { setSubmitting(false); }
  }

  return <div className="public-page"><Breadcrumbs items={[{ name: 'Admissions' }]} /><section className="container-shell">
    <PageIntro eyebrow="A thoughtful next step" title="Their next chapter begins with a conversation."><p>Tell us a little about your family. Our admissions team will help you understand class availability, placement and what comes next.</p></PageIntro>
    <div className="admissions-layout">
      <div id="enquiry" className="enquiry-panel">
        {submitted ? <div role="status" className="submission-success"><p className="eyebrow">Enquiry received</p><h2>Thank you for getting in touch.</h2><p>Our admissions team will contact you using the details you provided during school office hours. Sending an enquiry does not reserve a place.</p><button type="button" className="button button-primary" onClick={() => { setSubmitted(false); setAcceptedPrivacy(false); setFormData({ studentName: '', gradeApplied: '', parentName: '', parentEmail: '', parentPhone: '' }); }}>Send another enquiry</button></div> : <form method="post" onSubmit={submit} aria-labelledby="enquiry-title" aria-busy={submitting}>
          <p className="eyebrow">Admission enquiry</p><h2 id="enquiry-title">Let’s get to know you.</h2><p className="form-note">Fields marked * are required. No documents or payment are needed to send this enquiry.</p>
          {error && <p role="alert" className="form-error">{error}</p>}
          <fieldset disabled={submitting || !hydrated}>
            <div className="form-field"><label htmlFor="studentName">Child’s name *</label><input id="studentName" name="studentName" value={formData.studentName} onChange={change} maxLength={200} required autoComplete="off" /></div>
            <div className="form-field"><label htmlFor="gradeApplied">Class you are considering *</label><select id="gradeApplied" name="gradeApplied" value={formData.gradeApplied} onChange={change} required><option value="" disabled>Select a class</option>{admissionGrades.map(grade => <option key={grade.id} value={grade.name}>{grade.name}</option>)}</select></div>
            <div className="form-field"><label htmlFor="parentName">Parent or guardian’s name *</label><input id="parentName" name="parentName" value={formData.parentName} onChange={change} maxLength={200} autoComplete="name" required /></div>
            <div className="form-field"><label htmlFor="parentPhone">Phone number *</label><input id="parentPhone" type="tel" name="parentPhone" value={formData.parentPhone} onChange={change} maxLength={30} autoComplete="tel" inputMode="tel" required /></div>
            <div className="form-field"><label htmlFor="parentEmail">Email address <span>(optional)</span></label><input id="parentEmail" type="email" name="parentEmail" value={formData.parentEmail} onChange={change} maxLength={200} autoComplete="email" /></div>
            <label className="consent-field"><input type="checkbox" checked={acceptedPrivacy} onChange={event => setAcceptedPrivacy(event.target.checked)} required /><span>I agree that the school may use these details to respond to my enquiry. <Link href="/privacy">Read our privacy notice.</Link></span></label>
            <TurnstileWidget onToken={setTurnstileToken} />
            <p className="form-note">If the security check does not load, call <a href={`tel:${officialPhone}`}>{displayPhone}</a>.</p>
            <button type="submit" className="button button-primary" disabled={submitting || !acceptedPrivacy || (process.env.NODE_ENV === 'production' && !turnstileToken)}>{submitting ? 'Sending your enquiry…' : 'Send admission enquiry'}</button>
          </fieldset>
        </form>}
      </div>
      <aside className="admission-guide"><p className="eyebrow">How it works</p><h2>A clear path, with support at every step.</h2><ol className="admission-steps"><li><h3>Start a conversation</h3><p>Share your contact details and the class you have in mind. We will guide you on availability and suitable placement.</p></li><li><h3>Prepare the documents</h3><p>Our team will explain what is needed, including a birth certificate, previous progress report and transfer clearance where applicable. ECDE applicants may also need an immunisation booklet.</p></li><li><h3>Meet the admissions team</h3><p>The school will guide you through an age-appropriate placement interaction and answer your questions.</p></li><li><h3>Confirm the next step</h3><p>Following assessment, the school will explain the admission decision and any instructions for securing a place.</p></li></ol>
        <div className="fees-note"><h3>Fees & practical arrangements</h3><p>Fee information is shared directly with families. Contact the school for the current fee structure, payment instructions, transport arrangements and other questions.</p><Link href="/contact?subject=Fee%20structure%20enquiry#contact-form" className="text-link">Request fee information </Link></div>
        {admissionDownloads.length > 0 && <div className="admission-downloads"><h3>Useful documents</h3>{admissionDownloads.map(item => <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.title} <span>{item.fileType} · {item.fileSize}</span></a>)}</div>}
      </aside>
    </div>
  </section></div>;
}
export default function Admissions() {
  return <Suspense fallback={<div className="container-shell section-space">Loading admissions…</div>}><AdmissionContent /></Suspense>;
}
