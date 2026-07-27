'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Job } from '@/types';
import { motion } from 'framer-motion';

export const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:rounded-3xl sm:p-6 md:flex-row md:items-center md:gap-6 md:p-8"
    >
      <div className="space-y-3 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-extrabold text-xs rounded-lg uppercase tracking-wider">
            {job.type}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-lg">
            {job.department}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-blue-950 transition-colors hover:text-blue-600 sm:text-xl">
          <Link href={`/careers/${job.id}`}>
            {job.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-semibold">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-500" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-red-500">
            <Calendar className="w-4 h-4" />
            Deadline: {job.deadline}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-2 sm:gap-3">
        <Link
          href={`/careers/${job.id}`}
          className="w-full rounded-xl border-2 border-blue-600 px-3 py-3 text-center text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50 sm:px-6 sm:text-sm md:w-auto"
        >
          View Details
        </Link>
        <Link
          href={`/careers/${job.id}?apply=true`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-yellow-400 px-3 py-3 text-center text-xs font-extrabold text-blue-950 shadow-sm transition-all hover:bg-yellow-500 sm:px-6 sm:text-sm md:w-auto"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
