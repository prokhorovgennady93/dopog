import { PrismaClient } from "@prisma/client";
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite";
import { DatabaseSync } from "node:sqlite";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL || "file:./dev.db";
  // Prisma handles the 'file:' prefix, but the adapter needs a clean path if it's passed differently
  const cleanUrl = url.replace('file:', '');
  const adapter = new PrismaNodeSQLite({ url: cleanUrl });
  return new PrismaClient({ adapter });
};

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
