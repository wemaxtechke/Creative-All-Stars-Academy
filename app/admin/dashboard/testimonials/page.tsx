'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, Star } from 'lucide-react';

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, deleteTestimonial } = useApp();
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Parent' | 'Alumni' | 'Student'>('Parent');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      alert('Please fill in required fields correctly.');
      return;
    }
    addTestimonial({
      name,
      role,
      content,
      rating,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
    });
    setName('');
    setContent('');
    setAddMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Parent Testimonials</h1>
          <p className="text-gray-500 text-xs">Manage reviews and star ratings showcased in our public website Testimonials Carousel.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Draft' : 'Register Review'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddTestimonial} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4 text-xs font-semibold text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-gray-600">Author Full Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Wanjiku Kamau" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Role Designation *</label>
              <select value={role} onChange={(e) => setRole(e.target.value as 'Parent' | 'Alumni' | 'Student')} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
                <option value="Parent">Parent</option>
                <option value="Alumni">Alumni</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Star Rating *</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Detailed Feedback Statement *</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3} placeholder="The academic support swimming and computer labs have been stellar..." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-semibold text-gray-700" required />
          </div>

          <button type="submit" className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Complete Publishing</button>
        </form>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs relative flex flex-col justify-between h-full">
            <button
              onClick={() => deleteTestimonial(test.id)}
              className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
              title="Delete testimonial"
            >
              <Trash className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < test.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-600 text-xs italic leading-relaxed">&ldquo;{test.content}&rdquo;</p>
            </div>

            <div className="border-t border-gray-50 pt-4 mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={test.avatar} alt={test.name} className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight text-xs font-bold">
                <h4 className="font-extrabold text-blue-950">{test.name}</h4>
                <span className="text-[10px] text-gray-400 font-extrabold uppercase">{test.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
