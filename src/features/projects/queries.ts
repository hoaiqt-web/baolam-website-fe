import "server-only";

import { cache } from "react";
import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { projectBlocks, projects } from "@/db/schema";

export async function listProjectsForAdmin() {
  return getDb().select().from(projects).orderBy(desc(projects.updatedAt));
}

export async function getProjectForAdmin(id: string) {
  const project = await getDb().query.projects.findFirst({ where: eq(projects.id, id) });
  if (!project) return null;
  const blocks = await getDb().select().from(projectBlocks).where(eq(projectBlocks.projectId, id)).orderBy(asc(projectBlocks.position));
  return { ...project, blocks };
}

export const getPublishedProject = cache(async (slug: string) => {
  const project = await getDb().query.projects.findFirst({
    where: and(eq(projects.slug, slug), eq(projects.status, "published")),
  });
  if (!project) return null;
  const blocks = await getDb().select().from(projectBlocks).where(and(eq(projectBlocks.projectId, project.id), eq(projectBlocks.isVisible, true))).orderBy(asc(projectBlocks.position));
  return { ...project, blocks };
});
