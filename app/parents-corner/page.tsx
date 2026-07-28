'use client';

import { Download, Shirt } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { FAQAccordion } from '@/components/FAQAccordion';
import { PageHero } from '@/components/PageHero';
import { uniformSections } from '@/lib/verified-school-content';

export default function ParentsCorner() {
  const { downloads, faqs } = useApp();
  const orderedDownloads = [...downloads].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Families are part of the team"
        title="Everything parents need, in one welcoming place."
        description="Find official documents, uniform guidance and practical information that keeps home and school connected."
        imageSlot="page-parents"
      />

      <Breadcrumbs items={[{ name: 'Parents Corner' }]} />

      {orderedDownloads.length > 0 && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="School Documents and Parent Resources"
            subtitle="Download the current files published by the school administration."
            badge="Downloads Centre"
          />
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {orderedDownloads.map((item) => (
              <div key={item.id} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="space-y-4">
                  <span className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-600">{item.category}</span>
                  <h3 className="text-sm font-extrabold leading-snug text-blue-950 md:text-base">{item.title}</h3>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                  <span className="text-[10px] font-bold uppercase text-gray-400">{item.fileType} · {item.fileSize}</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 border-y border-gray-100 bg-gray-100/50 py-16 sm:mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Official School Uniform"
            subtitle="Use this guide when purchasing ECDE, Primary and Junior School uniform."
            badge="Uniform Guide"
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uniformSections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Shirt className="h-5 w-5" /></span>
                  <h3 className="text-base font-black text-blue-950">{section.title}</h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-5 text-gray-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d50b12]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-center">
            <p className="text-sm font-extrabold text-blue-950">All official school uniforms are available from Woolshop.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers about admissions, learning, activities and parent support."
          badge="Parent Information"
        />
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
