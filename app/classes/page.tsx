'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { GraduationCap, ArrowRight, UserCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Classes() {
  const { classes } = useApp();

  return (
    <div className="pb-24">
      {/* Banner / Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 text-center border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our School Classes</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            From playful playgroup blocks to highly-motivated junior secondary levels, explore our custom grade blocks.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: 'Classes' }]} />

      {/* Main classes listing section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SectionHeader
          title="Browse Early Childhood, Primary & Junior School Blocks"
          subtitle="Click on any card to view detailed learning schedules, certified classroom teachers, specialized subjects, and active co-curriculars."
          badge="10 SPECIFIED CARDS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-blue-600 text-white font-extrabold text-xs rounded-lg uppercase shadow-sm">
                  {cls.ageGroup}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-blue-950 mb-2">{cls.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                  {cls.description}
                </p>

                {/* Subject Preview Tags */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Core Subjects
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cls.subjects.slice(0, 3).map((sub, sidx) => (
                      <span key={sidx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                        {sub}
                      </span>
                    ))}
                    {cls.subjects.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-bold pl-1">+{cls.subjects.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Footer link to Dynamic Detail page */}
                <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold text-gray-500">TSC Certified Lead</span>
                  </div>

                  <Link
                    href={`/classes/${cls.id}`}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all"
                  >
                    View Class Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
