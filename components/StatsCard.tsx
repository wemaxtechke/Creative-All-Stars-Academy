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
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 text-center text-white border border-white/10 shadow-lg hover:bg-white/15 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        {value}
      </h3>
      <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
};
