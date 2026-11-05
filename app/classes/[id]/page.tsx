import { notFound, permanentRedirect } from 'next/navigation';
import { findLearningStage } from '@/lib/learning-stages';
import { LearningStageDetails } from '@/components/LearningStageDetails';

export default async function ClassDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stage = findLearningStage(id);
  if (!stage) notFound();
  if (stage.id !== id) permanentRedirect(`/classes/${stage.id}#${id}`);
  return <LearningStageDetails stageId={stage.id} />;
}
