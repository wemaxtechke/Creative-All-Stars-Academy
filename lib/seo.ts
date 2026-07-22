import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Creative All Stars Academy`, description, url: path },
    twitter: { card: 'summary', title, description },
  };
}
