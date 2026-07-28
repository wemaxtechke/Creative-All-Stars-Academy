'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, GraduationCap, UserRound } from 'lucide-react';
import { Teacher } from '@/types';
import { motion } from 'framer-motion';

export const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex h-full flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md transition-all duration-300 sm:rounded-3xl sm:p-6"
    >
      <div className="relative mb-3 grid h-20 w-20 place-items-center overflow-hidden rounded-full border-[3px] border-yellow-400 bg-blue-50 text-blue-300 shadow-inner sm:mb-5 sm:h-32 sm:w-32 sm:border-4">
        {teacher.image ? <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(min-width: 640px) 128px, 80px"
          className="object-cover"
        /> : <UserRound className="h-9 w-9 sm:h-14 sm:w-14" />}
      </div>

      <span className="px-3 py-1 bg-red-50 text-[#d50b12] font-extrabold text-[10px] uppercase tracking-wider rounded-full mb-2">
        Class Teacher
      </span>

      <h3 className="mb-1 text-sm font-extrabold leading-tight text-blue-950 sm:text-lg">
        {teacher.name}
      </h3>
      <p className="text-xs text-blue-600 font-bold mb-4">
        {teacher.role}
      </p>

      {teacher.bio && (
        <p className="mb-3 line-clamp-3 text-xs leading-5 text-gray-500 sm:mb-4 sm:text-sm sm:leading-relaxed">
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

      {teacher.email && <a
        href={`mailto:${teacher.email}`}
        className="mt-3 flex max-w-full items-center gap-1.5 truncate text-[10px] font-bold text-gray-400 transition-colors hover:text-blue-600 sm:mt-4 sm:text-xs"
      >
        <Mail className="w-3.5 h-3.5" />
        {teacher.email}
      </a>}
    </motion.div>
  );
};
