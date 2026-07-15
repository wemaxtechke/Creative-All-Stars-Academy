import type { Metadata } from 'next';
import { schoolClasses } from '@/data/mockData';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const item = schoolClasses.find(c => c.id === id); return item ? { title: `${item.name} Class`, description: `${item.description} Discover learning and activities for ${item.ageGroup} at Creative All Stars Academy Nakuru.`, alternates: { canonical: `/classes/${id}` } } : { title: 'Classes' }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
