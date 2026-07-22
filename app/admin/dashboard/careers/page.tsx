'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Eye, EyeOff, Pencil, Plus, Save, Trash, X } from 'lucide-react';
import type { Job } from '@/types';

const today = () => new Date().toISOString().slice(0, 10);
const toList = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

export default function AdminCareers() {
  const { jobs, addJob, updateJob, deleteJob } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('Primary School Academics');
  const [type, setType] = useState<Job['type']>('Full-time');
  const [location, setLocation] = useState('Nakuru, Kenya');
  const [deadline, setDeadline] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const orderedJobs = useMemo(() => [...jobs].sort((a, b) =>
    b.deadline.localeCompare(a.deadline) || a.title.localeCompare(b.title)
  ), [jobs]);

  function resetForm() {
    setShowForm(false);
    setEditing(null);
    setTitle('');
    setDescription('');
    setDepartment('Primary School Academics');
    setType('Full-time');
    setLocation('Nakuru, Kenya');
    setDeadline('');
    setResponsibilities('');
    setRequirements('');
    setIsActive(true);
    setError('');
  }

  function beginCreate() {
    resetForm();
    setSuccess('');
    setShowForm(true);
  }

  function beginEdit(job: Job) {
    setEditing(job);
    setTitle(job.title);
    setDescription(job.description || '');
    setDepartment(job.department);
    setType(job.type);
    setLocation(job.location);
    setDeadline(job.deadline);
    setResponsibilities(job.responsibilities.join('\n'));
    setRequirements(job.requirements.join('\n'));
    setIsActive(job.isActive !== false);
    setError('');
    setSuccess('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function saveJob(event: React.FormEvent) {
    event.preventDefault();
    const responsibilityList = toList(responsibilities);
    const requirementList = toList(requirements);
    if (!title.trim() || !description.trim() || !department.trim() || !location.trim() || !deadline ||
        responsibilityList.length === 0 || requirementList.length === 0) {
      setError('Complete every vacancy field and add at least one responsibility and requirement.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    const value = {
      title: title.trim(),
      description: description.trim(),
      department: department.trim(),
      type,
      location: location.trim(),
      deadline,
      responsibilities: responsibilityList,
      requirements: requirementList,
      isActive,
    };
    try {
      if (editing) await updateJob(editing.id, value);
      else await addJob(value);
      setSuccess(editing ? 'Vacancy updated successfully.' : 'Vacancy created successfully.');
      resetForm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The vacancy could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(job: Job) {
    setError('');
    setSuccess('');
    try {
      await updateJob(job.id, { isActive: job.isActive === false });
      setSuccess(job.isActive === false ? 'Vacancy published.' : 'Vacancy hidden from the website.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The vacancy status could not be changed.');
    }
  }

  async function removeJob(job: Job) {
    if (!window.confirm(`Permanently delete “${job.title}”?`)) return;
    setError('');
    setSuccess('');
    try {
      await deleteJob(job.id);
      setSuccess('Vacancy deleted.');
      if (editing?.id === job.id) resetForm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The vacancy could not be deleted.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Vacancies</h1>
          <p className="text-gray-500 text-xs">Create, edit, publish, close, and delete vacancies shown on the Careers page.</p>
        </div>
        <button onClick={showForm ? resetForm : beginCreate} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Vacancy'}
        </button>
      </div>

      {success && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{success}</p>}
      {error && !showForm && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

      {showForm && (
        <form onSubmit={saveJob} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-blue-950">{editing ? 'Edit Vacancy' : 'Create Vacancy'}</h2>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-950">
              <input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} className="h-4 w-4" />
              Publish on website
            </label>
          </div>
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
            <label className="space-y-1 lg:col-span-2">Vacancy title *
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Kiswahili Language Teacher" className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1">Department *
              <input value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1 lg:col-span-3">Vacancy summary *
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="A short description shown at the top of the vacancy page." className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1">Contract type *
              <select value={type} onChange={(event) => setType(event.target.value as Job['type'])} className="mt-1 w-full p-3 rounded-xl border border-gray-200 bg-white text-sm font-medium">
                <option>Full-time</option><option>Part-time</option><option>Contract</option>
              </select>
            </label>
            <label className="space-y-1">Location *
              <input value={location} onChange={(event) => setLocation(event.target.value)} className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1">Application deadline *
              <input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1 lg:col-span-3">Responsibilities * <span className="font-normal text-gray-400">(one per line)</span>
              <textarea value={responsibilities} onChange={(event) => setResponsibilities(event.target.value)} rows={6} className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
            <label className="space-y-1 lg:col-span-3">Requirements * <span className="font-normal text-gray-400">(one per line)</span>
              <textarea value={requirements} onChange={(event) => setRequirements(event.target.value)} rows={6} className="mt-1 w-full p-3 rounded-xl border border-gray-200 text-sm font-medium" required />
            </label>
          </div>
          <button disabled={saving} className="px-5 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-extrabold text-sm rounded-xl flex items-center gap-2">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Vacancy'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead><tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
              <th className="p-4">Vacancy</th><th className="p-4">Contract</th><th className="p-4">Deadline</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {orderedJobs.map((job) => {
                const expired = job.deadline < today();
                const published = job.isActive !== false;
                return <tr key={job.id} className="hover:bg-gray-50/50">
                  <td className="p-4"><p className="font-extrabold text-blue-950">{job.title}</p><p className="mt-1 text-gray-500">{job.department} · {job.location}</p></td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase">{job.type}</span></td>
                  <td className="p-4 font-bold text-gray-600">{job.deadline}</td>
                  <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${expired ? 'bg-amber-100 text-amber-700' : published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{expired ? 'Expired' : published ? 'Published' : 'Hidden'}</span></td>
                  <td className="p-4"><div className="flex justify-end gap-1">
                    <button onClick={() => beginEdit(job)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit vacancy"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => togglePublished(job)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title={published ? 'Hide vacancy' : 'Publish vacancy'}>{published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    <button onClick={() => removeJob(job)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete vacancy"><Trash className="w-4 h-4" /></button>
                  </div></td>
                </tr>;
              })}
              {orderedJobs.length === 0 && <tr><td colSpan={5} className="p-10 text-center text-gray-500">No vacancies have been added. Use “Add Vacancy” to create one.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
