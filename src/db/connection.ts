import type { PoolConfig } from "pg";

const REQUIRED_DB_ENV = ["DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD"] as const;

function parseDbPort(value: string | undefined) {
  const port = Number(value ?? "5432");

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("DB_PORT phải là một số nguyên hợp lệ từ 1 đến 65535");
  }

  return port;
}

function parseDbSsl(value: string | undefined) {
  if (value === undefined) return false;

  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;

  throw new Error("DB_SSL chỉ nhận true hoặc false");
}

export function getPostgresConfig(): PoolConfig & {
  host: string;
  database: string;
  user: string;
  password: string;
  port: number;
} {
  const missing = REQUIRED_DB_ENV.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    throw new Error(`Thiếu biến môi trường kết nối database: ${missing.join(", ")}`);
  }

  const useSsl = parseDbSsl(process.env.DB_SSL);

  return {
    host: process.env.DB_HOST!,
    port: parseDbPort(process.env.DB_PORT),
    database: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    // Managed PostgreSQL public endpoints commonly use provider-managed certs.
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  };
}
