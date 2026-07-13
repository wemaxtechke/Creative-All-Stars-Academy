'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <div className="relative bg-blue-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl text-white max-w-4xl mx-auto border-t-4 border-yellow-400">
      {/* Absolute Decorative elements */}
      <div className="absolute right-6 top-6 opacity-10">
        <Quote className="w-40 h-40" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex flex-col items-center text-center space-y-6"
        >
          {/* Avatar */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-5 h-5 ${
                  idx < current.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl text-blue-100 italic">
            &ldquo;{current.content}&rdquo;
          </p>

          {/* Author */}
          <div>
            <h4 className="text-lg font-extrabold text-yellow-400 leading-tight">
              {current.name}
            </h4>
            <span className="text-xs text-blue-200 uppercase tracking-widest font-bold">
              {current.role}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="p-3 bg-blue-800/80 hover:bg-yellow-400 hover:text-blue-950 rounded-full transition-all shadow-md focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? 'w-6 bg-yellow-400' : 'w-2.5 bg-blue-800'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-3 bg-blue-800/80 hover:bg-yellow-400 hover:text-blue-950 rounded-full transition-all shadow-md focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
