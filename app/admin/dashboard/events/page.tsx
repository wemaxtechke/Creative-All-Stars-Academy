'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Trash, Upload, X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import type { SchoolEvent } from '@/types';

export default function AdminEvents() {
  const { schoolEvents, addSchoolEvent, updateSchoolEvent, deleteSchoolEvent, uploadMedia } = useApp();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<SchoolEvent['category']>('Academic');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');
  const [existingMediaId, setExistingMediaId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function resetEditor() {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setCategory('Academic');
    setEventImage(null);
    setExistingImage('');
    setExistingMediaId('');
    setEditingEvent(null);
    setError('');
    setEditorOpen(false);
  }

  function openNewEvent() {
    resetEditor();
    setEditorOpen(true);
  }

  function openEditEvent(event: SchoolEvent) {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setCategory(event.category);
    setEventImage(null);
    setExistingImage(event.image ?? '');
    setExistingMediaId(event.mediaId ?? '');
    setError('');
    setEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function saveEvent(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !date || !time.trim() || !location.trim()) {
      setError('Please fill in all requested fields correctly.');
      return;
    }

    setSaving(true);
    setError('');
    let uploadedAssetId = '';
    try {
      const asset = eventImage ? await uploadMedia(eventImage, title) : null;
      uploadedAssetId = asset?.id ?? '';
      const imageFields = asset
        ? { image: asset.url, mediaId: asset.id }
        : { image: existingImage, mediaId: existingMediaId };
      const record = {
        title: title.trim(),
        description: description.trim(),
        date,
        time: time.trim(),
        location: location.trim(),
        category,
        ...imageFields,
      };

      if (editingEvent) {
        await updateSchoolEvent(editingEvent.id, record);
        if (asset && existingMediaId && existingMediaId !== asset.id) {
          await fetch(`/api/admin/media/${encodeURIComponent(existingMediaId)}`, {
            method: 'DELETE',
            credentials: 'same-origin',
          }).catch(() => undefined);
        }
      } else {
        await addSchoolEvent(record);
      }

      resetEditor();
    } catch (saveError) {
      if (uploadedAssetId) {
        await fetch(`/api/admin/media/${encodeURIComponent(uploadedAssetId)}`, {
          method: 'DELETE',
          credentials: 'same-origin',
        }).catch(() => undefined);
      }
      setError(saveError instanceof Error ? saveError.message : 'The event could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent(event: SchoolEvent) {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    setError('');
    try {
      await deleteSchoolEvent(event.id);
      if (editingEvent?.id === event.id) resetEditor();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The event could not be deleted.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Events Planner</h1>
          <p className="text-xs text-gray-500">Create, edit, schedule, and remove upcoming school events, sports meets, or parents consultation days.</p>
        </div>
        <button
          type="button"
          onClick={editorOpen ? resetEditor : openNewEvent}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-xs transition-colors hover:bg-blue-700"
        >
          {editorOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {editorOpen ? 'Close editor' : 'Add School Event'}
        </button>
      </div>

      {error && !editorOpen && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>
      )}

      {editorOpen && (
        <form onSubmit={saveEvent} className="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 text-xs font-semibold text-gray-700 shadow-sm sm:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-blue-700">{editingEvent ? 'Editing event' : 'New event'}</p>
            <h2 className="mt-1 text-lg font-black text-blue-950">{editingEvent ? editingEvent.title : 'Register a school event'}</h2>
          </div>

          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="space-y-1 text-gray-600">
              <span>Event Title *</span>
              <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Science Fair" className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required />
            </label>
            <label className="space-y-1 text-gray-600">
              <span>Category Tag *</span>
              <select value={category} onChange={(event) => setCategory(event.target.value as SchoolEvent['category'])} className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Community">Community</option>
                <option value="Trip">Trip</option>
              </select>
            </label>
            <label className="space-y-1 text-gray-600">
              <span>Event Date *</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-gray-600">
              <span>Timing Span *</span>
              <input type="text" value={time} onChange={(event) => setTime(event.target.value)} placeholder="e.g. 09:00 AM - 04:00 PM" className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required />
            </label>
            <label className="space-y-1 text-gray-600">
              <span>Physical Location / Address *</span>
              <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Main Auditorium block" className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required />
            </label>
          </div>

          <label className="block space-y-1 text-gray-600">
            <span>Brief Description *</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="Provide details on target audiences, guidelines, or items to bring..." className="w-full rounded-xl border border-gray-200 p-3 text-sm font-semibold text-gray-700 focus:border-blue-600 focus:outline-none" required />
          </label>

          <div className="space-y-2">
            <p className="text-gray-600">Event image (optional)</p>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <Upload className="h-4 w-4" />
              <span>{eventImage ? eventImage.name : existingImage ? 'Keep current image, or choose a replacement' : 'Choose an image (max 8MB)'}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => setEventImage(event.target.files?.[0] ?? null)} />
            </label>
            {existingImage && <Image src={existingImage} alt="Current event" width={192} height={128} className="h-32 w-48 rounded-xl object-cover" />}
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="rounded-xl bg-green-600 px-6 py-3 font-extrabold text-white transition-colors hover:bg-green-700 disabled:bg-slate-400">
              {saving ? 'Saving…' : editingEvent ? 'Save Event Changes' : 'Register Event Live'}
            </button>
            <button type="button" onClick={resetEditor} disabled={saving} className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xs">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-100/50 font-extrabold uppercase text-blue-950">
                <th className="p-4">Event Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Timing Span</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schoolEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50/50">
                  <td className="max-w-sm p-4">
                    <p className="font-extrabold text-blue-950">{event.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-400">{event.description}</p>
                  </td>
                  <td className="p-4">
                    <span className="rounded-lg bg-green-100 px-2 py-0.5 text-[10px] font-black uppercase text-green-700">{event.category}</span>
                  </td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4 text-gray-500">{event.time}</td>
                  <td className="p-4">{event.location}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-1">
                      <button type="button" onClick={() => openEditEvent(event)} className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50" title={`Edit ${event.title}`} aria-label={`Edit ${event.title}`}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => removeEvent(event)} className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50" title={`Delete ${event.title}`} aria-label={`Delete ${event.title}`}>
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {schoolEvents.length === 0 && <div className="py-12 text-center text-xs font-medium text-gray-400">No school events have been added yet.</div>}
      </div>
    </div>
  );
}
