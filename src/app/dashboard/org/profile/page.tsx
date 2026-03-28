"use client";

import { useState } from "react";
import { updateOrgProfile } from "@/app/actions/org-actions";
import { Building2, Landmark, MapPin, Phone, Mail, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrgProfilePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await updateOrgProfile(formData);

    if (result.success) {
      setMessage("Профиль успешно обновлен!");
      setTimeout(() => router.push("/dashboard/org"), 1500);
    } else {
      setMessage("Ошибка при обновлении профиля");
    }
    setLoading(false);
  }

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <Link href="/dashboard/org" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-colors font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Назад в панель
        </Link>

        <div>
           <h1 className="text-4xl font-black tracking-tighter mb-2 italic">Карточка организации</h1>
           <p className="text-zinc-500 font-bold">Заполните реквизиты для автоматической генерации счетов и КП.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-2xl text-center font-black text-sm ${message.includes("успешно") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-8">
            
            {/* Basic Info */}
            <div className="space-y-4">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                 <Building2 className="w-3 h-3" /> Основные реквизиты
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">ИНН</label>
                     <input name="inn" placeholder="1234567890" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">КПП (если есть)</label>
                     <input name="kpp" placeholder="123456789" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Наименование организации</label>
                     <input name="orgName" placeholder="ООО 'Автошкола Профи'" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
               </div>
            </div>

            {/* Bank Info */}
            <div className="space-y-4">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                 <Landmark className="w-3 h-3" /> Банковские реквизиты
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Название банка</label>
                     <input name="bankName" placeholder="АО 'Тинькофф Банк'" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Расчетный счет</label>
                     <input name="bankAccount" placeholder="408..." className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">БИК</label>
                     <input name="bik" placeholder="044..." className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
               </div>
            </div>

            {/* Contacts */}
            <div className="space-y-4">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                 <MapPin className="w-3 h-3" /> Контактные данные
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Юридический адрес</label>
                     <input name="address" placeholder="123456, г. Москва, ул. Примерная, д. 1" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Телефон для связи</label>
                     <input name="phone" placeholder="+7 (___) ___-__-__" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Email для документов</label>
                     <input name="email" placeholder="docs@partner.ru" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 font-bold text-sm focus:ring-2 focus:ring-orange-600/20 outline-none" />
                  </div>
               </div>
            </div>

          </div>

          <div className="flex justify-end">
             <button 
               type="submit" 
               disabled={loading}
               className="bg-orange-600 text-white font-black px-12 py-5 rounded-2xl shadow-2xl shadow-orange-950/40 hover:bg-orange-500 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
             >
               <Save className="w-5 h-5" /> {loading ? "Сохранение..." : "Сохранить профиль"}
             </button>
          </div>
        </form>

      </div>
    </div>
  );
}
