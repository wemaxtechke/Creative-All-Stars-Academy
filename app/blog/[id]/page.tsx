'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { BlogCard } from '@/components/BlogCard';
import { formatSchoolDate } from '@/lib/display-date';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import type { BlogComment } from '@/types';
import { useHydrated } from '@/lib/use-hydrated';

export default function BlogDetails() {
  const hydrated = useHydrated();
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
  const [copyError, setCopyError] = useState('');
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeallstarsacademy.sc.ke'}/blog/${encodeURIComponent(id)}`;

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
    if (submitting) return;
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
    setCopyError('');
    try { await navigator.clipboard.writeText(shareUrl); } catch { setCopyError('The link could not be copied. Please copy the address from your browser.'); return; }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2_000);
  }

  return <div className="public-page">
    <Breadcrumbs items={[{ name: 'News & stories', href: '/blog' }, { name: post.title }]} />
    <div className="container-shell"><article className="story-article">
      <PageIntro eyebrow={post.category} title={post.title}>{post.summary && <p>{post.summary}</p>}</PageIntro>
      <div className="story-meta"><Link href={`/blog?author=${encodeURIComponent(post.author)}`}>By {post.author}{post.authorRole ? ` · ${post.authorRole}` : ''}</Link><time dateTime={post.date}>{formatSchoolDate(post.date)}</time><span>{post.readTime}</span></div>
      {post.featuredImage && <div className="story-cover"><Image src={post.featuredImage} alt={post.title} fill priority sizes="(min-width: 1024px) 850px, 100vw" className="object-cover" /></div>}
      <div className="story-body" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="story-share"><span>Share this story</span><button type="button" onClick={copyLink}>{copied ? 'Link copied' : 'Copy link'}</button><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a><a href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareText}`} target="_blank" rel="noopener noreferrer">Share on X</a><span role="status">{copyError}</span></div>
      <section className="story-comments" aria-labelledby="comments-title"><h2 id="comments-title">Comments ({comments.length})</h2>
        {commentsLoadedFor !== id ? <p className="form-note">Loading comments…</p> : comments.length === 0 ? <p className="form-note mb-6">Be the first to share a thought.</p> : <div className="comment-list">{comments.map(comment => <article key={comment.id}><h3>{comment.name}</h3><time dateTime={comment.createdAt}>{formatSchoolDate(comment.createdAt)}</time><p>{comment.message}</p></article>)}</div>}
        <form method="post" onSubmit={handleCommentSubmit} aria-busy={submitting}><h3>Add a comment</h3>{commentError && <p role="alert" className="form-error">{commentError}</p>}
          <input name="company" value={company} onChange={event => setCompany(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-10000px] h-px w-px opacity-0" />
          <div className="form-field"><label htmlFor="comment-name">Your name *</label><input id="comment-name" value={commentName} onChange={event => setCommentName(event.target.value)} maxLength={80} autoComplete="name" required disabled={submitting || !hydrated} /></div>
          <div className="form-field"><label htmlFor="comment-message">Your comment *</label><textarea id="comment-message" rows={4} value={commentText} onChange={event => setCommentText(event.target.value)} maxLength={2000} required disabled={submitting || !hydrated} /></div>
          <p className="form-note">Your name and comment will appear publicly. Please do not include private information. <Link href="/privacy">Privacy notice</Link></p>
          <TurnstileWidget onToken={setTurnstileToken} /><button type="submit" className="button button-primary" disabled={!hydrated || submitting || (process.env.NODE_ENV === 'production' && !turnstileToken)}>{submitting ? 'Sending your comment…' : 'Post comment'}</button>
        </form>
      </section>
      {relatedPosts.length > 0 && <section className="mt-14"><h2 className="section-title mb-7">More from our school.</h2><div className="blog-grid">{relatedPosts.map(related => <BlogCard key={related.id} post={related} />)}</div></section>}
    </article></div>
  </div>;
}
