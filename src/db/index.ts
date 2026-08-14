import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getPostgresConfig } from "./connection";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { baolamPool?: Pool };

function getPool() {
  if (!globalForDb.baolamPool) {
    globalForDb.baolamPool = new Pool({
      ...getPostgresConfig(),
      max: process.env.NODE_ENV === "production" ? 10 : 3,
    });
  }

  return globalForDb.baolamPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
