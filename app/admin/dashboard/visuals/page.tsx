'use client';

import { FormEvent, useState } from 'react';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const imageSlots = [
  ['brand-logo', 'Website logo'],
  ['page-about', 'About page banner'],
  ['page-academics', 'Academics page banner'],
  ['page-admissions', 'Admissions page banner'],
  ['page-activities', 'Co-curricular page banner'],
  ['page-blog', 'Blog page banner'],
  ['page-careers', 'Careers page banner'],
  ['page-classes', 'Classes page banner'],
  ['page-contact', 'Contact page banner'],
  ['page-gallery', 'Gallery page banner'],
  ['page-parents', 'Parents corner banner'],
  ['home-learning', 'Homepage learning section'],
  ['about-leadership', 'About leadership section'],
  ['about-mission-board', 'About mission and vision board'],
  ['academics-support', 'Academics support section'],
  ['activity-1', 'School life image 1'],
  ['activity-2', 'School life image 2'],
  ['activity-3', 'School life image 3'],
  ['activity-4', 'School life image 4'],
  ['activity-5', 'School life image 5'],
  ['class-playgroup', 'Playgroup class image'],
  ['class-pp1', 'PP1 class image'],
  ['class-pp2', 'PP2 class image'],
  ['class-grade1', 'Grade 1 class image'],
  ['class-grade2', 'Grade 2 class image'],
  ['class-grade3', 'Grade 3 class image'],
  ['class-grade4', 'Grade 4 class image'],
  ['class-grade5', 'Grade 5 class image'],
  ['class-grade6', 'Grade 6 class image'],
  ['class-juniorschool', 'Junior school class image'],
] as const;

