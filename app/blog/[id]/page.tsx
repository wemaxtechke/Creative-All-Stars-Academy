'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Check, Clock, Copy, Send, Share2 } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageHero } from '@/components/PageHero';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import type { BlogComment } from '@/types';

export default function BlogDetails() {
  const { id } = useParams() as { id: string };
  const { blogPosts } = useApp();
  const post = blogPosts.find((item) => item.id === id);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentsLoadedFor, setCommentsLoadedFor] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [company, setCompany] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [commentError, setCommentError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creative-all-stars-academy.creativeallstarsacademynakuru.workers.dev'}/blog/${encodeURIComponent(id)}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/blog/${encodeURIComponent(id)}/comments`, { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json() as { comments?: BlogComment[]; error?: string };
        if (!response.ok) throw new Error(result.error || 'Comments could not be loaded.');
        setComments(result.comments ?? []);
        setCommentsLoadedFor(id);
        setCommentError('');
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setCommentsLoadedFor(id);
        setCommentError(error instanceof Error ? error.message : 'Comments could not be loaded.');
      })
    return () => controller.abort();
  }, [id]);

  if (!post) {
    return <div className="space-y-4 py-24 text-center"><h2 className="text-2xl font-black text-blue-950">Article not found</h2><p className="text-gray-500">The blog post could not be loaded or was deleted.</p><Link href="/blog" className="inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white">Return to blog directory</Link></div>;
  }

  const relatedPosts = blogPosts.filter((item) => item.category === post.category && item.id !== post.id).slice(0, 3);
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareText = encodeURIComponent(post.title);

  async function handleCommentSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setCommentError('');
    try {
      const response = await fetch(`/api/blog/${encodeURIComponent(post!.id)}/comments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: commentName, message: commentText, company, turnstileToken }),
      });
      const result = await response.json() as { comment?: BlogComment; error?: string };
      if (!response.ok || !result.comment) throw new Error(result.error || 'Your comment could not be submitted.');
      setComments((current) => [...current, result.comment as BlogComment]);
      setCommentName('');
      setCommentText('');
      setTurnstileToken('');
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Your comment could not be submitted.');
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2_000);
  }

  return <div className="pb-24">
    <PageHero eyebrow={post.category} title={post.title} description={post.summary} image={post.featuredImage} imageAlt={post.title}/>
    <div className="container-shell mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-500 shadow-sm">
      <Link href={`/blog?author=${encodeURIComponent(post.author)}`} className="font-extrabold text-[#031f66] transition hover:text-[#d50b12]">By {post.author}{post.authorRole ? ` · ${post.authorRole}` : ''}</Link>
      <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#d50b12]"/>{post.date}</span>
      <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#0739a6]"/>{post.readTime}</span>
    </div>

    <div className="mx-auto mt-6 max-w-4xl px-4 sm:px-6 lg:px-8"><Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600"><ArrowLeft className="h-4 w-4"/> Back to blog directory</Link></div>
    <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: post.title }]}/>

    <section className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="relative h-[280px] overflow-hidden rounded-3xl shadow-md sm:h-[480px]"><Image src={post.featuredImage} alt={post.title} fill priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover"/></div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs sm:p-10">
        <article className="prose prose-blue max-w-none space-y-6 text-sm font-medium leading-relaxed text-gray-700 md:text-base [&_a]:font-bold [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-400 [&_blockquote]:pl-5 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:text-blue-950 [&_h3]:text-2xl [&_h3]:font-extrabold [&_h3]:text-blue-950 [&_img]:my-8 [&_img]:max-h-[560px] [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover" dangerouslySetInnerHTML={{ __html: post.content }}/>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Share this publication</span>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100">{copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}{copied ? 'Copied' : 'Copy link'}</button>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"><Share2 className="h-4 w-4"/>Facebook</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareText}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">Share on X</a>
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xs sm:p-10">
        <h3 className="border-b border-gray-50 pb-2 text-xl font-extrabold text-blue-950">Comments feed ({comments.length})</h3>
        {commentsLoadedFor !== id ? <p className="text-sm text-slate-500">Loading comments…</p> : comments.length === 0 ? <p className="text-sm text-slate-500">Be the first to comment on this article.</p> : <div className="space-y-6">{comments.map((comment) => <div key={comment.id} className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xs font-extrabold text-blue-900">{comment.name.charAt(0).toUpperCase()}</div><div className="space-y-1"><div className="flex flex-wrap items-center gap-2"><h5 className="text-sm font-extrabold text-blue-950">{comment.name}</h5><time dateTime={comment.createdAt} className="text-[10px] font-bold text-gray-400">{comment.createdAt.slice(0, 10)}</time></div><p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">{comment.message}</p></div></div>)}</div>}

        <form onSubmit={handleCommentSubmit} className="space-y-4 border-t border-gray-50 pt-6">
          <h4 className="text-sm font-extrabold text-blue-950">Add a comment</h4>
          {commentError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{commentError}</p>}
          <input name="company" value={company} onChange={(event) => setCompany(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-10000px] h-px w-px opacity-0"/>
          <input type="text" placeholder="Your full name" value={commentName} onChange={(event) => setCommentName(event.target.value)} maxLength={80} className="w-full rounded-xl bg-gray-50 p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 sm:max-w-md" required/>
          <textarea placeholder="Write your constructive thoughts here…" rows={4} value={commentText} onChange={(event) => setCommentText(event.target.value)} maxLength={2000} className="w-full rounded-xl bg-gray-50 p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600" required/>
          <TurnstileWidget onToken={setTurnstileToken}/>
          <button type="submit" disabled={submitting || (process.env.NODE_ENV === 'production' && !turnstileToken)} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-6 py-3 text-xs font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"><Send className="h-4 w-4"/>{submitting ? 'Submitting…' : 'Submit thoughts'}</button>
        </form>
      </div>

      {relatedPosts.length > 0 && <div className="space-y-6"><h3 className="text-xl font-extrabold text-blue-950">Related publications</h3><div className="grid gap-6 sm:grid-cols-3">{relatedPosts.map((related) => <article key={related.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs"><div className="relative h-32 bg-gray-50"><Image src={related.featuredImage} alt={related.title} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover"/></div><div className="flex flex-grow flex-col justify-between p-4"><h4 className="line-clamp-2 text-xs font-extrabold text-blue-950 hover:text-blue-600"><Link href={`/blog/${related.id}`}>{related.title}</Link></h4><time dateTime={related.date} className="mt-2 block text-[10px] font-bold uppercase text-gray-400">{related.date}</time></div></article>)}</div></div>}
    </section>
  </div>;
}
