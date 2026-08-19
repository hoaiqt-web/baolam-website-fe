import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { getAdminSession } from "@/lib/auth/session";
import { getPublicOrigin, hasValidRequestOrigin } from "@/lib/security/request-origin";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  if (!(await getAdminSession())) {
    if (wantsJson) return Response.json({ error: "Phiên đăng nhập đã hết hạn." }, { status: 401 });
    return Response.redirect(new URL("/admin/login", getPublicOrigin(request)), 303);
  }
  if (!hasValidRequestOrigin(request)) {
    return wantsJson ? Response.json({ error: "Origin không hợp lệ." }, { status: 403 }) : new Response("Forbidden", { status: 403 });
  }

  const formData = await request.formData();
  const nextStatus = formData.get("status");
  if (nextStatus !== "published" && nextStatus !== "draft") {
    return wantsJson ? Response.json({ error: "Trạng thái không hợp lệ." }, { status: 400 }) : new Response("Trạng thái không hợp lệ", { status: 400 });
  }

  const { id } = await params;
  const [project] = await getDb().update(projects).set({
    status: nextStatus,
    publishedAt: nextStatus === "published" ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(projects.id, id)).returning({ slug: projects.slug });

  if (!project) return wantsJson ? Response.json({ error: "Không tìm thấy dự án." }, { status: 404 }) : new Response("Không tìm thấy dự án", { status: 404 });

  revalidatePath("/admin");
  revalidatePath(`/projects/${project.slug}`);
  if (wantsJson) return Response.json({ success: true, status: nextStatus });
  return Response.redirect(new URL("/admin", getPublicOrigin(request)), 303);
}
