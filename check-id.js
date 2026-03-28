const { PrismaClient } = require('@prisma/client');
const { PrismaNodeSQLite } = require('prisma-adapter-node-sqlite');
const fs = require('fs');
const path = require('path');

const adapter = new PrismaNodeSQLite({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const id = 'cmn8zx3tz01u730i5tjcyg849';
  const question = await prisma.question.findUnique({
    where: { id },
    select: {
      id: true,
      text: true,
      imageUrl: true,
      course: { select: { title: true } },
      topic: { select: { title: true } }
    }
  });

  if (!question) {
    console.log(`Question with ID ${id} not found in dev.db.`);
  } else {
    console.log(`Question Found:`);
    console.log(`- Text: ${question.text.substring(0, 100)}...`);
    console.log(`- Course: ${question.course.title}`);
    console.log(`- Topic: ${question.topic.title}`);
    console.log(`- Image URL: ${question.imageUrl}`);
    
    if (question.imageUrl) {
      const relativePath = question.imageUrl.startsWith('/') ? question.imageUrl.substring(1) : question.imageUrl;
      const fullPath = path.join(process.cwd(), 'public', relativePath);
      if (fs.existsSync(fullPath)) {
        console.log(`- File on disk: EXISTS (${fullPath})`);
      } else {
        console.log(`- File on disk: MISSING (${fullPath})`);
      }
    } else {
        console.log(`- No image URL assigned to this question.`);
    }
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
