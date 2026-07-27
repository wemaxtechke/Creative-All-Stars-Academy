'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { SchoolEvent } from '@/types';
import { motion } from 'framer-motion';

export const EventCard: React.FC<{ event: SchoolEvent; compact?: boolean }> = ({ event, compact = false }) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        className="flex min-h-[160px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_14px_35px_rgba(3,31,102,.08)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(3,31,102,.13)]"
      >
        {event.image && (
          <div className="relative w-28 shrink-0 overflow-hidden bg-slate-100 sm:w-[34%] sm:min-w-[150px]">
            <Image src={event.image} alt={event.title} fill sizes="(min-width: 640px) 220px, 100vw" className="object-cover"/>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-5">
          <div>
            <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#d50b12]">{event.category}</span>
            <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-blue-950">{event.title}</h3>
            <p className="mt-2 hidden line-clamp-2 text-sm leading-6 text-slate-500 min-[390px]:block">{event.description}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 shrink-0 text-blue-500"/>{event.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0 text-blue-500"/><span className="truncate">{event.time}</span></span>
            <span className="col-span-2 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0 text-[#d50b12]"/><span className="truncate">{event.location}</span></span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -4 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:rounded-3xl md:flex-row"
    >
      {event.image && (
        <div className="relative h-36 flex-shrink-0 overflow-hidden bg-gray-100 sm:h-48 md:h-auto md:w-1/3">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-grow flex-col justify-between p-4 sm:p-6 md:p-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-red-50 text-[#d50b12] font-extrabold text-xs rounded-full uppercase tracking-wider">
              {event.category}
            </span>
          </div>

          <h3 className="text-base font-extrabold leading-snug text-blue-950 sm:text-xl">
            {event.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-50 pt-4 text-[11px] font-bold text-gray-600 sm:grid-cols-3 sm:gap-4 sm:pt-6 sm:text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-500" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center gap-1.5 col-span-1 sm:col-span-1 truncate">
            <MapPin className="w-4 h-4 text-[#d50b12] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
