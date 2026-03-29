import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // В Prisma 7 используем переменную окружения DATABASE_URL или локальный файл
    // При деплое в Docker DATABASE_URL будет предоставлен контейнером
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  },
});
