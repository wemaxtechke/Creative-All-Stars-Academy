'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  centered = true
}) => {
  return (
    <div className={`mb-7 max-w-3xl sm:mb-12 ${centered ? 'text-center mx-auto' : 'text-left'}`}>
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#d50b12] shadow-sm sm:mb-3 sm:px-4 sm:py-1.5 sm:text-xs">
          {badge}
        </span>
      )}
      <h2 className="brand-title mb-3 text-[1.7rem] font-extrabold leading-tight tracking-tight text-[#031f66] sm:mb-4 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm leading-6 text-gray-600 sm:text-base md:text-lg md:leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
