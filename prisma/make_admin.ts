import { PrismaClient } from "@prisma/client";
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite";

const adapter = new PrismaNodeSQLite({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const args = process.argv.slice(2);
  const phoneIdx = args.indexOf('--phone');
  const emailIdx = args.indexOf('--email');
  
  let userIdentifier = "";
  let field = "";

  if (phoneIdx !== -1 && args[phoneIdx + 1]) {
    userIdentifier = args[phoneIdx + 1];
    field = "phone";
  } else if (emailIdx !== -1 && args[emailIdx + 1]) {
    userIdentifier = args[emailIdx + 1];
    field = "email";
  } else {
    console.log("Использование: npx tsx prisma/make_admin.ts --phone 79991234455 ИЛИ --email user@test.ru");
    return;
  }

  console.log(`--- Назначение прав АДМИНИСТРАТОРА для ${userIdentifier} ---`);

  try {
    const user = await (prisma as any).user.findUnique({
      where: { [field]: userIdentifier },
    });

    if (!user) {
      console.error(`Ошибка: Пользователь ${userIdentifier} не найден.`);
      return;
    }

    await (prisma as any).user.update({
      where: { [field]: userIdentifier },
      data: {
        isAdmin: true,
        hasFullAccess: true
      },
    });

    console.log(`Успех: Пользователь ${userIdentifier} теперь АДМИНИСТРАТОР.`);
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
