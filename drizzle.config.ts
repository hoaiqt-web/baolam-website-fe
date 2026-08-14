import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { getPostgresConfig } from "./src/db/connection";

const connection = getPostgresConfig();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: connection.host,
    port: connection.port,
    database: connection.database,
    user: connection.user,
    password: connection.password,
    ssl: Boolean(connection.ssl),
  },
  strict: true,
  verbose: true,
});
