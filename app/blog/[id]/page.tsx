'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Calendar, Clock, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function BlogDetails() {
  const { id } = useParams() as { id: string };
  const { blogPosts } = useApp();

  const post = blogPosts.find((p) => p.id === id);

  // Comments state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { name: 'Kiprono Langat', text: 'This was an incredibly well-articulated read! The practical agricultural models explain why my daughter is suddenly eager to help in our garden.', date: '2025-05-12' },
    { name: 'Grace Njoroge', text: 'Truly stellar, co-founding this academy was a huge blessing for the Ngata community.', date: '2025-05-11' }
  ]);

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4">
        <span className="text-4xl">🔬</span>
        <h2 className="text-2xl font-black text-blue-950">Article Not Found</h2>
        <p className="text-gray-500">The blog post you requested could not be loaded or was deleted.</p>
        <Link href="/blog" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs inline-block">
          Return to Blog Directory
        </Link>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;

    setComments([
      ...comments,
      {
        name: commentName,
        text: commentText,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setCommentName('');
    setCommentText('');
  };

  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="pb-24">
      <PageHero eyebrow={post.category} title={post.title} description={post.summary} image={post.featuredImage} imageAlt={post.title}/>
      <div className="container-shell mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-500 shadow-sm"><span className="font-extrabold text-[#031f66]">By {post.author}</span><span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#d50b12]"/>{post.date}</span><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#0739a6]"/>{post.readTime}</span></div>

      {/* Dynamic breadcrumbs simulated */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back to blog directory
        </Link>
      </div>

      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: post.title }]} />

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 gap-12">

        {/* Main visual Image */}
        <div className="rounded-3xl overflow-hidden shadow-md max-h-[480px]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content detail markup */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs">
          <article
            className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6 text-sm md:text-base font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons simulated */}
          <div className="border-t border-gray-100 pt-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">Share this publication</span>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors"
                onClick={() => alert('Link copied to clipboard!')}
              >
                Copy Link
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
                onClick={() => alert('Shared to Facebook!')}
              >
                Facebook Share
              </button>
              <button
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors"
                onClick={() => alert('Shared to Twitter!')}
              >
                Twitter Share
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-8">
          <h3 className="text-xl font-extrabold text-blue-950 border-b border-gray-50 pb-2">Comments Feed ({comments.length})</h3>

          <div className="space-y-6">
            {comments.map((comm, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 font-extrabold text-xs flex items-center justify-center border border-blue-100 flex-shrink-0">
                  {comm.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-extrabold text-sm text-blue-950">{comm.name}</h5>
                    <span className="text-[10px] text-gray-400 font-bold">{comm.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{comm.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4 border-t border-gray-50 pt-6">
            <h4 className="font-extrabold text-sm text-blue-950">Add a Comment</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Full Name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="p-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-semibold"
                required
              />
            </div>
            <textarea
              placeholder="Write your constructive thoughts here..."
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-semibold"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4" /> Submit Thoughts
            </button>
          </form>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-blue-950">Related Publications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <div key={rp.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs flex flex-col h-full">
                  <div className="h-32 bg-gray-50">
                    <img src={rp.featuredImage} alt={rp.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <h4 className="font-extrabold text-xs text-blue-950 line-clamp-2 hover:text-blue-600">
                      <Link href={`/blog/${rp.id}`}>
                        {rp.title}
                      </Link>
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold block mt-2 uppercase">{rp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
