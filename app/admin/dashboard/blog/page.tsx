'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Pencil, Plus, Search, Trash, Upload } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import type { BlogPost } from '@/types';

const categories = ['Learning', 'Arts', 'Sports', 'Trips', 'Campus', 'School Events', 'Graduation'];

export default function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, uploadMedia } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Learning');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [readTime, setReadTime] = useState('5 min read');
  const [popular, setPopular] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');
  const [existingMediaId, setExistingMediaId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function resetEditor() {
    setEditingId(null); setTitle(''); setCategory('Learning'); setSummary(''); setContent(''); setAuthor(''); setAuthorRole('');
    setDate(new Date().toISOString().slice(0, 10)); setReadTime('5 min read'); setPopular(false); setFeaturedImage(null);
    setExistingImage(''); setExistingMediaId(''); setError(''); setEditorOpen(false);
  }

  function startNewPost() {
    resetEditor();
    setEditorOpen(true);
  }

  function editPost(post: BlogPost) {
    setEditingId(post.id); setTitle(post.title); setCategory(post.category); setSummary(post.summary); setContent(post.content);
    setAuthor(post.author); setAuthorRole(post.authorRole ?? ''); setDate(post.date); setReadTime(post.readTime); setPopular(Boolean(post.popular));
    setExistingImage(post.featuredImage); setExistingMediaId(post.mediaId ?? ''); setFeaturedImage(null); setError(''); setEditorOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function savePost(event: React.FormEvent) {
    event.preventDefault();
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (!title.trim() || !summary.trim() || !plainText || !author.trim() || (!featuredImage && !existingImage)) {
      setError('Complete the headline, summary, author, article body, and featured image.');
      return;
    }
    setSaving(true);
    setError('');
    let uploadedAssetId = '';
    try {
      const asset = featuredImage ? await uploadMedia(featuredImage, title) : null;
      uploadedAssetId = asset?.id ?? '';
      const record = {
        title, category, summary, content, author, authorRole, date, readTime, popular,
        featuredImage: asset?.url ?? existingImage,
        mediaId: asset?.id ?? existingMediaId,
      };
      if (editingId) await updateBlogPost(editingId, record);
      else await addBlogPost(record);
      resetEditor();
    } catch (saveError) {
      if (uploadedAssetId) await fetch(`/api/admin/media/${encodeURIComponent(uploadedAssetId)}`, { method: 'DELETE', credentials: 'same-origin' });
      setError(saveError instanceof Error ? saveError.message : 'The article could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  const filteredPosts = blogPosts.filter((post) => `${post.title} ${post.category} ${post.author}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
      <div><h1 className="text-2xl font-black text-blue-950">Blog post editor</h1><p className="text-xs text-gray-500">Create and edit complete articles, links, alignment and R2-hosted images.</p></div>
      <button type="button" onClick={editorOpen ? resetEditor : startNewPost} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-blue-700"><Plus className="h-4 w-4"/>{editorOpen ? 'Close editor' : 'Create blog post'}</button>
    </div>

    {editorOpen && <form onSubmit={savePost} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center"><div><p className="text-xs font-black uppercase tracking-wider text-blue-700">{editingId ? 'Editing publication' : 'New publication'}</p><h2 className="mt-1 text-xl font-black text-blue-950">{editingId ? title || 'Untitled article' : 'Compose an article'}</h2></div>{editingId && <Link href={`/blog/${editingId}`} target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-blue-700"><Eye className="h-4 w-4"/>View current post</Link>}</div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-1 text-xs font-bold text-slate-600">Headline *<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={240} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-600" required/></label>
        <label className="space-y-1 text-xs font-bold text-slate-600">Category *<select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-600">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="block space-y-1 text-xs font-bold text-slate-600">Summary *<textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} maxLength={600} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-600" required/></label>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1 text-xs font-bold text-slate-600">Author *<input value={author} onChange={(event) => setAuthor(event.target.value)} maxLength={120} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900" required/></label>
        <label className="space-y-1 text-xs font-bold text-slate-600">Author role<input value={authorRole} onChange={(event) => setAuthorRole(event.target.value)} maxLength={120} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900"/></label>
        <label className="space-y-1 text-xs font-bold text-slate-600">Publication date *<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900" required/></label>
        <label className="space-y-1 text-xs font-bold text-slate-600">Reading time *<input value={readTime} onChange={(event) => setReadTime(event.target.value)} placeholder="5 min read" maxLength={40} className="w-full rounded-xl border border-slate-300 p-3 text-sm font-medium text-slate-900" required/></label>
      </div>

      <div className="space-y-2"><p className="text-xs font-bold text-slate-600">Featured image *</p><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs font-semibold text-slate-600"><Upload className="h-4 w-4"/><span>{featuredImage ? featuredImage.name : existingImage ? 'Keep current image, or choose a replacement' : 'Choose featured image (max 8MB)'}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => setFeaturedImage(event.target.files?.[0] ?? null)}/></label>{existingImage && <img src={existingImage} alt="Current featured image" className="h-32 w-48 rounded-xl object-cover"/>}</div>

      <div className="space-y-2"><div><p className="text-xs font-bold text-slate-600">Article body *</p><p className="mt-1 text-xs text-slate-400">Select text before applying a link or formatting. Inline images upload directly to R2.</p></div><RichTextEditor value={content} onChange={setContent}/></div>
      <label className="flex items-center gap-3 text-sm font-bold text-slate-700"><input type="checkbox" checked={popular} onChange={(event) => setPopular(event.target.checked)} className="h-4 w-4 rounded"/>Feature this article in the popular posts section</label>
      <div className="flex flex-wrap gap-3"><button type="submit" disabled={saving} className="rounded-xl bg-green-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-green-700 disabled:bg-slate-400">{saving ? 'Saving article…' : editingId ? 'Save changes' : 'Publish article'}</button><button type="button" onClick={resetEditor} className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600">Cancel</button></div>
    </form>}

    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xs">
      <div className="flex items-center border-b border-gray-50 bg-gray-50/50 p-4"><div className="relative w-full max-w-md"><Search className="absolute left-4 top-3 h-4 w-4 text-gray-400"/><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search by title, category or author…" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-semibold outline-none"/></div></div>
      <div className="overflow-x-auto"><table className="w-full text-left text-xs font-semibold text-gray-700"><thead><tr className="border-b border-gray-100 bg-gray-100/50 font-extrabold uppercase text-blue-950"><th className="p-4">Image</th><th className="p-4">Headline</th><th className="p-4">Category</th><th className="p-4">Date</th><th className="p-4">Author</th><th className="p-4 text-center">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{filteredPosts.map((post) => <tr key={post.id} className="hover:bg-gray-50/50"><td className="p-4"><img src={post.featuredImage} alt="" className="h-12 w-12 rounded-xl object-cover"/></td><td className="max-w-sm p-4 font-extrabold text-blue-950">{post.title}</td><td className="p-4"><span className="rounded-lg bg-blue-100 px-2 py-0.5 text-[10px] font-black uppercase text-blue-700">{post.category}</span></td><td className="p-4 text-gray-500">{post.date}</td><td className="p-4">{post.author}</td><td className="p-4"><div className="flex justify-center gap-1"><button type="button" onClick={() => editPost(post)} title="Edit article" className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil className="h-4 w-4"/></button><Link href={`/blog/${post.id}`} target="_blank" title="View article" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Eye className="h-4 w-4"/></Link><button type="button" onClick={() => deleteBlogPost(post.id)} title="Delete article" className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash className="h-4 w-4"/></button></div></td></tr>)}</tbody></table></div>
      {filteredPosts.length === 0 && <div className="py-12 text-center font-medium text-gray-400">No blog posts found.</div>}
    </div>
  </div>;
}
