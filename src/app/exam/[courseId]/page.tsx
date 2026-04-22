import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import { ExamSimulation } from "@/components/ExamSimulation";

export default async function ExamPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      themes: {
        include: {
          questions: {
            include: { options: true }
          }
        }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Determine question count and time limit (official rules)
  const isBasic = course.slug === "basic";
  const targetCount = 25; // Always 25 as per user request
  const timeLimitMinutes = 45; // Always 45 minutes as per user request

  // BALANCED SELECTION LOGIC
  // 1. Group questions by topic and shuffle each topic pool
  const topicPools = course.themes
    .filter((t: any) => t.questions.length > 0)
    .map((t: any) => ({
      title: t.title,
      questions: [...t.questions].sort(() => 0.5 - Math.random())
    }));
  
  if (topicPools.length === 0) {
    notFound(); 
  }

  const selectedQuestions: any[] = [];
  
  // 2. Pick questions using round-robin to ensure equal representation
  let poolIdx = 0;
  while (selectedQuestions.length < targetCount) {
    const currentPool = topicPools[poolIdx];
    
    if (currentPool.questions.length > 0) {
      const q = currentPool.questions.pop();
      // Attach topic title correctly for the UI
      (q as any).topicTitle = currentPool.title;
      selectedQuestions.push(q);
    }
    
    poolIdx = (poolIdx + 1) % topicPools.length;

    // Safety break if we've exhausted all available questions in the course
    if (topicPools.every(p => p.questions.length === 0)) break;
  }

  // 3. Final shuffle of the resulting exam set
  const examQuestions = selectedQuestions
    .sort(() => 0.5 - Math.random())
    .map((q: any) => ({
      id: q.id,
      text: q.text,
      topic: q.topicTitle || "Без темы",
      imageUrl: q.imageUrl,
      options: q.options.map((o: any) => ({
        id: o.id,
        text: o.text
      }))
    }));

  return (
    <div className="flex-1 flex flex-col">
      <ExamSimulation 
        courseId={course.id}
        courseSlug={course.slug}
        courseTitle={course.title}
        questions={examQuestions}
        timeLimitMinutes={timeLimitMinutes}
      />
    </div>
  );
}
