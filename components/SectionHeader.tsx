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
    <div className={`mb-12 max-w-3xl ${centered ? 'text-center mx-auto' : 'text-left'}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-widest rounded-full mb-3 shadow-sm">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
