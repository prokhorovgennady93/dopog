const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const updatedCourse = await prisma.course.updateMany({
    where: {
      description: "Обязательный курс для всех водителей ДОПОГ. Охватывает основные положения, классификацию и маркировку."
    },
    data: {
      description: "Обязательный курс для всех водителей ДОПОГ. Охватывает основные положения ДОПОГ"
    }
  });

  console.log(`Updated ${updatedCourse.count} courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
