import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { getAdminSession } from "@/lib/auth/session";
import { hasValidRequestOrigin } from "@/lib/security/request-origin";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return Response.redirect(new URL("/admin/login", request.url), 303);
  }
  if (!hasValidRequestOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const formData = await request.formData();
  const nextStatus = formData.get("status");
  if (nextStatus !== "published" && nextStatus !== "draft") {
    return new Response("Trạng thái không hợp lệ", { status: 400 });
  }

  const { id } = await params;
  const [project] = await getDb().update(projects).set({
    status: nextStatus,
    publishedAt: nextStatus === "published" ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(projects.id, id)).returning({ slug: projects.slug });

  if (!project) return new Response("Không tìm thấy dự án", { status: 404 });

  revalidatePath("/admin");
  revalidatePath(`/projects/${project.slug}`);
  return Response.redirect(new URL("/admin", request.url), 303);
}
