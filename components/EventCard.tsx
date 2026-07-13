'use client';

import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { SchoolEvent } from '@/types';
import { motion } from 'framer-motion';

export const EventCard: React.FC<{ event: SchoolEvent }> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col md:flex-row transition-all duration-300"
    >
      {event.image && (
        <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 font-extrabold text-xs rounded-full uppercase tracking-wider">
              {event.category}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-blue-950 leading-snug">
            {event.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-50 mt-4 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-500" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center gap-1.5 col-span-1 sm:col-span-1 truncate">
            <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
