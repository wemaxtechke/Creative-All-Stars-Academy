'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { PageHero } from '@/components/PageHero';
import { coCurricularActivities } from '@/lib/verified-school-content';

export default function CoCurricular() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Beyond the classroom"
        title="Talent grows when children get to try."
        description="Our co-curricular programme creates space for wellbeing, creativity, teamwork, leadership and confident expression."
        imageSlot="page-activities"
        cta={{ label: 'View school life', href: '/gallery' }}
      />

      <Breadcrumbs items={[{ name: 'Co-Curricular' }]} />

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Co-Curricular Activities"
          subtitle="Learners can explore a range of guided activities alongside their classroom learning."
          badge="Whole-Learner Development"
        />

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {coCurricularActivities.map((activity, index) => (
            <article key={activity.name} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
              <span className="absolute right-4 top-3 text-5xl font-black text-blue-50">{String(index + 1).padStart(2, '0')}</span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700"><Sparkles className="h-5 w-5" /></span>
              <h2 className="relative mt-5 text-lg font-black text-blue-950">{activity.name}</h2>
              <p className="relative mt-2 text-sm leading-6 text-gray-500">{activity.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-blue-950 p-6 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-yellow-400">Participation information</p>
            <h2 className="mt-2 text-2xl font-extrabold">Ask about current activity schedules</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">Available sessions and participation arrangements are shared by the school administration each term.</p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-extrabold text-blue-950">
            Contact the school <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
