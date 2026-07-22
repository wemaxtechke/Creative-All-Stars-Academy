import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getPublicContent } from '@/lib/db/content';
import { defaultPublicContent } from '@/lib/site-content';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeallstars.ac.ke';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Creative All Stars Academy | CBC School in Nakuru', template: '%s | Creative All Stars Academy' },
  description: 'Creative All Stars Academy is an inclusive CBC school in Ngata, Nakuru, providing holistic education that helps every learner realize their full potential.',
  keywords: ['Creative All Stars Academy', 'school in Nakuru', 'CBC school Nakuru', 'private school Nakuru', 'primary school Nakuru', 'pre-primary school Nakuru', 'Ngata school', 'inclusive education Kenya'],
  authors: [{ name: 'Creative All Stars Academy' }],
  creator: 'Creative All Stars Academy',
  publisher: 'Creative All Stars Academy',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'en_KE', url: siteUrl,
    siteName: 'Creative All Stars Academy',
    title: 'Creative All Stars Academy — Endeavour to Succeed',
    description: 'Holistic, inclusive CBC education in Ngata, Nakuru, helping every learner realize their full potential.',
  },
  twitter: { card: 'summary', title: 'Creative All Stars Academy — Endeavour to Succeed', description: 'Holistic, inclusive CBC education in Nakuru.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = { themeColor: '#0739A6', colorScheme: 'light' };

const schoolSchema = {
  '@context': 'https://schema.org', '@type': ['School', 'EducationalOrganization'],
  name: 'Creative All Stars Academy', alternateName: 'CASA', url: siteUrl,
  slogan: 'Endeavour to Succeed',
  description: 'An inclusive CBC education centre in Nakuru providing holistic development and education that enables every learner to realize their full potential.',
  address: { '@type': 'PostalAddress', streetAddress: 'Ngata Area', addressLocality: 'Nakuru', addressCountry: 'KE' },
  email: 'info@creativeallstars.ac.ke', telephone: '+254712345678',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialContent = await getPublicContent().catch((error) => {
    console.error('Unable to load website content during server rendering', error);
    return defaultPublicContent;
  });
  return <html lang="en-KE">
    <body className={`${inter.variable} ${manrope.variable} antialiased bg-slate-50 text-slate-900`}>
      <AppProvider initialContent={initialContent}><div className="flex min-h-screen flex-col"><Navbar/><main className="flex-grow">{children}</main><Footer/></div></AppProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }} />
    </body>
  </html>;
}
