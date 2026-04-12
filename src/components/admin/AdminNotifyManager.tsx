"use client";

import { PushManager } from "../PushManager";
import { useSession } from "next-auth/react";

export function AdminNotifyManager() {
  const { data: session } = useSession();

  const sendTestPush = async () => {
    try {
      const res = await fetch("/api/admin/push-test", { method: "POST" });
      if (!res.ok) throw new Error("Push test failed");
    } catch (err) {
      console.error("Test push error:", err);
    }
  };

  if (!session?.user?.isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[99999] hidden sm:flex flex-col gap-2">
       <PushManager />
       <button 
         onClick={sendTestPush}
         className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-2 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800"
       >
         Отправить тестовый Push
       </button>
    </div>
  );
}
