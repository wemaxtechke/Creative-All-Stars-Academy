'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="relative border-l-2 border-blue-100 ml-4 md:ml-32 py-4 space-y-12 max-w-4xl mx-auto">
      {events.map((evt, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="relative pl-8"
        >
          {/* Year Badge left-aligned on desktop */}
          <div className="absolute top-1.5 -left-[145px] hidden md:block text-right w-28">
            <span className="text-xl font-extrabold text-blue-900 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full shadow-sm">
              {evt.year}
            </span>
          </div>

          {/* Icon node */}
          <div className="absolute top-2 -left-2.5 w-5 h-5 bg-yellow-400 rounded-full border-4 border-white shadow-md" />

          {/* Content Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300">
            {/* Mobile Year display */}
            <span className="inline-block md:hidden text-sm font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-full mb-2">
              {evt.year}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-blue-950 mb-2">
              {evt.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {evt.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
