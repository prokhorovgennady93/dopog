"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function OrderPaymentButton({ orderId, hasAddress }: { orderId: string, hasAddress: boolean }) {
  const [loading, setLoading] = useState(false);
  const [showStub, setShowStub] = useState(false);
  const router = useRouter();

  const handlePay = async () => {
    if (!hasAddress) return;
    setLoading(true);
    setShowStub(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kit_order",
          orderId,
          returnUrl: "/dashboard?payment_success=true"
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setShowStub(false);
      }
    } catch (e) {
      console.error("Order payment error:", e);
      setShowStub(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        type="button"
        onClick={handlePay}
        disabled={loading || !hasAddress}
        className={`flex-1 font-black py-2.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 ${
          hasAddress 
          ? "bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/20" 
          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none"
        }`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            {hasAddress ? "Оплатить" : "Ожидайте звонка"}
          </>
        )}
      </button>

      {showStub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
            <h3 className="text-xl font-black mb-2">Тестовая оплата</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bold">
              Пожалуйста, подождите. Мы перенаправляем вас на демонстрационную страницу оплаты...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
