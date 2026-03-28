import { db } from "./src/lib/db";

async function main() {
  try {
    const users = await db.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
