"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowRight, 
  Loader2, 
  Check, 
  X, 
  FileBadge, 
  Zap, 
  Shield, 
  Package, 
  Truck, 
  ChevronDown,
  ChevronRight,
  Award
} from "lucide-react";
import { useSession } from "next-auth/react";

export function DocumentKitSection() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(["base"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const kitPrices: Record<string, number> = {
    "base": 5000,
    "tanks": 1500,
    "class1": 1500,
    "class7": 1500
  };

  const courseNames: Record<string, string> = {
    "base": "Базовый курс",
    "tanks": "Цистерны",
    "class1": "Класс 1",
    "class7": "Класс 7"
  };

  const getCourseImage = (id: string) => {
    const slugMap: Record<string, string> = {
      "base": "basic",
      "tanks": "tanks",
      "class1": "class1",
      "class7": "class7"
    };
    return `/images/courses/course-${slugMap[id]}.png`;
  };

  const totalPrice = selectedCourses.reduce((sum, id) => sum + (kitPrices[id] || 0), 0);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "order") {
      const course = params.get("course");
      if (course && courseNames[course]) {
        setSelectedCourses([course]);
      }
      if (session) setIsOrderModalOpen(true);
    }
  }, [session]);

  const handleOrderClick = () => {
    if (!session) {
      const callbackUrl = window.location.pathname + "?action=order&course=" + selectedCourses[0];
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    setIsOrderModalOpen(true);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || selectedCourses.length === 0) return;
    setIsSubmittingOrder(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userName, 
          courseIds: JSON.stringify(selectedCourses) 
        }),
      });

      if (res.ok) {
        setIsOrderModalOpen(false);
        router.push("/dashboard?ordered=true");
      } else {
        const data = await res.json();
        alert(`Ошибка при отправке: ${data.details || "Сервер временно недоступен"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Произошла ошибка связи с сервером. Проверьте интернет и попробуйте снова.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
      <section id="documents-kit" className="mt-12 scroll-mt-24 group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <FileBadge className="w-3 h-3" /> Официальные документы
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Комплект документов <br className="hidden sm:block" /> на экзамен по ДОПОГ
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <DocumentFeatureItem icon={<Zap className="w-5 h-5" strokeWidth={3} />} text="Оффлайн доступ" />
                <DocumentFeatureItem icon={<Shield className="w-5 h-5" strokeWidth={3} />} text="Полная база вопросов" />
                <DocumentFeatureItem icon={<Package className="w-5 h-5" strokeWidth={3} />} text="Вносим в систему ФИС ФРДО" />
                <DocumentFeatureItem icon={<Award className="w-5 h-5" strokeWidth={3} />} text="Выдаём документы установленного образца" />
                <DocumentFeatureItem icon={<Truck className="w-5 h-5" strokeWidth={3} />} text="Доставка по всей РФ" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">Лицензия и аккредитация</p>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Образовательная лицензия ЛО35-01276-61/02274118 от 05.05.2025 г. 
                и аккредитация Ространснадзора.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[460px]">
            <div className="bg-zinc-800/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-zinc-700 shadow-2xl">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 block px-1">Выберите нужные курсы</label>
              
              <div className="relative mb-6" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all text-left bg-zinc-900 shadow-xl ${
                    isDropdownOpen ? "border-orange-500/50 ring-4 ring-orange-500/10" : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {selectedCourses.map((id) => (
                        <div key={id} className="w-8 h-8 rounded-full bg-orange-950/40 border-2 border-zinc-900 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                          <Image src={getCourseImage(id)} alt={id} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block leading-none mb-0.5">
                        {selectedCourses.length > 1 ? "Выбранные курсы" : "Выбранный курс"}
                      </span>
                      <span className="font-black text-white text-sm block leading-none">
                        {selectedCourses.length === 0 ? "Ничего не выбрано" : 
                         selectedCourses.length === 1 ? courseNames[selectedCourses[0]] : 
                         `Выбрано: ${selectedCourses.length}`}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-900 border-2 border-zinc-700 rounded-3xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {Object.entries(courseNames).map(([id, name]) => {
                      const isActive = selectedCourses.includes(id);
                      return (
                        <button
                          key={id}
                          onClick={() => toggleCourse(id)}
                          className={`w-full flex items-center justify-between px-6 py-5 transition-all text-left group border-b last:border-b-0 border-zinc-800/50 ${
                            isActive ? "bg-orange-600/10" : "hover:bg-zinc-800"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-orange-950/40 border border-orange-500/10 overflow-hidden relative flex-shrink-0">
                              <Image src={getCourseImage(id)} alt={name} fill className="object-cover" />
                            </div>
                            <span className={`font-black uppercase tracking-tight text-xs ${isActive ? "text-orange-600" : "text-zinc-400 group-hover:text-white"}`}>{name}</span>
                          </div>
                          {isActive && <Check className="w-5 h-5 text-orange-600 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                )}

              </div>

              <div className="flex flex-col mb-5 bg-zinc-900/40 p-4 rounded-xl border border-zinc-700/50">
                <span className="text-[10px] font-black text-yellow-500/50 uppercase tracking-widest mb-1">Итоговая стоимость</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white tracking-tighter">{totalPrice} ₽</span>
                </div>
              </div>

              <button 
                onClick={handleOrderClick}
                className="w-full bg-brand-gradient hover:opacity-90 text-white font-black py-4 rounded-xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-base"
              >
                Оформить заказ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsOrderModalOpen(false)} />
          <div className="relative bg-white dark:bg-zinc-900 rounded-[3rem] p-8 sm:p-12 w-full max-w-xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
             <div className="absolute top-8 right-8 cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors" onClick={() => setIsOrderModalOpen(false)}>
               <X className="w-6 h-6" />
             </div>
             
             <h3 className="text-4xl font-black mb-3 tracking-tight">Финальный <span className="text-yellow-500">шаг</span></h3>
             <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-10 text-lg">Почти готово! Введите ваше имя, и наш менеджер свяжется с вами для уточнения деталей.</p>
             
             <form onSubmit={submitOrder} className="space-y-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block px-2">Ваше имя</label>
                 <input 
                  autoFocus
                  required
                  type="text" 
                  placeholder="Например, Александр"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-transparent focus:border-yellow-500/50 dark:border-zinc-800 rounded-[2rem] px-8 py-5 font-bold text-xl focus:outline-none transition-all shadow-inner"
                 />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 border-l-4 border-l-blue-500 shadow-sm">
                    <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1">Ваш номер телефона (логин)</span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white">{(session?.user as any)?.phone || "Загрузка..."}</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 border-l-4 border-l-yellow-500 shadow-sm">
                    <span className="text-[10px] font-black text-zinc-400 uppercase block mb-1">Курсы</span>
                    <span className="text-sm font-black text-yellow-600 dark:text-yellow-500">
                      {selectedCourses.map(id => courseNames[id]).join(", ")}
                    </span>
                  </div>
               </div>

               <button 
                type="submit"
                disabled={isSubmittingOrder || !userName.trim()}
                className="w-full bg-zinc-900 dark:bg-yellow-500 text-white dark:text-black font-black py-6 rounded-[2rem] shadow-xl hover:shadow-yellow-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xl disabled:opacity-50 disabled:grayscale"
               >
                 {isSubmittingOrder ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Подтвердить заявку <Check className="w-6 h-6" /></>}
               </button>
             </form>
          </div>
        </div>
      )}
    </>
  );
}

function DocumentFeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-zinc-400 group/item">
      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-500 shadow-lg group-hover/item:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-bold text-zinc-300">{text}</span>
    </div>
  );
}
