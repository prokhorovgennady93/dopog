"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Неверный формат email").optional().or(z.literal('')),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string) || "";
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const validatedFields = RegisterSchema.safeParse({ name, email, phone, password });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  try {
    // Check if user already exists
    const queryConds: any[] = [{ phone }];
    if (email) queryConds.push({ email });

    const existingUser = await db.user.findFirst({
      where: {
        OR: queryConds
      }
    });

    if (existingUser) {
      if (existingUser.phone === phone) return { error: "Пользователь с таким номером уже существует" };
      if (existingUser.email === email) return { error: "Пользователь с таким email уже существует" };
      return { error: "Пользователь уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email: email || null,
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
