import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl w-fit">
          <ArrowLeft className="w-4 h-4" /> В Личный кабинет
        </Link>
        
        <div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Ваши данные</h1>
          <p className="text-zinc-500 font-bold text-base md:text-lg">Управление общим профилем и контактной информацией.</p>
        </div>

        {!user.email && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex items-start gap-4">
             <ShieldCheck className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
             <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">Рекомендуем добавить Email</h4>
                <p className="text-sm font-medium text-yellow-700/80 dark:text-yellow-500/80 leading-relaxed">
                   В случае утери доступа к вашему устройству или номеру телефона, email будет единственным способом связи со службой поддержки и восстановления прогресса.
                </p>
             </div>
          </div>
        )}

        <ProfileForm initialName={user.name || ""} initialEmail={user.email || ""} />
        
      </div>
    </div>
  );
}
