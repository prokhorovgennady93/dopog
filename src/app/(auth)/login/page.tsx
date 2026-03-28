"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await signIn("credentials", {
        login,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный логин или пароль");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Произошла непредвиденная ошибка");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative z-50">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative z-50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <span className="text-black font-bold text-2xl">ADR</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">С возвращением</h1>
          <p className="text-zinc-400 text-sm">Войдите, чтобы продолжить подготовку ДОПОГ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Email или Номер телефона</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all shadow-inner"
              placeholder="+7 (999) 000-00-00 или name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all"
              placeholder="••••••••"
              required
            />
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
