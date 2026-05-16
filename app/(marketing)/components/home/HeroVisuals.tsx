
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
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.style.background = "linear-gradient(135deg, #2c2418, #1e1915)";
            const overlay = document.createElement("div");
            overlay.className =
              "w-full h-full flex items-center justify-center text-brand-gold font-bold text-2xl gap-2";
            overlay.innerHTML = `${icon} ${isKids ? "Code Explorers" : "Next-Gen Innovators"}`;
            parent.appendChild(overlay);
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
        <Sparkles size={12} className="text-brand-gold" />
        {isKids ? "Hands-on playful learning" : "Real-world projects & portfolio"}
      </div>
    </div>
  );
};