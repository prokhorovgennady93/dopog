"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import {
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Zap,
  BookOpen,
  Package
} from "lucide-react";
import { useSession } from "next-auth/react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const paymentId = searchParams.get("paymentId");
  const amount = searchParams.get("amount") || "199";
  const type = searchParams.get("type") || "full_access";
  const courseId = searchParams.get("courseId");
  const orderId = searchParams.get("orderId");
  const returnUrl = searchParams.get("returnUrl");

  const isFullAccess = type === "full_access";
  const isKitOrder = type === "kit_order";

  const handleSimulatePayment = async () => {
    if (!session?.user?.id) {
      console.warn("[Checkout] No session user found!");
      return;
    }

    console.log("[Checkout] Starting simulation for:", { type, courseId, paymentId });
    setIsProcessing(true);
    try {
      const response = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentId || `sim_${Date.now()}`,
          userId: session.user.id,
          status: "succeeded",
          type: type || "full_access", // Ensure type is passed
          courseId: courseId, // Ensure courseId is passed
          orderId: orderId,
        }),
      });

      if (response.ok) {
        console.log("[Checkout] Simulation webhook success! Refreshing session...");
        setIsSuccess(true);
        await update(); // refresh session to get new access

        setTimeout(() => {
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push("/dashboard?payment=success");
          }
        }, 1500);
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("[Checkout] Webhook failed:", errData);
      }
    } catch (error) {
      console.error("Payment simulation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500 opacity-5 rotate-12 -translate-y-12" />
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <CreditCard className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-white text-xl font-bold">Демо-оплата</h1>
          <p className="text-zinc-400 text-sm mt-1 tracking-tight">
            Это тестовая симуляция платежного шлюза
          </p>
        </div>

        <div className="p-8">
          {/* Product Info */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 mb-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center">
                {isFullAccess ? (
                  <Zap className="w-5 h-5 text-yellow-600" />
                ) : isKitOrder ? (
                  <Package className="w-5 h-5 text-orange-600" />
                ) : (
                  <BookOpen className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">
                  Продукт
                </span>
                <span className="text-sm font-bold">
                  {isFullAccess
                    ? "Полный доступ ко всем курсам"
                    : isKitOrder
                    ? "Комплект документов ДОПОГ"
                    : "Доступ к одному курсу"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold font-mono">
                ID
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-widest">
                  Номер заказа
                </span>
                <span className="text-xs font-mono font-bold truncate block">
                  {paymentId}
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center mb-6 px-1">
            <span className="text-zinc-500 font-medium">К оплате</span>
            <span className="text-3xl font-black">{amount} ₽</span>
          </div>

          {/* Duration */}
          <div className="text-center text-xs text-zinc-400 font-medium mb-6">
            Доступ предоставляется на <span className="font-bold text-zinc-600 dark:text-zinc-300">3 месяца</span>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Оплата прошла!</h2>
              <p className="text-sm text-zinc-500">
                {isFullAccess 
                  ? "Полный доступ активирован." 
                  : isKitOrder 
                  ? "Заказ оплачен и принят в работу." 
                  : "Курс активирован."} Перенаправляем...
              </p>
            </div>
          ) : (
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Обработка...
                </>
              ) : (
                "Симулировать оплату"
              )}
            </button>
          )}

          <button
            onClick={() => router.back()}
            className="w-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold py-4 text-sm mt-2 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Отмена
          </button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-zinc-400" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Безопасная транзакция
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
