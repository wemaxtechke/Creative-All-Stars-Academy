'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { BlogCard } from '@/components/BlogCard';
import { Search, ChevronLeft, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

export default function Blog() {
  const { blogPosts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;
  const categories = ['All', 'Learning', 'Arts', 'Sports', 'Trips', 'Campus', 'School Events', 'Graduation'];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const popularPosts = blogPosts.filter(p => p.popular).slice(0, 4);

  return (
    <div className="pb-24">
      <PageHero eyebrow="News, ideas and celebrations" title="Stories from a school that never stops growing." description="Follow learner achievements, school events, thoughtful parent guidance and practical insights into CBC learning." imageSlot="page-blog"/>

      <Breadcrumbs items={[{ name: 'News & Blog' }]} />

      {/* Main layout: content + sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Posts Grid and filters */}
        <div className="lg:col-span-8 space-y-10">

          {/* Top Search & Filter bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl shadow-xs border border-gray-100">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute top-3.5 left-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog articles or headlines..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>

            <div className="relative w-full sm:w-1/3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 bg-gray-50 text-gray-700 text-sm font-extrabold rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23130210%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')] bg-[length:10px] bg-[right_16px_center] bg-no-repeat pr-10"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat} (Category)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl space-y-4">
              <span className="text-4xl">🔬</span>
              <h4 className="font-black text-blue-950 text-lg">No matches found</h4>
              <p className="text-gray-500 text-sm leading-relaxed">We couldn&apos;t find any articles matching your search description. Try broader categories.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-100">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white border border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
                title="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-11 h-11 rounded-xl text-sm font-extrabold transition-all ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                      : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-3 bg-white border border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
                title="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-8">

          {/* Categories card list */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-blue-950 border-b border-gray-50 pb-2">Filter Categories</h3>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {categories.map((cat, idx) => {
                const count = cat === 'All' ? blogPosts.length : blogPosts.filter(p => p.category === cat).length;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                      selectedCategory === cat ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-lg text-gray-500 font-bold">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular posts side list */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-blue-950 border-b border-gray-50 pb-2">Popular Articles</h3>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <div key={post.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-blue-950 line-clamp-2 hover:text-blue-600">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
