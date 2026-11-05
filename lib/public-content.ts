import type { Teacher } from '@/types';

export const officialPhone = '+254114813030';
export const displayPhone = '+254 114 813 030';

const teacherAliases: Record<string, string> = { viola: 'viola minayo' };

export function teacherIdentity(name: string): string {
  const clean = name.toLowerCase().replace(/^(?:mr\.?|mrs\.?|ms\.?|madam|teacher)\s+/, '').replace(/\s+/g, ' ').trim();
  return teacherAliases[clean] ?? clean;
}

/** Merge display duplicates without changing CMS IDs or class assignments. */
export function uniqueTeachers(teachers: Teacher[]): Teacher[] {
  const profiles = new Map<string, Teacher>();
  for (const teacher of teachers) {
    const key = teacherIdentity(teacher.name);
    const existing = profiles.get(key);
    const preferred = !/^(mr\.?|mrs\.?|ms\.?|madam|teacher)\s/i.test(teacher.name) ? teacher : existing ?? teacher;
    profiles.set(key, {
      ...existing, ...preferred,
      image: preferred.image || existing?.image || teacher.image,
      bio: preferred.bio || existing?.bio || teacher.bio,
      email: preferred.email || existing?.email || teacher.email,
      subjects: preferred.subjects?.length ? preferred.subjects : existing?.subjects?.length ? existing.subjects : teacher.subjects,
    });
  }
  return [...profiles.values()];
}

export function schoolSocialLinks(settings: Record<'facebook' | 'twitter' | 'instagram' | 'youtube', string>) {
  return Object.entries(settings).flatMap(([name, href]) => {
    try {
      const url = new URL(href);
      if (!['https:', 'http:'].includes(url.protocol) || !url.pathname.replaceAll('/', '').trim()) return [];
      return [{ name: name === 'twitter' ? 'X' : name === 'youtube' ? 'YouTube' : name.charAt(0).toUpperCase() + name.slice(1), href: url.href }];
    } catch { return []; }
  });
}
