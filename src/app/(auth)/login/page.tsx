"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Smartphone, Lock, ChevronRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный номер телефона или пароль");
        setLoading(false);
      } else {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Произошла непредвиденная ошибка");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 font-sans selection:bg-yellow-500/30">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 blur-[120px] rounded-full -z-10" />
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> На главную
        </Link>

        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/20 -rotate-3 transition-transform hover:rotate-0 duration-500">
              <span className="text-black font-black text-2xl tracking-tighter">ADR</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">С возвращением</h1>
            <p className="text-zinc-500 text-sm font-medium">Введите данные для входа</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-2xl text-center font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, '');
                    if (!val) { setPhone(''); return; }
                    let formatted = '+7';
                    if (val.length > 1) formatted += ` (${val.substring(1, 4)}`;
                    if (val.length >= 5) formatted += `) ${val.substring(4, 7)}`;
                    if (val.length >= 8) formatted += `-${val.substring(7, 9)}`;
                    if (val.length >= 10) formatted += `-${val.substring(9, 11)}`;
                    setPhone(formatted);
                  }}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all font-bold tracking-wide"
                  placeholder="+7 (999) 000-00-00"
                  maxLength={18}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all font-bold"
                  placeholder="Ваш пароль"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full group/btn h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                loading 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700/50' 
                  : 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20 hover:bg-yellow-400'
              }`}
            >
              {loading ? "Вход..." : (
                <>
                  Продолжить обучение <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 text-center flex flex-col gap-4">
            <Link href="/reset-password" title="Восстановление в разработке" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors">
              Забыли пароль?
            </Link>
            <p className="text-zinc-500 text-xs font-bold">
              Нет аккаунта?{" "}
              <Link href="/register" className="text-white hover:text-yellow-500 transition-colors ml-1 underline decoration-zinc-700 underline-offset-4 font-black">
                Создать профиль
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
