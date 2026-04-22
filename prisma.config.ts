import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local tiene prioridad (credenciales de Vercel/Neon en local)
dotenv.config({ path: ".env.local" });
// .env como fallback (DATABASE_URL local para SQLite en dev puro)
dotenv.config();

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
