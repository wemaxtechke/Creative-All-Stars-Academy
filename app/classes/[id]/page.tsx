'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { User, CheckCircle, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function ClassDetails() {
  const { id } = useParams() as { id: string };
  const { classes, teachers } = useApp();

  const selectedClass = classes.find(c => c.id === id);

  if (!selectedClass) {
    notFound();
  }

  const leadTeacher = teachers.find(t => t.id === selectedClass.teacherId);

  return (
    <div className="pb-24">
      <PageHero eyebrow={`${selectedClass.ageGroup} learning pathway`} title={selectedClass.name} description={selectedClass.description} image={selectedClass.image} imageAlt={`${selectedClass.name} learners at Creative All Stars Academy`} cta={{label:'Enquire about this class',href:'/admissions'}}/>

      <Breadcrumbs items={[{ name: 'Classes', href: '/classes' }, { name: selectedClass.name }]} />

      {/* Main Content Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Image, Description, subjects, Activities */}
        <div className="lg:col-span-8 space-y-10">

          {/* Main Visual Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-md max-h-[400px]">
            <img
              src={selectedClass.image}
              alt={selectedClass.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-blue-950">Learning Focus & Philosophy</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {selectedClass.description} Under the Competency-Based Curriculum framework, our students engage in concrete experiential operations. We balance standard literacy guidelines with digital loops, heated swimming schedules, and interactive performance arts.
            </p>
          </div>

          {/* Subjects and Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

            {/* Subjects List */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Core Subjects Handled
              </h3>
              <p className="text-xs text-gray-500 leading-normal">Our vetted instructors direct these main CBC subject blocks daily:</p>
              <div className="space-y-2">
                {selectedClass.subjects.map((sub, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities List */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" /> Classroom Activities
              </h3>
              <p className="text-xs text-gray-500 leading-normal">Promoting spatial motor capacities and collaborative socialization via:</p>
              <div className="space-y-2">
                {selectedClass.activities.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                    <span className="font-semibold">{act}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Class Gallery */}
          {selectedClass.gallery && selectedClass.gallery.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-blue-950">Visual Gallery from {selectedClass.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedClass.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden h-48 shadow-xs border border-gray-100">
                    <img
                      src={imgUrl}
                      alt={`${selectedClass.name} class session`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/classes"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-blue-950 font-bold text-xs rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Classes
          </Link>
        </div>

        {/* Right Column: Lead Teacher Contact and Enrollment info */}
        <div className="lg:col-span-4 space-y-8">

          {/* Teacher Info Card */}
          {leadTeacher && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 text-center">
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Class Lead Educator</span>
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-yellow-400">
                <img
                  src={leadTeacher.image}
                  alt={leadTeacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-blue-950 leading-tight">{leadTeacher.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold uppercase mt-0.5">{leadTeacher.role}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">&ldquo;{leadTeacher.bio}&rdquo;</p>
              <div className="border-t border-gray-50 pt-3">
                <span className="text-[10px] text-gray-400 block font-semibold">Primary Contact Email</span>
                <a href={`mailto:${leadTeacher.email}`} className="text-xs font-bold text-blue-600 hover:underline">{leadTeacher.email}</a>
              </div>
            </div>
          )}

          {/* Quick enrollment card */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-950 rounded-3xl p-6 shadow-sm border-b-4 border-yellow-600 space-y-4">
            <h4 className="font-black text-lg">Interested in enrolling?</h4>
            <p className="text-xs text-blue-950/80 leading-relaxed">
              We operate an active onboarding model with continuous diagnostic interviews to ascertain class placement. Secure your child’s seat today.
            </p>
            <Link
              href="/admissions"
              className="w-full block text-center py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Enroll into {selectedClass.name} Now
            </Link>
          </div>

        </div>

      </section>
    </div>
  );
}
