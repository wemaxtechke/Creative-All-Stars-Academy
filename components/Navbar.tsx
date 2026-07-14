'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Menu, X, ArrowRight, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useApp();

  // If we are on any admin dashboard page, do not render the standard Navbar
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const primaryLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Classes', href: '/classes' },
    { name: 'Co-Curricular', href: '/co-curricular' },
  ];

  const secondaryLinks = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Parents', href: '/parents-corner' },
    { name: 'Contact', href: '/contact' }
  ];

  const allLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* 1. TOP BAR (Kabarak style) - Hidden on mobile, shown on desktop (xl:block) */}
      <div className="hidden xl:block bg-blue-950 text-white text-xs border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          {/* Social Icons Left */}
          <div className="flex items-center space-x-4">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center" title="Twitter">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center" title="Instagram">
              <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center" title="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <span className="text-blue-400 font-medium border-l border-blue-800 pl-4 leading-none h-4 flex items-center">
              {settings.tagline}
            </span>
          </div>

          {/* Secondary Links Right */}
          <div className="flex items-center space-x-1 divide-x divide-blue-800/60">
            {secondaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1 font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-yellow-400'
                      : 'text-blue-100 hover:text-yellow-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pl-3">
              <Link
                href="/admin/login"
                className="px-3 py-1 bg-blue-900 hover:bg-blue-800 text-yellow-400 hover:text-yellow-300 border border-blue-800 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BAR (White Background) */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Full School Name */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md border-2 border-yellow-400 transition-transform hover:scale-105">
                  ⭐
                </div>
                <div>
                  <span className="font-extrabold text-lg md:text-xl tracking-tight text-blue-950 block leading-tight">
                    {settings.schoolName}
                  </span>
                  <span className="text-[10px] text-green-600 font-bold block uppercase tracking-wider leading-none mt-0.5">
                    Nakuru, Kenya
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden xl:flex items-center space-x-1.5">
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-xs'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Apply Now button */}
            <div className="hidden xl:flex items-center">
              <Link
                href="/admissions"
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center gap-3">
              <Link
                href="/admin/login"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                title="Admin Portal"
              >
                <ShieldAlert className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-gray-100 shadow-inner" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {allLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 border-t border-gray-100 px-4 flex flex-col gap-3">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Portal
              </Link>
              <Link
                href="/admissions"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
