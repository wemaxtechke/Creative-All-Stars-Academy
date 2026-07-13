'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, Mail } from 'lucide-react';

export default function AdminStaff() {
  const { teachers, addTeacher, deleteTeacher } = useApp();
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop');
  const [bio, setBio] = useState('');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !email) {
      alert('Please fill in required fields.');
      return;
    }
    addTeacher({
      name,
      role,
      email,
      image,
      bio,
      subjects: ['CBC Activities']
    });
    setName('');
    setRole('');
    setEmail('');
    setBio('');
    setAddMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Staff & Faculty block</h1>
          <p className="text-gray-500 text-xs">Search, list, register, or delete campus educators, nurses, or operational coordinators.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Registration' : 'Register New Faculty'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddTeacher} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4 text-xs font-semibold text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-gray-600">Full Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Janet Atieno Otieno" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Faculty Role *</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Grade 1 Lead Facilitator" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Email Address *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. janet.atieno@creativeallstars.ac.ke" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Faculty Avatar URL *</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Brief Professional Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Specialized qualifications, certifications, or pediatric school experiences..." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-semibold text-gray-700" />
          </div>

          <button type="submit" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Onboard Faculty Member</button>
        </form>
      )}

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs text-center space-y-4 relative">
            <button
              onClick={() => deleteTeacher(teacher.id)}
              className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
              title="Delete member"
            >
              <Trash className="w-4 h-4" />
            </button>

            <div className="w-20 h-24 rounded-2xl overflow-hidden mx-auto border-2 border-yellow-400">
              <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <h4 className="font-extrabold text-blue-950 text-sm md:text-base leading-tight">{teacher.name}</h4>
              <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">{teacher.role}</p>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{teacher.bio || 'No professional bio configured.'}</p>

            <div className="border-t border-gray-50 pt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span className="truncate max-w-[180px]">{teacher.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
