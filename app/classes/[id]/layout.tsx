import type { Metadata } from 'next';
import { findLearningStage } from '@/lib/learning-stages';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const stage = findLearningStage((await params).id);
  return stage ? pageMetadata(stage.name, stage.description, `/classes/${stage.id}`) : { title: 'Learning stages', robots: { index: false } };
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
