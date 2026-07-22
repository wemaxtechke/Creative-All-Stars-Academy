'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Download, FileUp, Pencil, Plus, Save, Trash, X } from 'lucide-react';
import type { DownloadItem } from '@/types';

const downloadCategories: DownloadItem['category'][] = ['Admission', 'Calendar', 'Assignment', 'Policy', 'Uniform'];

export default function AdminDownloads() {
  const { downloads, addDownload, updateDownload, deleteDownload, uploadMedia } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DownloadItem | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DownloadItem['category']>('Admission');
  const [order, setOrder] = useState(0);
  const [document, setDocument] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const orderedDownloads = useMemo(() => [...downloads].sort((a, b) =>
    (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title)
  ), [downloads]);

  function resetForm() {
    setShowForm(false);
    setEditing(null);
    setTitle('');
    setCategory('Admission');
    setOrder(0);
    setDocument(null);
    setError('');
  }

  function beginCreate() {
    resetForm();
    setSuccess('');
    setShowForm(true);
  }

  function beginEdit(item: DownloadItem) {
    setEditing(item);
    setTitle(item.title);
    setCategory(item.category);
    setOrder(item.order ?? 0);
    setDocument(null);
    setError('');
    setSuccess('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatSize(sizeBytes: number) {
    return sizeBytes >= 1_048_576
      ? `${(sizeBytes / 1_048_576).toFixed(1)} MB`
      : `${Math.max(1, Math.ceil(sizeBytes / 1024))} KB`;
  }

  async function saveDownload(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || (!editing && !document)) {
      setError('Add a title and choose a PDF document.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    let newMediaId = '';
    try {
      let file = editing ? {
        id: editing.mediaId,
        url: editing.url,
        sizeBytes: 0,
      } : null;
      if (document) {
        const uploaded = await uploadMedia(document, title.trim());
        newMediaId = uploaded.id;
        file = uploaded;
      }
      if (!file) throw new Error('Choose a PDF document.');

      const value = {
        title: title.trim(),
        category,
        order: Number.isFinite(order) ? order : 0,
        fileSize: document ? formatSize(file.sizeBytes) : editing!.fileSize,
        fileType: 'PDF',
        url: file.url,
        mediaId: file.id,
      };

      if (editing) {
        const oldMediaId = editing.mediaId;
        await updateDownload(editing.id, value);
        if (newMediaId && oldMediaId !== newMediaId) {
          const response = await fetch(`/api/admin/media/${encodeURIComponent(oldMediaId)}`, {
            method: 'DELETE', credentials: 'same-origin',
          });
          if (!response.ok) console.warn('The replaced PDF could not be removed from storage.');
        }
        setSuccess('Document updated.');
      } else {
        await addDownload(value);
        setSuccess('Document uploaded and published.');
      }
      resetForm();
    } catch (saveError) {
      if (newMediaId) {
        await fetch(`/api/admin/media/${encodeURIComponent(newMediaId)}`, {
          method: 'DELETE', credentials: 'same-origin',
        });
      }
      setError(saveError instanceof Error ? saveError.message : 'The PDF could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function removeDownload(item: DownloadItem) {
    if (!window.confirm(`Delete “${item.title}” and its uploaded PDF?`)) return;
    setError('');
    setSuccess('');
    try {
      await deleteDownload(item.id);
      setSuccess('Document and uploaded PDF deleted.');
      if (editing?.id === item.id) resetForm();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The document could not be deleted.');
    }
  }

  const fieldClass = 'w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Parent PDF Downloads</h1>
          <p className="text-xs text-gray-500">Only PDFs uploaded here are shown on the Admissions and Parent Resources pages.</p>
        </div>
        <button type="button" onClick={showForm ? resetForm : beginCreate} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-700">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Close editor' : 'Upload PDF'}
        </button>
      </div>

      {(error || success) && <p className={`rounded-xl border p-3 text-sm font-semibold ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>{error || success}</p>}

      {showForm && (
        <form onSubmit={saveDownload} className="grid grid-cols-1 gap-4 rounded-3xl border border-gray-100 bg-white p-6 text-xs font-semibold text-gray-700 shadow-sm sm:grid-cols-2">
          <h2 className="flex items-center gap-2 text-base font-black text-blue-950 sm:col-span-2">
            {editing ? <Pencil className="h-5 w-5" /> : <FileUp className="h-5 w-5" />}
            {editing ? 'Edit downloadable document' : 'Upload downloadable document'}
          </h2>
          <label className="space-y-1">Document title *<input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
          <label className="space-y-1">Where it appears *
            <select className={`${fieldClass} bg-white`} value={category} onChange={(event) => setCategory(event.target.value as DownloadItem['category'])} required>
              {downloadCategories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="space-y-1">Display order<input type="number" className={fieldClass} value={order} onChange={(event) => setOrder(Number(event.target.value))} /><span className="block text-[10px] font-medium text-gray-400">Lower numbers appear first.</span></label>
          <label className="space-y-1">{editing ? 'Replace PDF (optional)' : 'PDF document *'}
            <span className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-sm font-medium">
              <FileUp className="h-4 w-4" /><span className="truncate">{document ? document.name : editing ? 'Choose a file only when replacing the current PDF' : 'Choose PDF (max 12MB)'}</span>
              <input type="file" accept="application/pdf,.pdf" className="sr-only" required={!editing} onChange={(event) => setDocument(event.target.files?.[0] ?? null)} />
            </span>
          </label>
          {editing && <a href={editing.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 font-bold text-blue-700 sm:col-span-2"><Download className="h-4 w-4" />Open current PDF: {editing.fileSize}</a>}
          <div className="flex gap-3 pt-2 sm:col-span-2">
            <button disabled={saving} className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-extrabold text-white hover:bg-green-700 disabled:bg-slate-400"><Save className="h-4 w-4" />{saving ? 'Saving...' : editing ? 'Save changes' : 'Upload and publish'}</button>
            <button type="button" onClick={resetForm} className="rounded-xl border px-5 py-3 font-extrabold text-gray-600">Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-700">
            <thead><tr className="border-b bg-gray-50 font-extrabold uppercase text-blue-950"><th className="p-4">Document</th><th className="p-4">Page category</th><th className="p-4">File</th><th className="p-4">Order</th><th className="p-4 text-center">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {orderedDownloads.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-extrabold text-blue-950">{item.title}</td>
                  <td className="p-4"><span className="rounded-lg bg-blue-100 px-2.5 py-1 text-[10px] font-black uppercase text-blue-700">{item.category}</span></td>
                  <td className="p-4"><a href={item.url} target="_blank" rel="noreferrer" className="font-bold text-blue-600 hover:underline">PDF · {item.fileSize}</a></td>
                  <td className="p-4">{item.order ?? 0}</td>
                  <td className="p-4"><div className="flex justify-center gap-2"><button type="button" onClick={() => beginEdit(item)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" title="Edit document"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => removeDownload(item)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" title="Delete document"><Trash className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {orderedDownloads.length === 0 && <p className="p-10 text-center text-sm font-medium text-gray-400">No PDFs are published. Upload the first document to make it available on the website.</p>}
        </div>
      </div>
    </div>
  );
}
