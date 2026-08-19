import { isContactAttachmentObjectKey } from "@/features/contact-requests/media-path";
import { getAdminSession } from "@/lib/auth/session";
import { getGcsBucket } from "@/lib/gcs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SIGNED_URL_TTL_MS = 10 * 60 * 1000;

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!(await getAdminSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { path } = await params;
  const objectKey = path.join("/");

  if (!isContactAttachmentObjectKey(objectKey)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const [signedUrl] = await getGcsBucket().file(objectKey).getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + SIGNED_URL_TTL_MS,
    });
    return new Response(null, {
      status: 307,
      headers: { Location: signedUrl, "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" },
    });
  } catch (error) {
    console.error("Không thể ký URL đọc contact attachment:", error);
    return new Response("Không thể tải tệp", { status: 503 });
  }
}
