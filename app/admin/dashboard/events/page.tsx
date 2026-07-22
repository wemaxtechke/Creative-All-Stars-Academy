'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, Upload } from 'lucide-react';
import type { SchoolEvent } from '@/types';

export default function AdminEvents() {
  const { schoolEvents, addSchoolEvent, deleteSchoolEvent, uploadMedia } = useApp();
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'Sports' | 'Academic' | 'Arts' | 'Community' | 'Trip'>('Academic');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !time || !location) {
      setError('Please fill in all requested fields correctly.');
      return;
    }
    setSaving(true);
    setError('');
    let uploadedAssetId = '';
    try {
      const asset = eventImage ? await uploadMedia(eventImage, title) : null;
      uploadedAssetId = asset?.id ?? '';
      await addSchoolEvent({ title, description, date, time, location, category,
        ...(asset ? { image: asset.url, mediaId: asset.id } : {}) });
      setTitle(''); setDescription(''); setDate(''); setTime(''); setLocation(''); setEventImage(null); setAddMode(false);
    } catch (saveError) {
      if (uploadedAssetId) await fetch(`/api/admin/media/${encodeURIComponent(uploadedAssetId)}`, { method: 'DELETE', credentials: 'same-origin' });
      setError(saveError instanceof Error ? saveError.message : 'The event could not be published.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Events Planner</h1>
          <p className="text-gray-500 text-xs">Register, schedule, and delete upcoming school events, sports meets, or parents consultation days.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Planner' : 'Add School Event'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddEvent} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4 text-xs font-semibold text-gray-700">
          {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-gray-600">Event Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Science Fair" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Category Tag *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as SchoolEvent['category'])} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Community">Community</option>
                <option value="Trip">Trip</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Event Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-600">Timing Span *</label>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 09:00 AM - 04:00 PM" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Physical Location / Address *</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Main Auditorium block" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Brief Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Provide details on target audiences, guidelines, or items to bring..." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-semibold text-gray-700" required />
          </div>

          <div className="space-y-1"><label className="text-gray-600">Event image (optional)</label><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"><Upload className="h-4 w-4"/><span>{eventImage ? eventImage.name : 'Choose an image (max 8MB)'}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => setEventImage(event.target.files?.[0] ?? null)} /></label></div>

          <button type="submit" disabled={saving} className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-extrabold rounded-xl transition-colors">{saving ? 'Uploading…' : 'Register Event Live'}</button>
        </form>
      )}

      {/* Database Listing table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Event Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Timing Span</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schoolEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-gray-50/50">
                  <td className="p-4 max-w-sm">
                    <p className="font-extrabold text-blue-950">{evt.title}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5 line-clamp-1">{evt.description}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-lg text-[10px] font-black uppercase">
                      {evt.category}
                    </span>
                  </td>
                  <td className="p-4">{evt.date}</td>
                  <td className="p-4 text-gray-500">{evt.time}</td>
                  <td className="p-4">{evt.location}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteSchoolEvent(evt.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Event"
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
