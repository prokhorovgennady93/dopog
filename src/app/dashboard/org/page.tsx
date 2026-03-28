import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { 
  Building2, 
  Users, 
  Key, 
  TrendingUp, 
  PlusCircle, 
  CheckCircle2, 
  Clock,
  Briefcase,
  FileText
} from "lucide-react";
import Link from "next/link";
import { OrgDashboardActions } from "@/components/dashboard/OrgDashboardActions";

export default async function OrgDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch user and check organization status
  const user = await (db.user as any).findUnique({
    where: { id: session.user?.id },
    include: {
      ownedCodes: {
        include: {
          usedByUser: true
        }
      },
      orgProfile: true
    }
  });

  if (!user || !user.isOrganization) {
    redirect("/dashboard");
  }

  // Calculate Stats
  const totalCodes = user.ownedCodes.length;
  const activatedCodes = user.ownedCodes.filter((c: any) => c.usedByUserId).length;
  const remainingCodes = totalCodes - activatedCodes;
  const activationRate = totalCodes > 0 ? Math.round((activatedCodes / totalCodes) * 100) : 0;

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Панель организации</span>
                <span className="text-zinc-400 text-xs font-bold font-mono">ID: {user.id.substring(0, 8).toUpperCase()}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none italic">
               {user.orgName || "Ваша автошкола"}
             </h1>
             <p className="text-zinc-500 font-bold text-lg">Управление лицензиями и контроль успеваемости.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <Link 
               href="/dashboard/org/profile" 
               className="bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-black px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/30 transition-all flex items-center gap-2"
             >
               <Building2 className="w-4 h-4" /> Данные организации
             </Link>
             <button className="bg-orange-600 text-white font-black px-6 py-3 rounded-2xl transition-all shadow-xl shadow-orange-950/20 active:scale-95 flex items-center gap-2">
               <PlusCircle className="w-4 h-4" /> Заказать лицензии
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-orange-600">
              <Key className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Всего лицензий</p>
            <h3 className="text-4xl font-black">{totalCodes}</h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: `${activationRate}%` }} />
              </div>
              <span className="text-[10px] font-black">{activationRate}%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-green-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Активировано</p>
            <h3 className="text-4xl font-black text-green-600">{activatedCodes}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">Студентов в системе</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-orange-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Clock className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Остаток</p>
            <h3 className="text-4xl font-black text-orange-600">{remainingCodes}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">Доступно к выдаче</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group border-b-4 border-b-zinc-900 dark:border-b-white">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-12 h-12" />
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Ср. успеваемость</p>
            <h3 className="text-4xl font-black">{activatedCodes > 0 ? "85%" : "—"}</h3>
            <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-tight">По всем студентам</p>
          </div>
        </div>

        <OrgDashboardActions user={user} orgProfile={user.orgProfile} />

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black flex items-center gap-2">
                 <Key className="w-5 h-5 text-orange-600" /> Активные лицензии
              </h2>
              <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                             <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Код</th>
                             <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Статус</th>
                             <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Студент</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {user.ownedCodes.length === 0 ? (
                            <tr>
                               <td colSpan={3} className="px-6 py-12 text-center text-zinc-400 font-bold text-sm">Нет активных лицензий</td>
                            </tr>
                          ) : (
                            user.ownedCodes.map((code: any) => (
                               <tr key={code.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                  <td className="px-6 py-4">
                                     <span className="font-mono font-bold text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                        {code.code}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4">
                                     {code.usedByUserId ? (
                                        <span className="text-green-500 text-[10px] font-black uppercase tracking-tight">Использован</span>
                                     ) : (
                                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-tight">Свободен</span>
                                     )}
                                  </td>
                                  <td className="px-6 py-4 font-bold text-sm">
                                     {code.usedByUser?.name || "—"}
                                  </td>
                               </tr>
                            ))
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <h2 className="text-xl font-black flex items-center gap-2">
                 <Users className="w-5 h-5 text-orange-600" /> Студенты
              </h2>
              <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                 <div className="space-y-4">
                    {/* Mocked activity */}
                    <div className="flex items-center justify-between group">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold">Иван Петров</span>
                          <span className="text-[10px] text-zinc-400 font-medium">Курс: Базовый</span>
                       </div>
                       <span className="text-sm font-black text-orange-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between group border-t border-zinc-100 dark:border-zinc-800 pt-4">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold">Алексей Соколов</span>
                          <span className="text-[10px] text-zinc-400 font-medium">Курс: Цистерны</span>
                       </div>
                       <span className="text-sm font-black text-orange-600">45%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
