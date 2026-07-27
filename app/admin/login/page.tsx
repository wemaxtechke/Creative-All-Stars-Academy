import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Website CMS access',
  robots: { index: false, follow: false },
};

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ unauthorized?: string }> }) {
  const unauthorized = (await searchParams).unauthorized === '1';
  return <main className="brand-gradient brand-grid grid min-h-[100dvh] place-items-center px-4 py-8 sm:py-16">
    <section className="w-full max-w-lg overflow-hidden rounded-2xl border-b-[6px] border-yellow-400 bg-white p-6 text-center shadow-2xl sm:rounded-3xl sm:border-b-8 sm:p-8 md:p-12">
      <Image src="/brand/creative-all-stars-academy-logo.png" alt="Creative All Stars Academy logo" width={104} height={104} priority className="mx-auto h-20 w-20 rounded-full object-contain shadow-lg sm:h-28 sm:w-28" />
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-blue-800 sm:mt-6 sm:px-4 sm:text-xs">
        <ShieldCheck className="h-4 w-4" /> Protected website workspace
      </div>
      <h1 className="mt-4 text-2xl font-black tracking-tight text-blue-950 sm:mt-5 sm:text-3xl">Website CMS access</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">The dashboard is protected by Creative All Stars Academy&apos;s approved staff email list and Cloudflare Access.</p>
      {unauthorized && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">Your account is not authorized for this website workspace. Ask the school administrator to add your email.</p>}
      <Link href="/admin/dashboard" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0739a6] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800 sm:mt-7 sm:py-4">
        <LockKeyhole className="h-4 w-4" /> Continue securely <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href="/" className="mt-6 inline-block text-xs font-bold text-blue-700 hover:underline">Return to the public website</Link>
    </section>
  </main>;
}
