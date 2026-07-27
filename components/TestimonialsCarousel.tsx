'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/AppContext';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const TestimonialsCarousel: React.FC = () => {
  const { testimonials } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  if (testimonials.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#0739a6,#0b46bd)] p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,.22)] sm:p-5">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-full w-1 bg-[#d50b12]"/>
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[22px] border-white/5"/>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={reduceMotion?{opacity:1}:{opacity:0,x:20}}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion?{opacity:0}:{opacity:0,x:-20}}
          transition={{ duration: reduceMotion?0:0.3 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#ffc400] shadow-lg sm:h-14 sm:w-14">
              <Image
                src={current.avatar}
                alt={current.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3.5 w-3.5 ${
                      idx < current.rating ? 'fill-current text-[#ffc400]' : 'text-blue-300/50'
                    }`}
                  />
                ))}
              </div>
              <h4 className="mt-1.5 truncate text-sm font-extrabold leading-tight text-white sm:text-base">
                {current.name}
              </h4>
              <span className="mt-0.5 block truncate text-[9px] font-bold uppercase tracking-[.14em] text-blue-200">
                {current.role}
              </span>
            </div>
          </div>

          <p className="mt-4 line-clamp-4 text-sm font-medium leading-6 text-blue-50">
            &ldquo;{current.content}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <button
          onClick={handlePrev}
          className="grid h-8 w-8 place-items-center rounded-full bg-[#031f66]/45 text-white shadow-md transition hover:bg-[#ffc400] hover:text-[#031f66] focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeIndex ? 'w-6 bg-[#ffc400]' : 'w-1.5 bg-blue-200/30 hover:bg-blue-100'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="grid h-8 w-8 place-items-center rounded-full bg-[#031f66]/45 text-white shadow-md transition hover:bg-[#ffc400] hover:text-[#031f66] focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