export default function VisualsPage() {
  const { heroSlides, siteImages, addHeroSlide, deleteHeroSlide, setSiteImage, deleteSiteImage, uploadMedia } = useApp();
  const [heroFile,setHeroFile]=useState<File|null>(null);
  const [heroAlt,setHeroAlt]=useState('');
  const [heroTitle,setHeroTitle]=useState('');
  const [heroKicker,setHeroKicker]=useState('');
  const [heroDescription,setHeroDescription]=useState('');
  const [heroButton,setHeroButton]=useState('');
  const [heroHref,setHeroHref]=useState('');
  const [slot,setSlot]=useState(imageSlots[0][0]);
  const [slotFile,setSlotFile]=useState<File|null>(null);
  const [slotAlt,setSlotAlt]=useState('');
  const [slotLabel,setSlotLabel]=useState('');
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');

  async function saveHero(event:FormEvent) {
    event.preventDefault();
    if(!heroFile||!heroAlt.trim())return setError('Choose a hero image and describe what is visible.');
    setBusy(true);setError('');
    try {
      const asset=await uploadMedia(heroFile,heroAlt);
      await addHeroSlide({mediaId:asset.id,image:asset.url,alt:heroAlt,kicker:heroKicker,title:heroTitle,description:heroDescription,primary:heroButton,primaryHref:heroHref});
      setHeroFile(null);setHeroAlt('');setHeroTitle('');setHeroKicker('');setHeroDescription('');setHeroButton('');setHeroHref('');
    } catch(value) { setError(value instanceof Error?value.message:'Unable to save the hero slide.'); }
    finally { setBusy(false); }
  }

  async function saveSlot(event:FormEvent) {
    event.preventDefault();
    if(!slotFile||!slotAlt.trim())return setError('Choose an image and describe what is visible.');
    setBusy(true);setError('');
    try {
      const asset=await uploadMedia(slotFile,slotAlt);
      await setSiteImage(slot,{mediaId:asset.id,url:asset.url,alt:slotAlt,label:slotLabel});
      setSlotFile(null);setSlotAlt('');setSlotLabel('');
    } catch(value) { setError(value instanceof Error?value.message:'Unable to assign the image.'); }
    finally { setBusy(false); }
  }

  return <div className="space-y-8 p-6 lg:p-8">
    <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#d50b12]">Website visuals</p><h1 className="mt-2 text-3xl font-extrabold text-[#031f66]">Dynamic images</h1><p className="mt-2 max-w-3xl text-sm text-slate-600">Only images assigned here are shown publicly. Removing an assignment removes that image from the website.</p></div>
    {error&&<p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-[#031f66]">Homepage hero slides</h2>
      <form onSubmit={saveHero} className="mt-5 grid gap-4 lg:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><Upload className="h-5 w-5"/><span className="text-sm">{heroFile?.name||'Choose hero image'}</span><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={event=>setHeroFile(event.target.files?.[0]||null)}/></label>
        <input value={heroAlt} onChange={event=>setHeroAlt(event.target.value)} placeholder="Image description (required)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <input value={heroKicker} onChange={event=>setHeroKicker(event.target.value)} placeholder="Small heading (optional)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <input value={heroTitle} onChange={event=>setHeroTitle(event.target.value)} placeholder="Main heading (optional)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <textarea value={heroDescription} onChange={event=>setHeroDescription(event.target.value)} placeholder="Description (optional)" className="rounded-xl border border-slate-300 px-4 py-3 lg:col-span-2"/>
        <input value={heroButton} onChange={event=>setHeroButton(event.target.value)} placeholder="Button label (optional)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <input value={heroHref} onChange={event=>setHeroHref(event.target.value)} placeholder="Button link, e.g. /admissions" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0739a6] px-5 py-3 font-bold text-white disabled:opacity-50 lg:col-span-2"><ImagePlus className="h-4 w-4"/>Add hero slide</button>
      </form>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{heroSlides.map(slide=><article key={slide.id} className="overflow-hidden rounded-xl border border-slate-200"><img src={slide.image} alt={slide.alt} className="h-40 w-full object-cover"/><div className="flex items-start justify-between gap-3 p-4"><div><p className="font-bold text-[#031f66]">{slide.title||slide.alt}</p><p className="mt-1 text-xs text-slate-500">{slide.kicker||'Image-only slide'}</p></div><button onClick={()=>deleteHeroSlide(slide.id)} aria-label="Delete hero slide" className="rounded-lg bg-red-50 p-2 text-red-700"><Trash2 className="h-4 w-4"/></button></div></article>)}</div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-[#031f66]">Page and school-life images</h2>
      <form onSubmit={saveSlot} className="mt-5 grid gap-4 lg:grid-cols-2">
        <select value={slot} onChange={event=>setSlot(event.target.value as typeof slot)} className="rounded-xl border border-slate-300 px-4 py-3">{imageSlots.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"><Upload className="h-5 w-5"/><span className="text-sm">{slotFile?.name||'Choose image'}</span><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={event=>setSlotFile(event.target.files?.[0]||null)}/></label>
        <input value={slotAlt} onChange={event=>setSlotAlt(event.target.value)} placeholder="Image description (required)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <input value={slotLabel} onChange={event=>setSlotLabel(event.target.value)} placeholder="Short category label (school-life images)" className="rounded-xl border border-slate-300 px-4 py-3"/>
        <button disabled={busy} className="rounded-xl bg-[#0739a6] px-5 py-3 font-bold text-white disabled:opacity-50 lg:col-span-2">Assign image</button>
      </form>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{siteImages.map(item=><article key={item.id} className="overflow-hidden rounded-xl border border-slate-200"><img src={item.url} alt={item.alt} className="h-40 w-full object-cover"/><div className="flex items-start justify-between gap-3 p-4"><div><p className="font-bold text-[#031f66]">{imageSlots.find(([value])=>value===item.id)?.[1]||item.id}</p><p className="mt-1 text-xs text-slate-500">{item.alt}</p></div><button onClick={()=>deleteSiteImage(item.id)} aria-label={`Remove ${item.id}`} className="rounded-lg bg-red-50 p-2 text-red-700"><Trash2 className="h-4 w-4"/></button></div></article>)}</div>
    </section>
  </div>;
}
