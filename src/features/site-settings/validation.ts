import { z } from "zod";

const optionalEmail = z.union([z.literal(""), z.email("Email không hợp lệ")]).optional();
const optionalUrl = z.union([z.literal(""), z.url("Đường dẫn không hợp lệ")]).optional();

export const siteSettingsFormSchema = z.object({
  contactEmail: optionalEmail,
  contactPhone: z.string().trim().max(50).optional(),
  officeAddress: z.string().trim().max(500).optional(),
  workingHours: z.string().trim().max(160).optional(),
  googleMapsUrl: optionalUrl,
  facebookUrl: optionalUrl,
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;
