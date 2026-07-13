'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ShieldCheck,
  FileCheck,
  Star,
  Download
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { messages, admissions, jobApplications } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Authenticate simulation check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('casa_admin_logged');
      if (logged !== 'true' && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('casa_admin_logged');
    }
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Grid },
    { name: 'Students', href: '/admin/dashboard/students', icon: Users },
    { name: 'Admissions', href: '/admin/dashboard/admissions', icon: FileCheck, count: admissions.filter(a => a.status === 'Pending').length },
    { name: 'Blog Posts', href: '/admin/dashboard/blog', icon: FileText },
    { name: 'Gallery Media', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Events Planner', href: '/admin/dashboard/events', icon: Calendar },
    { name: 'Staff Faculty', href: '/admin/dashboard/staff', icon: Users },
    { name: 'Job Positions', href: '/admin/dashboard/careers', icon: Briefcase },
    { name: 'Applications', href: '/admin/dashboard/applications', icon: Layers, count: jobApplications.filter(j => j.status === 'Pending').length },
    { name: 'Downloads Center', href: '/admin/dashboard/downloads', icon: Download },
    { name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
    { name: 'Contact Messages', href: '/admin/dashboard/messages', icon: Inbox, count: messages.filter(m => m.status === 'Unread').length },
    { name: 'Global Settings', href: '/admin/dashboard/settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* 1. SIDEBAR DESKTOP */}
      <aside className={`hidden lg:flex flex-col w-72 border-r flex-shrink-0 transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        {/* Brand Banner */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100/50 gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-yellow-400 text-sm">
            ⭐
          </div>
          <div>
            <h1 className="font-extrabold text-blue-900 dark:text-yellow-400 text-sm uppercase tracking-wider leading-none">CASA Administration</h1>
            <p className="text-[10px] text-green-600 font-bold mt-1 uppercase">Milimani Nakuru</p>
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
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
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
            Sign Out Portal
          </button>
        </div>
      </aside>

      {/* 2. SIDEBAR MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
          <aside className={`relative flex flex-col w-72 max-w-xs h-full shadow-2xl transition-colors ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="font-extrabold text-blue-950 dark:text-yellow-400 text-sm">CASA Control Panel</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600">
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
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                Sign Out Portal
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0">

        {/* Top Navbar */}
        <header className={`h-20 flex items-center justify-between px-6 border-b transition-colors relative z-40 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Open Navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-green-200/50">
              <ShieldCheck className="w-4 h-4" /> SECURE ADMIN SESSION ACTIVE
            </div>
          </div>

          <div className="flex items-center gap-4">
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
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Notification Drawer */}
              {notificationsOpen && (
                <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border p-4 text-xs font-semibold z-50 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-800'}`}>
                  <div className="flex items-center justify-between border-b pb-2 mb-3">
                    <span className="font-extrabold text-blue-950 dark:text-white">Active Alerts</span>
                    <button className="text-[10px] text-blue-600 font-extrabold uppercase hover:underline" onClick={() => setNotificationsOpen(false)}>Close</button>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-xl leading-normal border border-blue-100/50">
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">New Admission Application</p>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Shadrack Kipkoech applied for PP2 block.</p>
                    </div>
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl leading-normal border border-yellow-200/50">
                      <p className="text-[10px] text-yellow-600 dark:text-yellow-400 font-bold uppercase">Spontaneous Contact Message</p>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Josephine Njoroge inquired on bus transport schedules.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 border-l pl-4 border-gray-100/50">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 border-2 border-yellow-400 font-black text-xs flex items-center justify-center flex-shrink-0">
                AD
              </div>
              <div className="hidden md:block text-left text-xs font-bold leading-tight">
                <p className="text-blue-950 dark:text-white font-extrabold">Principal Admin</p>
                <p className="text-gray-400 text-[10px] mt-0.5">Mrs. Serah Wangari</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content area */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
