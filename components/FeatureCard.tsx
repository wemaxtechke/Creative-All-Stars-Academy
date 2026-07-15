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
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-blue-200 border border-gray-100 flex flex-col h-full transition-all duration-300"
    >
      <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl text-[#d50b12] mb-6 border border-yellow-200">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-extrabold text-blue-950 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        {description}
      </p>
    </motion.div>
  );
};
