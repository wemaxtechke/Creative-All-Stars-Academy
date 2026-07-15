'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, Calendar } from 'lucide-react';
import type { Job } from '@/types';

export default function AdminCareers() {
  const { jobs, addJob, deleteJob } = useApp();
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Primary School Academics');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract'>('Full-time');
  const [location, setLocation] = useState('Nakuru, Kenya');
  const [deadline, setDeadline] = useState('');

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) {
      alert('Please complete job headline and deadlines correctly.');
      return;
    }
    addJob({
      title,
      department,
      type,
      location,
      responsibilities: ['Support CBC activities', 'Adhere to TSC guidelines'],
      requirements: ['Valid Degree or Diploma', 'TSC registration credentials'],
      deadline
    });
    setTitle('');
    setAddMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Job Listings</h1>
          <p className="text-gray-500 text-xs">Configure open job postings visible in our public Careers section.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Posting' : 'Add Job Listing'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddJob} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
          <div className="space-y-1">
            <label className="text-gray-600">Job Headline Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kiswahili Language Teacher" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Department Block *</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
              <option value="Primary School Academics">Primary School Academics</option>
              <option value="Junior School Academics">Junior School Academics</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Student Welfare & Health">Student Welfare & Health</option>
              <option value="Operations & Logistics">Operations & Logistics</option>
              <option value="Catering & Dining">Catering & Dining</option>
              <option value="Finance & Administration">Finance & Administration</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Contract Model *</label>
            <select value={type} onChange={(e) => setType(e.target.value as Job['type'])} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Dating Deadline *</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Location *</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="pt-6">
            <button type="submit" className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Publish Active Opening</button>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Opening Title</th>
                <th className="p-4">Department Block</th>
                <th className="p-4">Contract model</th>
                <th className="p-4">Location</th>
                <th className="p-4">Deadline</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-extrabold text-blue-950">{job.title}</td>
                  <td className="p-4 text-gray-500">{job.department}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase">
                      {job.type}
                    </span>
                  </td>
                  <td className="p-4">{job.location}</td>
                  <td className="p-4 text-red-500 font-bold">{job.deadline}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Posting"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
