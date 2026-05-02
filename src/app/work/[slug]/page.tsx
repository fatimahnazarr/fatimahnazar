import { collection, getDocs, query, where } from 'firebase/firestore';
import { db }        from '@/lib/firebase';
import { notFound }  from 'next/navigation';
import CaseStudyClient from './CaseStudyClient';
import type { Project } from '@/lib/types';

async function getProject(slug: string): Promise<Project | null> {
  const q    = query(collection(db, 'projects'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Project;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug }  = await params;
  const project   = await getProject(slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}