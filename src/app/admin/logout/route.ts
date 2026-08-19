import { deleteSession } from "@/lib/auth/session";
import { getPublicOrigin, hasValidRequestOrigin } from "@/lib/security/request-origin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasValidRequestOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  await deleteSession();
  return Response.redirect(new URL("/admin/login", getPublicOrigin(request)), 303);
}
