"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth-actions";
import { Phone, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const result = await registerUser(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/login?success=true");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <span className="text-black font-bold text-2xl">ADR</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Создать аккаунт</h1>
          <p className="text-zinc-400 text-sm">Присоединяйтесь к платформе подготовки ДОПОГ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl text-center font-bold tracking-tight animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Контактный телефон</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/10 focus:border-yellow-500/50 transition-all font-bold tracking-tight"
                placeholder="+7 (999) 999-99-99"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Пароль</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800/30 border border-zinc-800 rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/10 focus:border-yellow-500/50 transition-all font-bold tracking-tight"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-4 p-2">
            <input 
              type="checkbox" 
              id="legal-agree"
              required
              className="mt-1.5 h-4 w-4 rounded border-zinc-800 bg-zinc-800/30 text-yellow-500 focus:ring-yellow-500/20"
            />
            <label htmlFor="legal-agree" className="text-xs text-zinc-500 font-bold leading-tight">
              Даю согласие на <Link href="/data-policy" className="text-zinc-400 hover:text-yellow-500 underline">обработку персональных данных</Link> и принимаю <Link href="/terms" className="text-zinc-400 hover:text-yellow-500 underline">пользовательское соглашение</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'opacity-50 cursor-not-allowed bg-zinc-700 text-zinc-400' : 'bg-yellow-500 hover:bg-yellow-400 text-black active:scale-[0.98]'} font-bold py-4 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all transform select-none touch-manipulation`}
          >
            {loading ? "Создание..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-500 text-sm">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
