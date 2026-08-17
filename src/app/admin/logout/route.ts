import { deleteSession } from "@/lib/auth/session";

export const runtime = "nodejs";

function firstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

function hasValidRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestUrl = new URL(request.url);
  const host = firstForwardedValue(request.headers.get("x-forwarded-host"))
    ?? request.headers.get("host")
    ?? requestUrl.host;
  const protocol = firstForwardedValue(request.headers.get("x-forwarded-proto"))
    ?? requestUrl.protocol.replace(":", "");

  return origin === `${protocol}://${host}`;
}

export async function POST(request: Request) {
  if (!hasValidRequestOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  await deleteSession();
  return Response.redirect(new URL("/admin/login", request.url), 303);
}
