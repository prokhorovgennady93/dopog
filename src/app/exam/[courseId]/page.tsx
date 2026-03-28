import { db } from "@/lib/db";
import { auth } from "@/../auth";
import { redirect, notFound } from "next/navigation";
import { ExamSimulation } from "@/components/ExamSimulation";

export default async function ExamPage({ params }: { params: { courseId: string } }) {
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
  const targetCount = isBasic ? 25 : 15;
  const timeLimitMinutes = isBasic ? 45 : 30;

  // BALANCED SELECTION LOGIC
  // 1. Collect all questions and group them by topic
  const allQuestionsByTopic = (course as any).themes.map((t: any) => t.questions).filter((q: any) => q.length > 0);
  const totalTopics = allQuestionsByTopic.length;
  
  if (totalTopics === 0) {
    notFound(); // or handle empty course
  }

  const selectedQuestions: any[] = [];
  const questionsPerTopic = Math.floor(targetCount / totalTopics);
  let remainder = targetCount % totalTopics;

  // 2. Pick equal amount from each topic
  allQuestionsByTopic.forEach((topicQuestions: any) => {
    const countToPick = questionsPerTopic + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    
    const shuffled = [...topicQuestions].sort(() => 0.5 - Math.random());
    selectedQuestions.push(...shuffled.slice(0, countToPick));
  });

  // 3. Final shuffle of the resulting exam set
  const examQuestions = selectedQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, targetCount)
    .map((q: any) => ({
      id: q.id,
      text: q.text,
      topic: q.theme?.title || "Без темы",
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
        courseTitle={course.title}
        questions={examQuestions}
        timeLimitMinutes={timeLimitMinutes}
      />
    </div>
  );
}
