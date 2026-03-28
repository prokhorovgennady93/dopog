import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "grevelien@yandex.ru";
  const phone = "+7 (961) 300-26-46";
  const password = "3ghZ3Z32";
  const orgName = "ADR Академия";

  console.log(`--- Проверка и восстановление доступа для ${email} ---`);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Пытаемся найти пользователя
    const existingUser = await (prisma as any).user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existingUser) {
      console.log("Пользователь найден. Обновляем данные...");
      await (prisma as any).user.update({
        where: { id: existingUser.id },
        data: {
          email,
          phone,
          password: hashedPassword,
          isOrganization: true,
          orgName: orgName,
          hasFullAccess: true,
          isAdmin: true
        },
      });
      console.log("Данные успешно обновлены.");
    } else {
      console.log("Пользователь не найден. Создаем новый аккаунт...");
      await (prisma as any).user.create({
        data: {
          email,
          phone,
          password: hashedPassword,
          name: "Gennady",
          isOrganization: true,
          orgName: orgName,
          hasFullAccess: true,
          isAdmin: true
        },
      });
      console.log("Аккаунт успешно создан.");
    }

    console.log("\nТеперь вы точно сможете войти с паролем: " + password);
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
