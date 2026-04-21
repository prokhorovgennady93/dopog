"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 44 }: LogoProps) {
  return (
    <div 
      className={`relative bg-yellow-500 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-yellow-500/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/icon.png?v=4" 
        alt="ДОПОГ Экзамен" 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-125 scale-115"
      />
    </div>
  );
}
