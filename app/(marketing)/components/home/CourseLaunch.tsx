// app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Currency } from "@/app/types";
import { levelsData } from "@/data/levels-config";
import { LevelTabs } from "./level-tabs";
import { HeroVisuals } from "./HeroVisuals";
import { PricingCard } from "./pricing-card";
import { PlanRoadmap } from "./plan-roadmap";



// Atomic Sub-components


export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("level-1");
  const [currency, setCurrency] = useState<Currency>("BDT");

  const activeData = levelsData.find((l) => l.id === activeTab)!;

  return (
    <div className="bg-brand-dark">
      <main className="min-h-screen py-16 px-5 md:px-8 max-w-7xl mx-auto text-brand-white">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand-gold/10 text-brand-gold rounded-full px-4 py-1 text-sm font-semibold tracking-wide mb-4">
              Limited Seats • Early 2026 Batch
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
              Code<span className="text-brand-gold">Elevate</span> Bootcamps
            </h1>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              Two dynamic tracks designed for young builders — from creative logic
              to professional full‑stack development.
            </p>
          </motion.div>
          
          {/* Currency Toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-[#1f1d1c] p-1.5 rounded-full border border-white/10 shadow-sm">
              {(["BDT", "USD"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-7 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${
                    currency === curr
                      ? "bg-brand-gold text-black shadow-md"
                      : "text-brand-gray hover:text-white"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Level Tabs Control */}
        <LevelTabs 
          levelsData={levelsData} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "content"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <HeroVisuals
              level={activeTab}
              image={activeData.image}
              icon={activeData.icon}
            />

            <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
              <PricingCard activeData={activeData} currency={currency} />
              <PlanRoadmap activeData={activeData} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scoped Custom Styles */}
        <style jsx>{`
          .bg-brand-dark {
            background-color: #0f0e0e;
          }
          .text-brand-white {
            color: #f4f2f0;
          }
          .text-brand-gray {
            color: #a9a6a2;
          }
          .text-brand-gold {
            color: #f5b042;
          }
          .bg-brand-gold {
            background-color: #f5b042;
          }
        `}</style>
      </main>
    </div>
  );
}