import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const courses = await db.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      icon: true,
      _count: { select: { questions: true } },
    },
    orderBy: { title: "asc" },
  });

  return NextResponse.json(courses);
}
