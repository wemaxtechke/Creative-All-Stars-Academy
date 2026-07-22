'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Save, ShieldCheck } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();

  const [schoolName, setSchoolName] = useState(settings.schoolName);
  const [logoText, setLogoText] = useState(settings.logoText);
  const [tagline, setTagline] = useState(settings.tagline);
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [mapUrl, setMapUrl] = useState(settings.mapUrl);
  const [mapLatitude, setMapLatitude] = useState(settings.mapLatitude);
  const [mapLongitude, setMapLongitude] = useState(settings.mapLongitude);
  const [officeHours, setOfficeHours] = useState(settings.officeHours);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      schoolName,
      logoText,
      tagline,
      email,
      phone,
      address,
      mapUrl,
      mapLatitude,
      mapLongitude,
      officeHours
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl text-left">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Global School Settings</h1>
        <p className="text-gray-500 text-xs">Configure the school logo text, motto tagline, physical Ngata address, and email visible to public users.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6 text-xs font-semibold text-gray-700">

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-center gap-2 font-bold animate-fade-in">
            <ShieldCheck className="w-5 h-5" /> Settings updated globally! Refreshing public view elements...
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-gray-600">Official School Name *</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Logo Text *</label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">Tagline / Motto Statement *</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-gray-600">Administrative Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Call Center Telephone *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">Physical Address / Landmark *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">Google Maps share link *</label>
          <input
            type="url"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-gray-600">Map latitude *</label>
            <input type="number" step="any" value={mapLatitude} onChange={(e) => setMapLatitude(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Map longitude *</label>
            <input type="number" step="any" value={mapLongitude} onChange={(e) => setMapLongitude(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-gray-600">Office Working Hours *</label>
          <input
            type="text"
            value={officeHours}
            onChange={(e) => setOfficeHours(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
            required
          />
        </div>

        <div className="border-t border-gray-50 pt-6">
          <button
            type="submit"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Global Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
