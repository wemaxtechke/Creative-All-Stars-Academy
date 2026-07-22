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
        className="flex min-h-[138px] flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_12px_30px_rgba(3,31,102,.07)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(3,31,102,.12)] sm:flex-row"
      >
        <div className="relative h-40 shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-40">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#0739a6] px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-sm">{post.category}</span>
          <Image src={post.featuredImage} alt={post.title} fill sizes="160px" className="object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-[#d50b12]"/>{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-blue-500"/>{post.readTime}</span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-snug text-blue-950 transition-colors hover:text-blue-600"><Link href={`/blog/${post.id}`}>{post.title}</Link></h3>
            <p className="mt-2 line-clamp-1 text-xs leading-5 text-slate-500">{post.summary}</p>
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
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col h-full transition-all duration-300"
    >
      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
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

      <div className="p-6 flex flex-col flex-grow">
        {/* Meta data */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-semibold mb-3">
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
        <h3 className="font-extrabold text-lg text-blue-950 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {post.summary}
        </p>

        {/* Footer info / Read more */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
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
