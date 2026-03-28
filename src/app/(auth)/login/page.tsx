"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Phone, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await (signIn as any)("credentials", {
        login,
        password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Неверный номер телефона или пароль");
        } else {
          setError(`Ошибка входа: ${result.error}`);
        }
      } else if (result?.url) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Login error object:", err);
      setError(`Системная ошибка: ${err.message || 'неизвестно'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative z-50">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative z-50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <span className="text-black font-bold text-2xl">ADR</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 italic">С возвращением</h1>
          <p className="text-zinc-400 text-sm font-bold">Введите номер телефона, чтобы продолжить подготовку</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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

          <div className="flex justify-end">
             <Link href="/reset-password" className="text-sm font-medium text-zinc-400 hover:text-yellow-500 transition-colors">
               Забыли пароль?
             </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all transform active:opacity-80 select-none touch-manipulation cursor-pointer"
          >
            Войти
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-500 text-sm">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors">
            Создать аккаунт
          </Link>
        </p>
      </div>
    </div>
  );
}
