import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import { formatSchoolDate } from '@/lib/display-date';

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="blog-card"><Link href={`/blog/${post.id}`}>{post.featuredImage && <div className="blog-card-image"><Image src={post.featuredImage} alt={post.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div>}<div className="blog-card-copy"><p className="eyebrow">{post.category} · <time dateTime={post.date}>{formatSchoolDate(post.date)}</time></p><h2>{post.title}</h2><p>{post.summary}</p><span className="text-link">Read story </span></div></Link></article>;
}
