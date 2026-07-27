'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';

export const BlogCard: React.FC<{ post: BlogPost; compact?: boolean }> = ({ post, compact = false }) => {
  if (compact) {
    return (
      <motion.article
        whileHover={{ y: -3 }}
        className="flex min-h-[118px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_12px_30px_rgba(3,31,102,.07)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(3,31,102,.12)]"
      >
        <div className="relative w-28 shrink-0 overflow-hidden bg-slate-100 sm:w-40">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#0739a6] px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-sm">{post.category}</span>
          <Image src={post.featuredImage} alt={post.title} fill sizes="160px" className="object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-5">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-[#d50b12]"/>{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-blue-500"/>{post.readTime}</span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-snug text-blue-950 transition-colors hover:text-blue-600"><Link href={`/blog/${post.id}`}>{post.title}</Link></h3>
            <p className="mt-2 hidden line-clamp-1 text-xs leading-5 text-slate-500 min-[390px]:block">{post.summary}</p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold text-slate-600">{post.author}</span>
            <Link href={`/blog/${post.id}`} className="flex items-center gap-1 text-[11px] font-extrabold text-[#0739a6] hover:text-[#d50b12]">Read more<ArrowRight className="h-3.5 w-3.5"/></Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl sm:rounded-3xl"
    >
      <div className="relative h-36 w-full overflow-hidden bg-gray-100 sm:h-56">
        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-full uppercase shadow-sm">
          {post.category}
        </span>
        {/* Image */}
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col p-4 sm:p-6">
        {/* Meta data */}
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-gray-500 sm:mb-3 sm:gap-4 sm:text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#d50b12]" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-extrabold leading-snug text-blue-950 transition-colors hover:text-blue-600 sm:text-lg">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="mb-4 line-clamp-2 flex-grow text-xs leading-5 text-gray-600 sm:mb-6 sm:line-clamp-3 sm:text-sm sm:leading-relaxed">
          {post.summary}
        </p>

        {/* Footer info / Read more */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-3 sm:pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs flex items-center justify-center border-2 border-yellow-400">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">{post.author}</p>
              <p className="text-[10px] text-gray-500 font-semibold">{post.authorRole || 'Teacher'}</p>
            </div>
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
