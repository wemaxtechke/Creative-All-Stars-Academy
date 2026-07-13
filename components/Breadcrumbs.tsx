'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { name: string; href?: string }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-semibold py-4 px-4 md:px-8 bg-gray-50 border-b border-gray-100 mb-6 rounded-xl max-w-7xl mx-auto">
      <Link href="/" className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
        <Home className="w-4 h-4" />
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="text-gray-500 hover:text-blue-600 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-blue-900 font-bold truncate max-w-[180px] sm:max-w-none">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
