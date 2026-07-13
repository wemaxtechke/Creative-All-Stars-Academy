'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Plus, Trash, Search, PlusCircle, Paperclip } from 'lucide-react';

export default function AdminGallery() {
  const { galleryImages, addGalleryImage, deleteGalleryImage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'School Events' | 'Sports' | 'Graduation' | 'Trips' | 'Learning' | 'Campus'>('Learning');
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop');

  const [addMode, setAddMode] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      alert('Please complete photo details correctly.');
      return;
    }
    addGalleryImage({
      title,
      category,
      url,
      date: new Date().toISOString().split('T')[0]
    });
    setTitle('');
    setAddMode(false);
  };

  const categories = ['All', 'School Events', 'Sports', 'Graduation', 'Trips', 'Learning', 'Campus'];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Gallery Grid Manager</h1>
          <p className="text-gray-500 text-xs">Upload new visual assets or delete outdated media items from our masonry folders.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          {addMode ? 'Cancel upload' : 'Upload New Photo'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleUpload} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
          <div className="space-y-1">
            <label className="text-gray-600">Media Photo Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Science congress chemistry setup" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Category Tag *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium"
              required
            >
              <option value="School Events">School Events</option>
              <option value="Sports">Sports</option>
              <option value="Graduation">Graduation</option>
              <option value="Trips">Trips</option>
              <option value="Learning">Learning</option>
              <option value="Campus">Campus</option>
            </select>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-gray-600">High Resolution Image URL *</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="sm:col-span-2 pt-4">
            <button type="submit" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Publish Media Asset</button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {categories.map((cat, idx) => {
          const count = cat === 'All' ? galleryImages.length : galleryImages.filter(g => g.category === cat).length;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div key={img.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs relative group">
            <div className="h-44 bg-gray-50 relative overflow-hidden">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />

              {/* Delete trigger */}
              <button
                onClick={() => deleteGalleryImage(img.id)}
                className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors"
                title="Delete Photo asset"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4 leading-tight">
              <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider block mb-1">{img.category}</span>
              <h4 className="font-extrabold text-blue-950 text-xs truncate">{img.title}</h4>
              <span className="text-[9px] text-gray-400 font-bold block mt-2 uppercase">{img.date}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-400 font-medium">No visual images registered under this directory tag.</div>
      )}

    </div>
  );
}
