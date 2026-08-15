import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth/session";
import { getGcsBucket } from "@/lib/gcs";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const requestSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]),
  size: z.number().int().min(1).max(MAX_IMAGE_SIZE),
});

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
  if (!(await getAdminSession())) {
    return Response.json({ error: "Phiên đăng nhập đã hết hạn." }, { status: 401 });
  }

  if (!hasValidRequestOrigin(request)) {
    return Response.json({ error: "Origin không hợp lệ." }, { status: 403 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Chỉ nhận JPG, PNG, WebP hoặc AVIF, tối đa 10MB." }, { status: 400 });
  }

  try {
    const bucket = getGcsBucket();
    const now = new Date();
    const objectName = `projects/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${EXTENSIONS[parsed.data.contentType]}`;
    const [policy] = await bucket.file(objectName).generateSignedPostPolicyV4({
      expires: Date.now() + 5 * 60 * 1000,
      fields: { "Content-Type": parsed.data.contentType },
      conditions: [["content-length-range", 1, MAX_IMAGE_SIZE]],
    });
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${objectName}`;

    return Response.json({ ...policy, publicUrl });
  } catch (error) {
    console.error("Không thể ký GCS upload:", error);
    return Response.json({ error: "Không thể chuẩn bị upload ảnh." }, { status: 500 });
  }
}
