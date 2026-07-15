'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { Calendar, User, Clock, CheckCircle } from 'lucide-react';
import { coCurricularActivities } from '@/data/mockData';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/PageHero';

export default function CoCurricular() {
  return (
    <div className="pb-24">
      <PageHero eyebrow="Beyond the classroom" title="Talent grows when children get to try." description="Sport, swimming, music, drama, coding and clubs create space for confidence, teamwork and joyful discovery." image="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=85&w=1200&auto=format&fit=crop" imageAlt="Children participating in school sports" cta={{label:'View school life',href:'/gallery'}}/>

      <Breadcrumbs items={[{ name: 'Co-Curricular' }]} />

      {/* Main Clubs Grid listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SectionHeader
          title="Explore Our Active Clubs & Physical Sports Activities"
          subtitle="Explore the schedules, trained coaches, and physical equipment dedicated to nurturing raw creative stars."
          badge="ACTIVE CLUBS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coCurricularActivities.map((club, idx) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full transition-all duration-300"
            >
              {/* Image Block */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-blue-950 mb-2">{club.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">
                  {club.description}
                </p>

                {/* Meta details */}
                <div className="border-t border-gray-50 pt-4 mt-auto space-y-2 text-[11px] font-bold text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>Schedule: {club.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Lead Coach: {club.instructor}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-blue-950 font-extrabold text-xs uppercase tracking-widest rounded-full">
              Registration Info
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold">How to Sign Up for Clubs</h2>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Every student is encouraged to participate in at least one physical sport and one creative performance club. Registrations open during the first week of every term through our online portal.
            </p>
          </div>

          <div className="space-y-3 border-l-0 lg:border-l lg:border-white/10 lg:pl-12">
            <div className="flex items-start gap-2 text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Free enrollment for up to two active clubs.</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Fully trained, TSC vetted, and county-certified safety coaches.</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Full transport safety services home after clubs conclude (5 PM).</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
