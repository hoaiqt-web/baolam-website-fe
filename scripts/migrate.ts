import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { getPostgresConfig } from "../src/db/connection";

async function main() {
  const connection = getPostgresConfig();
  const pool = new Pool({
    ...connection,
    max: 1,
  });

  try {
    const result = await pool.query<{
      database: string;
      user: string;
    }>("select current_database() as database, current_user as user");
    const { database, user } = result.rows[0];

    console.log(`Đang migrate database ${database} bằng user ${user}...`);

    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("Database migration hoàn tất.");
  } catch (error) {
    console.error("Database migration thất bại:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

void main();
