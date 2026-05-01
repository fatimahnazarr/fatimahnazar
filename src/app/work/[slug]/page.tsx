import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import CaseStudyClient from './CaseStudyClient';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title:       `${project.title} — Fatimah Nazar`,
    description: project.overview,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project  = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}