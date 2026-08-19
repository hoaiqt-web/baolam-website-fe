import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { ProjectBlockData, ProjectBlockType } from "@/features/projects/types";

export const projectStatus = pgEnum("project_status", ["draft", "published", "archived"]);

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 80 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("admin_users_username_idx").on(table.username)],
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 180 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    eyebrow: varchar("eyebrow", { length: 120 }).notNull().default("Dự án công trình"),
    excerpt: text("excerpt"),
    client: varchar("client", { length: 180 }),
    location: varchar("location", { length: 255 }),
    category: varchar("category", { length: 120 }),
    completionYear: integer("completion_year"),
    scale: varchar("scale", { length: 120 }),
    materials: varchar("materials", { length: 255 }),
    coverImage: text("cover_image").notNull(),
    coverAlt: varchar("cover_alt", { length: 255 }),
    status: projectStatus("status").notNull().default("draft"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("projects_slug_idx").on(table.slug),
    index("projects_status_idx").on(table.status),
  ],
);

export const projectBlocks = pgTable(
  "project_blocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).$type<ProjectBlockType>().notNull(),
    variant: varchar("variant", { length: 50 }),
    position: integer("position").notNull(),
    data: jsonb("data").$type<ProjectBlockData>().notNull(),
    isVisible: boolean("is_visible").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("project_blocks_project_position_idx").on(table.projectId, table.position)],
);

export const siteSettings = pgTable("site_settings", {
  id: varchar("id", { length: 40 }).primaryKey().default("default"),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  officeAddress: text("office_address"),
  workingHours: varchar("working_hours", { length: 160 }),
  googleMapsUrl: text("google_maps_url"),
  facebookUrl: text("facebook_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectBlock = typeof projectBlocks.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
