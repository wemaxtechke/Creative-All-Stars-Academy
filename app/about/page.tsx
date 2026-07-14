'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { TeacherCard } from '@/components/TeacherCard';
import { Timeline } from '@/components/Timeline';
import { ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';

export default function About() {
  const { teachers, settings } = useApp();

  const historyPoints = [
    {
      year: '2016',
      title: 'Academy Foundation',
      description: 'Creative All Stars Academy co-founded in Milimani, Nakuru, starting with just 2 preschool blocks, 12 playgroup children, and 3 teachers under Mrs. Bevalyne.'
    },
    {
      year: '2018',
      title: 'CBC Curriculum Pioneer Adopt',
      description: 'Became one of the pioneer private institutions in Nakuru County to adopt Kenya’s new Competency-Based Curriculum, introducing music and environmental projects.'
    },
    {
      year: '2021',
      title: 'Primary Wing Completion',
      description: 'Inaugurated our Grade 1 to 6 primary classroom blocks, state-of-the-art ICT computer labs, and sand playgrounds.'
    },
    {
      year: '2023',
      title: 'Water Heated Pool & Sports',
      description: 'Completed our fully heated medium-sized swimming pool block and co-curricular sports complex, clinching county athletic medals.'
    },
    {
      year: '2025',
      title: 'Junior Secondary Launch',
      description: 'Launched our modern Junior Secondary school block, integrating advanced pre-technical sciences, coding libraries, and creative arts congresses.'
    }
  ];

  const coreValues = [
    { title: 'Creativity', desc: 'Unlocking raw artistic and logical imagination to solve challenging, multi-faceted problems.', icon: '🎨' },
    { title: 'Academic Excellence', desc: 'Fostering disciplined mastery in science, languages, and technical computations under CBC.', icon: '⭐' },
    { title: 'Integrity', desc: 'Nurturing honest, highly-vetted community actions and responsible citizens of Nakuru.', icon: '🤝' },
    { title: 'Inclusivity', desc: 'Accepting and supporting child growth pathways with warmth and individualized learning.', icon: '❤️' },
    { title: 'Leadership', desc: 'Mentoring young stars to speak up, coordinate teams, and drive social positive change.', icon: '👑' }
  ];

  const achievements = [
    'Ranked among the Top 5 Best Performing CBC Schools in Nakuru County.',
    'Championship soccer trophy winners (Under-11 Academy Stars FC).',
    'National Drama and Music Festival finalists (2023 and 2024 seasons).',
    '100% Transition records for Pre-Primary to Primary transitions.',
    'Highly praised for our safe, heated, and child-safe swimming program.'
  ];

  return (
    <div className="pb-24">
      {/* Banner / Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 text-center border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Our Academy</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Get an inside look at our history, core mission, vision, achievements, leadership, and the teachers who shape future stars.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: 'About Us' }]} />

      {/* History and Director section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
            Our Foundation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
            Co-founded with a Clear Mission
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Founded in the beautiful city of Nakuru in 2016, <strong>Creative All Stars Academy</strong> was born out of a desire to break away from standard rote memorization education. We recognized that true talent development requires an intentional merge of solid academics, technology integration, performance arts, and athletics.
          </p>
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-4">
            <div>
              <h4 className="text-blue-950 font-extrabold text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" /> Vision Statement
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                To be the leading academy in Kenya that inspires childhood creativity, nurtures global-ready leaders, and guarantees academic excellence through a competency-based focus.
              </p>
            </div>
            <div className="border-t border-blue-200/50 pt-4">
              <h4 className="text-blue-950 font-extrabold text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" /> Mission Statement
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                To deliver comprehensive, secure, and practical early childhood and primary programs. We leverage technology, visual-performing arts, and active athletics to unlock every child’s potential.
              </p>
            </div>
          </div>
        </div>

        {/* Principal message card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-full bg-yellow-400" />
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                alt="Mrs. Bevalyne"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-blue-950">Mrs. Bevalyne</h3>
              <p className="text-xs text-blue-600 font-bold">School Director</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed italic">
            &ldquo;At Creative All Stars Academy, we believe that education is not about filling a bucket, but about lighting a fire. Every child walking through our Milimani campus is treated as a unique star with distinct capabilities. We provide the labs, the playing fields, the heated pool, and the musical instruments to make sure they shine brightly in academics, technology, and life. We welcome you to our growing family.&rdquo;
          </p>
        </div>
      </section>

      {/* Core values section */}
      <section className="bg-gray-100/50 py-16 border-y border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Non-Negotiable Core Values"
            subtitle="These key tenets guide our daily classroom schedules, extracurricular behavior, and staff interactions."
            badge="Cultural Pillars"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center space-y-3">
                <div className="text-3xl">{val.icon}</div>
                <h3 className="font-extrabold text-blue-950 text-base">{val.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          title="Our Journey Over the Years"
          subtitle="Explore the key milestones and expansions we have achieved since we opened our doors in Nakuru."
          badge="Timeline Milestones"
        />
        <Timeline events={historyPoints} />
      </section>

      {/* Leadership & Vetted Teachers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          title="Meet Our Vetted Faculty"
          subtitle="We hire highly certified, TSC registered teachers specialized in Early Learning and Primary Competency-Based Curriculum frameworks."
          badge="FACULTY TEAM"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>

      {/* Key Achievements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-blue-950 font-extrabold text-xs uppercase tracking-widest rounded-full">
              Key Achievements
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Recognized Excellence in Nakuru County
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our commitment to delivering structured, high-end child education has received incredible feedback and trophies. We are recognized as an educational benchmark in the region.
            </p>
          </div>
          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm md:text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
