import "dotenv/config";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getPostgresConfig } from "../src/db/connection";
import { adminUsers } from "../src/db/schema";

async function main() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error("Cần ADMIN_USERNAME và ADMIN_PASSWORD");
  }
  if (ADMIN_PASSWORD.length < 12) {
    throw new Error("ADMIN_PASSWORD phải có ít nhất 12 ký tự");
  }

  const pool = new Pool(getPostgresConfig());

  try {
    const db = drizzle(pool);
    const passwordHash = await hash(ADMIN_PASSWORD, 12);
    const existing = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.username, ADMIN_USERNAME)).limit(1);

    if (existing[0]) {
      await db.update(adminUsers).set({ passwordHash, isActive: true, updatedAt: new Date() }).where(eq(adminUsers.id, existing[0].id));
      console.log(`Đã cập nhật admin: ${ADMIN_USERNAME}`);
    } else {
      await db.insert(adminUsers).values({ username: ADMIN_USERNAME, passwordHash });
      console.log(`Đã tạo admin: ${ADMIN_USERNAME}`);
    }
  } finally {
    await pool.end();
  }
}

void main();
