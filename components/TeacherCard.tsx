'use client';

import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';
import { Teacher } from '@/types';
import { motion } from 'framer-motion';

export const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 h-full"
    >
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-yellow-400 shadow-inner">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="px-3 py-1 bg-green-100 text-green-700 font-extrabold text-[10px] uppercase tracking-wider rounded-full mb-2">
        TSC Certified
      </span>

      <h3 className="font-extrabold text-lg text-blue-950 mb-1 leading-tight">
        {teacher.name}
      </h3>
      <p className="text-xs text-blue-600 font-bold mb-4">
        {teacher.role}
      </p>

      {teacher.bio && (
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {teacher.bio}
        </p>
      )}

      {teacher.subjects && teacher.subjects.length > 0 && (
        <div className="mt-auto w-full pt-4 border-t border-gray-50">
          <p className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2 flex items-center justify-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Key Specializations
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {teacher.subjects.map((subj, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg"
              >
                {subj}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={`mailto:${teacher.email}`}
        className="mt-4 text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
      >
        <Mail className="w-3.5 h-3.5" />
        {teacher.email}
      </a>
    </motion.div>
  );
};
