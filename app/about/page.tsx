'use client';

import Image from 'next/image';
import { Award, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { TeacherCard } from '@/components/TeacherCard';
import { Timeline } from '@/components/Timeline';
import { PageHero } from '@/components/PageHero';
import { schoolHistory, schoolStats } from '@/lib/verified-school-content';

export default function About() {
  const { teachers, getSiteImage } = useApp();
  const missionImage = getSiteImage('about-mission-board');

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Who we are"
        title="A school built around every learner."
        description="Discover the history, purpose and people behind an inclusive education centre committed to every learner’s growth."
        imageSlot="page-about"
        cta={{ label: 'Meet our class teachers', href: '#teachers' }}
      />

      <Breadcrumbs items={[{ name: 'About Us' }]} />

      <section className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-start gap-7 px-4 sm:mt-12 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-700">
            Our Foundation
          </span>
          <h2 className="text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl">
            Growing with our learners since 2017
          </h2>
          <p className="text-base leading-relaxed text-gray-600">
            Creative All Stars Academy began as a preschool in 2017 with 14 learners, three teachers and one driver. In 2020, the school introduced Grade 1 and began its expansion into primary education.
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            The school expanded again in 2023 with the introduction of upper primary classes. Our first KPSEA candidates sat the assessment in 2025, and Junior School opened in 2026.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
              <ShieldCheck className="h-5 w-5 text-blue-600" /> Vision
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              To be an inclusive education centre that develops learners in all aspects of growth.
            </p>
          </div>
          <div className="border-t border-blue-200/60 pt-4">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
              <Award className="h-5 w-5 text-[#d50b12]" /> Mission
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              To provide holistic development and education that enables every learner to realise their full potential.
            </p>
          </div>
          <div className="border-t border-blue-200/60 pt-4">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#d50b12]">School motto</p>
            <p className="mt-2 text-xl font-extrabold text-blue-950">“Endeavour to Succeed”</p>
          </div>
        </div>
      </section>

      {missionImage && (
        <section className="container-shell mt-12 sm:mt-20">
          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white p-3 shadow-xl">
            <Image src={missionImage.url} alt={missionImage.alt} width={1400} height={800} className="h-auto max-h-[720px] w-full rounded-2xl object-contain" />
          </div>
        </section>
      )}

      <section className="mt-16 border-y border-gray-100 bg-gray-100/50 py-14 sm:mt-20">
        <div className="container-shell grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {schoolStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm sm:rounded-3xl sm:p-7">
              <p className="text-2xl font-black text-blue-700 sm:text-3xl">{stat.value}{stat.suffix}</p>
              <p className="mt-2 text-xs font-bold text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Journey Over the Years"
          subtitle="The verified milestones that shaped Creative All Stars Academy from its preschool beginnings to Junior School."
          badge="Timeline Milestones"
        />
        <Timeline events={schoolHistory} />
      </section>

      <section id="teachers" className="mx-auto mt-16 max-w-7xl scroll-mt-28 px-4 sm:mt-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="Meet Our Class Teachers"
          subtitle="The lead educators responsible for each class from Playgroup through Grade 7."
          badge="Teaching Team"
        />
        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}
        </div>
      </section>
    </div>
  );
}
