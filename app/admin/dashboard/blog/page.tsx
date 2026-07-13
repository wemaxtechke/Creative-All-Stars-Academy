'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Search, Plus, Trash, Edit, Eye } from 'lucide-react';

export default function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [addMode, setAddMode] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Learning');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop');

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      alert('Please fill in all requested fields correctly.');
      return;
    }
    addBlogPost({
      title,
      summary,
      content,
      featuredImage,
      category,
      date: new Date().toISOString().split('T')[0],
      author: 'Mrs. Serah Wangari',
      authorRole: 'School Director & Principal',
      readTime: '5 min read',
      popular: false
    });
    setTitle('');
    setSummary('');
    setContent('');
    setAddMode(false);
  };

  const filteredPosts = blogPosts.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Press Blog Articles</h1>
          <p className="text-gray-500 text-xs">Search, publish, edit, or delete publications distributed to our 12+ public articles directory.</p>
        </div>
        <button
          onClick={() => setAddMode(!addMode)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {addMode ? 'Cancel Publication' : 'Draft New Article'}
        </button>
      </div>

      {addMode && (
        <form onSubmit={handleAddPost} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4 text-xs font-semibold text-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-gray-600">Article Title Block *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Preparing candidates for regional athletic championships" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
            </div>
            <div className="space-y-1">
              <label className="text-gray-600">Category Tag *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-600 text-sm font-medium" required>
                <option value="Learning">Learning</option>
                <option value="Arts">Arts</option>
                <option value="Sports">Sports</option>
                <option value="Trips">Trips</option>
                <option value="Campus">Campus</option>
                <option value="School Events">School Events</option>
                <option value="Graduation">Graduation</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Summary Snippet (Brief sentence) *</label>
            <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="e.g. A comprehensive deep look on physical fitness metrics and mental balance." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Featured Image URL (High quality placeholder) *</label>
            <input type="text" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Full HTML Article Content *</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="<p>Write your detailed multi-paragraph text here...</p>" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-semibold text-gray-700" required />
          </div>

          <button type="submit" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-colors">Publish Article Live</button>
        </form>
      )}

      {/* Grid listing */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">

        {/* Search */}
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-3 left-4 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles by titles, tags, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Table view */}
        <div className="overflow-x-auto text-left">
          <table className="w-full text-xs font-semibold text-gray-700">
            <thead>
              <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                <th className="p-4">Featured Image</th>
                <th className="p-4">Article Headline</th>
                <th className="p-4">Category Tag</th>
                <th className="p-4">Publish Date</th>
                <th className="p-4">Author Name</th>
                <th className="p-4 text-center">Evaluate Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-extrabold text-blue-950 max-w-sm truncate">{post.title}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{post.date}</td>
                  <td className="p-4">{post.author}</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete publication"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium">No published blog posts found.</div>
        )}

      </div>
    </div>
  );
}
