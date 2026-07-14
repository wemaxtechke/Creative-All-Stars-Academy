'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { settings } = useApp();

  // Hide footer on admin sections
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8 border-t-8 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Section 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-yellow-400">
                ⭐
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white block leading-tight">
                {settings.schoolName}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              We are a premier early learning and primary school in Ngata, Nakuru. Committed to providing 100% CBC education packed with digital, physical, and artistic training to make every child a star.
            </p>
            <div className="flex items-center gap-3">
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition-all text-gray-300" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-4 1.7-4 4v3z" />
                </svg>
              </a>
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition-all text-gray-300" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.6d-.9.4-1.8.5 1-.6 1.8-1.6-.9.5-2 1-2.8-1.1-.9-2.3-2.1-2.3-3.6 0-2.9 2.4-5.3 5.3-5.3.4 0 .8.1 1.2.2-4.4-.2-8.3-2.3-10.9-5.5-.5.8-.7 1.8-.7 2.9 0 1.8.9 3.4 2.3 4.4-.9 0-1.7-.3-2.4-.7v.1c0 2.5 1.8 4.7 4.2 5.2-.4.1-.9.2-1.4.2-.3 0-.7 0-1-.1.7 2.1 2.6 3.6 4.9 3.7-1.8 1.4-4.1 2.2-6.6 2.2-.4 0-.9 0-1.3-.1 2.3 1.5 5 2.4 7.9 2.4 9.5 0 14.7-7.9 14.7-14.7 0-.2 0-.4 0-.7.9-.7 1.7-1.6 2.4-2.5z" />
                </svg>
              </a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition-all text-gray-300" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-.1-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 1 .1 5.7.1 6.1.2 7.1.3 8.3.5 9.1.9 9.9c.4.9.9 1.6 1.7 2.4.8.8 1.5 1.3 2.4 1.7.8.4 1.6.6 2.8.7 1.3.1 1.7.1 5 .1s3.6 0 4.9-.1c1.2-.1 2-.3 2.8-.7.9-.4 1.6-.9 2.4-1.7.8-.8 1.3-1.5 1.7-2.4.4-.8.6-1.6.7-2.8.1-1.3.1-1.7.1-5s0-3.6-.1-4.9c-.1-1.2-.3-2-.7-2.8-.4-.9-.9-1.6-1.7-2.4C21 1.3 20.3.8 19.4.4 18.6.1 17.8 0 16.5 0c-1.3 0-1.7 0-5 0z" />
                  <path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.4c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" />
                </svg>
              </a>
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition-all text-gray-300" aria-label="Youtube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-6 border-b border-blue-900 pb-2">Quick Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → About School History & Values
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → CBC Academic Curriculum
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Admissions Guide & Fee Structure
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Browse Playgroup to Grade 6
                </Link>
              </li>
              <li>
                <Link href="/co-curricular" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Active Clubs & Swimming
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Beautiful School Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Downloads & Blogs */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-6 border-b border-blue-900 pb-2">Parents & Staff</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/parents-corner" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Parents Corner / Assignments
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → School News & Blog Articles
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Careers / Job Openings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all">
                  → Contact Information & Office
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-red-400 hover:text-yellow-400 text-sm flex items-center gap-1.5 transition-all font-semibold">
                  ⚡ Administrator Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-6 border-b border-blue-900 pb-2">Our Campus</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-gray-300 hover:text-yellow-400 text-sm transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-300 hover:text-yellow-400 text-sm transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="text-xs text-gray-400 leading-relaxed border-t border-blue-900 pt-3">
                <strong>Office Hours:</strong> <br />
                {settings.officeHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row items-center justify-between text-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} {settings.schoolName}. All Rights Reserved. Built as a High-End Frontend Prototype.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> in Nakuru, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};
