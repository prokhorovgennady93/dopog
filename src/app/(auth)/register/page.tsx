"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth-actions";
import { ShieldCheck, Lock, Smartphone, ChevronRight } from "lucide-react";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Необходимо принять условия соглашения");
      return;
    }
    setError("");
    setLoading(true);
    
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("consent", "true");

    try {
      const result = await registerUser(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push("/login?success=true");
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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/20 rotate-3 transition-transform hover:rotate-0 duration-500">
              <span className="text-black font-black text-2xl tracking-tighter">ADR</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Вход в систему</h1>
            <p className="text-zinc-500 text-sm font-medium">Для начала обучения введите номер</p>
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
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-800/30 border border-zinc-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all font-bold tracking-wide"
                  placeholder="+7 (999) 000-00-00"
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
                  placeholder="Придумайте пароль"
                  required
                />
              </div>
            </div>

            {/* Legal Consent */}
            <div className="p-4 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 group/consent">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-zinc-700 rounded-md bg-zinc-900 transition-all peer-checked:bg-yellow-500 peer-checked:border-yellow-500 flex items-center justify-center">
                    <ShieldCheck className={`w-3.5 h-3.5 text-black transition-opacity ${consent ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
                <span className="text-[11px] leading-relaxed text-zinc-500 group-hover/consent:text-zinc-400 transition-colors font-medium">
                  Я согласен на <Link href="/privacy" className="text-yellow-500/80 hover:text-yellow-500 underline decoration-yellow-500/30 underline-offset-4">обработку персональных данных</Link> и принимаю <Link href="/terms" className="text-yellow-500/80 hover:text-yellow-500 underline decoration-yellow-500/30 underline-offset-4">пользовательское соглашение</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !consent}
              className={`w-full group/btn h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                loading || !consent 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700/50' 
                  : 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20 hover:bg-yellow-400'
              }`}
            >
              {loading ? "Создание..." : (
                <>
                  Начать обучение <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-zinc-500 text-xs font-bold">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-white hover:text-yellow-500 transition-colors ml-1 underline decoration-zinc-700 underline-offset-4">
                Войти
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
