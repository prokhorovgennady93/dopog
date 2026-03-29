import { auth, signOut } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Building2, Receipt, Users, ShieldCheck, Download, ChevronRight, CheckCircle2, Copy } from "lucide-react";
import { db } from "@/lib/db";
import { OrganizationProfileForm } from "@/components/organizations/OrganizationProfileForm";
import { InvoiceGenerator } from "@/components/organizations/InvoiceGenerator";

export default async function B2BDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user and org profile
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      orgProfile: true,
      ownedCodes: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  const org = user.orgProfile || {};
  const isProfileComplete = org.inn && org.kpp && org.address && org.bankAccount;

  // Aggregate Promo Codes
  const totalCodes = user.ownedCodes.length;
  const usedCodes = user.ownedCodes.filter(c => c.usedCount > 0).length;
  const pendingCodes = totalCodes - usedCodes;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-4">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">B2B Portal</span>
                <span className="text-zinc-400 text-xs font-bold font-mono">ID: {user.id.substring(0, 8).toUpperCase()}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
               Корпоративный <span className="text-orange-600">кабинет</span> 💼
             </h1>
             <p className="text-zinc-500 font-bold text-lg">Управление лицензиями автошколы.</p>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/dashboard" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-black px-6 py-3 rounded-2xl transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
               Мое обучение
             </Link>
             <form action={async () => { "use server"; await signOut(); }}>
               <button className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-black px-6 py-3 rounded-2xl transition-all active:scale-95">
                 Выйти
               </button>
             </form>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
             <div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Создано Лицензий</h3>
                <p className="text-5xl font-black">{totalCodes}</p>
             </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
             <div>
                <div className="w-12 h-12 bg-zinc-500/10 rounded-2xl flex items-center justify-center text-zinc-500 mb-6">
                   <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Ждут активации</h3>
                <p className="text-5xl font-black text-zinc-400">{pendingCodes}</p>
             </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
             <div>
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                   <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Учеников учатся</h3>
                <p className="text-5xl font-black">{usedCodes}</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-8">
             <OrganizationProfileForm initialData={org} />
           </div>
           
           <div className="space-y-8">
             <div className={`transition-opacity ${!isProfileComplete ? 'opacity-50 pointer-events-none' : ''}`}>
               <InvoiceGenerator />
             </div>
             
             {!isProfileComplete && (
               <div className="bg-orange-500/10 border border-orange-500/20 text-orange-600 p-6 rounded-[24px] font-bold">
                 Для выставления счетов и покупки пакетов для автошкол необходимо полностью заполнить реквизиты профиля.
               </div>
             )}
           </div>
        </div>

        {totalCodes > 0 && (
          <section className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4">
               Ваши промокоды
               <span className="text-sm px-4 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-full font-black">{totalCodes}</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {user.ownedCodes.map((code) => (
                <div key={code.id} className={`p-6 rounded-[24px] border ${code.usedCount > 0 ? 'bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-60' : 'bg-white dark:bg-zinc-900 border-orange-500/30 shadow-sm relative overflow-hidden group'}`}>
                   {code.usedCount === 0 && (
                     <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                   )}
                   <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex justify-between">
                     ДОПОГ Базовый
                     {code.usedCount > 0 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                   </p>
                   <div className="font-mono text-xl font-bold tracking-wider mb-2 select-all">
                     {code.code}
                   </div>
                   <p className="text-xs text-zinc-500 font-bold">
                     Создан: {new Date(code.createdAt).toLocaleDateString("ru-RU")}
                   </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
