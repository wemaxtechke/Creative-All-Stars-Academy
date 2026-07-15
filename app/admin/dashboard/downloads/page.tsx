'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, FileUp } from 'lucide-react';
import type { DownloadItem } from '@/types';

export default function AdminDownloads() {
  const { downloads, addDownload, deleteDownload, uploadMedia } = useApp();
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Admission' | 'Calendar' | 'Assignment' | 'Policy' | 'Uniform'>('Assignment');
  const [document, setDocument] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleAddDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !document) {
      setError('Add a title and choose a PDF document.');
      return;
    }
    setSaving(true);
    setError('');
    let uploadedAssetId = '';
    try {
      const asset = await uploadMedia(document, title);
      uploadedAssetId = asset.id;
      const fileSize = asset.sizeBytes >= 1_048_576
        ? `${(asset.sizeBytes / 1_048_576).toFixed(1)} MB`
        : `${Math.ceil(asset.sizeBytes / 1024)} KB`;
      await addDownload({ title, category, fileSize, fileType: 'PDF', url: asset.url, mediaId: asset.id });
      setTitle('');
      setDocument(null);
      setAddMode(false);
    } catch (uploadError) {
      if (uploadedAssetId) await fetch(`/api/admin/media/${encodeURIComponent(uploadedAssetId)}`, { method: 'DELETE', credentials: 'same-origin' });
      setError(uploadError instanceof Error ? uploadError.message : 'The PDF could not be uploaded.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Downloads Registry</h1>
          <p className="text-gray-500 text-xs">Configure syllabus files, assignments, school rules, and calendar planners visible to parents.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Registry' : 'Register Download File'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddDownload} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
          {error && <p className="sm:col-span-3 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>}
          <div className="space-y-1">
            <label className="text-gray-600">Document Headline Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Holiday Homework Grade 4" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Category Folder *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as DownloadItem['category'])} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
              <option value="Assignment">Assignment</option>
              <option value="Admission">Admission</option>
              <option value="Calendar">Calendar</option>
              <option value="Policy">Policy</option>
              <option value="Uniform">Uniform</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">PDF document *</label>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 text-sm font-medium">
              <FileUp className="h-4 w-4" />
              <span className="truncate">{document ? document.name : 'Choose PDF (max 12MB)'}</span>
              <input type="file" accept="application/pdf,.pdf" className="sr-only" required onChange={(event) => setDocument(event.target.files?.[0] ?? null)} />
            </label>
          </div>
          <div className="pt-6 sm:col-span-3">
            <button type="submit" disabled={saving} className="px-6 py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-extrabold rounded-xl transition-colors">{saving ? 'Uploadingâ€¦' : 'Publish Downloadable File'}</button>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Document Title</th>
                <th className="p-4">Category Folder</th>
                <th className="p-4">File Type</th>
                <th className="p-4">Size Metric</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-extrabold text-blue-950">{item.title}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-gray-500">{item.fileType}</td>
                  <td className="p-4">{item.fileSize}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteDownload(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete document"
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
