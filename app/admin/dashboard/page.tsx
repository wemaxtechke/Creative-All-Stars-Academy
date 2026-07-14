'use client';

import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Users, FileText, Image as ImageIcon, Calendar, Briefcase, FileCheck, Star, Inbox } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardMain() {
  const { students, teachers, blogPosts, schoolEvents, admissions, jobApplications, testimonials, messages } = useApp();

  const statistics = [
    { label: 'Active Students', value: students.length + 800, icon: Users, color: 'bg-blue-500', href: '/admin/dashboard/students' },
    { label: 'TSC Staff Faculty', value: teachers.length, icon: Users, color: 'bg-green-500', href: '/admin/dashboard/staff' },
    { label: 'Pending Admissions', value: admissions.filter(a => a.status === 'Pending').length, icon: FileCheck, color: 'bg-yellow-500', href: '/admin/dashboard/admissions' },
    { label: 'Recent Messages', value: messages.filter(m => m.status === 'Unread').length, icon: Inbox, color: 'bg-purple-500', href: '/admin/dashboard/messages' },
    { label: 'Blog Posts', value: blogPosts.length, icon: FileText, color: 'bg-teal-500', href: '/admin/dashboard/blog' },
    { label: 'Event Planners', value: schoolEvents.length, icon: Calendar, color: 'bg-indigo-500', href: '/admin/dashboard/events' },
    { label: 'Job Applications', value: jobApplications.filter(j => j.status === 'Pending').length, icon: Briefcase, color: 'bg-rose-500', href: '/admin/dashboard/applications' },
    { label: 'Testimonials', value: testimonials.length, icon: Star, color: 'bg-amber-500', href: '/admin/dashboard/testimonials' }
  ];

  const recentActivity = [
    { text: 'Admission application approved for student Clara Muthoni.', time: '2 hours ago', type: 'approved' },
    { text: 'Job application shortlisted for ICT Teacher candidate Dennis Kipkemboi.', time: '5 hours ago', type: 'shortlisted' },
    { text: 'Contact message received from parent Wilson Koskei regarding heated pool fees.', time: '1 day ago', type: 'message' },
    { text: 'New Blog Post published: How the CBC Curriculum Prepares Learners...', time: '2 days ago', type: 'blog' }
  ];

  return (
    <div className="space-y-10">

      {/* Welcome Block */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 sm:p-10 rounded-3xl shadow-md border-b-4 border-yellow-400 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full" />
        <div className="max-w-2xl text-left space-y-2">
          <span className="px-3 py-1 bg-yellow-400 text-blue-950 font-black text-[10px] uppercase tracking-wider rounded-full shadow-md">
            Management Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">Welcome Back, Mrs. Bevalyne!</h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Manage your Ngata Nakuru campus database blocks. Approve student admission credentials, review teacher candidates, publish press blogs, or respond to parental inboxes dynamically.
          </p>
        </div>
      </div>

      {/* Grid: Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">{stat.label}</span>
                <span className={`p-2.5 rounded-2xl ${stat.color} text-white`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-blue-950">{stat.value}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Charts and Activities Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Custom Visual Charts Placement (Interactive SVG bar chart) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-blue-950 leading-tight">Student Enrollment Trends</h3>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Yearly Growth Index (Nakuru Region)</p>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="w-full h-64 bg-gray-50 rounded-2xl border border-gray-100 flex items-end justify-between p-6 relative overflow-hidden">
            <div className="absolute inset-y-6 left-6 right-6 border-b border-gray-200/50 flex flex-col justify-between pointer-events-none text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              <div>800 Students</div>
              <div>500 Students</div>
              <div>200 Students</div>
              <div />
            </div>

            {/* Custom SVG bars */}
            <div className="flex items-end justify-around w-full relative z-10 pt-8 text-center text-[10px] font-bold text-gray-600">
              <div className="space-y-2">
                <div className="w-10 sm:w-16 bg-blue-100 h-20 rounded-t-lg mx-auto" />
                <span>2019</span>
              </div>
              <div className="space-y-2">
                <div className="w-10 sm:w-16 bg-blue-300 h-32 rounded-t-lg mx-auto" />
                <span>2021</span>
              </div>
              <div className="space-y-2">
                <div className="w-10 sm:w-16 bg-blue-500 h-44 rounded-t-lg mx-auto" />
                <span>2023</span>
              </div>
              <div className="space-y-2">
                <div className="w-10 sm:w-16 bg-blue-600 h-[190px] rounded-t-lg mx-auto relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-yellow-400 text-blue-950 rounded-md font-black text-[9px]">820</div>
                </div>
                <span>2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Panel */}
        <div className="lg:col-span-4 bg-white p-6 border border-gray-100 rounded-3xl shadow-xs space-y-6">
          <h3 className="text-lg font-black text-blue-950 border-b border-gray-50 pb-2">Recent Activities Log</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <div className="space-y-0.5 text-xs font-semibold leading-normal">
                  <p className="text-gray-700 font-medium">{activity.text}</p>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
