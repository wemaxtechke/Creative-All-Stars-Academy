'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { useHydrated } from '@/lib/use-hydrated';
import type { SchoolSettings } from '@/lib/site-content';

type TextSetting = keyof Omit<SchoolSettings, 'galleryCategories' | 'theme'>;
type Field = { name: TextSetting; label: string; type?: 'text' | 'email' | 'url' | 'tel' | 'number'; required?: boolean };

const generalFields: Field[] = [
  { name: 'schoolName', label: 'Official School Name', required: true },
  { name: 'logoText', label: 'Logo Text', required: true },
  { name: 'tagline', label: 'Tagline / Motto Statement', required: true },
  { name: 'email', label: 'Administrative Email', type: 'email', required: true },
  { name: 'phone', label: 'Official Telephone', type: 'tel', required: true },
  { name: 'address', label: 'Physical Address / Landmark', required: true },
  { name: 'officeHours', label: 'Office Working Hours', required: true },
];
const mapFields: Field[] = [
  { name: 'mapUrl', label: 'Google Maps share link', type: 'url', required: true },
  { name: 'mapLatitude', label: 'Map latitude', type: 'number', required: true },
  { name: 'mapLongitude', label: 'Map longitude', type: 'number', required: true },
];
const socialFields: Field[] = [
  { name: 'facebook', label: 'Facebook school profile', type: 'url' },
  { name: 'instagram', label: 'Instagram school profile', type: 'url' },
  { name: 'youtube', label: 'YouTube school channel', type: 'url' },
  { name: 'twitter', label: 'X school profile', type: 'url' },
];
const schoolLifeFields: Field[] = [
  { name: 'galleryEyebrow', label: 'School-life small heading' },
  { name: 'galleryTitle', label: 'School-life main heading' },
  { name: 'galleryDescription', label: 'School-life introduction' },
];

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const hydrated = useHydrated();
  const [draft, setDraft] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setSaving(true); setResult(null);
    try {
      await updateSettings(draft);
      setResult({ kind: 'success', text: 'Settings saved. The public website will use these values.' });
    } catch (error) {
      setResult({ kind: 'error', text: error instanceof Error ? error.message : 'Settings could not be saved. Please try again.' });
    } finally { setSaving(false); }
  }
  function fields(items: Field[]) {
    return <div className="grid gap-5 sm:grid-cols-2">{items.map(field => <label key={field.name} className="grid gap-2 text-xs font-semibold text-slate-600" htmlFor={`setting-${field.name}`}>{field.label}{field.required ? ' *' : ' (optional)'}<input id={`setting-${field.name}`} type={field.type || 'text'} step={field.type === 'number' ? 'any' : undefined} value={draft[field.name]} required={field.required} onChange={event => { setDraft(current => ({ ...current, [field.name]: event.target.value })); setResult(null); }} className="min-w-0 w-full rounded-lg border border-slate-300 p-3 text-sm font-normal text-slate-900" /></label>)}</div>;
  }
  return <div className="max-w-4xl space-y-6">
    <header><h1 className="text-2xl font-bold text-slate-900">Global School Settings</h1><p className="mt-2 text-sm leading-6 text-slate-600">Control the school identity, contact details, map, social profiles and school-life section shown publicly. Hero pictures and slide wording are managed in Website visuals.</p><Link href="/admin/dashboard/visuals" className="mt-3 inline-block text-sm font-semibold text-blue-700 underline">Manage hero slides and page images</Link></header>
    <form method="post" onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8" aria-busy={saving}>
      {result && <p role={result.kind === 'error' ? 'alert' : 'status'} className={`mb-6 rounded-lg border p-4 text-sm ${result.kind === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'}`}>{result.text}</p>}
      <fieldset disabled={saving || !hydrated} className="space-y-8">
        <section className="space-y-5"><h2 className="text-lg font-semibold text-slate-900">School identity & contact</h2>{fields(generalFields)}</section>
        <section className="space-y-5 border-t border-slate-200 pt-7"><h2 className="text-lg font-semibold text-slate-900">School map</h2>{fields(mapFields)}</section>
        <section className="space-y-5 border-t border-slate-200 pt-7"><h2 className="text-lg font-semibold text-slate-900">Social profiles</h2><p className="text-sm leading-6 text-slate-600">Use your school’s actual profile URLs. Leave unused platforms blank; generic platform homepages are hidden.</p>{fields(socialFields)}</section>
        <section className="space-y-5 border-t border-slate-200 pt-7"><h2 className="text-lg font-semibold text-slate-900">Homepage school-life section</h2><p className="text-sm leading-6 text-slate-600">These words accompany the school-life images assigned in Website visuals. The section appears when an image is assigned.</p>{fields(schoolLifeFields)}</section>
        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6"><button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save Global Configuration'}</button><button type="button" onClick={() => { setDraft(settings); setResult(null); }} className="rounded-lg border border-slate-300 px-5 py-3 text-sm text-slate-600">Reset unsaved changes</button></div>
      </fieldset>
    </form>
  </div>;
}
