import { PrismaClient } from "@prisma/client";
import config from "./prisma.config";

console.log(config);

try {
  const prisma = new PrismaClient({ ...config, log: ["query"] });
  console.log("Success with config spreading!");
} catch (e) {
  console.error(e);
}
