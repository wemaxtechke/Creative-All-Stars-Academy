'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { motion } from 'framer-motion';

export const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
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
