'use client';

import { useId, useState } from 'react';
import type { FAQ } from '@/types';

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefix = useId();
  return <div className="faq-list">{items.map(item => {
    const expanded = openId === item.id;
    const panel = `${prefix}-${item.id}`;
    return <section key={item.id} className="faq-item"><h3><button type="button" id={`${panel}-button`} aria-expanded={expanded} aria-controls={panel} onClick={() => setOpenId(expanded ? null : item.id)}>{item.question}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h3><div id={panel} role="region" aria-labelledby={`${panel}-button`} hidden={!expanded}>{item.answer}</div></section>;
  })}</div>;
}
