import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Creative All Stars Academy',
    short_name: 'CASA Nakuru',
    description: 'Creative All Stars Academy — Endeavour to Succeed',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#19323c',
    icons: [
      {
        src: '/icon.png',
        type: 'image/png',
        sizes: '1254x1254',
        purpose: 'any',
      },
    ],
  };
}
