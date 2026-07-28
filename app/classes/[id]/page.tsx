'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { UserRound, CheckCircle, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function ClassDetails() {
  const { id } = useParams() as { id: string };
  const { classes, teachers, getSiteImage } = useApp();

  const selectedClass = classes.find(c => c.id === id);

  if (!selectedClass) {
    notFound();
  }

  const leadTeacher = teachers.find(t => t.id === selectedClass.teacherId);
  const classImage=getSiteImage(`class-${selectedClass.id}`);

  return (
    <div className="pb-12 sm:pb-24">
      <PageHero eyebrow={`${selectedClass.ageGroup} learning pathway`} title={selectedClass.name} description={selectedClass.description} image={classImage?.url} imageAlt={classImage?.alt} cta={{label:'Enquire about this class',href:'/admissions'}}/>

      <Breadcrumbs items={[{ name: 'Classes', href: '/classes' }, { name: selectedClass.name }]} />

      {/* Main Content Details Grid */}
      <section className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-7 px-4 sm:mt-12 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:px-8">

        {/* Left Column: Image, Description, subjects, Activities */}
        <div className="lg:col-span-8 space-y-10">

          {/* Main Visual Image */}
          {classImage&&<div className="relative rounded-3xl overflow-hidden shadow-md max-h-[400px]">
            <img
              src={classImage.url}
              alt={classImage.alt}
              className="w-full h-full object-cover"
            />
          </div>}

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-blue-950">Learning Focus & Philosophy</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {selectedClass.description} Learning is delivered through Kenya’s Competency-Based Education framework, with age-appropriate experiences that build knowledge, skills, values and learner agency.
            </p>
          </div>

          {/* Subjects and Activities Grid */}
          <div className="grid grid-cols-1 gap-4 pt-2 min-[520px]:grid-cols-2 sm:gap-8 sm:pt-4">

            {/* Subjects List */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:space-y-4 sm:rounded-3xl sm:p-6 md:p-8">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Core Subjects Handled
              </h3>
              <p className="text-xs text-gray-500 leading-normal">Learning areas are aligned with the relevant competency-based curriculum designs.</p>
              <div className="space-y-2">
                {selectedClass.subjects.length > 0 ? selectedClass.subjects.map((sub, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{sub}</span>
                  </div>
                )) : <p className="text-sm font-medium text-gray-500">Contact the school for the current learning-area breakdown.</p>}
              </div>
            </div>

            {/* Activities List */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:space-y-4 sm:rounded-3xl sm:p-6 md:p-8">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" /> Classroom Activities
              </h3>
              <p className="text-xs text-gray-500 leading-normal">Activities are planned by the class teacher for the current learning programme.</p>
              <div className="space-y-2">
                {selectedClass.activities.length > 0 ? selectedClass.activities.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                    <span className="font-semibold">{act}</span>
                  </div>
                )) : <p className="text-sm font-medium text-gray-500">Current classroom activities are shared by the class teacher.</p>}
              </div>
            </div>

          </div>

          {/* Class Gallery */}
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
              <div className="relative mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-yellow-400 bg-blue-50">
                {leadTeacher.image ? <img
                  src={leadTeacher.image}
                  alt={leadTeacher.name}
                  className="w-full h-full object-cover"
                /> : <UserRound className="h-10 w-10 text-blue-300"/>}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-blue-950 leading-tight">{leadTeacher.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold uppercase mt-0.5">{leadTeacher.role}</p>
              </div>
              {leadTeacher.bio && <p className="text-xs text-gray-500 leading-relaxed italic">&ldquo;{leadTeacher.bio}&rdquo;</p>}
              {leadTeacher.email && <div className="border-t border-gray-50 pt-3">
                <span className="text-[10px] text-gray-400 block font-semibold">Primary Contact Email</span>
                <a href={`mailto:${leadTeacher.email}`} className="text-xs font-bold text-blue-600 hover:underline">{leadTeacher.email}</a>
              </div>}
            </div>
          )}

          {/* Quick enrollment card */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-950 rounded-3xl p-6 shadow-sm border-b-4 border-yellow-600 space-y-4">
            <h4 className="font-black text-lg">Interested in enrolling?</h4>
            <p className="text-xs text-blue-950/80 leading-relaxed">
              Contact the admissions team to ask about this class, the placement process and the documents required for enrolment.
            </p>
            <Link
              href="/admissions"
              className="w-full block text-center py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Enquire about {selectedClass.name}
            </Link>
          </div>

        </div>

      </section>
    </div>
  );
}
