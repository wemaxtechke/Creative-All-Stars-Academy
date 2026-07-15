import type { Metadata } from 'next';
import { blogPosts } from '@/data/mockData';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const post = blogPosts.find(p => p.id === id); return post ? { title: post.title, description: post.summary, alternates: { canonical: `/blog/${id}` }, openGraph: { title: post.title, description: post.summary, type: 'article', images: [post.featuredImage] } } : { title: 'School Story' }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
