'use client';

import { useState } from 'react';
import { useApp } from '@/lib/AppContext';

export function TestimonialsCarousel() {
  const { testimonials } = useApp();
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index % testimonials.length];
  return <div className="testimonial" aria-roledescription="carousel" aria-label="Parent stories">
    <div aria-live="polite" aria-atomic="true"><blockquote><p>“{current.content}”</p></blockquote><div className="testimonial-person"><div><p>{current.name}</p><span>{current.role}</span></div></div></div>
    {testimonials.length > 1 && <div className="testimonial-controls"><button type="button" onClick={() => setIndex(value => (value - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">Previous</button><span>{index % testimonials.length + 1} / {testimonials.length}</span><button type="button" onClick={() => setIndex(value => (value + 1) % testimonials.length)} aria-label="Next testimonial">Next</button></div>}
  </div>;
}
