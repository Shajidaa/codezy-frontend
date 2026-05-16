
"use client";

import { LevelData } from "@/app/types";
import { motion } from "framer-motion";


interface LevelTabsProps {
  levelsData: LevelData[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const LevelTabs = ({ levelsData, activeTab, setActiveTab }: LevelTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 border-b border-white/10 pb-2">
      {levelsData.map((level) => (
        <button
          key={level.id}
          onClick={() => setActiveTab(level.id)}
          className={`relative px-4 md:px-6 py-2 text-base md:text-lg font-semibold transition-all rounded-t-xl ${
            activeTab === level.id
              ? "text-brand-gold"
              : "text-brand-gray hover:text-brand-white"
          }`}
        >
          {level.label}
          {activeTab === level.id && (
            <motion.div
              layoutId="activeUnderline"
              className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-brand-gold rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
};