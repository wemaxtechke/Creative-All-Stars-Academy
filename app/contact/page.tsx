'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mail, Phone, MapPin, Clock, Send, ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { TurnstileWidget } from '@/components/TurnstileWidget';

export default function Contact() {
  const { addContactMessage, settings } = useApp();
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${settings.mapLatitude},${settings.mapLongitude}`)}&z=17&output=embed`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all the required input blocks correctly.');
      return;
    }
    setError('');
    try {
      await addContactMessage({ ...formData, turnstileToken });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTurnstileToken('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Your message could not be sent.');
    }
  };

  return (
    <div className="pb-24">
      <PageHero eyebrow="Let’s start a conversation" title="Come and experience our school for yourself." description="Ask a question, arrange a school visit or speak with our admissions team in Ngata, Nakuru." imageSlot="page-contact"/>

      <Breadcrumbs items={[{ name: 'Contact' }]} />

      {/* Grid: details and Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Contact details & Map Placeholder */}
        <div className="lg:col-span-6 space-y-8">

          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
              Reach Us
            </span>
            <h2 className="text-3xl font-black text-blue-950">Official Administrative Office</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              We operate transparent physical consultations and tour guiding at our quiet, clean campus blocks in Ngata, Nakuru. Drop by or send us an email.
            </p>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-blue-950 text-sm">Our Location</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{settings.address}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-blue-950 text-sm">Working Hours</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{settings.officeHours}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-blue-950 text-sm">Call Center</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{settings.phone}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-blue-950 text-sm">Email Mailbox</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{settings.email}</p>
              </div>
            </div>

          </div>

          {/* Live Google Maps location controlled through global settings. */}
          <div className="bg-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border-t-4 border-yellow-400">
            <h4 className="font-extrabold text-base mb-2">Our Ngata, Nakuru Location Map</h4>
            <p className="text-blue-100 text-xs leading-relaxed mb-6">
              Located in Ngata, Nakuru, in a clean, safe, guarded, and easily accessible environment ideal for learning.
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-blue-950">
              <iframe
                title="Creative All Stars Academy location on Google Maps"
                src={mapEmbedUrl}
                className="h-64 w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={settings.mapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-xs font-extrabold text-blue-950 transition-colors hover:bg-yellow-300">
              <ExternalLink className="h-4 w-4" /> Open in Google Maps
            </a>
          </div>

        </div>

        {/* Right Column: Large Contact Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-extrabold text-[10px] uppercase rounded-full">
                We’re here to help
              </span>
              <h3 className="text-2xl font-black text-blue-950">Send Us an Instant Message</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Send us your question and a member of our team will respond during school office hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
                <span className="text-3xl">🎉</span>
                <h4 className="font-extrabold text-green-800 text-base">Thank you — your message is on its way.</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Our school team will review your enquiry and get back to you using the contact details provided.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {error && <p className="text-red-500 font-bold bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Wilson Koskei"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. wkoskei@gmail.com"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +254 711..."
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-700 font-bold">Inquiry Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Inquiry on Grade 3 placements"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Your Constructive Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hello academy desk, I want to clarify some transport fees..."
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-medium font-semibold text-gray-700"
                    required
                  />
                </div>

                <TurnstileWidget onToken={setTurnstileToken} />

                <button
                  type="submit"
                  disabled={process.env.NODE_ENV === 'production' && !turnstileToken}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Submit Contact Form
                </button>
              </form>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}
