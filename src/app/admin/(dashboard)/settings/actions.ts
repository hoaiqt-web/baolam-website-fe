"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { siteSettingsFormSchema } from "@/features/site-settings/validation";
import { SITE_SETTINGS_ID } from "@/features/site-settings/queries";
import { requireAdmin } from "@/lib/auth/session";

export type SaveSiteSettingsState = { success?: boolean; message?: string; errors?: string[] };

function optionalString(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  return normalized || "";
}

export async function saveSiteSettingsAction(_: SaveSiteSettingsState, formData: FormData): Promise<SaveSiteSettingsState> {
  await requireAdmin();

  const parsed = siteSettingsFormSchema.safeParse({
    contactEmail: optionalString(formData.get("contactEmail")),
    contactPhone: optionalString(formData.get("contactPhone")),
    officeAddress: optionalString(formData.get("officeAddress")),
    workingHours: optionalString(formData.get("workingHours")),
    googleMapsUrl: optionalString(formData.get("googleMapsUrl")),
    facebookUrl: optionalString(formData.get("facebookUrl")),
  });

  if (!parsed.success) {
    return { errors: parsed.error.issues.map((issue) => issue.message) };
  }

  const values = parsed.data;
  const record = {
    contactEmail: values.contactEmail || null,
    contactPhone: values.contactPhone || null,
    officeAddress: values.officeAddress || null,
    workingHours: values.workingHours || null,
    googleMapsUrl: values.googleMapsUrl || null,
    facebookUrl: values.facebookUrl || null,
    updatedAt: new Date(),
  };

  try {
    await getDb()
      .insert(siteSettings)
      .values({ id: SITE_SETTINGS_ID, ...record })
      .onConflictDoUpdate({ target: siteSettings.id, set: record });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể lưu thông tin liên hệ.";
    return { errors: [message] };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/api/site-settings");
  return { success: true, message: "Đã lưu thông tin liên hệ." };
}
