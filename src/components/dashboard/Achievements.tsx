"use client";

import { Award, Star, Flame, Zap, Target } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Changed from ReactNode to string
  isUnlocked: boolean;
  unlockedAt?: string; // Changed from Date to string
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function AchievementGrid({ achievements }: AchievementsProps) {
  const iconMap: Record<string, React.ReactNode> = {
    "Target": <Target className="w-6 h-6" />,
    "Flame": <Flame className="w-6 h-6" />,
    "Award": <Award className="w-6 h-6" />,
    "Zap": <Zap className="w-6 h-6" />,
    "Star": <Star className="w-6 h-6" />
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-black mb-1">Достижения</h3>
        <p className="text-xs text-zinc-500 font-medium">Ваши награды и успехи в обучении</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`p-4 rounded-2xl border-2 transition-all ${
              achievement.isUnlocked 
              ? 'bg-zinc-950 dark:bg-zinc-800 border-zinc-900 text-white shadow-xl shadow-zinc-900/10 scale-[1.02]' 
              : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-400 opacity-60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
               achievement.isUnlocked ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
            }`}>
               <span className="scale-75">{iconMap[achievement.icon] || achievement.icon}</span>
            </div>
            
            <h4 className="text-sm font-black mb-1.5 tracking-tight">{achievement.title}</h4>
            <p className="text-xs font-bold leading-relaxed opacity-60">{achievement.description}</p>
            
            {achievement.isUnlocked && achievement.unlockedAt && (
               <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[7px] font-black uppercase tracking-widest opacity-40">Получено</span>
                  <span className="text-[7px] font-black">{new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}</span>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyStreakCard({ streak }: { streak: number }) {
  return (
    <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
         <Flame className="w-16 h-16" />
      </div>
      
      <div className="relative z-10">
        <span className="text-orange-500 font-black text-[9px] uppercase tracking-widest mb-3 inline-block">Daily Streak</span>
        <h3 className="text-xl font-black mb-4 leading-tight">Ударный режим: <br /> {streak} дня</h3>
        
        <div className="flex gap-1.5">
           {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-md flex items-center justify-center ${
                   i < streak ? 'bg-orange-600 text-white' : 'bg-white/5 text-white/20'
                }`}
              >
                 <Flame className="w-3.5 h-3.5" />
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
