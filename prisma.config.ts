import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local tiene prioridad (credenciales de Vercel/Neon en local)
dotenv.config({ path: ".env.local" });
// .env como fallback
dotenv.config();

// En build de Vercel, POSTGRES_URL_NON_POOLING puede no estar disponible.
// Usamos POSTGRES_PRISMA_URL como fallback ya que prisma generate no necesita conexión real.
const dbUrl =
  process.env["POSTGRES_URL_NON_POOLING"] ??
  process.env["POSTGRES_PRISMA_URL"] ??
  process.env["DATABASE_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(dbUrl && {
    datasource: {
      url: dbUrl,
    },
  }),
});
