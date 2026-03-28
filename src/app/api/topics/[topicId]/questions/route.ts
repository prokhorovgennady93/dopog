import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;

  try {
    const questions = await (db.question as any).findMany({
      where: { topicId },
      include: {
        options: true,
        topic: true,
      },
    });

    const formattedQuestions = questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      topic: q.topic?.title || "Без темы",
      explanation: q.explanation,
      imageUrl: q.imageUrl,
      options: q.options.map((o: any) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    }));

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
