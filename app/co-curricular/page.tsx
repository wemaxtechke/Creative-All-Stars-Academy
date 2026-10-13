'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AboutSectionNav } from '@/components/AboutSectionNav';
import { coCurricularActivities } from '@/lib/verified-school-content';

const activityGroups = [
  {
    id: 'wellbeing',
    label: 'Wellbeing',
    title: 'Feeling good. Growing strong.',
    description: 'A caring space to build healthy habits, make good choices and feel supported.',
    accent: 'bg-[#0739a6]',
    names: ['Guidance and Counselling', 'Health Club'],
  },
  {
    id: 'expression',
    label: 'Expression',
    title: 'Every learner has a voice.',
    description: 'Opportunities to share ideas, tell stories and find confidence in creative expression.',
    accent: 'bg-[#d50b12]',
    names: ['Journalism', 'Drama and Music', 'Debate'],
  },
  {
    id: 'teamwork',
    label: 'Teamwork',
    title: 'Discover what we can do together.',
    description: 'Shared challenges that bring learners together and help leadership take root.',
    accent: 'bg-[#ffc400]',
    names: ['Games and Sports', 'Scouting'],
  },
];

export default function CoCurricular() {
  return (
    <div className="bg-[#f8fafc] pb-14 sm:pb-20">
      <AboutSectionNav />
      <Breadcrumbs items={[{ name: 'About', href: '/about' }, { name: 'Activities' }]} />

      <section id="explore-activities" aria-labelledby="explore-heading" className="container-shell scroll-mt-44 pt-2 sm:pt-6">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 sm:gap-7 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Co-curricular activities</p>
            <h1 id="explore-heading" className="brand-title mt-3 text-[1.9rem] font-extrabold leading-tight text-[#031f66] sm:text-3xl lg:text-4xl">Find what sparks their interest.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Guided experiences that complement classroom learning.</p>
          </div>
          <nav aria-label="Activity areas" className="flex flex-wrap gap-2">
            {activityGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold sm:gap-2.5 sm:px-4 sm:text-sm text-[#031f66] transition hover:border-[#0739a6] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0739a6]">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${group.accent}`} />{group.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-slate-200">
          {activityGroups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="grid scroll-mt-44 gap-5 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12 lg:py-12">
              <div>
                <div aria-hidden="true" className={`mb-4 h-1 w-10 rounded-full ${group.accent}`} />
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-slate-500">{group.label}</p>
                <h2 id={`${group.id}-heading`} className="brand-title mt-2 max-w-xs text-2xl font-extrabold leading-tight text-[#031f66] sm:text-[1.75rem]">{group.title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{group.description}</p>
              </div>
              <div className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
                {group.names.map((name) => {
                  const activity = coCurricularActivities.find((item) => item.name === name);
                  if (!activity) return null;
                  return (
                    <article key={activity.name} className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${group.names.length % 2 === 1 && name === group.names.at(-1) ? 'sm:col-span-2' : ''}`}>
                      <h3 className="brand-title text-lg font-extrabold leading-6 text-[#031f66] sm:text-xl sm:leading-7">{activity.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{activity.description}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section aria-labelledby="participation-heading" className="container-shell mt-4 sm:mt-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#031f66] p-6 text-white sm:rounded-3xl sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[#ffc400]" />
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffc400] sm:text-xs">Let’s find their next interest</p>
            <h2 id="participation-heading" className="brand-title mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">A little curiosity goes a long way.</h2>
            <p className="mt-3 text-sm leading-7 text-blue-100">Talk to our team about this term’s schedules, available sessions and how your child can take part.</p>
          </div>
          <Link href="/contact" className="mt-6 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-[#ffc400] px-6 py-3 text-sm font-extrabold text-[#031f66] transition hover:bg-[#ffda59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto lg:mt-0">
            Ask about activities <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
