'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useApp } from '@/lib/AppContext';
import { safeWebsiteHref } from '@/lib/public-content';

const SLIDE_DURATION = 9000;

export function HomeHeroSlider() {
  const { heroSlides, settings } = useApp();
  const [active, setActive] = useState(0);
  const [playback, setPlayback] = useState<'auto' | 'playing' | 'paused'>('auto');
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const rotationEnabled = playback === 'playing' || (playback === 'auto' && !reduceMotion);
  const shouldRotate = rotationEnabled && !keyboardFocused && heroSlides.length > 1;
  const index = active % Math.max(1, heroSlides.length);
  const slide = heroSlides[index];
  const primaryHref = slide?.primaryHref && safeWebsiteHref(slide.primaryHref);

  useEffect(() => {
    if (!shouldRotate) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % heroSlides.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, heroSlides.length, shouldRotate]);

  function move(step: number) {
    setActive(value => (value + step + heroSlides.length) % heroSlides.length);
  }

  return <section className="cms-hero relative isolate overflow-hidden" aria-label="Creative All Stars Academy highlights" aria-roledescription={heroSlides.length > 1 ? 'carousel' : undefined}
    onPointerDownCapture={() => setKeyboardFocused(false)}
    onFocusCapture={event => setKeyboardFocused(event.target.matches(':focus-visible'))}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }}>
    <AnimatePresence initial={false}>
      {slide?.image && <motion.div key={slide.id} className="cms-hero-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .9 }}>
        <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
      </motion.div>}
    </AnimatePresence>
    <div className="cms-hero-shade" aria-hidden="true" />
    <div className="container-shell cms-hero-content" aria-live={shouldRotate ? 'off' : 'polite'} aria-atomic="true">
      {slide ? <div className="cms-hero-copy" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`}>
        {slide.kicker && <p className="eyebrow">{slide.kicker}</p>}
        {slide.title ? <h1>{slide.title}</h1> : <h1 className="sr-only">{settings.schoolName}</h1>}
        {slide.description && <p className="cms-hero-description">{slide.description}</p>}
        {(slide.primary || slide.title || slide.description) && <div className="button-row">
          {slide.primary && primaryHref && <Link href={primaryHref} className="button hero-primary-button">{slide.primary}</Link>}
          {primaryHref !== '/admissions' && primaryHref !== '/admissions#enquiry' && <Link href="/admissions#enquiry" className="button hero-secondary-button">Admission enquiry</Link>}
        </div>}
      </div> : <div className="cms-hero-copy"><p className="eyebrow">{settings.schoolName}</p><h1>{settings.tagline}</h1><Link href="/admissions#enquiry" className="button hero-primary-button">Admission enquiry</Link></div>}
    </div>
    <div className="container-shell cms-hero-footer"><p>{settings.address}<span>{settings.tagline}</span></p>
      {heroSlides.length > 1 && <div className="hero-controls" aria-label="School highlights controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous school highlight">Previous</button>
        <div className="hero-slide-buttons">{heroSlides.map((item, itemIndex) => <button type="button" key={item.id} onClick={() => setActive(itemIndex)} aria-label={`Show slide ${itemIndex + 1}: ${item.title || item.alt}`} aria-pressed={index === itemIndex}>{String(itemIndex + 1).padStart(2, '0')}</button>)}</div>
        <button type="button" onClick={() => move(1)} aria-label="Next school highlight">Next</button>
        <button type="button" className="hero-playback" onClick={() => { setPlayback(rotationEnabled ? 'paused' : 'playing'); setKeyboardFocused(false); }} aria-label={rotationEnabled ? 'Pause slideshow' : 'Play slideshow'}>{rotationEnabled ? 'Pause' : 'Play'}</button>
      </div>}
    </div>
  </section>;
}
