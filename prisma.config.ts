import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // В Prisma 7 путь в конфиге указывается относительно корня проекта
    url: "file:./prisma/dev.db",
  },
});
