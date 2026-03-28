"use client";

import { useState, useEffect } from "react";
import { PremiumModal } from "@/components/PremiumModal";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <PremiumModal isOpen={isOpen} onClose={handleClose} />
      
      {/* Background content to make it look like it's over the app */}
      <div className="max-w-4xl w-full p-8 opacity-20 pointer-events-none">
        <div className="h-8 w-48 bg-zinc-800 rounded mb-8" />
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="h-32 bg-zinc-900 rounded-xl" />
          <div className="h-32 bg-zinc-900 rounded-xl" />
          <div className="h-32 bg-zinc-900 rounded-xl" />
        </div>
        <div className="h-64 bg-zinc-900 rounded-2xl" />
      </div>
    </div>
  );
}
