'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CheckCircle, Download, FileText, Send, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { TurnstileWidget } from '@/components/TurnstileWidget';

export default function Admissions() {
  const { addAdmissionApplication, downloads, faqs } = useApp();
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: 'Male',
    gradeApplied: 'Grade 1',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');

  const grades = [
    'Playgroup', 'PP1', 'PP2',
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Junior School'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.dateOfBirth || !formData.parentName || !formData.parentEmail || !formData.parentPhone || !acceptedPrivacy) {
      setError('Please fill in all the required fields correctly.');
      return;
    }
    setError('');
    try {
      await addAdmissionApplication({ ...formData, acceptedPrivacy, turnstileToken });
      setSubmitted(true);
      setFormData({ studentName: '', dateOfBirth: '', gender: 'Male', gradeApplied: 'Grade 1', parentName: '', parentEmail: '', parentPhone: '', address: '' });
      setAcceptedPrivacy(false);
      setTurnstileToken('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Your admission enquiry could not be sent.');
    }
  };

  const steps = [
    { title: 'Step 1: Send an enquiry', desc: 'Share a few details about your child so our admissions team can guide you personally.' },
    { title: 'Step 2: Submit Documents', desc: 'Present copy of child’s Birth Certificate, previous school progress report card (where applicable), and immunization booklet copies.' },
    { title: 'Step 3: Learner Assessment', desc: 'Schedule a friendly interactive placement interview for the child to evaluate literacy and baseline numeracy.' },
    { title: 'Step 4: Admission & Fees payment', desc: 'Upon successful assessment, receive our official acceptance letter and pay term fees to reserve your child’s star placement.' }
  ];

  const sampleFeeStructure = [
    { group: 'Early Childhood Development (Playgroup, PP1, PP2)', tuition: 'KES 28,500', inclusive: 'Includes lunch, diary, swimming sessions, basic stationery.' },
    { group: 'Lower Primary (Grades 1, 2, 3)', tuition: 'KES 35,000', inclusive: 'Includes continuous assessments, computer lessons, swimming classes.' },
    { group: 'Upper Primary (Grades 4, 5, 6)', tuition: 'KES 38,500', inclusive: 'Includes agriculture projects, computer codes, science practical resources.' },
    { group: 'Junior Secondary School (Grade 7 - 9)', tuition: 'KES 42,500', inclusive: 'Includes laboratory experiments, ICT coding resources, strategic chess.' }
  ];

  return (
    <div className="pb-24">
      <PageHero eyebrow="Your journey starts here" title="A warm welcome from the very first enquiry." description="Learn about placement, plan a school visit and let our admissions team guide your family through each next step." image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=85&w=1200&auto=format&fit=crop" imageAlt="Happy learner beginning a new school journey"/>

      <Breadcrumbs items={[{ name: 'Admissions' }]} />

      {/* Grid: Process and PDF downloads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column: Steps and downloads */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
              Admission Steps
            </span>
            <h2 className="text-3xl font-extrabold text-blue-950">Simple Step-by-Step Pathway</h2>
            <p className="text-gray-600 text-sm md:text-base">We welcome parents throughout the academic year. Here is how you can register your child with us:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 relative">
                <span className="absolute -top-3 left-6 px-3 py-1 bg-yellow-400 text-blue-950 font-black text-xs rounded-full shadow-sm">
                  Step {idx + 1}
                </span>
                <h4 className="font-extrabold text-blue-950 pt-2 text-base leading-tight">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Downloads Block */}
          <div className="bg-blue-50/50 p-6 md:p-8 rounded-3xl border border-blue-100 space-y-4">
            <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Printable Documentation (PDFs)
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Prefer manual submission? Download our registration bio-data PDFs or print our comprehensive uniform guidelines to bring to our Milimani campus.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {downloads.filter(item => item.category === 'Admission' || item.category === 'Uniform').map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-extrabold text-xs text-blue-950 line-clamp-1">{item.title}</h5>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">{item.fileType} • {item.fileSize}</span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all flex-shrink-0"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full">
                Admission enquiry
              </span>
              <h3 className="text-2xl font-black text-blue-950">Online Admission Application</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Tell us about your family and the class you are considering. Our admissions team will contact you to explain availability, visits and the next steps.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
                <span className="text-3xl">🎉</span>
                <h4 className="font-extrabold text-green-800 text-base">Application Submitted Successfully!</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Thank you for enrolling with us. Your application has been logged into our administration system. An officer will call your primary phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {error && <p className="text-red-500 font-bold bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Child’s Full Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="e.g. Liam Kiprono Mwangi"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium bg-white"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Grade Applying For *</label>
                  <select
                    name="gradeApplied"
                    value={formData.gradeApplied}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium bg-white"
                    required
                  >
                    {grades.map((g, idx) => (
                      <option key={idx} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-100 my-4" />

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="e.g. Grace Wanjiku"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Email Address *</label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Phone Number *</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +254 712..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Residential Address / Area</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Kiamunyi, Nakuru"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                  <input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} className="mt-0.5" required />
                  <span>I agree that the school may use these details to respond to this admission enquiry.</span>
                </label>
                <TurnstileWidget onToken={setTurnstileToken} />

                <button
                  type="submit"
                  disabled={!acceptedPrivacy || (process.env.NODE_ENV === 'production' && !turnstileToken)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Submit Application Online
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Fee Structure block */}
      <section className="bg-gray-100/50 py-16 border-y border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Indicative Fee Guide"
            subtitle="Use this guide for your initial planning. The admissions team will confirm the current fee schedule and what is included."
            badge="Fees and planning"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleFeeStructure.map((fee, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative space-y-4">
                <div className="absolute top-0 left-6 w-12 h-1.5 bg-green-500 rounded-b-full" />
                <h4 className="font-extrabold text-blue-950 text-base leading-tight h-10">{fee.group}</h4>
                <div className="pt-2">
                  <span className="text-3xl font-black text-blue-900">{fee.tuition}</span>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block mt-1">Per Term Tuition</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-50 pt-3">{fee.inclusive}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-yellow-100 text-blue-950 border border-yellow-200 p-4 rounded-2xl max-w-2xl mx-auto text-xs font-semibold">
            ⭐ <strong>Important Transport notice:</strong> School bus charges are calculated based on Nakuru residence zones (Milimani, Section 58, Kiamunyi, etc.), billed separately termly.
          </div>
        </div>
      </section>

      {/* FAQs on Admissions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          title="Admission Frequently Asked Questions"
          subtitle="Explore quick solutions and guide structures to clarify queries about placement assessments and transfers."
          badge="Helpful answers"
        />
        <FAQAccordion items={faqs.filter(f => f.category === 'Admissions' || f.category === 'Fees')} />
      </section>
    </div>
  );
}
