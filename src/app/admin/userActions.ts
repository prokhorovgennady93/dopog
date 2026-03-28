"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/../auth";
import bcrypt from "bcryptjs";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.email) return false;
  
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true }
  });
  
  return user?.isAdmin ?? false;
}

export async function toggleFullAccess(userId: string, currentStatus: boolean) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");

  const newStatus = !currentStatus;
  const expiryDate = newStatus ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) : null;

  await db.user.update({
    where: { id: userId },
    data: { 
      hasFullAccess: newStatus,
      fullAccessExpiresAt: expiryDate
    }
  });

  revalidatePath("/admin");
}

export async function generateNewPassword(userId: string) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");
  
  // Generate random 8-char password
  const newPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });
  
  revalidatePath("/admin");
  return newPassword;
}

export async function toggleAdmin(userId: string, currentStatus: boolean) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");

  // Prevent removing your own admin status or check session
  const session = await auth();
  const targetUser = await db.user.findUnique({ where: { id: userId } });
  if (targetUser?.email === session?.user?.email) {
      throw new Error("You cannot remove your own admin status.");
  }

  await db.user.update({
    where: { id: userId },
    data: { isAdmin: !currentStatus }
  });

  revalidatePath("/admin");
}

export async function toggleOrganization(userId: string, currentStatus: boolean) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");

  await db.user.update({
    where: { id: userId },
    data: { isOrganization: !currentStatus }
  });

  revalidatePath("/admin");
}

export async function deleteUser(userId: string) {
  if (!(await checkAdmin())) throw new Error("Unauthorized");

  const session = await auth();
  const targetUser = await db.user.findUnique({ where: { id: userId } });
  if (targetUser?.email === session?.user?.email) {
      throw new Error("You cannot delete yourself.");
  }

  // Delete related data first (Prisma should handle it if defined, but SQLite might need explicit cleanup)
  await db.userProgress.deleteMany({ where: { userId } });
  await db.examAttempt.deleteMany({ where: { userId } });
  
  await db.user.delete({
    where: { id: userId }
  });

  revalidatePath("/admin");
}
