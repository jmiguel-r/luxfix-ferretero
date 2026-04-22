import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // URL directa (sin pgbouncer) para migraciones y db push
    url: process.env["POSTGRES_URL_NON_POOLING"] ?? process.env["DATABASE_URL"],
  },
});
