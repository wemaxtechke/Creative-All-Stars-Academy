'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Check, X, FileText } from 'lucide-react';

export default function AdminApplications() {
  const { jobApplications, updateJobApplicationStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'Pending' | 'Shortlisted' | 'Rejected' | 'Hired'>('Pending');

  const filteredApps = jobApplications.filter(j => j.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Candidate Applications</h1>
        <p className="text-gray-500 text-xs">Evaluate resumes and TSC certificates submitted by teacher candidates and support applicants.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {(['Pending', 'Shortlisted', 'Rejected', 'Hired'] as const).map((tab) => {
          const count = jobApplications.filter(j => j.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab} Candidates ({count})
            </button>
          );
        })}
      </div>

      {/* Candidates list table */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Candidate Full Name</th>
                <th className="p-4">Applied Position</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone Contact</th>
                <th className="p-4">Date Applied</th>
                <th className="p-4">TSC / CV File</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-extrabold text-blue-950">{app.applicantName}</td>
                  <td className="p-4 font-bold text-blue-600">{app.jobTitle}</td>
                  <td className="p-4">{app.email}</td>
                  <td className="p-4 text-gray-500">{app.phone}</td>
                  <td className="p-4">{app.dateApplied}</td>
                  <td className="p-4">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FileText className="w-4 h-4 text-blue-500" /> View CV
                    </a>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    {app.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateJobApplicationStatus(app.id, 'Shortlisted')}
                          className="px-2.5 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-bold"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateJobApplicationStatus(app.id, 'Rejected')}
                          className="px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {app.status === 'Shortlisted' && (
                      <button
                        onClick={() => updateJobApplicationStatus(app.id, 'Hired')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-extrabold"
                      >
                        Hire Candidate
                      </button>
                    )}
                    {app.status === 'Rejected' && <span className="text-gray-400 font-bold">Rejected</span>}
                    {app.status === 'Hired' && <span className="text-green-600 font-black uppercase">Staff Onboarded</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium">No candidates registered under active tab &ldquo;{activeTab}&rdquo;.</div>
        )}
      </div>
    </div>
  );
}
