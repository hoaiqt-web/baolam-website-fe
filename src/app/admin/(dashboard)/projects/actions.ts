"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { projectBlocks, projects } from "@/db/schema";
import { projectFormSchema } from "@/features/projects/validation";
import { requireAdmin } from "@/lib/auth/session";

export type SaveProjectState = { success?: boolean; message?: string; errors?: string[] };

function optionalString(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  return normalized || undefined;
}

export async function saveProjectAction(id: string | null, _: SaveProjectState, formData: FormData): Promise<SaveProjectState> {
  await requireAdmin();

  let blocks: unknown = [];
  try {
    blocks = JSON.parse(String(formData.get("blocks") ?? "[]"));
  } catch {
    return { errors: ["Dữ liệu block không hợp lệ."] };
  }

  const year = optionalString(formData.get("completionYear"));
  const parsed = projectFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    eyebrow: formData.get("eyebrow"),
    excerpt: optionalString(formData.get("excerpt")),
    client: optionalString(formData.get("client")),
    location: optionalString(formData.get("location")),
    category: optionalString(formData.get("category")),
    completionYear: year ? Number(year) : null,
    scale: optionalString(formData.get("scale")),
    materials: optionalString(formData.get("materials")),
    coverImage: formData.get("coverImage"),
    coverAlt: optionalString(formData.get("coverAlt")),
    status: formData.get("status"),
    seoTitle: optionalString(formData.get("seoTitle")),
    seoDescription: optionalString(formData.get("seoDescription")),
    blocks,
  });

  if (!parsed.success) {
    return { errors: parsed.error.issues.map((issue) => issue.message) };
  }

  const { blocks: validatedBlocks, ...values } = parsed.data;
  const db = getDb();
  let projectId = id;
  const existingProject = id
    ? await db.query.projects.findFirst({ columns: { slug: true }, where: eq(projects.id, id) })
    : null;

  try {
    await db.transaction(async (tx) => {
      const projectValues = {
        ...values,
        excerpt: values.excerpt || null,
        client: values.client || null,
        location: values.location || null,
        category: values.category || null,
        scale: values.scale || null,
        materials: values.materials || null,
        coverAlt: values.coverAlt || null,
        seoTitle: values.seoTitle || null,
        seoDescription: values.seoDescription || null,
        publishedAt: values.status === "published" ? new Date() : null,
        updatedAt: new Date(),
      };

      if (projectId) {
        const [updated] = await tx.update(projects).set(projectValues).where(eq(projects.id, projectId)).returning({ id: projects.id });
        if (!updated) throw new Error("Không tìm thấy dự án.");
      } else {
        const [created] = await tx.insert(projects).values(projectValues).returning({ id: projects.id });
        projectId = created.id;
      }

      await tx.delete(projectBlocks).where(eq(projectBlocks.projectId, projectId));
      if (validatedBlocks.length) {
        await tx.insert(projectBlocks).values(validatedBlocks.map((block, position) => ({
          projectId: projectId!,
          type: block.type,
          variant: block.variant || null,
          position,
          data: block.data,
          isVisible: block.isVisible,
        })));
      }
    });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("unique")
      ? "Slug đã tồn tại. Hãy chọn slug khác."
      : error instanceof Error ? error.message : "Không thể lưu dự án.";
    return { errors: [message] };
  }

  revalidatePath("/admin");
  if (existingProject?.slug && existingProject.slug !== parsed.data.slug) {
    revalidatePath(`/projects/${existingProject.slug}`);
  }
  revalidatePath(`/projects/${parsed.data.slug}`);
  if (!id) redirect(`/admin/projects/${projectId}/edit`);
  return { success: true, message: "Đã lưu dự án." };
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  const db = getDb();
  const existing = await db.query.projects.findFirst({ columns: { slug: true }, where: eq(projects.id, id) });
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin");
  if (existing?.slug) revalidatePath(`/projects/${existing.slug}`);
  redirect("/admin");
}
