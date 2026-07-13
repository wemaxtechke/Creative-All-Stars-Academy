'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureCard } from '@/components/FeatureCard';
import { StatsCard } from '@/components/StatsCard';
import { BlogCard } from '@/components/BlogCard';
import { EventCard } from '@/components/EventCard';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { ArrowRight, Sparkles, BookOpen, Heart, Award, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { blogPosts, schoolEvents, settings } = useApp();

  const whyChooseUs = [
    {
      title: '100% CBC Compliant Curriculum',
      description: 'Fully integrated Competency-Based Curriculum prioritizing critical thinking, skills development, and structured assessments.',
      icon: '📚'
    },
    {
      title: 'Modern Coding & ICT Labs',
      description: 'Equipped with digital devices, coding systems, Scratch blocks, and child-safe high speed internet connections.',
      icon: '💻'
    },
    {
      title: 'Heated Swimming Pool',
      description: 'Custom-designed, medium-sized, fully heated pool with professional safety guards and dedicated coaching schedules.',
      icon: '🏊'
    },
    {
      title: 'Nurturing & Secure Milimani Location',
      description: 'Tucked away in the quiet, prestigious suburbs of Nakuru, offering a calm environment for cognitive academic concentration.',
      icon: '🏡'
    },
    {
      title: 'Creative Music & Drama',
      description: 'Active performance choir, instrument lessons, theater exercises, and speech coaching for confidence growth.',
      icon: '🎵'
    },
    {
      title: 'Championship Football & Sports',
      description: 'Professional outdoor coaches guiding children in athleticism, teamwork, speed, and competitive matches.',
      icon: '⚽'
    }
  ];

  const partners = [
    { name: 'KICD Certified', logo: '📙' },
    { name: 'TSC Vetted Staff', logo: '👩‍🏫' },
    { name: 'Kenya Private Schools', logo: '🏫' },
    { name: 'Nakuru Sports Assoc.', logo: '🏆' }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 text-white overflow-hidden py-16 md:py-24 border-b-8 border-yellow-400">
        {/* Visual decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-yellow-400 text-blue-950 font-extrabold text-xs uppercase tracking-widest rounded-full shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Enrollment for Term 2 is Open!
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
            >
              Where Young Minds <br />
              <span className="text-yellow-400 underline decoration-green-400 decoration-wavy">Transform into Stars</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Welcome to <strong className="text-white">{settings.schoolName}</strong> in Milimani, Nakuru.
              We offer a holistic, creative-focused educational pathway under Kenya’s Competency-Based Curriculum.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link
                href="/admissions"
                className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-lg rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                Apply for Admission
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 border-2 border-white/20 hover:border-white text-white font-bold text-lg rounded-2xl transition-all text-center"
              >
                Discover Our Story
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400/20 max-w-md mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop"
                alt="Creative All Stars Academy classroom learning"
                className="w-full h-[350px] sm:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left bg-blue-950/90 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-yellow-400 font-extrabold text-xs uppercase tracking-wider mb-1">Motto</p>
                <p className="text-base font-bold italic">&ldquo;{settings.tagline}&rdquo;</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8">Creative All Stars by the Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard label="Enrolled Stars" value="800+" icon="🎒" />
            <StatsCard label="TSC Certified Teachers" value="35" icon="👩‍🏫" />
            <StatsCard label="Spacious Classrooms" value="18" icon="🏫" />
            <StatsCard label="CBC Alignment" value="100%" icon="🎯" />
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Creative All Stars?"
          subtitle="We combine standard CBC requirements with digital literacy, swimming, art, and high-performance physical activities to deliver an elite education."
          badge="Core Pillars"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feat, idx) => (
            <FeatureCard
              key={idx}
              title={feat.title}
              description={feat.description}
              icon={feat.icon}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section className="bg-gray-100/50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl text-left">
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 font-extrabold text-xs uppercase tracking-widest rounded-full mb-3">
                Visual Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
                Our Campus Life & Activities
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-sm font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden h-64 shadow-sm hover:shadow-md transition-all group">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=400&auto=format&fit=crop"
                alt="Creative Playgroup Classroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-64 shadow-sm hover:shadow-md transition-all group">
              <img
                src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop"
                alt="Football Training Academy Stars"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-64 shadow-sm hover:shadow-md transition-all group sm:col-span-2 lg:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=400&auto=format&fit=crop"
                alt="Music Instrumental Class"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Upcoming School Events"
          subtitle="Stay updated with our athletic tournaments, music assemblies, and academic consultation schedules."
          badge="Calender Planner"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schoolEvents.slice(0, 2).map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Parents Say"
          subtitle="Read honest reviews and success stories shared by parents, alumni, and guardians around Nakuru."
          badge="Testimonials"
        />
        <TestimonialsCarousel />
      </section>

      {/* 7. LATEST NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Blog & News Articles"
          subtitle="Explore tips on CBC curriculum preparation, parenting hacks, technology adoption, and athletic trophies."
          badge="Press Publications"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-900 text-white font-extrabold text-sm rounded-2xl shadow-md hover:bg-blue-950 transition-all"
          >
            Read All 12+ Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-100 pt-16">
        <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-8">Approved by Leading Educational bodies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-75 hover:opacity-100">
              <span className="text-3xl">{partner.logo}</span>
              <span className="font-extrabold text-gray-700 text-sm tracking-tight">{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-16 text-center text-blue-950 shadow-xl border-b-4 border-yellow-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Ready to enroll your star child?</h2>
          <p className="text-blue-950/80 font-semibold text-base md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Take the first step to give your child an elite, creative education that opens global doors. Fill our instant online registration form.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="w-full sm:w-auto px-8 py-4 bg-blue-900 text-white hover:bg-blue-950 font-black text-lg rounded-2xl shadow-lg transition-all"
            >
              Apply Online Today
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 border-2 border-blue-950/20 hover:border-blue-950 text-blue-950 font-extrabold text-lg rounded-2xl transition-all"
            >
              Call Our Admission Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
