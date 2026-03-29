"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/../auth";

const RegisterSchema = z.object({
  phone: z.string().min(10, "Введите корректный номер телефона"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export async function registerUser(formData: FormData) {
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const consent = formData.get("consent") === "true";

  const validatedFields = RegisterSchema.safeParse({ phone, password, consent });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { phone }
    });

    if (existingUser) {
      return { error: "Пользователь с таким номером уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        phone,
        password: hashedPassword,
      },
    } as any);

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Ошибка при создании аккаунта" };
  }
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Не авторизован" };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    // Validate email if provided
    if (email) {
      const emailSchema = z.string().email("Неверный формат почты");
      const validated = emailSchema.safeParse(email);
      if (!validated.success) return { error: validated.error.issues[0].message };

      // Check if email already exists
      const existing = await db.user.findFirst({
        where: { email, NOT: { id: session.user.id } }
      });
      if (existing) return { error: "Этот email уже используется" };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { 
        name: name || undefined, 
        email: email || undefined 
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Не удалось обновить профиль" };
  }
}
