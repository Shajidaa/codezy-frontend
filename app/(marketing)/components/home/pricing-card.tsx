
"use client";

import { Currency, LevelData } from "@/app/types";
import { CheckCircle2, ArrowRight } from "lucide-react";


interface PricingCardProps {
  activeData: LevelData;
  currency: Currency;
}

export const PricingCard = ({ activeData, currency }: PricingCardProps) => {
  return (
    <div className="lg:col-span-5 bg-[#181716] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold">{activeData.title}</h2>
          <p className="text-brand-gray text-sm mt-1">{activeData.shortDesc}</p>
        </div>
        <div className="bg-black/40 rounded-full p-2 text-2xl">{activeData.icon}</div>
      </div>
      <div className="mt-5">
        <span className="text-5xl md:text-6xl font-black text-brand-gold">
          {currency === "BDT" ? `৳${activeData.priceBDT}` : `$${activeData.priceUSD}`}
        </span>
        <span className="text-brand-gray text-sm ml-2 font-medium">/ 3 months</span>
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
        <span className="font-semibold text-brand-gold block mb-1">🎁 Bonus:</span>
        {activeData.additional}
      </div>
      <button className="w-full mt-8 bg-brand-gold text-black font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-all shadow-lg group">
        Enroll Now <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
};