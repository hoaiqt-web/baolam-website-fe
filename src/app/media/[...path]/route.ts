import { isProjectMediaObjectKey } from "@/features/projects/media-path";
import { getGcsBucket } from "@/lib/gcs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SIGNED_URL_TTL_MS = 24 * 60 * 60 * 1000;
const REDIRECT_CACHE_SECONDS = 60 * 60;

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const objectKey = path.join("/");

  if (!isProjectMediaObjectKey(objectKey)) {
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
      headers: {
        Location: signedUrl,
        "Cache-Control": `public, max-age=${REDIRECT_CACHE_SECONDS}, s-maxage=${REDIRECT_CACHE_SECONDS}, stale-while-revalidate=300`,
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Không thể ký URL đọc project media:", error);
    return new Response("Không thể tải ảnh", { status: 503 });
  }
}
