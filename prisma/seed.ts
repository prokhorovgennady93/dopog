import { PrismaClient } from "@prisma/client";
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new PrismaNodeSQLite({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const DATA_FILE = path.join(__dirname, "../data/dopog_data.json");

async function main() {
  console.log("Seeding started from scraped data...");

  if (!fs.existsSync(DATA_FILE)) {
    console.error("Data file not found! Please run the scraper first.");
    process.exit(1);
  }

  const allCourses = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // 1. Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.course.deleteMany();

  // 2. Create a Test User
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Алексей Иванов",
      password: hashedPassword,
      hasFullAccess: true,
    },
  });

  // 3. Create / update Admin user
  const adminHash = await bcrypt.hash("3ghZ3Z32", 10);
  await prisma.user.upsert({
    where: { email: "grevelien@yandex.ru" },
    update: { isAdmin: true, hasFullAccess: true },
    create: {
      email: "grevelien@yandex.ru",
      name: "Администратор",
      password: adminHash,
      hasFullAccess: true,
      isAdmin: true,
    },
  });

  // 3. Process each course
  const courseConfigs: Record<string, { slug: string, description: string, icon: string }> = {
    "1": {
      slug: "basic",
      description: "Обязательный курс для всех водителей ДОПОГ. Охватывает основные положения, классификацию и маркировку.",
      icon: "🚚",
    },
    "2": {
      slug: "tanks",
      description: "Специализированный курс для водителей автоцистерн и контейнеров-цистерн.",
      icon: "🧪",
    },
    "4": {
      slug: "class1",
      description: "Специализированный курс по перевозке веществ и изделий класса 1.",
      icon: "💣",
    },
    "8": {
      slug: "class7",
      description: "Специализированный курс по перевозке радиоактивных материалов класса 7.",
      icon: "☢️",
    }
  };

  for (const courseData of allCourses) {
    const config = courseConfigs[courseData.id];
    if (!config) continue;

    console.log(`Seeding course: ${courseData.title} ...`);
    
    const course = await prisma.course.create({
      data: {
        slug: config.slug,
        title: courseData.title,
        description: config.description,
        icon: config.icon,
      },
    });

    let totalQ = 0;

    for (const theme of courseData.themes) {
      const topic = await prisma.topic.create({
        data: {
          title: theme.title,
          courseId: course.id,
        }
      });

      for (const q of theme.questions) {
        await prisma.question.create({
          data: {
            text: q.text,
            topicId: topic.id,
            explanation: q.explanation || null,
            imageUrl: q.imageUrl || null,
            courseId: course.id,
            options: {
              create: q.options.map((o: any) => ({
                text: o.text || 'Вариант',
                isCorrect: o.id === q.correctOption
              })),
            },
          },
        });
        totalQ++;
      }
      console.log(`  > Seeded topic: ${theme.title} (${theme.questions.length} questions)`);
    }
    
    console.log(` > TOTAL: Seeded ${totalQ} questions for ${courseData.title}`);
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
