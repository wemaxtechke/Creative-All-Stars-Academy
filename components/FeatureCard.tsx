'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-6 md:p-8"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 text-xl text-[#d50b12] sm:mb-6 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-extrabold leading-tight text-blue-950 sm:mb-3 sm:text-lg md:text-xl">
        {title}
      </h3>
      <p className="flex-grow text-xs leading-5 text-gray-600 sm:text-sm sm:leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
