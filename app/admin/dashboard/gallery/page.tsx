'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Calendar, Check, ImagePlus, Pencil, Plus, Save, Settings2, Trash, X } from 'lucide-react';
import type { GalleryImage } from '@/types';

const today = () => new Date().toISOString().split('T')[0];

export default function AdminGallery() {
  const {
    galleryImages,
    settings,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    updateSettings,
    uploadMedia,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [category, setCategory] = useState(settings.galleryCategories[0] || 'School Events');
  const [date, setDate] = useState(today());
  const [order, setOrder] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [savingMedia, setSavingMedia] = useState(false);
  const [mediaError, setMediaError] = useState('');
  const [mediaSuccess, setMediaSuccess] = useState('');

  const [pageForm, setPageForm] = useState({
    galleryEyebrow: settings.galleryEyebrow,
    galleryTitle: settings.galleryTitle,
    galleryDescription: settings.galleryDescription,
    gallerySectionTitle: settings.gallerySectionTitle,
    gallerySectionSubtitle: settings.gallerySectionSubtitle,
    galleryBadge: settings.galleryBadge,
    galleryModalDescription: settings.galleryModalDescription,
  });
  const [categories, setCategories] = useState<string[]>(settings.galleryCategories);
  const [newCategory, setNewCategory] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const orderedImages = useMemo(() => [...galleryImages].sort((a, b) =>
    (a.order ?? 0) - (b.order ?? 0) || b.date.localeCompare(a.date)
  ), [galleryImages]);
  const filteredImages = selectedCategory === 'All'
    ? orderedImages
    : orderedImages.filter((image) => image.category === selectedCategory);

  function resetMediaForm() {
    setEditing(null);
    setTitle('');
    setAlt('');
    setCategory(categories[0] || 'School Events');
    setDate(today());
    setOrder(0);
    setPhoto(null);
    setMediaError('');
    setShowMediaForm(false);
  }

  function beginCreate() {
    resetMediaForm();
    setShowMediaForm(true);
    setMediaSuccess('');
  }

  function beginEdit(image: GalleryImage) {
    setEditing(image);
    setTitle(image.title);
    setAlt(image.alt || image.title);
    setCategory(image.category);
    setDate(image.date);
    setOrder(image.order ?? 0);
    setPhoto(null);
    setMediaError('');
    setMediaSuccess('');
    setShowMediaForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function saveMedia(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !category || !date || (!editing && !photo)) {
      setMediaError('Complete the title, category, date, and image fields.');
      return;
    }

    setSavingMedia(true);
    setMediaError('');
    setMediaSuccess('');
    let newMediaId = '';
    try {
      let media = editing ? { id: editing.mediaId || '', url: editing.url } : null;
      if (photo) {
        const uploaded = await uploadMedia(photo, alt.trim() || title.trim());
        newMediaId = uploaded.id;
        media = uploaded;
      }
      if (!media) throw new Error('Choose an image to upload.');

      const value = {
        title: title.trim(),
        alt: alt.trim() || title.trim(),
        category,
        date,
        order: Number.isFinite(order) ? order : 0,
        url: media.url,
        mediaId: media.id,
      };

      if (editing) {
        const oldMediaId = editing.mediaId;
        await updateGalleryImage(editing.id, value);
        if (newMediaId && oldMediaId && oldMediaId !== newMediaId) {
          const response = await fetch(`/api/admin/media/${encodeURIComponent(oldMediaId)}`, {
            method: 'DELETE', credentials: 'same-origin',
          });
          if (!response.ok) console.warn('The old gallery file could not be removed after replacement.');
        }
        setMediaSuccess('Gallery item updated.');
      } else {
        await addGalleryImage(value);
        setMediaSuccess('Gallery item published.');
      }
      resetMediaForm();
    } catch (error) {
      if (newMediaId) {
        await fetch(`/api/admin/media/${encodeURIComponent(newMediaId)}`, {
          method: 'DELETE', credentials: 'same-origin',
        });
      }
      setMediaError(error instanceof Error ? error.message : 'The gallery item could not be saved.');
    } finally {
      setSavingMedia(false);
    }
  }

  async function removeImage(image: GalleryImage) {
    if (!window.confirm(`Delete “${image.title}” and its uploaded image?`)) return;
    setMediaError('');
    setMediaSuccess('');
    try {
      await deleteGalleryImage(image.id);
      setMediaSuccess('Gallery item deleted.');
      if (editing?.id === image.id) resetMediaForm();
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : 'The gallery item could not be deleted.');
    }
  }

  function addCategory() {
    const value = newCategory.trim();
    if (!value) return;
    if (categories.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setSettingsError('That category already exists.');
      return;
    }
    setCategories((current) => [...current, value]);
    setNewCategory('');
    setSettingsError('');
  }

  function removeCategory(value: string) {
    if (galleryImages.some((image) => image.category === value)) {
      setSettingsError(`Move or delete the images in “${value}” before removing this category.`);
      return;
    }
    setCategories((current) => current.filter((item) => item !== value));
    if (selectedCategory === value) setSelectedCategory('All');
    setSettingsError('');
  }

  async function savePageSettings(event: React.FormEvent) {
    event.preventDefault();
    if (!pageForm.galleryTitle.trim() || !pageForm.gallerySectionTitle.trim() || categories.length === 0) {
      setSettingsError('Add a page title, section title, and at least one category.');
      return;
    }
    setSavingSettings(true);
    setSettingsError('');
    setSettingsSuccess('');
    try {
      await updateSettings({ ...settings, ...pageForm, galleryCategories: categories });
      setSettingsSuccess('School Life page settings saved.');
    } catch (error) {
      setSettingsError(error instanceof Error ? error.message : 'The page settings could not be saved.');
    } finally {
      setSavingSettings(false);
    }
  }

  const fieldClass = 'w-full rounded-xl border border-gray-200 p-3 text-sm font-medium focus:border-blue-600 focus:outline-none';

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">School Life & Gallery</h1>
          <p className="text-xs text-gray-500">Control every public gallery image, category, label, date, order, and page heading.</p>
        </div>
        <button onClick={showMediaForm ? resetMediaForm : beginCreate} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-700">
          {showMediaForm ? <X className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
          {showMediaForm ? 'Close editor' : 'Add gallery image'}
        </button>
      </div>

      {(mediaError || mediaSuccess) && (
        <p className={`rounded-xl border p-3 text-sm font-semibold ${mediaError ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
          {mediaError || mediaSuccess}
        </p>
      )}

      {showMediaForm && (
        <form onSubmit={saveMedia} className="grid grid-cols-1 gap-4 rounded-3xl border border-gray-100 bg-white p-6 text-xs font-semibold text-gray-700 shadow-sm sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center gap-2 text-base font-black text-blue-950">
            {editing ? <Pencil className="h-5 w-5" /> : <ImagePlus className="h-5 w-5" />}
            {editing ? 'Edit gallery item' : 'Publish gallery item'}
          </div>
          <label className="space-y-1">Title *<input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
          <label className="space-y-1">Accessible image description<input className={fieldClass} value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Describe what is visible in the image" /></label>
          <label className="space-y-1">Category *
            <select className={`${fieldClass} bg-white`} value={category} onChange={(event) => setCategory(event.target.value)} required>
              {!categories.includes(category) && <option value={category}>{category}</option>}
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="space-y-1">Date taken *<input type="date" className={fieldClass} value={date} onChange={(event) => setDate(event.target.value)} required /></label>
          <label className="space-y-1">Display order<input type="number" className={fieldClass} value={order} onChange={(event) => setOrder(Number(event.target.value))} /><span className="block text-[10px] font-medium text-gray-400">Lower numbers appear first.</span></label>
          <label className="space-y-1">{editing ? 'Replace image (optional)' : 'Image *'}
            <span className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3">
              <ImagePlus className="h-5 w-5 text-gray-400" />{photo ? photo.name : editing ? 'Choose a new file only if replacing the current image' : 'Choose JPG, PNG, WebP or AVIF (max 8MB)'}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" required={!editing} onChange={(event) => setPhoto(event.target.files?.[0] ?? null)} />
            </span>
          </label>
          {editing && <div className="sm:col-span-2 flex items-center gap-3 rounded-xl bg-gray-50 p-3"><img src={editing.url} alt={editing.alt || editing.title} className="h-16 w-24 rounded-lg object-cover" /><span className="text-gray-500">Current image</span></div>}
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button disabled={savingMedia} className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-extrabold text-white hover:bg-green-700 disabled:bg-slate-400"><Save className="h-4 w-4" />{savingMedia ? 'Saving...' : editing ? 'Save changes' : 'Publish image'}</button>
            <button type="button" onClick={resetMediaForm} className="rounded-xl border px-5 py-3 font-extrabold text-gray-600">Cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={savePageSettings} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2"><Settings2 className="h-5 w-5 text-blue-600" /><h2 className="font-black text-blue-950">Public page text and categories</h2></div>
        {(settingsError || settingsSuccess) && <p className={`rounded-xl border p-3 text-sm font-semibold ${settingsError ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>{settingsError || settingsSuccess}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-xs font-semibold text-gray-700">Hero eyebrow<input className={fieldClass} value={pageForm.galleryEyebrow} onChange={(event) => setPageForm({ ...pageForm, galleryEyebrow: event.target.value })} /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700">Hero title *<input className={fieldClass} value={pageForm.galleryTitle} onChange={(event) => setPageForm({ ...pageForm, galleryTitle: event.target.value })} required /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700 sm:col-span-2">Hero description<textarea className={fieldClass} rows={2} value={pageForm.galleryDescription} onChange={(event) => setPageForm({ ...pageForm, galleryDescription: event.target.value })} /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700">Gallery heading *<input className={fieldClass} value={pageForm.gallerySectionTitle} onChange={(event) => setPageForm({ ...pageForm, gallerySectionTitle: event.target.value })} required /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700">Gallery badge<input className={fieldClass} value={pageForm.galleryBadge} onChange={(event) => setPageForm({ ...pageForm, galleryBadge: event.target.value })} /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700 sm:col-span-2">Gallery introduction<textarea className={fieldClass} rows={2} value={pageForm.gallerySectionSubtitle} onChange={(event) => setPageForm({ ...pageForm, gallerySectionSubtitle: event.target.value })} /></label>
          <label className="space-y-1 text-xs font-semibold text-gray-700 sm:col-span-2">Image viewer description<textarea className={fieldClass} rows={2} value={pageForm.galleryModalDescription} onChange={(event) => setPageForm({ ...pageForm, galleryModalDescription: event.target.value })} /></label>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-700">Filter categories</p>
          <div className="flex flex-wrap gap-2">{categories.map((item) => <span key={item} className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900">{item}<button type="button" onClick={() => removeCategory(item)} title={`Remove ${item}`}><X className="h-3.5 w-3.5" /></button></span>)}</div>
          <div className="flex max-w-lg gap-2"><input className={fieldClass} value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="New category name" onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addCategory(); } }} /><button type="button" onClick={addCategory} className="flex items-center gap-1 rounded-xl bg-blue-950 px-4 text-xs font-bold text-white"><Plus className="h-4 w-4" />Add</button></div>
        </div>
        <button disabled={savingSettings} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-extrabold text-white hover:bg-blue-700 disabled:bg-slate-400"><Check className="h-4 w-4" />{savingSettings ? 'Saving...' : 'Save page settings'}</button>
      </form>

      <div className="flex flex-wrap gap-2 border-b pb-3">
        {['All', ...categories].map((item) => {
          const count = item === 'All' ? galleryImages.length : galleryImages.filter((image) => image.category === item).length;
          return <button key={item} onClick={() => setSelectedCategory(item)} className={`rounded-lg px-3 py-1.5 text-xs font-black ${selectedCategory === item ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-500'}`}>{item} ({count})</button>;
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredImages.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative h-44 bg-gray-50"><img src={image.url} alt={image.alt || image.title} className="h-full w-full object-cover" /><div className="absolute right-3 top-3 flex gap-2"><button onClick={() => beginEdit(image)} className="rounded-xl bg-white p-2 text-blue-700 shadow-md" title="Edit gallery item"><Pencil className="h-4 w-4" /></button><button onClick={() => removeImage(image)} className="rounded-xl bg-red-600 p-2 text-white shadow-md" title="Delete gallery item"><Trash className="h-4 w-4" /></button></div></div>
            <div className="space-y-1 p-4"><span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">{image.category} · Order {image.order ?? 0}</span><h3 className="truncate text-xs font-extrabold text-blue-950">{image.title}</h3><span className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><Calendar className="h-3 w-3" />{image.date}</span></div>
          </article>
        ))}
      </div>

      {filteredImages.length === 0 && <div className="rounded-3xl border border-dashed py-12 text-center text-sm font-medium text-gray-400">No gallery images are assigned to this category.</div>}
    </div>
  );
}
