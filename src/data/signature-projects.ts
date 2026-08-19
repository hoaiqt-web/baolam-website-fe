import { LANDMARK_PROJECTS } from '@/data/projects';
import { ARTWORK_PROJECTS } from '@/data/artworks';

export type SignatureProject = {
  id: string;
  slug: string;
  title: string;
  client?: string;
  location?: string;
  completionYear: number;
  category: string;
  group: 'landmark' | 'artwork';
  scopeLabel?: string;
  description?: string;
};

export const SIGNATURE_PROJECTS: SignatureProject[] = [
  ...LANDMARK_PROJECTS.map(
    (project): SignatureProject => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      client: project.client,
      location: project.location,
      completionYear: project.completionYear,
      category: project.category,
      group: 'landmark',
      scopeLabel: project.scale,
      description: project.description,
    })
  ),
  ...ARTWORK_PROJECTS.map(
    (project): SignatureProject => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      client: project.client,
      location: project.location,
      completionYear: project.completionYear,
      category: project.category,
      group: 'artwork',
      scopeLabel: project.material,
      description: project.description,
    })
  ),
];
