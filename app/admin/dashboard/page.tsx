'use client';

import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { ArrowRight, Calendar, CheckCircle2, Eye, FileCheck, FileText, Image as ImageIcon, Inbox, Plus, Settings, Sparkles } from 'lucide-react';

export default function AdminDashboardMain() {
  const { blogPosts, schoolEvents, galleryImages, admissions, messages } = useApp();
  const pendingAdmissions = admissions.filter(a => a.status === 'Pending');
  const unreadMessages = messages.filter(m => m.status === 'Unread');

  const metrics = [
    { label:'New admission enquiries', value:pendingAdmissions.length, detail:'Waiting for a response', icon:FileCheck, href:'/admin/dashboard/admissions', tone:'bg-amber-50 text-amber-700' },
    { label:'Unread messages', value:unreadMessages.length, detail:'From website visitors', icon:Inbox, href:'/admin/dashboard/messages', tone:'bg-violet-50 text-violet-700' },
    { label:'Published stories', value:blogPosts.length, detail:'Visible on the website', icon:FileText, href:'/admin/dashboard/blog', tone:'bg-blue-50 text-blue-700' },
    { label:'Gallery items', value:galleryImages.length, detail:'Showing school life', icon:ImageIcon, href:'/admin/dashboard/gallery', tone:'bg-red-50 text-[#d50b12]' },
  ];

  const actions = [
    { label:'Publish a news story', icon:FileText, href:'/admin/dashboard/blog' },
    { label:'Create an event', icon:Calendar, href:'/admin/dashboard/events' },
    { label:'Upload gallery photos', icon:ImageIcon, href:'/admin/dashboard/gallery' },
    { label:'Update school details', icon:Settings, href:'/admin/dashboard/settings' },
  ];

  return <div className="mx-auto max-w-7xl space-y-8">
    <section className="brand-gradient brand-grid overflow-hidden rounded-3xl px-7 py-9 text-white shadow-xl md:px-10">
      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
        <div className="max-w-2xl"><div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#ffc400]"><Sparkles className="h-4 w-4"/>Website overview</div><h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl">Good morning, Content Team.</h1><p className="mt-3 leading-7 text-blue-100">Review new enquiries, keep families informed, and make sure the public website always reflects the best of Creative All Stars Academy.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row"><Link href="/" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold hover:bg-white/10"><Eye className="h-4 w-4"/>Preview website</Link><Link href="/admin/dashboard/blog" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d50b12] px-5 py-3 text-sm font-extrabold text-white hover:bg-red-600"><Plus className="h-4 w-4"/>Create content</Link></div>
      </div>
    </section>

    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({label,value,detail,icon:Icon,href,tone})=><Link href={href} key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-3 text-4xl font-extrabold text-[#0b1f3a]">{value}</p></div><span className={`rounded-xl p-3 ${tone}`}><Icon className="h-5 w-5"/></span></div><p className="mt-3 text-xs font-medium text-slate-400">{detail}</p></Link>)}</section>

    <div className="grid gap-8 xl:grid-cols-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-8 md:p-8">
        <div className="flex items-center justify-between"><div><h2 className="text-xl font-extrabold text-[#0b1f3a]">Needs your attention</h2><p className="mt-1 text-sm text-slate-500">The latest website enquiries requiring follow-up.</p></div><Link href="/admin/dashboard/admissions" className="text-sm font-bold text-blue-700">View all</Link></div>
        <div className="mt-7 divide-y divide-slate-100">
          {pendingAdmissions.slice(0,3).map(item=><div key={item.id} className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"><div className="flex items-start gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-50 text-sm font-extrabold text-amber-700">{item.studentName.charAt(0)}</div><div><p className="font-extrabold text-slate-800">{item.studentName}</p><p className="mt-1 text-sm text-slate-500">Admission enquiry for {item.gradeApplied} · {item.parentName}</p></div></div><Link href="/admin/dashboard/admissions" className="inline-flex items-center gap-1 text-sm font-bold text-blue-700">Review <ArrowRight className="h-4 w-4"/></Link></div>)}
          {pendingAdmissions.length===0&&<div className="py-12 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500"/><p className="mt-3 font-bold text-slate-700">You’re all caught up</p><p className="mt-1 text-sm text-slate-500">There are no new admission enquiries.</p></div>}
        </div>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4 md:p-8"><h2 className="text-xl font-extrabold text-[#0b1f3a]">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Common website updates.</p><div className="mt-6 space-y-3">{actions.map(({label,icon:Icon,href})=><Link href={href} key={label} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"><span className="flex items-center gap-3 text-sm font-bold text-slate-700"><Icon className="h-4 w-4 text-blue-700"/>{label}</span><ArrowRight className="h-4 w-4 text-slate-400"/></Link>)}</div></aside>
    </div>

    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Content snapshot</p><h3 className="mt-2 text-xl font-extrabold text-[#0b1f3a]">Upcoming events</h3></div><Calendar className="h-6 w-6 text-slate-300"/></div><div className="mt-5 space-y-4">{schoolEvents.slice(0,3).map(e=><div key={e.id} className="flex gap-4 border-t border-slate-100 pt-4 first:border-0 first:pt-0"><div className="min-w-14 text-sm font-extrabold text-blue-700">{e.date}</div><div><p className="font-bold text-slate-800">{e.title}</p><p className="mt-1 text-xs text-slate-500">{e.location}</p></div></div>)}</div></div>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6"><p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">Live website operations</p><h3 className="mt-2 text-xl font-extrabold text-[#0b1f3a]">Secure content workspace</h3><p className="mt-3 text-sm leading-6 text-slate-600">Published content is stored in the website database, uploaded files are kept in protected cloud storage, and administrator access is controlled by the schoolâ€™s approved accounts.</p></div>
    </section>
  </div>;
}
