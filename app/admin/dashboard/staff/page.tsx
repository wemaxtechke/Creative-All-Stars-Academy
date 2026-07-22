'use client';

import { useMemo, useState } from 'react';
import { Edit3, Mail, Plus, Trash, Upload, X } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import type { Teacher } from '@/types';

type TeacherForm = {
  name: string;
  role: string;
  email: string;
  bio: string;
  subjects: string;
};

const emptyForm: TeacherForm = { name: '', role: '', email: '', bio: '', subjects: '' };

export default function AdminStaff() {
  const { teachers, classes, addTeacher, updateTeacher, deleteTeacher, uploadMedia } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState<TeacherForm>(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const assignments = useMemo(() => new Map(teachers.map((teacher) => [
    teacher.id,
    classes.filter((item) => item.teacherId === teacher.id).map((item) => item.name),
  ])), [classes, teachers]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setImage(null);
    setError('');
    setFormOpen(true);
  }

  function openEdit(teacher: Teacher) {
    setEditing(teacher);
    setForm({
      name: teacher.name,
      role: teacher.role,
      email: teacher.email,
      bio: teacher.bio ?? '',
      subjects: (teacher.subjects ?? []).join('\n'),
    });
    setImage(null);
    setError('');
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) return;
    setFormOpen(false);
    setEditing(null);
    setImage(null);
    setError('');
  }

  function updateField(field: keyof TeacherForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function saveTeacher(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.email.trim() || (!editing && !image)) {
      setError('Complete the required details and choose a staff photo for a new profile.');
      return;
    }

    setSaving(true);
    setError('');
    let newAssetId = '';
    try {
      const asset = image ? await uploadMedia(image, form.name) : null;
      newAssetId = asset?.id ?? '';
      const value = {
        name: form.name.trim(),
        role: form.role.trim(),
        email: form.email.trim(),
        bio: form.bio.trim(),
        subjects: form.subjects.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean),
        image: asset?.url ?? editing?.image ?? '',
        mediaId: asset?.id ?? editing?.mediaId,
      };

      if (editing) {
        await updateTeacher(editing.id, value);
        if (asset && editing.mediaId && editing.mediaId !== asset.id) {
          await fetch(`/api/admin/media/${encodeURIComponent(editing.mediaId)}`, {
            method: 'DELETE', credentials: 'same-origin',
          }).catch(() => undefined);
        }
      } else {
        await addTeacher(value);
      }

      setFormOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setImage(null);
    } catch (saveError) {
      if (newAssetId) {
        await fetch(`/api/admin/media/${encodeURIComponent(newAssetId)}`, {
          method: 'DELETE', credentials: 'same-origin',
        }).catch(() => undefined);
      }
      setError(saveError instanceof Error ? saveError.message : 'The staff profile could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function removeTeacher(teacher: Teacher) {
    const assigned = assignments.get(teacher.id) ?? [];
    if (assigned.length > 0) {
      setError(`Reassign or remove ${teacher.name} from ${assigned.join(', ')} before deleting the profile.`);
      return;
    }
    if (!window.confirm(`Delete ${teacher.name}'s staff profile?`)) return;
    setError('');
    try {
      await deleteTeacher(teacher.id);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The staff profile could not be deleted.');
    }
  }

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Staff & Faculty</h1>
        <p className="text-xs text-gray-500">Create, edit, assign and safely remove the educator profiles shown on the public website.</p>
      </div>
      <button onClick={formOpen ? closeForm : openCreate} className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-xs transition-colors hover:bg-blue-700">
        {formOpen ? <X className="h-4 w-4"/> : <Plus className="h-4 w-4"/>}
        {formOpen ? 'Close editor' : 'Register New Faculty'}
      </button>
    </div>

    {error && !formOpen && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}

    {formOpen && <form onSubmit={saveTeacher} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 text-xs font-semibold text-gray-700 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div><h2 className="text-lg font-black text-blue-950">{editing ? `Edit ${editing.name}` : 'Create staff profile'}</h2><p className="mt-1 text-xs font-medium text-gray-500">Changes are published to every teacher card that uses this profile.</p></div>
        {editing && <button type="button" onClick={openCreate} className="text-xs font-bold text-blue-600 hover:underline">Create a different profile</button>}
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1">Full Name *<input value={form.name} onChange={(event) => updateField('name', event.target.value)} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required/></label>
        <label className="space-y-1">Faculty Role *<input value={form.role} onChange={(event) => updateField('role', event.target.value)} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required/></label>
        <label className="space-y-1">Email Address *<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none" required/></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">Professional Biography<textarea value={form.bio} onChange={(event) => updateField('bio', event.target.value)} rows={5} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
        <label className="space-y-1">Subjects and Specialities <span className="font-medium text-gray-400">(one per line)</span><textarea value={form.subjects} onChange={(event) => updateField('subjects', event.target.value)} rows={5} className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none"/></label>
      </div>
      <div className="space-y-1"><span>{editing ? 'Replace staff photograph' : 'Staff photograph *'}</span><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"><Upload className="h-4 w-4"/><span>{image ? image.name : editing ? 'Keep the current photo, or choose a replacement' : 'Choose an image (max 8MB)'}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" required={!editing} onChange={(event) => setImage(event.target.files?.[0] ?? null)}/></label></div>
      <button type="submit" disabled={saving} className="rounded-xl bg-green-600 px-6 py-3 text-xs font-extrabold text-white transition-colors hover:bg-green-700 disabled:bg-slate-400">{saving ? 'Saving…' : editing ? 'Save Profile Changes' : 'Publish Faculty Member'}</button>
    </form>}

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {teachers.map((teacher) => {
        const assigned = assignments.get(teacher.id) ?? [];
        return <article key={teacher.id} className="relative flex h-full flex-col justify-between space-y-4 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-xs">
          <div className="absolute right-4 top-4 flex gap-1.5">
            <button onClick={() => openEdit(teacher)} className="rounded-xl bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white" title={`Edit ${teacher.name}`}><Edit3 className="h-4 w-4"/></button>
            <button onClick={() => removeTeacher(teacher)} className="rounded-xl bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40" title={assigned.length ? `Assigned to ${assigned.join(', ')}` : `Delete ${teacher.name}`} disabled={assigned.length > 0}><Trash className="h-4 w-4"/></button>
          </div>
          <div className="space-y-4">
            <div className="mx-auto h-24 w-20 overflow-hidden rounded-2xl border-2 border-yellow-400"><img src={teacher.image} alt={teacher.name} className="h-full w-full object-cover"/></div>
            <div><h2 className="text-sm font-extrabold leading-tight text-blue-950 md:text-base">{teacher.name}</h2><p className="mt-1 text-[10px] font-bold uppercase text-blue-600">{teacher.role}</p></div>
            <p className="text-xs leading-relaxed text-gray-500">{teacher.bio || 'No professional bio configured.'}</p>
            {assigned.length > 0 && <div className="flex flex-wrap justify-center gap-1">{assigned.map((name) => <span key={name} className="rounded-full bg-yellow-50 px-2 py-1 text-[9px] font-extrabold uppercase text-yellow-700">Lead: {name}</span>)}</div>}
          </div>
          <div className="flex items-center justify-center gap-1.5 border-t border-gray-50 pt-3 text-xs font-bold text-gray-400"><Mail className="h-3.5 w-3.5 text-blue-500"/><span className="max-w-[180px] truncate">{teacher.email}</span></div>
        </article>;
      })}
    </div>
  </div>;
}
