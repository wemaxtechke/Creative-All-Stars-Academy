'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { JobCard } from '@/components/JobCard';
import { Mail, Briefcase, HelpCircle } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

export default function Careers() {
  const { jobs } = useApp();

  return (
    <div className="pb-24">
      <PageHero eyebrow="Build meaningful careers" title="Do work that shapes a child’s future." description="Join a caring, creative team committed to professional excellence and inclusive learner development." image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=1200&auto=format&fit=crop" imageAlt="Professional educator ready to support learners"/>

      <Breadcrumbs items={[{ name: 'Careers' }]} />

      {/* Main jobs listing section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <SectionHeader
          title="Explore Our Active Openings & Support Positions"
          subtitle="All teaching applicants must be fully registered with the Teachers Service Commission (TSC). Support cleaners and operators must possess Certificate of Good Conduct."
          badge="VETTED CAREERS"
        />

        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl max-w-xl mx-auto space-y-4">
            <span className="text-4xl">💼</span>
            <h4 className="font-black text-blue-950 text-lg">No openings right now</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Our faculty block is currently full. Stay updated by bookmarking this page or dropping your CV at our Ngata office.</p>
          </div>
        )}
      </section>

      {/* General career notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-blue-50/50 p-6 md:p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs font-semibold">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-extrabold text-blue-950 text-base">Spontaneous Applications</h4>
            <p className="text-gray-600 leading-relaxed">
              Don&apos;t see a position that matches your exact profile? Send your resume, cover letter, and copies of your TSC credentials spontaneously to our recruitment email. We evaluate top performers termly.
            </p>
          </div>
          <a
            href="mailto:careers@creativeallstars.ac.ke"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-center flex items-center justify-center gap-1.5 transition-all"
          >
            <Mail className="w-4 h-4" />
            Email Recruitment Desk
          </a>
        </div>
      </section>
    </div>
  );
}
