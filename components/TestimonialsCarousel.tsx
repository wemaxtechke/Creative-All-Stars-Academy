'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/AppContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#0739a6,#0b46bd)] p-6 text-white shadow-[0_28px_70px_rgba(0,0,0,.25)] sm:p-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d50b12] via-[#ffc400] to-[#0739a6]"/>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-full w-1 bg-[#d50b12]"/>
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[28px] border-white/5"/>
      <Quote aria-hidden="true" className="absolute right-6 top-5 h-28 w-28 text-white/[.06]"/>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={reduceMotion?{opacity:1}:{opacity:0,x:20}}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion?{opacity:0}:{opacity:0,x:-20}}
          transition={{ duration: reduceMotion?0:0.3 }}
          className="relative z-10 grid gap-6 md:grid-cols-[170px_1fr] md:items-center md:gap-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-[#ffc400] shadow-lg">
              <Image
                src={current.avatar}
                alt={current.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-4 w-4 ${
                    idx < current.rating ? 'fill-current text-[#ffc400]' : 'text-blue-300/50'
                  }`}
                />
              ))}
            </div>
            <h4 className="mt-4 text-base font-extrabold leading-tight text-[#ffc400]">
              {current.name}
            </h4>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[.18em] text-blue-200">
              {current.role}
            </span>
          </div>

          <div className="relative text-center md:text-left">
            <span aria-hidden="true" className="mx-auto mb-5 block h-1 w-12 rounded-full bg-[#ffc400] md:mx-0"/>
            <p className="text-base font-medium italic leading-8 text-blue-50 sm:text-lg">
              &ldquo;{current.content}&rdquo;
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <button
          onClick={handlePrev}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#031f66]/45 text-white shadow-md transition hover:bg-[#ffc400] hover:text-[#031f66] focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex ? 'w-7 bg-[#ffc400]' : 'w-2 bg-blue-200/30 hover:bg-blue-100'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#031f66]/45 text-white shadow-md transition hover:bg-[#ffc400] hover:text-[#031f66] focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
