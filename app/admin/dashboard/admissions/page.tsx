'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Check, X, Eye } from 'lucide-react';

export default function AdminAdmissions() {
  const { admissions, updateAdmissionStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [selectedApp, setSelectedApp] = useState<typeof admissions[0] | null>(null);

  const filteredApps = admissions.filter(a => a.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Admissions Manager</h1>
        <p className="text-gray-500 text-xs">Approve or reject student registration credentials submitted through our public Admissions portal.</p>
      </div>

      {/* Dynamic filter tabs */}
      <div className="flex gap-2 border-b border-gray-100 pb-3">
        {(['Pending', 'Approved', 'Rejected'] as const).map((tab) => {
          const count = admissions.filter(a => a.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedApp(null);
              }}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab} Applications ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Table Column */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-xs font-semibold text-gray-700">
              <thead>
                <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                  <th className="p-4">Student</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4">Grade Applied</th>
                  <th className="p-4">Parent Name</th>
                  <th className="p-4">Date Applied</th>
                  <th className="p-4 text-center">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-extrabold text-blue-950">{app.studentName}</td>
                    <td className="p-4">{app.gender}</td>
                    <td className="p-4">{app.gradeApplied}</td>
                    <td className="p-4">{app.parentName}</td>
                    <td className="p-4 text-gray-500">{app.dateSubmitted}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium">
              No admission applications cataloged under the tab &ldquo;{activeTab}&rdquo;.
            </div>
          )}
        </div>

        {/* Inspect Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-xs space-y-6">
          <h3 className="text-lg font-black text-blue-950 border-b border-gray-50 pb-2">Student Application Details</h3>

          {selectedApp ? (
            <div className="space-y-6 text-xs font-semibold">
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-100 leading-normal">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Student Bio</span>
                <h4 className="font-extrabold text-base text-blue-950 leading-tight">{selectedApp.studentName}</h4>
                <p className="text-gray-500">Gender: {selectedApp.gender} • Birth Date: {selectedApp.dateOfBirth}</p>
                <p className="text-blue-600 font-bold">Grade Applied: {selectedApp.gradeApplied}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-100 leading-normal">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Parent / Guardian contact</span>
                <p className="text-gray-700 font-extrabold">{selectedApp.parentName}</p>
                <p className="text-gray-500">Email: {selectedApp.parentEmail}</p>
                <p className="text-gray-500">Phone: {selectedApp.parentPhone}</p>
                <p className="text-gray-500">Address: {selectedApp.address}</p>
              </div>

              <div className="border-t border-gray-50 pt-4 flex gap-2">
                {selectedApp.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateAdmissionStatus(selectedApp.id, 'Approved');
                        setSelectedApp(null);
                      }}
                      className="w-1/2 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Approve Candidate
                    </button>
                    <button
                      onClick={() => {
                        updateAdmissionStatus(selectedApp.id, 'Rejected');
                        setSelectedApp(null);
                      }}
                      className="w-1/2 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X className="w-4 h-4" /> Reject Candidate
                    </button>
                  </>
                )}
                {selectedApp.status !== 'Pending' && (
                  <p className="text-gray-400 font-bold text-center w-full bg-gray-100 py-3.5 rounded-xl border">This application was successfully evaluated as &ldquo;{selectedApp.status}&rdquo;.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 font-medium text-xs leading-normal">Click on the eyeball Inspect button in the applicant rows to view detail profiles, parent contacts, birth documents, and take approval actions.</p>
          )}
        </div>

      </div>
    </div>
  );
}
