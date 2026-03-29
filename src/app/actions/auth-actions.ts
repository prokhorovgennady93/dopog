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
  console.log("--- RegisterUser Start ---");
  const rawPhone = (formData.get("phone") || "") as string;
  const password = (formData.get("password") || "") as string;
  const rawConsent = formData.get("consent");
  const consent = rawConsent === "true" || rawConsent === true;

  const phone = rawPhone.replace(/\D/g, ""); // Remove all non-digits
  
  console.log(`Input: rawPhone="${rawPhone}", normalized="${phone}", consent=${consent}`);

  const validatedFields = RegisterSchema.safeParse({ phone, password, consent });

  if (!validatedFields.success) {
    const errorMsg = validatedFields.error.issues[0].message;
    console.log(`Validation Failed: ${errorMsg}`);
    return { error: errorMsg };
  }

  console.log("Validation Success. Checking for existing user...");

  try {
    const existingUser = await db.user.findUnique({
      where: { phone }
    });

    if (existingUser) {
      return { error: "Пользователь с таким номером уже существует" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        phone,
        password: hashedPassword,
      },
    });

    console.log(`User created successfully: ID=${user.id}`);

    return { 
      success: true, 
      id: user.id 
    };
  } catch (err: any) {
    console.error("CRITICAL ERROR during registration:", err);
    if (err?.code === "P2002") {
      return { error: "Этот номер телефона уже зарегистрирован" };
    }
    return { error: `Ошибка при регистрации: ${err.message || "Неизвестная ошибка"}` };
  } finally {
    console.log("--- RegisterUser End ---");
  }
}

export async function redeemPromoCode(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Пожалуйста, войдите в систему" };
  }

  const code = formData.get("code")?.toString().trim();
  if (!code) {
    return { error: "Введите промокод" };
  }

  try {
    const promo = await (db as any).promoCode.findUnique({
      where: { code }
    });

    if (!promo) {
      return { error: "Промокод не найден" };
    }

    if (promo.usedCount >= promo.maxUses) {
      return { error: "Этот промокод уже был использован" };
    }

    // Mark user as premium and link promo to user
    await db.$transaction([
      (db as any).user.update({
        where: { id: session.user.id },
        data: { hasFullAccess: true, isPremium: true }
      }),
      (db as any).promoCode.update({
        where: { id: promo.id },
        data: {
          usedCount: { increment: 1 },
          usedByUserId: session.user.id
        }
      })
    ]);

    return { success: true };
  } catch (error) {
    console.error("Promo code error:", error);
    return { error: "Сбой при активации промокода" };
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
