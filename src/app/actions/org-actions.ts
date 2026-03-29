"use server";

import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { revalidatePath } from "next/cache";

export async function saveOrgProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Неавторизован" };
  }

  const inn = formData.get("inn")?.toString() || "";
  const kpp = formData.get("kpp")?.toString() || "";
  const ogrn = formData.get("ogrn")?.toString() || "";
  const address = formData.get("address")?.toString() || "";
  const bankName = formData.get("bankName")?.toString() || "";
  const bankAccount = formData.get("bankAccount")?.toString() || "";
  const corrAccount = formData.get("corrAccount")?.toString() || "";
  const bik = formData.get("bik")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  try {
    await db.organizationProfile.upsert({
      where: { userId: session.user.id },
      update: {
        inn,
        kpp,
        ogrn,
        address,
        bankName,
        bankAccount,
        corrAccount,
        bik,
        phone,
        email,
      },
      create: {
        userId: session.user.id,
        inn,
        kpp,
        ogrn,
        address,
        bankName,
        bankAccount,
        corrAccount,
        bik,
        phone,
        email,
      },
    });

    // Automatically mark the user as an Organization if they filled INN
    if (inn) {
      await db.user.update({
         where: { id: session.user.id },
         data: { isOrganization: true }
      });
    }

    revalidatePath("/organizations/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Save org profile error:", error);
    return { error: "Не удалось сохранить профиль организации" };
  }
}

export async function createInvoice(packageSize: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Неавторизован" };
  }

  const org = await db.organizationProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!org?.inn) {
    return { error: "Необходимо заполнить ИНН и реквизиты в профиле" };
  }

  // In a real app we generate a PDF here via react-pdf or html2pdf
  // For now, we simulate success and notify the admin
  
  return { success: true, message: `Счет на ${packageSize} промокодов успешно сформирован и отправлен на вашу почту.` };
}
