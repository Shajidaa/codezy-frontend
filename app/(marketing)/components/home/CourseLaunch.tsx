// app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Globe,

  BookOpen,
  Sparkles,
} from "lucide-react";


// Types
type Currency = "BDT" | "USD";

interface BootcampPlan {
  month: string;
  focus: string;
  detail: string;
}

interface LevelData {
  id: string;
  label: string;
  title: string;
  shortDesc: string;
  priceBDT: string;
  priceUSD: string;
  benefits: string[];
  plan: BootcampPlan[];
  additional: string;
  image: string;
  icon: string;
}

const levelsData: LevelData[] = [
  {
    id: "level-1",
    label: "Level-1 (Age 8-14)",
    title: "Explorer Bootcamp",
    shortDesc: "Creative foundations & logic mastery",
    priceBDT: "8,000",
    priceUSD: "75",
    benefits: [
      "Game Design & Animation",
      "Logic & Computational Thinking",
      "Collaborative Soft Skills",
      "Intro to Python (Text-based)",
    ],
    plan: [
      {
        month: "Month 1",
        focus: "Block-based Logic & Puzzles",
        detail:
          "Scratch & coding challenges, algorithmic thinking, digital storytelling.",
      },
      {
        month: "Month 2",
        focus: "Game Development Studio",
        detail:
          "Create 3 interactive mini-games, learn events & variables, peer testing.",
      },
      {
        month: "Month 3",
        focus: "Python Playground",
        detail:
          "First Python scripts, turtle graphics, simple text adventures & final showcase.",
      },
    ],
    additional:
      "Certificate of Completion + Access to Young Coder Community",
    image:
      "https://images.pexels.com/photos/4145190/children-coding-stem-education.jpg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    icon: "🎮",
  },
  {
    id: "level-2",
    label: "Level-2 (Age 15-24)",
    title: "Innovator Bootcamp",
    shortDesc: "Full-stack + AI fundamentals for industry",
    priceBDT: "20,000",
    priceUSD: "185",
    benefits: [
      "Full-Stack (React, Next.js, Tailwind)",
      "AI Essentials & Prompt Engineering",
      "Backend & Database (PostgreSQL, Auth)",
      "Job-Ready Portfolio + SaaS Deployment",
    ],
    plan: [
      {
        month: "Month 1",
        focus: "Modern Frontend Mastery",
        detail:
          "React components, Next.js routing, Tailwind CSS, responsive design & state hooks.",
      },
      {
        month: "Month 2",
        focus: "Backend Architecture & APIs",
        detail:
          "Node.js/Express, PostgreSQL, Clerk Auth, REST APIs & integration.",
      },
      {
        month: "Month 3",
        focus: "Production & Career Launch",
        detail:
          "Deploy full-stack SaaS app, write technical resume, mock interviews & open-source contributions.",
      },
    ],
    additional:
      "1-on-1 Career Mentorship + GitHub Portfolio Review + Interview Prep",
    image:
      "https://images.pexels.com/photos/1181675/young-woman-coding-on-laptop-software-development.jpg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    icon: "🚀",
  },
];





// Components
const HeroVisuals = ({ level, image, icon }: { level: string; image: string; icon: string }) => {
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





export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("level-1");
  const [currency, setCurrency] = useState<Currency>("BDT");

  const activeData = levelsData.find((l) => l.id === activeTab)!;

  return (

   <div className="bg-brand-dark">   <main className="min-h-screen  py-16 px-5 md:px-8 max-w-7xl mx-auto text-brand-white">
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

      {/* Level Tabs */}
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
            {/* Left Card: Pricing & Benefits */}
            <div className="lg:col-span-5 bg-[#181716] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold">
                    {activeData.title}
                  </h2>
                  <p className="text-brand-gray text-sm mt-1">
                    {activeData.shortDesc}
                  </p>
                </div>
                <div className="bg-black/40 rounded-full p-2 text-2xl">
                  {activeData.icon}
                </div>
              </div>
              <div className="mt-5">
                <span className="text-5xl md:text-6xl font-black text-brand-gold">
                  {currency === "BDT" ? `৳${activeData.priceBDT}` : `$${activeData.priceUSD}`}
                </span>
                <span className="text-brand-gray text-sm ml-2 font-medium">
                  / 3 months
                </span>
              </div>
              <div className="border-t border-white/10 my-6" />
              <div className="space-y-4">
                {activeData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-brand-gold shrink-0 mt-0.5" />
                    <span className="text-brand-white/90 text-base">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-black/30 rounded-xl p-4 text-sm text-brand-gray">
                <span className="font-semibold text-brand-gold block mb-1">
                  🎁 Bonus:
                </span>
                {activeData.additional}
              </div>
              <button className="w-full mt-8 bg-brand-gold text-black font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-all shadow-lg group">
                Enroll Now <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Right Column: 3-month Bootcamp plan */}
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
                    <p className="text-brand-gray mt-1 text-sm leading-relaxed">
                      {step.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-between items-center bg-black/20 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  <span className="text-sm font-medium">
                    Weekly code reviews & pair programming
                  </span>
                </div>
                <div className="flex items-center gap-2 text-brand-gold text-sm font-semibold">
                  <span>Live Support</span>
                  <span>•</span>
                  <span>Portfolio builder</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

   

    

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
    </main></div>
  );
}