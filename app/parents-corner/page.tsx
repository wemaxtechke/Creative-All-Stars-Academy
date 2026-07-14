'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FileText, Download, ShieldCheck, CheckCircle } from 'lucide-react';

export default function ParentsCorner() {
  const { downloads, faqs } = useApp();

  const rules = [
    'Punctuality is critical. Students must be settled in classrooms by 7:45 AM daily.',
    'Official uniform guides must be strictly followed. Sweaters must feature the embroidered star logo.',
    'Bullying, bad language, or physical aggression will guarantee instant suspension.',
    'Mobile phones, iPads, or electronic toys are strictly banned on our campus blocks.',
    'No learner is allowed off campus during hours without verified parent permissions.'
  ];

  const uniformGuides = [
    { item: 'Boys Primary Set', details: 'Royal Blue shorts, Sky Blue shirts, Navy Blue socks with yellow bands, and black leather shoes.' },
    { item: 'Girls Primary Set', details: 'Royal Blue pinafores / skirts, Sky Blue blouses, white socks, and black leather shoes.' },
    { item: 'Early Years (EYE)', details: 'Custom colorful checkered sweaters, elastic blue trousers / skirts, and velcro shoes.' },
    { item: 'Physical PE Days', details: 'Official white tracksuits, custom yellow star sports polo, and rubber running trainers.' }
  ];

  return (
    <div className="pb-24">
      {/* Banner / Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 text-center border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Parents Corner</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Get instant access to term assignments, official uniform buy guides, school calendars, rules, and downloadables.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: 'Parents Corner' }]} />

      {/* Downloads Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SectionHeader
          title="Instant Documents & Holiday Assignments"
          subtitle="Download official files directly. These resources are compiled termly by the school directorate."
          badge="DOWNLOADS CENTRE"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 font-extrabold text-[10px] uppercase rounded-lg tracking-wider">
                  Category: {item.category}
                </span>
                <h4 className="font-extrabold text-blue-950 text-sm md:text-base leading-snug">{item.title}</h4>
              </div>

              <div className="border-t border-gray-50 pt-4 mt-6 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{item.fileType} • {item.fileSize}</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Starting download for: ${item.title}`);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download File
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules and Uniform Grid */}
      <section className="bg-gray-100/50 py-16 border-y border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Rules Block */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-2xl font-black text-blue-950 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" /> Non-Negotiable School Rules
            </h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              To support an elite discipline block at our Ngata campus, parents must guide children on these core code rules daily:
            </p>
            <div className="space-y-4 pt-2">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Uniform Guide Block */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-2xl font-black text-blue-950">Uniform & Dressing Standards</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              We maintain absolute standard brand colors. Official star-embroidered sweaters are purchasable from official Nakuru vendors:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {uniformGuides.map((guide, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <h5 className="font-extrabold text-xs text-blue-950 uppercase tracking-tight">{guide.item}</h5>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-semibold">{guide.details}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Parents FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          title="Parents General Frequently Asked Questions"
          subtitle="Quick answers to transport buses, continuous CBC assessments, and swimming schedules."
          badge="FAQ ACCORDION"
        />
        <FAQAccordion items={faqs.filter(f => f.category === 'General' || f.category === 'Parents')} />
      </section>
    </div>
  );
}
