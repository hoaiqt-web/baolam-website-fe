import { z } from "zod";
import { isValidEmail, isValidVietnamesePhone } from "@/lib/contact-options";
import { isContactAttachmentObjectKey } from "./media-path";

const name = z.string().trim().min(2, "Vui lòng nhập họ và tên.").max(255);
const phone = z.string().trim().refine(isValidVietnamesePhone, "Số điện thoại chưa hợp lệ.");
const email = z.string().trim().refine(isValidEmail, "Email chưa hợp lệ.");
const optionalText = (max: number) => z.string().trim().max(max).optional().transform((v) => v || undefined);

// Honeypot: real visitors never see or fill this field (hidden via CSS). Bots that
// auto-fill every input in a form will populate it, so a non-empty value is a strong bot signal.
const honeypot = z.string().optional();

export const quickContactSchema = z.object({
  fullName: name,
  phone,
  company: optionalText(255),
  projectType: optionalText(120),
  message: optionalText(5000),
  source: optionalText(120),
  honeypot,
});

export type QuickContactInput = z.infer<typeof quickContactSchema>;

export const attachmentSchema = z.object({
  name: z.string().trim().min(1).max(255),
  objectKey: z.string().refine(isContactAttachmentObjectKey, "Tệp đính kèm không hợp lệ."),
  size: z.number().int().min(1).max(20 * 1024 * 1024),
});

export const projectBriefSchema = z.object({
  fullName: name,
  phone,
  email,
  company: optionalText(255),
  projectName: optionalText(255),
  location: optionalText(255),
  projectType: optionalText(120),
  scale: optionalText(120),
  stage: optionalText(120),
  scopes: z.array(z.string().trim().max(120)).max(20).default([]),
  message: optionalText(5000),
  attachments: z.array(attachmentSchema).max(10).default([]),
  source: optionalText(120),
  honeypot,
});

export type ProjectBriefInput = z.infer<typeof projectBriefSchema>;
