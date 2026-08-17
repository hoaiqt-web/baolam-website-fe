import { z } from "zod";
import { PROJECT_BLOCK_TYPES } from "./types";
import { isProjectMediaUrl } from "./media-path";

const defaultMediaHosts = ["storage.googleapis.com", "images.unsplash.com"];
const configuredMediaHosts = (process.env.MEDIA_ALLOWED_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);
const allowedMediaHosts = new Set([...defaultMediaHosts, ...configuredMediaHosts]);

const mediaUrl = z.string().refine((value) => {
  if (isProjectMediaUrl(value)) return true;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !allowedMediaHosts.has(url.hostname.toLowerCase())) return false;
    if (url.hostname === "storage.googleapis.com" && process.env.GCS_BUCKET_NAME) {
      return url.pathname.startsWith(`/${process.env.GCS_BUCKET_NAME}/`);
    }
    return true;
  } catch {
    return false;
  }
}, "Ảnh phải là project media hợp lệ hoặc HTTPS từ nguồn đã cho phép");

const optionalUrl = z.union([z.literal(""), mediaUrl]).optional();

export const projectBlockSchema = z.object({
  id: z.uuid().optional(),
  type: z.enum(PROJECT_BLOCK_TYPES),
  variant: z.string().max(50).optional(),
  isVisible: z.boolean().default(true),
  data: z.object({
    heading: z.string().max(255).optional(),
    body: z.string().max(5000).optional(),
    image: optionalUrl,
    imageAlt: z.string().max(255).optional(),
    items: z.array(z.string().max(500))
      .transform((items) => items.map((item) => item.trim()).filter(Boolean))
      .refine((items) => items.length <= 20, "Tối đa 20 ý nổi bật")
      .optional(),
    images: z.array(z.object({
      url: mediaUrl,
      alt: z.string().max(255).optional(),
      caption: z.string().max(500).optional(),
    })).max(30).optional(),
    steps: z.array(z.object({
      title: z.string().min(1).max(150),
      description: z.string().max(1000).optional(),
      image: optionalUrl,
    })).max(12).optional(),
    quote: z.string().max(2000).optional(),
    author: z.string().max(255).optional(),
  }),
});

export const projectFormSchema = z.object({
  title: z.string().trim().min(2, "Tên dự án quá ngắn").max(255),
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
  eyebrow: z.string().trim().max(120).default("Dự án công trình"),
  excerpt: z.string().trim().max(2000).optional(),
  location: z.string().trim().max(255).optional(),
  category: z.string().trim().max(120).optional(),
  completionYear: z.number().int().min(1900).max(2200).nullable(),
  coverImage: mediaUrl,
  coverAlt: z.string().trim().max(255).optional(),
  status: z.enum(["draft", "published", "archived"]),
  seoTitle: z.string().trim().max(255).optional(),
  seoDescription: z.string().trim().max(500).optional(),
  blocks: z.array(projectBlockSchema).max(40),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
