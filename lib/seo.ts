import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Creative All Stars Academy`, description, url: path, images: [{ url: '/brand/creative-all-stars-academy-logo.png', alt: 'Creative All Stars Academy official logo' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/brand/creative-all-stars-academy-logo.png'] },
  };
}
