'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, Lock, UserCheck } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      // Create session simulation
      if (typeof window !== 'undefined') {
        localStorage.setItem('casa_admin_logged', 'true');
      }
      router.push('/admin/dashboard');
    } else {
      setError('Invalid administrator credentials combination. Try admin / admin123.');
    }
  };

  return (
    <div className="min-h-[80vh] bg-blue-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border-b-8 border-yellow-400">
        {/* Visual decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full" />

        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto border border-blue-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-blue-950 tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 text-xs">Access the Creative All Stars dynamic administrative console.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 border border-red-200 p-3 rounded-xl text-xs font-semibold text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold text-gray-700">
          <div className="space-y-1">
            <label className="text-gray-600">Username *</label>
            <div className="relative">
              <UserCheck className="absolute top-3.5 left-4 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">Password *</label>
            <div className="relative">
              <Lock className="absolute top-3.5 left-4 text-gray-400 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. admin123"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="bg-yellow-50 text-blue-950 border border-yellow-200 p-3.5 rounded-xl leading-relaxed text-[11px] font-medium">
            💡 <strong>Prototype Credentials:</strong> Username is <strong>admin</strong> and password is <strong>admin123</strong>.
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            Authenticate Credentials
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-blue-600 hover:underline">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
