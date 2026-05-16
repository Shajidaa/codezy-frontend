// app/bootcamps/components/plan-roadmap.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { LevelData } from "@/app/types";

interface PlanRoadmapProps {
  activeData: LevelData;
}

export const PlanRoadmap = ({ activeData }: PlanRoadmapProps) => {
  return (
    <div className="lg:col-span-7 space-y-5">
      <div className="flex items-center gap-2 border-l-4 border-brand-gold pl-4 mb-2">
        <Calendar size={24} className="text-brand-gold" />
        <h3 className="text-2xl font-bold">3‑Month Intensive Roadmap</h3>
      </div>
      <div className="space-y-4">
        {activeData.plan.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="group p-5 rounded-xl bg-[#141211] border border-white/5 hover:border-brand-gold/30 transition-all hover:translate-x-1 duration-200"
          >
            <div className="flex flex-wrap justify-between items-start gap-2">
              <span className="text-brand-gold text-sm font-bold uppercase tracking-wide bg-black/30 px-2 py-0.5 rounded-full">
                {step.month}
              </span>
              <span className="text-xs text-brand-gray">📅 weekly sprints + labs</span>
            </div>
            <h4 className="text-xl font-bold mt-2 group-hover:text-brand-gold transition-colors">
              {step.focus}
            </h4>
            <p className="text-brand-gray mt-1 text-sm leading-relaxed">{step.detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 justify-between items-center bg-black/20 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-sm font-medium">Weekly code reviews & pair programming</span>
        </div>
        <div className="flex items-center gap-2 text-brand-gold text-sm font-semibold">
          <span>Live Support</span>
          <span>•</span>
          <span>Portfolio builder</span>
        </div>
      </div>
    </div>
  );
};