"use client";

import { useState } from "react";
import { FileText, Briefcase, CheckCircle2, Users } from "lucide-react";
import { InvoiceGenerator } from "@/components/dashboard/InvoiceGenerator";
import { requestCP } from "@/app/actions/org-actions";

interface OrgDashboardActionsProps {
  user: any;
  orgProfile: any;
}

export function OrgDashboardActions({ user, orgProfile }: OrgDashboardActionsProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestCP = async () => {
    setLoading(true);
    const result = await requestCP();
    if (result.success) {
      setMessage(result.message || "Заявка на КП отправлена!");
      setTimeout(() => setMessage(""), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 rounded-[40px] p-8 sm:p-12 relative overflow-hidden text-white shadow-2xl shadow-orange-950/20">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tighter mb-4 leading-none italic">
            Инструменты для <br /> В2В партнеров
          </h2>
          <p className="text-zinc-400 font-bold mb-8 max-w-sm">
            Выполняйте заявки, формируйте счета и контролируйте обучение на профессиональном уровне.
          </p>
          
          {message && (
            <div className="mb-4 bg-orange-600/20 border border-orange-600/50 text-orange-500 p-3 rounded-xl font-bold text-sm">
              {message}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsInvoiceOpen(true)}
              className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center gap-2 group"
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" /> Сформировать счет
            </button>
            <button 
              onClick={handleRequestCP}
              disabled={loading}
              className="bg-zinc-800 text-white font-black px-8 py-4 rounded-2xl border border-zinc-700 hover:border-orange-600 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              <Briefcase className="w-5 h-5 text-orange-600" /> {loading ? "Отправка..." : "Запросить КП"}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm group hover:border-orange-600/30 transition-all">
            <CheckCircle2 className="w-6 h-6 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black">Автоматическая <br /> отчетность</span>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm group hover:border-orange-600/30 transition-all">
            <Users className="w-6 h-6 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black">Доступ <br /> нескольким кураторам</span>
          </div>
        </div>
      </div>

      <InvoiceGenerator 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        orgProfile={orgProfile}
      />
    </div>
  );
}
