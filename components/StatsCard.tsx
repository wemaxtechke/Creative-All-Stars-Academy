'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string;
  icon: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/15 sm:rounded-3xl sm:p-6 md:p-8"
    >
      <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-lg shadow-md sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
        {icon}
      </div>
      <h3 className="mb-1 text-2xl font-extrabold tracking-tight sm:mb-2 sm:text-3xl md:text-4xl">
        {value}
      </h3>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-100 sm:text-sm">
        {label}
      </p>
    </motion.div>
  );
};
