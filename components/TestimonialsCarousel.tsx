'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/AppContext';

function Portrait({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? null : <Image src={src} alt="" width={48} height={48} className="testimonial-portrait" onError={() => setFailed(true)} />;
}

export function TestimonialsCarousel() {
  const { testimonials } = useApp();
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index % testimonials.length];
  return <div className="testimonial" aria-roledescription="carousel" aria-label="Parent stories">
    <div aria-live="polite" aria-atomic="true"><blockquote><p>“{current.content}”</p></blockquote><div className="testimonial-person">{current.avatar && <Portrait key={current.avatar} src={current.avatar} />}<div><p>{current.name}</p><span>{current.role}</span>{current.rating > 0 && <p className="testimonial-rating" aria-label={`Rated ${current.rating} out of 5`}>{current.rating} / 5</p>}</div></div></div>
    {testimonials.length > 1 && <div className="testimonial-controls"><button type="button" onClick={() => setIndex(value => (value - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">Previous</button><span>{index % testimonials.length + 1} / {testimonials.length}</span><button type="button" onClick={() => setIndex(value => (value + 1) % testimonials.length)} aria-label="Next testimonial">Next</button></div>}
  </div>;
}
