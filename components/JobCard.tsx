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
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all duration-300"
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

        <h3 className="text-xl font-extrabold text-blue-950 hover:text-blue-600 transition-colors">
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

      <div className="flex items-center gap-3">
        <Link
          href={`/careers/${job.id}`}
          className="w-full md:w-auto px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm rounded-xl transition-colors text-center"
        >
          View Details
        </Link>
        <Link
          href={`/careers/${job.id}?apply=true`}
          className="w-full md:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-extrabold text-sm rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
