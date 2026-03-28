"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
  phone: z.string().min(10, "Введите корректный номер телефона"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export async function registerUser(formData: FormData) {
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const validatedFields = RegisterSchema.safeParse({ phone, password });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  try {
    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: { phone }
    });

    if (existingUser) {
      return { error: "Пользователь с таким номером уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: `Пользователь ${phone}`,
        phone,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create account" };
  }
}
