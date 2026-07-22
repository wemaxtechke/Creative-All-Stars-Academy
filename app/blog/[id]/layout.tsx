import type { Metadata } from 'next';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const { blogPosts } = await getPublicContent().catch(() => defaultPublicContent); const post = blogPosts.find(p => p.id === id); return post ? { title: post.title, description: post.summary, authors: [{ name: post.author }], alternates: { canonical: `/blog/${id}` }, openGraph: { title: post.title, description: post.summary, type: 'article', publishedTime: post.date, authors: [post.author], images: [post.featuredImage] } } : { title: 'School Story' }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
