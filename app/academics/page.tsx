'use client';

import React from 'react';
import { BookOpen, Brain, GraduationCap, HeartHandshake, Languages, Palette, Sigma } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { AboutSectionNav } from '@/components/AboutSectionNav';

const learningAreas = [
  {
    name: 'Mathematics',
    description: 'Learners develop numerical understanding, logical thinking and practical problem-solving skills.',
    icon: Sigma,
  },
  {
    name: 'English and Kiswahili',
    description: 'Language learning builds listening, speaking, reading and writing confidence.',
    icon: Languages,
  },
  {
    name: 'Science and Technology',
    description: 'Learners explore their environment, investigate ideas and apply scientific and technological thinking.',
    icon: Brain,
  },
  {
    name: 'Social Studies',
    description: 'Learning supports an understanding of community, citizenship, culture and the wider world.',
    icon: BookOpen,
  },
  {
    name: 'Religious Education',
    description: 'Age-appropriate learning supports values, character development and respect for others.',
    icon: HeartHandshake,
  },
  {
    name: 'Creative Arts',
    description: 'Creative experiences encourage imagination, expression, collaboration and appreciation of the arts.',
    icon: Palette,
  },
];

const schoolSections = [
  {
    title: 'Early Years',
    description: 'Playgroup, PP1 and PP2 provide supportive, play-based foundations for language, numeracy, creativity, social development and independence.',
  },
  {
    title: 'Primary School',
    description: 'Grades 1 to 6 build knowledge, skills and values through learner-centred classroom experiences and practical application.',
  },
  {
    title: 'Junior School',
    description: 'The school introduced Grade 7 in 2026, extending its competency-based learning pathway into Junior School.',
  },
];

export default function Academics() {
  return (
    <div className="pb-24">
      <AboutSectionNav />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Learning' }]} />

      <section className="border-b border-gray-100 bg-gray-100/50 pb-10 pt-6 sm:pb-14 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            as="h1"
            title="Core Learning Areas"
            subtitle="The school supports balanced academic, practical, creative and values-based development. Exact learning areas vary by level and current curriculum design."
            badge="LEARNING"
          />

          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {learningAreas.map(({ name, description, icon: Icon }) => (
              <article key={name} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <Icon className="h-7 w-7 text-blue-600" />
                <h2 className="mt-5 text-xl font-extrabold text-blue-950">{name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Learning Pathway"
          subtitle="A continuous journey from the early years through primary and into Junior School."
          badge="SCHOOL SECTIONS"
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {schoolSections.map((section, index) => (
            <article key={section.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-widest text-blue-600">Stage {index + 1}</p>
              <h3 className="mt-2 text-xl font-extrabold text-blue-950">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 p-6 text-white shadow-xl sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-yellow-400">Assessment and Progress</p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Supporting progress throughout the learning journey</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100 sm:text-base">
            Teachers use ongoing classroom observation, learner tasks, projects and other age-appropriate assessment methods to understand progress and guide the next steps in learning. The school presented its first KPSEA candidates in 2025.
          </p>
        </div>
      </section>
    </div>
  );
}
