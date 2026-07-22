'use client';

import { useState } from 'react';
import { Edit3, GraduationCap, Save, UserRound, X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import type { SchoolClass } from '@/types';

type ClassForm = {
  name: string;
  ageGroup: string;
  description: string;
  teacherId: string;
  subjects: string;
  activities: string;
};

export default function AdminClasses() {
  const { classes, teachers, updateSchoolClass } = useApp();
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState<ClassForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function editClass(item: SchoolClass) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      ageGroup: item.ageGroup,
      description: item.description,
      teacherId: item.teacherId ?? '',
      subjects: item.subjects.join('\n'),
      activities: item.activities.join('\n'),
    });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateField(field: keyof ClassForm, value: string) {
    setForm((current) => current ? { ...current, [field]: value } : current);
  }

  async function saveClass(event: React.FormEvent) {
    event.preventDefault();
    if (!form || !editingId) return;
    setSaving(true);
    setMessage(null);
    try {
      await updateSchoolClass(editingId, {
        name: form.name.trim(),
        ageGroup: form.ageGroup.trim(),
        description: form.description.trim(),
        teacherId: form.teacherId,
        subjects: form.subjects.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean),
        activities: form.activities.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean),
      });
      setMessage({ type: 'success', text: `${form.name} was updated successfully.` });
      setEditingId('');
      setForm(null);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'The class could not be updated.' });
    } finally {
      setSaving(false);
    }
  }

  return <div className="space-y-6">
    <div className="border-b pb-4"><h1 className="text-2xl font-black text-blue-950">Classes & Lead Educators</h1><p className="mt-1 text-xs text-gray-500">Control every public class description, subject list, activity list and lead-teacher assignment.</p></div>

    {message && <p role="status" className={`rounded-xl border p-3 text-xs font-semibold ${message.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>{message.text}</p>}

    {form && <form onSubmit={saveClass} className="space-y-5 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between"><div><h2 className="text-lg font-black text-blue-950">Edit {form.name}</h2><p className="mt-1 text-xs text-gray-500">The class URL and identifier remain unchanged.</p></div><button type="button" onClick={() => { setEditingId(''); setForm(null); }} className="rounded-xl bg-gray-100 p-2 text-gray-500 hover:bg-gray-200" title="Close editor"><X className="h-4 w-4"/></button></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1 text-xs font-semibold text-gray-600">Class Name *<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
        <label className="space-y-1 text-xs font-semibold text-gray-600">Age Group *<input value={form.ageGroup} onChange={(event) => updateField('ageGroup', event.target.value)} required className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
        <label className="space-y-1 text-xs font-semibold text-gray-600">Lead Educator<select value={form.teacherId} onChange={(event) => updateField('teacherId', event.target.value)} className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"><option value="">No lead educator</option>{teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name} — {teacher.role}</option>)}</select></label>
      </div>
      <label className="block space-y-1 text-xs font-semibold text-gray-600">Learning Focus & Description *<textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} rows={4} required className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-xs font-semibold text-gray-600">Core Subjects <span className="font-medium text-gray-400">(one per line)</span><textarea value={form.subjects} onChange={(event) => updateField('subjects', event.target.value)} rows={7} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
        <label className="space-y-1 text-xs font-semibold text-gray-600">Classroom Activities <span className="font-medium text-gray-400">(one per line)</span><textarea value={form.activities} onChange={(event) => updateField('activities', event.target.value)} rows={7} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
      </div>
      <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-xs font-extrabold text-white hover:bg-green-700 disabled:bg-slate-400"><Save className="h-4 w-4"/>{saving ? 'Saving…' : 'Publish Class Changes'}</button>
    </form>}

    {classes.length === 0 ? <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center"><GraduationCap className="mx-auto h-8 w-8 text-gray-300"/><p className="mt-3 text-sm font-bold text-gray-500">No class records are available yet.</p></div> : <div className="grid gap-5 lg:grid-cols-2">
      {classes.map((item) => {
        const teacher = teachers.find((entry) => entry.id === item.teacherId);
        return <article key={item.id} className={`rounded-3xl border bg-white p-6 shadow-xs ${editingId === item.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100'}`}>
          <div className="flex items-start justify-between gap-4"><div><span className="text-[10px] font-black uppercase tracking-wider text-gray-400">/{item.id}</span><h2 className="mt-1 text-lg font-black text-blue-950">{item.name}</h2><p className="text-xs font-bold text-blue-600">{item.ageGroup}</p></div><button onClick={() => editClass(item)} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-600 hover:bg-blue-600 hover:text-white"><Edit3 className="h-4 w-4"/>Edit</button></div>
          <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-gray-500">{item.description}</p>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">{teacher ? <><div className="h-10 w-10 overflow-hidden rounded-full border-2 border-yellow-400"><img src={teacher.image} alt="" className="h-full w-full object-cover"/></div><div><p className="text-[10px] font-bold uppercase text-gray-400">Lead educator</p><p className="text-xs font-extrabold text-blue-950">{teacher.name}</p></div></> : <><div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"><UserRound className="h-4 w-4 text-gray-400"/></div><div><p className="text-[10px] font-bold uppercase text-gray-400">Lead educator</p><p className="text-xs font-extrabold text-gray-500">Not assigned</p></div></>}</div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center"><div className="rounded-xl bg-blue-50 p-2"><span className="text-lg font-black text-blue-700">{item.subjects.length}</span><p className="text-[9px] font-bold uppercase text-blue-500">Subjects</p></div><div className="rounded-xl bg-yellow-50 p-2"><span className="text-lg font-black text-yellow-700">{item.activities.length}</span><p className="text-[9px] font-bold uppercase text-yellow-600">Activities</p></div></div>
        </article>;
      })}
    </div>}
  </div>;
}
