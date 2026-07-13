'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { Search, Grid, Eye, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const { galleryImages } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalImage, setModalImage] = useState<typeof galleryImages[0] | null>(null);

  const categories = ['All', 'School Events', 'Sports', 'Graduation', 'Trips', 'Learning', 'Campus'];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pb-24">
      {/* Banner / Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 text-center border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Media Gallery</h1>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            Explore authentic screenshots, athletic tournaments, heated swimming classes, and graduation days at our campus.
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ name: 'Gallery' }]} />

      {/* Main Grid structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SectionHeader
          title="Nurturing Creative Stars In Action"
          subtitle="A complete masonry layout of our Milimani Nakuru campus classrooms, sport galas, and children activities."
          badge="CAMPUS LIFE SHOTS"
        />

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md border border-gray-100 group cursor-pointer"
                onClick={() => setModalImage(img)}
              >
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-6 h-6" />
                    </span>
                  </div>

                  {/* Category label */}
                  <span className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-blue-600 text-white font-extrabold text-[10px] uppercase rounded-lg">
                    {img.category}
                  </span>
                </div>

                <div className="p-4 border-t border-gray-50">
                  <h4 className="font-extrabold text-sm text-blue-950 line-clamp-1">{img.title}</h4>
                  <span className="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Checked: {img.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl max-w-xl mx-auto space-y-4">
            <span className="text-4xl">📷</span>
            <h4 className="font-black text-blue-950 text-lg">No media photos found</h4>
            <p className="text-gray-500 text-sm leading-relaxed">There are currently no items under the &ldquo;{activeCategory}&rdquo; category block.</p>
          </div>
        )}
      </section>

      {/* MODAL VIEW WINDOW */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blue-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-blue-950 text-white rounded-full hover:bg-yellow-400 hover:text-blue-950 transition-colors shadow-md"
                title="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Image */}
                <div className="md:col-span-8 bg-gray-100 max-h-[70vh]">
                  <img
                    src={modalImage.url}
                    alt={modalImage.title}
                    className="w-full h-full object-contain mx-auto"
                  />
                </div>

                {/* Details side bar */}
                <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-center space-y-4 border-l border-gray-100">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider rounded-lg self-start">
                    {modalImage.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-blue-950 leading-snug">
                    {modalImage.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Captured live at our Milimani campus during the {modalImage.category} session. At Creative All Stars, visual representations are kept active to show parents of current stars their progress daily.
                  </p>
                  <div className="border-t border-gray-50 pt-3 text-[10px] font-bold text-gray-400">
                    DATE TAKEN: {modalImage.date}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
