import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { baolamPool?: Pool };

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL chưa được cấu hình");
  }

  if (!globalForDb.baolamPool) {
    globalForDb.baolamPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: process.env.NODE_ENV === "production" ? 10 : 3,
    });
  }

  return globalForDb.baolamPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
