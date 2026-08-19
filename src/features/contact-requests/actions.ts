"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";
import { isRateLimited } from "@/lib/rate-limit";
import { sendContactRequestNotification } from "@/lib/email";
import { quickContactSchema, projectBriefSchema, type QuickContactInput, type ProjectBriefInput } from "./validation";

export type SubmitContactResult = { success: true } | { success: false; error: string };

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

async function getClientKey() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function submitQuickContactAction(input: QuickContactInput): Promise<SubmitContactResult> {
  if (input.honeypot) return { success: true };

  const clientKey = await getClientKey();
  if (isRateLimited(`quick:${clientKey}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return { success: false, error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." };
  }

  const parsed = quickContactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Thông tin chưa hợp lệ." };
  }

  let inserted;
  try {
    [inserted] = await getDb().insert(contactRequests).values({
      type: "quick",
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      company: parsed.data.company ?? null,
      projectType: parsed.data.projectType ?? null,
      message: parsed.data.message ?? null,
      source: parsed.data.source ?? null,
    }).returning();
  } catch (error) {
    console.error("Không thể lưu yêu cầu liên hệ:", error);
    return { success: false, error: "Không thể gửi yêu cầu vào lúc này." };
  }

  revalidatePath("/admin/contacts");
  await sendContactRequestNotification(inserted);
  return { success: true };
}

export async function submitProjectBriefAction(input: ProjectBriefInput): Promise<SubmitContactResult> {
  if (input.honeypot) return { success: true };

  const clientKey = await getClientKey();
  if (isRateLimited(`brief:${clientKey}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return { success: false, error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." };
  }

  const parsed = projectBriefSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Thông tin chưa hợp lệ." };
  }

  let inserted;
  try {
    [inserted] = await getDb().insert(contactRequests).values({
      type: "project_brief",
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email,
      company: parsed.data.company ?? null,
      projectName: parsed.data.projectName ?? null,
      location: parsed.data.location ?? null,
      projectType: parsed.data.projectType ?? null,
      scale: parsed.data.scale ?? null,
      stage: parsed.data.stage ?? null,
      scopes: parsed.data.scopes.length ? parsed.data.scopes : null,
      message: parsed.data.message ?? null,
      attachments: parsed.data.attachments.length ? parsed.data.attachments : null,
      source: parsed.data.source ?? null,
    }).returning();
  } catch (error) {
    console.error("Không thể lưu project brief:", error);
    return { success: false, error: "Không thể gửi yêu cầu vào lúc này." };
  }

  revalidatePath("/admin/contacts");
  await sendContactRequestNotification(inserted);
  return { success: true };
}
