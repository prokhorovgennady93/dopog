"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function updateQuestion(id: string, data: {
  text?: string;
  explanation?: string;
  imageUrl?: string;
}) {
  const updated = await db.question.update({
    where: { id },
    data
  });
  revalidatePath("/admin");
  revalidatePath("/study");
  revalidatePath("/exam");
  return updated;
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "questions");
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, buffer);

  return `/images/questions/${filename}`;
}
