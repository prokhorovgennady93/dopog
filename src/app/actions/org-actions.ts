"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateOrgProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const inn = formData.get("inn") as string;
  const kpp = formData.get("kpp") as string;
  const ogrn = formData.get("ogrn") as string;
  const address = formData.get("address") as string;
  const bankName = formData.get("bankName") as string;
  const bankAccount = formData.get("bankAccount") as string;
  const corrAccount = formData.get("corrAccount") as string;
  const bik = formData.get("bik") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

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

    revalidatePath("/dashboard/org");
    return { success: true };
  } catch (error) {
    console.error("Org profile update error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function requestCP() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  // Mocking email notification to admin
  console.log(`[ALERT] New CP Request from Organization User: ${session.user.id} (${session.user.email || 'No email'})`);
  
  // In a real app, use Resend/Nodemailer here
  // await sendEmail({ to: "grevelien@yandex.ru", subject: "New CP Request", ... });

  return { success: true, message: "Заявка на КП отправлена. Мы свяжемся с вами в ближайшее время." };
}
