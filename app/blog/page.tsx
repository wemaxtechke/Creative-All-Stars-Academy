'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageIntro } from '@/components/PageIntro';
import { BlogCard } from '@/components/BlogCard';

function BlogContent() {
  const { blogPosts } = useApp();
  const params = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const author = params.get('author') ?? '';
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  const filtered = [...blogPosts].filter(post => (!author || post.author === author) && (category === 'All' || category === post.category) && `${post.title} ${post.summary} ${post.author}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const current = Math.min(page, pages);
  return <div className="public-page"><Breadcrumbs items={[{ name: 'News & stories' }]} /><section className="container-shell"><PageIntro eyebrow="From our community" title="Stories from our school."><p>Learning, discovery and the moments that make school life meaningful.</p></PageIntro>
    {author && <p className="mb-6 text-sm">Stories by {author}. <Link href="/blog" className="text-link">Show all authors</Link></p>}
    {blogPosts.length > 1 && <div className="blog-filters"><div className="form-field"><label htmlFor="story-search">Search stories</label><input id="story-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></div>{categories.length > 2 && <div className="form-field"><label htmlFor="story-category">Category</label><select id="story-category" value={category} onChange={event => { setCategory(event.target.value); setPage(1); }}>{categories.map(name => <option key={name}>{name}</option>)}</select></div>}</div>}
    <div className="blog-grid">{filtered.slice((current - 1) * 6, current * 6).map(post => <BlogCard key={post.id} post={post} />)}</div>
    {filtered.length === 0 && <p className="empty-state">{blogPosts.length ? 'No stories match this search. Try another phrase or category.' : 'School stories will appear here as they are published.'}</p>}
    {pages > 1 && <nav className="pagination" aria-label="Story pages"><button type="button" disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</button><span aria-live="polite">Page {current} of {pages}</span><button type="button" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</button></nav>}
  </section></div>;
}
export default function Blog() { return <Suspense fallback={<div className="container-shell section-space">Loading stories…</div>}><BlogContent /></Suspense>; }
