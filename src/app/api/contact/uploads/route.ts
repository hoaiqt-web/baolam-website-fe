import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { getGcsBucket } from "@/lib/gcs";
import { hasValidRequestOrigin } from "@/lib/security/request-origin";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const requestSchema = z.object({
  contentType: z.enum(Object.keys(EXTENSIONS) as [string, ...string[]]),
  size: z.number().int().min(1).max(MAX_FILE_SIZE),
});

export async function POST(request: Request) {
  if (!hasValidRequestOrigin(request)) {
    return Response.json({ error: "Origin không hợp lệ." }, { status: 403 });
  }

  const clientKey = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`contact-upload:${clientKey}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return Response.json({ error: "Bạn đã tải lên quá nhiều tệp. Vui lòng thử lại sau ít phút." }, { status: 429 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Chỉ nhận PDF, DOC, DOCX, JPG hoặc PNG, tối đa 20MB." }, { status: 400 });
  }

  try {
    const bucket = getGcsBucket();
    const now = new Date();
    const objectKey = `contact-uploads/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${EXTENSIONS[parsed.data.contentType]}`;
    const [policy] = await bucket.file(objectKey).generateSignedPostPolicyV4({
      expires: Date.now() + 5 * 60 * 1000,
      fields: { "Content-Type": parsed.data.contentType },
      conditions: [["content-length-range", 1, MAX_FILE_SIZE]],
    });

    return Response.json({ ...policy, objectKey });
  } catch (error) {
    console.error("Không thể ký GCS upload cho contact attachment:", error);
    return Response.json({ error: "Không thể chuẩn bị upload tệp." }, { status: 500 });
  }
}
