import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getPostgresConfig } from "../src/db/connection";
import { projectBlocks, projects } from "../src/db/schema";
import { LANDMARK_PROJECTS } from "../src/data/projects";
import { ARTWORK_PROJECTS } from "../src/data/artworks";

const pool = new Pool(getPostgresConfig());
const db = drizzle(pool);
const source = [...LANDMARK_PROJECTS, ...ARTWORK_PROJECTS];

for (const item of source) {
  await db.transaction(async (tx) => {
    const [project] = await tx.insert(projects).values({
      slug: item.slug,
      title: item.title,
      excerpt: item.description,
      client: item.client,
      location: item.location,
      category: item.category,
      completionYear: item.completionYear,
      scale: "scale" in item ? item.scale : null,
      materials: "material" in item ? item.material : null,
      coverImage: item.thumbnail,
      coverAlt: item.title,
      status: "published",
      publishedAt: new Date(),
    }).onConflictDoUpdate({
      target: projects.slug,
      set: { title: item.title, excerpt: item.description, coverImage: item.thumbnail, updatedAt: new Date() },
    }).returning({ id: projects.id });

    const [resolved] = project ? [project] : await tx.select({ id: projects.id }).from(projects).where(eq(projects.slug, item.slug)).limit(1);
    const existingBlocks = await tx.select({ id: projectBlocks.id }).from(projectBlocks).where(eq(projectBlocks.projectId, resolved.id)).limit(1);
    if (!existingBlocks.length) {
      await tx.insert(projectBlocks).values({
        projectId: resolved.id,
        type: "highlights",
        position: 0,
        data: { heading: "Một công trình tạo dấu ấn", body: item.description, items: ["Thiết kế sáng tạo", "Sản xuất chính xác", "Thi công chuyên nghiệp"] },
      });
    }
  });
}

console.log(`Đã đồng bộ ${source.length} dự án mẫu.`);
await pool.end();
