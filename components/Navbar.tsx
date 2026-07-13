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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Classes', href: '/classes' },
    { name: 'Co-Curricular', href: '/co-curricular' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Parents', href: '/parents-corner' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-yellow-400">
                ⭐
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-blue-900 block leading-tight">
                  {settings.logoText}
                </span>
                <span className="text-xs text-green-600 font-semibold block uppercase tracking-wider">
                  Nakuru, Kenya
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="px-4 py-2 border border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Portal
            </Link>
            <Link
              href="/admissions"
              className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1"
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
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-gray-100 shadow-inner" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
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
