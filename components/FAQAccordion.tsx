'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQAccordion: React.FC<{ items: FAQ[] }> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-blue-950 focus:outline-none"
            >
              <span className="text-base md:text-lg leading-tight">{item.question}</span>
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-transform">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-50 pt-3">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
