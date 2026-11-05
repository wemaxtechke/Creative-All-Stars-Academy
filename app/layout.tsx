import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import './public.css';
import { AppProvider } from '@/lib/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';
import { officialPhone } from '@/lib/public-content';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap', preload: false });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap', preload: false });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeallstarsacademy.sc.ke';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Creative All Stars Academy | Pre-Primary, Primary & JSS', template: '%s | Creative All Stars Academy' },
  description: 'Creative All Stars Academy is an inclusive school in Ngata, Nakuru, providing competency-based education that helps every learner realise their full potential.',
  keywords: ['Creative All Stars Academy', 'school in Nakuru', 'CBE school Nakuru', 'CBC school Nakuru', 'private school Nakuru', 'primary school Nakuru', 'pre-primary school Nakuru', 'Ngata school', 'inclusive education Kenya'],
  authors: [{ name: 'Creative All Stars Academy' }],
  creator: 'Creative All Stars Academy',
  publisher: 'Creative All Stars Academy',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'en_KE', url: siteUrl,
    siteName: 'Creative All Stars Academy',
    title: 'Creative All Stars Academy — Endeavour to Succeed',
    description: 'Holistic, inclusive competency-based education in Ngata, Nakuru, helping every learner realise their full potential.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Creative All Stars Academy — Endeavour to Succeed' }],
  },
  twitter: { card: 'summary_large_image', title: 'Creative All Stars Academy — Endeavour to Succeed', description: 'Holistic, inclusive competency-based education in Nakuru.', images: ['/opengraph-image'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = { themeColor: '#19323c', colorScheme: 'light' };

const schoolSchema = {
  '@context': 'https://schema.org', '@type': ['School', 'EducationalOrganization'],
  name: 'Creative All Stars Academy', alternateName: 'CASA', url: siteUrl,
  slogan: 'Endeavour to Succeed',
  description: 'An inclusive education centre in Nakuru providing holistic, competency-based education that enables every learner to realise their full potential.',
  address: { '@type': 'PostalAddress', streetAddress: 'Ngata Area', addressLocality: 'Nakuru', addressCountry: 'KE' },
  email: 'info@creativeallstarsacademy.sc.ke', telephone: officialPhone,
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialContent = await getPublicContent().catch((error) => {
    console.error('Unable to load website content during server rendering', error);
    return defaultPublicContent;
  });
  return <html lang="en-KE">
    <body className={`${inter.variable} ${manrope.variable} antialiased bg-slate-50 text-slate-900`}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <AppProvider initialContent={initialContent}><div className="flex min-h-screen min-w-0 flex-col"><Navbar/><main id="main-content" tabIndex={-1} className="site-main min-w-0 flex-grow">{children}</main><Footer/><ChatWidget/></div></AppProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...schoolSchema, name: initialContent.settings.schoolName, email: initialContent.settings.email }).replaceAll('<', '\\u003c') }} />
    </body>
  </html>;
}
