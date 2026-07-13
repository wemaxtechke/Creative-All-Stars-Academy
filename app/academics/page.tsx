'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { BookOpen, Calendar, HelpCircle, GraduationCap, Laptop, Sparkles, Award } from 'lucide-react';
import { subjects } from '@/data/mockData';

export default function Academics() {
  const academicTerms = [
    { name: 'Term 1 (Opening & Foundation)', span: 'Early January - Early April', focus: 'Literacy baselines, swimming initiations, introductory science modules.' },
    { name: 'Term 2 (Athletics & Mid-Year)', span: 'May - Early August', focus: 'Annual Track & Field Sports Day, Music Drama Galas, continuous assessments.' },
    { name: 'Term 3 (KPSEA & Transition)', span: 'September - Late November', focus: 'Grade 6 KPSEA Exams prep, PP2 transitions, end of year project defense.' }
  ];

  return (
    <div className="pb-24">
      {/* Banner / Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 text-center border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Academic Curriculum</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Providing 100% compliant Competency-Based Curriculum (CBC) that shifts emphasis from rote theory to practical life competencies.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: 'Academics' }]} />

      {/* 1. CBC philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
            CBC Methodology
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
            Nurturing Core Competencies for the Future
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            The Competency-Based Curriculum (CBC) shifts classroom focus from memorizing textbooks to acquiring practical life skills. Our pedagogical philosophy at Creative All Stars emphasizes visual, auditory, and kinesthetic styles, ensuring that no child is left behind.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <Laptop className="w-6 h-6 text-blue-600" />
              <h4 className="font-extrabold text-blue-950 text-sm">Digital Literacy</h4>
              <p className="text-gray-500 text-xs">Coding, basic Scratch scripts, and interactive software modules are taught starting in Grade 1.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <GraduationCap className="w-6 h-6 text-green-600" />
              <h4 className="font-extrabold text-blue-950 text-sm">Critical Analysis</h4>
              <p className="text-gray-500 text-xs">Students defend projects, debate logic, and design solutions to community problems.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop"
            alt="Students in classroom studying"
            className="rounded-3xl shadow-lg w-full h-[350px] object-cover"
          />
        </div>
      </section>

      {/* 2. Subjects Grid */}
      <section className="bg-gray-100/50 py-16 border-y border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Subjects Offered Under CBC"
            subtitle="Explore our comprehensive list of academic disciplines taught by TSC certified subject specialists."
            badge="SUBJECT BLOCKS"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subj) => (
              <div key={subj.id} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 font-extrabold text-xs rounded-lg uppercase">
                      {subj.code}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-blue-950">{subj.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{subj.description}</p>
                </div>

                <div className="border-t border-gray-50 pt-4 mt-6">
                  <p className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Key Outcomes</p>
                  <ul className="space-y-1.5">
                    {subj.learningOutcomes.map((out, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-start gap-1.5 leading-tight">
                        <span className="text-green-500 font-extrabold mt-0.5">✓</span>
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          title="Academic Departments"
          subtitle="Our curriculum is carefully streamlined into three main operational branches to assure focused pedagogical instruction."
          badge="FACULTY DEPARTMENTS"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto">🎨</div>
            <h3 className="text-xl font-extrabold text-blue-950">Early Years Education (EYE)</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Coordinating Playgroup, PP1, and PP2 classes. Focusing on play-based motor coordination, language baselines, and emotional growth.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto">🌱</div>
            <h3 className="text-xl font-extrabold text-blue-950">Primary School Wing</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Coordinating Grades 1 through 6. Deepening scientific concepts, mathematics operations, physical education, and preparatory KPSEA exams.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto">💻</div>
            <h3 className="text-xl font-extrabold text-blue-950">Junior Secondary Block</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Coordinating Grades 7 through 9. Introducing pre-technical skills, integrated lab sciences, advanced computing loops, and career counseling.</p>
          </div>
        </div>
      </section>

      {/* 4. Assessment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-blue-950 font-extrabold text-xs uppercase tracking-widest rounded-full">
              Assessment Standards
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">How We Measure Student Competency</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We abandon standard final-exam pressure. Under CBC, children are continuously evaluated throughout the term using visual, oral, and project-based milestones.
            </p>
            <div className="space-y-3 pt-2 text-sm text-gray-300">
              <p><strong>EE (Exceeding Expectation)</strong>: Demonstrates complete mastery and innovates beyond the task.</p>
              <p><strong>ME (Meeting Expectation)</strong>: Performs and completes the task requirements correctly.</p>
              <p><strong>AE (Approaching Expectation)</strong>: Developing skill baselines, needs minor supervision.</p>
            </div>
          </div>

          <div className="space-y-6 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="text-xl font-extrabold text-yellow-400">Academic Calendar Span</h3>
            <div className="space-y-4">
              {academicTerms.map((term, idx) => (
                <div key={idx} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <span className="text-xs text-green-400 font-extrabold uppercase tracking-wider">{term.span}</span>
                  <h4 className="font-bold text-sm text-white mt-1">{term.name}</h4>
                  <p className="text-xs text-gray-300 leading-normal mt-0.5">{term.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
