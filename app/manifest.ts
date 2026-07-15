import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Creative All Stars Academy', short_name: 'CASA Nakuru', description: 'Creative All Stars Academy — Endeavour to Succeed', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0739a6', icons: [{ src: '/brand/creative-all-stars-academy-logo.png', sizes: '1254x1254', type: 'image/png' }] };
}
