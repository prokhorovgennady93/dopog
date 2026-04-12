const { PrismaClient } = require('@prisma/client');
const { PrismaNodeSQLite } = require('prisma-adapter-node-sqlite');

const url = "prisma/dev.db"; // or wherever your db is
const adapter = new PrismaNodeSQLite({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const subs = await prisma.pushSubscription.findMany({});
    console.log('Subscriptions found:', subs.length);
    console.log(JSON.stringify(subs, null, 2));
  } catch (err) {
    console.error('Error querying subscriptions:', err);
  }
}

main().finally(() => prisma.$disconnect());
