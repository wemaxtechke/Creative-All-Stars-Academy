'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, notFound, useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Calendar, MapPin, Send, ArrowLeft, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { TurnstileWidget } from '@/components/TurnstileWidget';

function CareerDetailsContent() {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const { jobs, addJobApplication } = useApp();

  const job = jobs.find((j) => j.id === id);

  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // If searchParam apply=true is present, scroll down to the form
  useEffect(() => {
    if (searchParams.get('apply') === 'true') {
      const el = document.getElementById('apply-form-block');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  if (!job) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !email || !phone || !resumeFile) {
      setError('Please complete all fields and attach your CV as a PDF.');
      return;
    }

    try {
      await addJobApplication({ jobId: job.id, jobTitle: job.title, applicantName, email, phone, resumeFile, turnstileToken });
      setSubmitted(true);
      setApplicantName('');
      setEmail('');
      setPhone('');
      setResumeFile(null);
      setTurnstileToken('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Your application could not be sent.');
    }
  };

  return (
    <div className="pb-24">
      <PageHero eyebrow={`${job.type} · ${job.department}`} title={job.title} description="Bring your expertise, care and creativity to a team committed to helping every learner realize their full potential." image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=85&w=1200&auto=format&fit=crop" imageAlt={`Career opportunity for ${job.title}`} cta={{label:'Apply for this role',href:'#apply-form-block'}}/>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Link href="/careers" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back to careers directory
        </Link>
      </div>

      {/* Job Details and Application form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: responsibilities & requirements */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xs">

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-semibold border-b border-gray-50 pb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-green-500" /> {job.location}
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <Calendar className="w-4 h-4" /> Deadline: {job.deadline}
            </span>
          </div>

          {/* Responsibilities list */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-extrabold text-blue-950">Key Responsibilities</h3>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements list */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <h3 className="text-lg md:text-xl font-extrabold text-blue-950">Role Requirements & Qualifications</h3>
            <ul className="space-y-3">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Application form */}
        <div className="lg:col-span-5" id="apply-form-block">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-extrabold text-[10px] uppercase rounded-full">
                Interactive Form
              </span>
              <h3 className="text-2xl font-black text-blue-950">Submit Your Application</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Complete this rapid digital form to apply to our Ngata faculty. Our recruitment officer will assess details and call shortlisted candidates.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
                <span className="text-3xl">🚀</span>
                <h4 className="font-extrabold text-green-800 text-base">Application Logged!</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Your candidate profile has been logged in our administrative dashboard candidate panel. Thank you for your interest in joining our star team.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Edit Details / Resubmit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {error && <p className="text-red-500 font-bold bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Your Full Name *</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Sarah Wambui Kamau"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium font-semibold text-gray-700"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah.wambui@yahoo.com"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +254 712 345 678"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 font-bold">Upload CV / TSC Credentials *</label>
                  <label className="block border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500 font-bold">{resumeFile ? resumeFile.name : 'Click to upload credentials PDF (Max 3MB)'}</span>
                    <input type="file" accept="application/pdf,.pdf" className="sr-only" required onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)} />
                  </label>
                </div>

                <TurnstileWidget onToken={setTurnstileToken} />

                <button
                  type="submit"
                  disabled={!resumeFile || (process.env.NODE_ENV === 'production' && !turnstileToken)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Apply for {job.title}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}

export default function CareerDetails() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm font-semibold text-gray-500">Loading careers details...</div>}>
      <CareerDetailsContent />
    </Suspense>
  );
}
