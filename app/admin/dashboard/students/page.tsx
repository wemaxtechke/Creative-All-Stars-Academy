'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Search, UserPlus, Trash, Edit } from 'lucide-react';

export default function AdminStudents() {
  const { students, addStudent, deleteStudent, classes } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('grade1');
  const [admissionNo, setAdmissionNo] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  const [addMode, setAddMode] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !admissionNo || !parentName || !parentPhone) {
      alert('Please fill in all requested student blocks.');
      return;
    }
    addStudent({
      name,
      classId,
      admissionNo,
      parentName,
      parentPhone,
      status: 'Active'
    });
    setName('');
    setAdmissionNo('');
    setParentName('');
    setParentPhone('');
    setAddMode(false);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Manage Students Database</h1>
          <p className="text-gray-500 text-xs">Search, list, and register student credentials on Nakuru campus blocks.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          {addMode ? 'Cancel Registration' : 'Register New Student'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddStudent} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
          <div className="space-y-1">
            <label className="text-gray-600">Student&apos;s Full Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Liam Kiprono Mwangi" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Admission Number *</label>
            <input type="text" value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)} placeholder="e.g. CASA/2025/110" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Class Block *</label>
            <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Parent / Guardian Name *</label>
            <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="e.g. Wanjiku Kamau" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Parent Telephone *</label>
            <input type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder="e.g. +254 712 345 678" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="sm:col-span-2 lg:col-span-1 pt-6">
            <button type="submit" className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Complete Student Onboarding</button>
          </div>
        </form>
      )}

      {/* Database Search & Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">

        {/* Search tool */}
        <div className="p-4 border-b border-gray-50 flex items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-3 left-4 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student name, parent, or admission #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Student Name</th>
                <th className="p-4">Admission No.</th>
                <th className="p-4">Class Block</th>
                <th className="p-4">Parent Name</th>
                <th className="p-4">Parent Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((s) => {
                const targetClass = classes.find(c => c.id === s.classId);
                return (
                  <tr key={s.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-extrabold text-blue-950">{s.name}</td>
                    <td className="p-4">{s.admissionNo}</td>
                    <td className="p-4">{targetClass ? targetClass.name : s.classId}</td>
                    <td className="p-4">{s.parentName}</td>
                    <td className="p-4 text-gray-500">{s.parentPhone}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-lg">
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Student record"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium">
            No matching students found in campus blocks databases.
          </div>
        )}

      </div>
    </div>
  );
}
