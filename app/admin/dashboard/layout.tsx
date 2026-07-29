'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import {
  Grid,
  Users,
  FileText,
  Image as ImageIcon,
  Calendar,
  Briefcase,
  Layers,
  Inbox,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  ShieldCheck,
  FileCheck,
  Star,
  Download,
  GraduationCap,
  BarChart3
} from 'lucide-react';

type AdminAlert = {
  id: string;
  kind: 'admission' | 'message' | 'application';
  title: string;
  description: string;
  date: string;
  href: string;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { messages, admissions, jobApplications } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const activeAlerts: AdminAlert[] = [
    ...admissions
      .filter((application) => application.status === 'Pending')
      .map((application) => ({
        id: `admission-${application.id}`,
        kind: 'admission' as const,
        title: 'New admission application',
        description: `${application.studentName} applied for ${application.gradeApplied}.`,
        date: application.dateSubmitted,
        href: '/admin/dashboard/admissions',
      })),
    ...messages
      .filter((message) => message.status === 'Unread')
      .map((message) => ({
        id: `message-${message.id}`,
        kind: 'message' as const,
        title: 'Unread contact message',
        description: `${message.name}: ${message.subject}`,
        date: message.dateSubmitted,
        href: '/admin/dashboard/messages',
      })),
    ...jobApplications
      .filter((application) => application.status === 'Pending')
      .map((application) => ({
        id: `application-${application.id}`,
        kind: 'application' as const,
        title: 'New job application',
        description: `${application.applicantName} applied for ${application.jobTitle}.`,
        date: application.dateApplied,
        href: '/admin/dashboard/applications',
      })),
  ].sort((first, second) => second.date.localeCompare(first.date));

  const handleLogout = () => {
    window.location.assign('/cdn-cgi/access/logout');
  };

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: Grid },
    { name: 'Website analytics', href: '/admin/dashboard/analytics', icon: BarChart3 },
    { name: 'Admission enquiries', href: '/admin/dashboard/admissions', icon: FileCheck, count: admissions.filter(a => a.status === 'Pending').length },
    { name: 'Contact messages', href: '/admin/dashboard/messages', icon: Inbox, count: messages.filter(m => m.status === 'Unread').length },
    { name: 'News & stories', href: '/admin/dashboard/blog', icon: FileText },
    { name: 'Events', href: '/admin/dashboard/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Website visuals', href: '/admin/dashboard/visuals', icon: ImageIcon },
    { name: 'Staff profiles', href: '/admin/dashboard/staff', icon: Users },
    { name: 'Classes & leads', href: '/admin/dashboard/classes', icon: GraduationCap },
    { name: 'Careers', href: '/admin/dashboard/careers', icon: Briefcase },
    { name: 'Job applications', href: '/admin/dashboard/applications', icon: Layers, count: jobApplications.filter(j => j.status === 'Pending').length },
    { name: 'Parent downloads', href: '/admin/dashboard/downloads', icon: Download },
    { name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
    { name: 'Website settings', href: '/admin/dashboard/settings', icon: Settings }
  ];

  return (
    <div className={`admin-shell flex h-[100dvh] overflow-hidden ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* 1. SIDEBAR DESKTOP */}
      <aside className={`hidden h-screen lg:flex flex-col w-72 border-r flex-shrink-0 transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        {/* Brand Banner */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100/50 gap-2">
          <Image src="/brand/creative-all-stars-academy-logo.png" alt="Creative All Stars Academy logo" width={46} height={46} className="h-11 w-11 rounded-full bg-white object-contain"/>
          <div>
            <h1 className="font-extrabold text-blue-900 dark:text-yellow-400 text-sm tracking-tight leading-none">CASA Website CMS</h1>
            <p className="text-[10px] text-[#d50b12] font-bold mt-1 uppercase tracking-wider">Content & enquiries</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0739a6] text-white shadow-md shadow-blue-900/10'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white font-black text-[9px] rounded-full">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Bottom item */}
        <div className="p-4 border-t border-gray-100/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* 2. SIDEBAR MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
          <aside className={`relative flex h-full w-[88vw] max-w-72 flex-col shadow-2xl transition-colors ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="flex h-16 items-center justify-between border-b border-gray-100/50 px-4 sm:h-20 sm:px-6">
              <div className="flex items-center gap-2">
                <Image src="/brand/creative-all-stars-academy-logo.png" alt="Creative All Stars Academy logo" width={34} height={34} className="h-9 w-9 rounded-full object-contain"/>
                <span className="font-extrabold text-blue-950 dark:text-yellow-400 text-sm">CASA Website CMS</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Close navigation">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-[#0739a6] text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-2 py-0.5 bg-red-500 text-white font-black text-[9px] rounded-full">{item.count}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <div className="flex min-h-0 min-w-0 flex-grow flex-col">

        {/* Top Navbar */}
        <header className={`relative z-40 flex h-16 shrink-0 items-center justify-between border-b px-3 transition-colors sm:h-20 sm:px-6 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              title="Open Navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/20 text-[#0739a6] dark:text-blue-300 text-[10px] font-black uppercase tracking-wider rounded-lg border border-blue-200/50">
              <ShieldCheck className="w-4 h-4" /> Website editor session
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Notifications Panel Trigger */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                title={activeAlerts.length ? `${activeAlerts.length} active notification${activeAlerts.length === 1 ? '' : 's'}` : 'No active notifications'}
                aria-label={activeAlerts.length ? `Notifications, ${activeAlerts.length} active` : 'Notifications, none active'}
                aria-expanded={notificationsOpen}
                aria-haspopup="dialog"
              >
                <Bell className="w-4.5 h-4.5" />
                {activeAlerts.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />}
              </button>

              {/* Notification Drawer */}
              {notificationsOpen && (
                <div role="dialog" aria-label="Active alerts" className={`fixed left-3 right-3 top-16 z-50 rounded-2xl border p-4 text-xs font-semibold shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-80 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-800'}`}>
                  <div className="mb-3 flex items-center justify-between border-b pb-2">
                    <span className="font-extrabold text-blue-950 dark:text-white">
                      Active Alerts {activeAlerts.length > 0 && `(${activeAlerts.length})`}
                    </span>
                    <button className="text-[10px] text-blue-600 font-extrabold uppercase hover:underline" onClick={() => setNotificationsOpen(false)}>Close</button>
                  </div>
                  {activeAlerts.length > 0 ? (
                    <div className="max-h-[min(28rem,65vh)] space-y-3 overflow-y-auto pr-1">
                      {activeAlerts.map((alert) => (
                        <Link
                          key={alert.id}
                          href={alert.href}
                          onClick={() => setNotificationsOpen(false)}
                          className={`block rounded-xl border p-3 leading-normal transition hover:-translate-y-0.5 hover:shadow-sm ${
                            alert.kind === 'admission'
                              ? 'border-blue-100/50 bg-blue-50 dark:bg-blue-950/20'
                              : alert.kind === 'message'
                                ? 'border-yellow-200/50 bg-yellow-50 dark:bg-yellow-950/20'
                                : 'border-emerald-200/50 bg-emerald-50 dark:bg-emerald-950/20'
                          }`}
                        >
                          <p className={`text-[10px] font-bold uppercase ${
                            alert.kind === 'admission'
                              ? 'text-blue-600 dark:text-blue-400'
                              : alert.kind === 'message'
                                ? 'text-yellow-700 dark:text-yellow-400'
                                : 'text-emerald-700 dark:text-emerald-400'
                          }`}>{alert.title}</p>
                          <p className="mt-1 font-medium text-gray-600 dark:text-gray-300">{alert.description}</p>
                          <p className="mt-1 text-[10px] font-semibold text-gray-400">{alert.date}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center dark:border-gray-800 dark:bg-gray-950/40">
                      <p className="font-extrabold text-gray-600 dark:text-gray-300">No active alerts</p>
                      <p className="mt-1 text-[10px] font-medium leading-relaxed text-gray-400">New admissions, contact messages, and job applications will appear here automatically.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 border-l border-gray-100/50 pl-2 sm:pl-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 border-2 border-yellow-400 font-black text-xs flex items-center justify-center flex-shrink-0">
                AD
              </div>
              <div className="hidden md:block text-left text-xs font-bold leading-tight">
                <p className="text-blue-950 dark:text-white font-extrabold">Website administrator</p>
                <p className="text-gray-400 text-[10px] mt-0.5">Content team</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content area */}
        <main className="min-h-0 min-w-0 flex-grow overflow-y-auto p-3 sm:p-5 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
