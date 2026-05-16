
"use client";

import { Sparkles } from "lucide-react";

interface HeroVisualsProps {
  level: string;
  image: string;
  icon: string;
}

export const HeroVisuals = ({ level, image, icon }: HeroVisualsProps) => {
  const isKids = level === "level-1";
  return (
    <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 w-full mb-8 shadow-2xl">
      <img
        src={image}
        alt={isKids ? "Young students coding together" : "Young developers collaborating"}
        className="w-full h-full object-cover"
      
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
        <Sparkles size={12} className="text-brand-gold" />
        {isKids ? "Hands-on playful learning" : "Real-world projects & portfolio"}
      </div>
    </div>
  );
};