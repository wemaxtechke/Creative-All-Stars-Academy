'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { schoolPhone } from '@/lib/public-content';
import { useHydrated } from '@/lib/use-hydrated';

function ContactContent() {
  const hydrated = useHydrated();
  const { addContactMessage, settings } = useApp();
  const phone = schoolPhone(settings.phone);
  const params = useSearchParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: (params.get('subject') || '').slice(0, 200), message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${settings.mapLatitude},${settings.mapLongitude}`)}&z=17&output=embed`;
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { setFormData(current => ({ ...current, [event.target.name]: event.target.value })); }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError(''); setSubmitting(true);
    try { await addContactMessage({ ...formData, turnstileToken }); setSubmitted(true); setTurnstileToken(''); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Your message could not be sent. Please try again or call the school.'); }
    finally { setSubmitting(false); }
  }
  return <div className="public-page"><Breadcrumbs items={[{ name: 'Contact' }]} /><section className="container-shell">
    <PageIntro eyebrow="Here to help" title="A conversation is a good place to start."><p>Questions about learning, admissions or school life? Get in touch with our team in Ngata, Nakuru.</p><div className="button-row mt-5"><a href={`tel:${phone.href}`} className="text-link">Call {phone.display}</a><a href={`mailto:${settings.email}`} className="text-link">Email our team</a></div></PageIntro>
    <div className="contact-layout">
      <div className="contact-details"><div><p className="eyebrow">Call our school</p><a className="contact-number" href={`tel:${phone.href}`}>{phone.display}</a></div><div><p className="eyebrow">Email us</p><a href={`mailto:${settings.email}`}>{settings.email}</a></div><div><p className="eyebrow">Find us</p><p>{settings.address}</p><a className="text-link" href={settings.mapUrl} target="_blank" rel="noreferrer">Open in Google Maps </a></div><div><p className="eyebrow">Office hours</p><p>{settings.officeHours}</p></div><p className="contact-response-note">Messages are reviewed during office hours. For a time-sensitive question, please call us.</p></div>
      <div id="contact-form" className="enquiry-panel">{submitted ? <div role="status" className="submission-success"><p className="eyebrow">Message received</p><h2>Thank you for getting in touch.</h2><p>Our school team will review your message and respond using the details you provided during office hours.</p><button type="button" className="button button-primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}>Send another message</button></div> : <form method="post" onSubmit={submit} aria-labelledby="contact-title" aria-busy={submitting}><h2 id="contact-title">Send us a message.</h2><p className="form-note">Fields marked * are required.</p>{error && <p role="alert" className="form-error">{error}</p>}<fieldset disabled={submitting || !hydrated}>
        <div className="form-field"><label htmlFor="contact-name">Your name *</label><input id="contact-name" name="name" value={formData.name} onChange={change} maxLength={200} autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="contact-email">Email address *</label><input id="contact-email" name="email" type="email" value={formData.email} onChange={change} maxLength={200} autoComplete="email" required /></div>
        <div className="form-field"><label htmlFor="contact-phone">Phone number <span>(optional)</span></label><input id="contact-phone" name="phone" type="tel" value={formData.phone} onChange={change} maxLength={30} autoComplete="tel" inputMode="tel" /></div>
        <div className="form-field"><label htmlFor="contact-subject">Subject *</label><input id="contact-subject" name="subject" value={formData.subject} onChange={change} maxLength={200} required /></div>
        <div className="form-field"><label htmlFor="contact-message">Your message *</label><textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={change} maxLength={4000} required /></div>
        <p className="form-note">We use your details to respond to this message. <Link href="/privacy">Read our privacy notice.</Link></p>
        <TurnstileWidget onToken={setTurnstileToken} /><p className="form-note">If the security check does not load, please call the school.</p>
        <button type="submit" className="button button-primary" disabled={submitting || (process.env.NODE_ENV === 'production' && !turnstileToken)}>{submitting ? 'Sending your message…' : 'Send message'}</button>
      </fieldset></form>}</div>
    </div>
    <div className="contact-map"><iframe title="Creative All Stars Academy location on Google Maps" src={mapEmbedUrl} className="h-80 w-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div>
  </section></div>;
}
export default function Contact() { return <Suspense fallback={<div className="container-shell section-space">Loading contact details…</div>}><ContactContent /></Suspense>; }
