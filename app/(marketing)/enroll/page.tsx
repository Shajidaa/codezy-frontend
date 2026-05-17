"use client";

import React, { use, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, RefreshCw, Loader2, Calendar, CheckCircle2 } from "lucide-react";
// import { levelsData } from "@/app/data/levels"; 
import { Currency } from "@/app/types";
import { levelsData } from "@/data/levels-config";

interface PageProps {
  searchParams: Promise<{ plan?: string; currency?: string }>;
}

type PaymentMethod = "bkash" | "nagad" | "card";

export default function EnrollPage({ searchParams }: PageProps) {
  const resolvedParams = use(searchParams);
  
  const selectedPlanId = resolvedParams.plan || "level-1"; 
  const currentCurrency = (resolvedParams.currency?.toUpperCase() === "BDT" ? "BDT" : "USD") as Currency;
  
  const planData = levelsData.find((level) => level.id === selectedPlanId) || levelsData[0];

  // Form & Payment States
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const priceSymbol = currentCurrency === "BDT" ? "৳" : "$";
  const priceAmount = currentCurrency === "BDT" ? planData.priceBDT : planData.priceUSD;
  const priceLabel = `${priceSymbol}${priceAmount}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        // API Route call simulator to backend endpoint (e.g., /api/bkash/create-payment)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        console.log(`Initiating ${paymentMethod} Gateway:`, {
          user: formData,
          amount: priceAmount,
          plan: planData.id
        });

        setIsSuccess(true);
      } catch (error) {
        console.error("Payment Initiation Error:", error);
        alert("Payment gateway timeout. Please try again.");
      }
    });
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#0F0E0E] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center border border-white/10 bg-[#181716] p-8 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
            ✓
          </div>
          <h1 className="text-2xl font-black text-white">পেমেন্ট সফল হয়েছে! 🎉</h1>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            ধন্যবাদ <strong>{formData.fullName}</strong>! আপনার সিটটি কনফার্ম করা হয়েছে। আপনার ইমেইল (<span className="text-brand-gold">{formData.email}</span>) এবং মোবাইল নাম্বারে ক্লাসের এক্সেস ডিটেইলস পাঠানো হয়েছে।
          </p>
          <Link href="/" className="mt-8 block w-full bg-brand-gold text-black font-extrabold py-3.5 rounded-xl text-center hover:bg-amber-400 transition">
            ড্যাশবোর্ডে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0F0E0E] text-white antialiased selection:bg-brand-gold selection:text-black">
      {/* Navbar Header */}
      <header className="border-b border-white/5 bg-[#141312]/80 backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            পেছনে ফিরে যান
          </Link>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Secure Bangladeshi Gateway
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Registration & Payment Method Selection */}
        <section className="lg:col-span-7 space-y-6 lg:order-1 order-2">
          <div className="bg-[#181716] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <h1 className="text-2xl md:text-3xl font-black mb-1">স্টুডেন্ট রেজিস্ট্রেশন</h1>
            <p className="text-neutral-400 text-sm mb-6">আপনার সঠিক তথ্য দিন (এই তথ্য দিয়ে আপনার ড্যাশবোর্ড তৈরি হবে)</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-2">নাম (Full Name) *</label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    disabled={isPending}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="উদাঃ আদনান রহমান"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition placeholder:text-neutral-600 disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">ইমেইল এড্রেস *</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      disabled={isPending}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="student@domain.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition placeholder:text-neutral-600 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">মোবাইল নাম্বার (বিকাশ নোটিফিকেশনের জন্য) *</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      disabled={isPending}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition placeholder:text-neutral-600 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="pt-6 border-t border-white/5">
                <label className="block text-sm font-medium text-white/80 mb-3">পেমেন্ট মেথড সিলেক্ট করুন *</label>
                
                <div className="grid grid-cols-3 gap-3">
                  {/* bKash Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-sm font-bold ${
                      paymentMethod === "bkash"
                        ? "border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E]"
                        : "border-white/10 bg-black/20 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">✨</span>
                    <span>বিকাশ</span>
                    {paymentMethod === "bkash" && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E2136E]" />
                    )}
                  </button>

                  {/* Nagad Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nagad")}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-sm font-bold ${
                      paymentMethod === "nagad"
                        ? "border-[#F47216] bg-[#F47216]/10 text-[#F47216]"
                        : "border-white/10 bg-black/20 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">🔥</span>
                    <span>নগদ</span>
                    {paymentMethod === "nagad" && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F47216]" />
                    )}
                  </button>

                  {/* Card Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-sm font-bold ${
                      paymentMethod === "card"
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                        : "border-white/10 bg-black/20 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">💳</span>
                    <span>Card / Visa</span>
                    {paymentMethod === "card" && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-gold" />
                    )}
                  </button>
                </div>
              </div>

              {/* Dynamic Information Notice based on payment type */}
              <div className="bg-black/30 border border-white/5 p-4 rounded-xl text-xs leading-relaxed text-neutral-400">
                {paymentMethod === "bkash" && (
                  <p>
                    <strong className="text-[#E2136E]">bKash Checkout Policy:</strong> নিচের বাটনে ক্লিক করার পর আপনাকে বিকাশ পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হবে। সেখানে ওটিপি (OTP) এবং পিন নাম্বার দিয়ে পেমেন্ট সফলভাবে সম্পন্ন করার সাথে সাথেই এই ওয়েবসাইটটি রিফ্রেশ হয়ে ইনস্ট্যান্ট এক্সেস চালু হয়ে যাবে। কোনো অতিরিক্ত ফি প্রযোজ্য নয়।
                  </p>
                )}
                {paymentMethod === "nagad" && (
                  <p>
                    <strong className="text-[#F47216]">নগদ গেটওয়ে পলিসি:</strong> নগদ ওয়ালেট নম্বর এবং ওটিপি ব্যবহার করে পেমেন্ট করার জন্য অফিসিয়াল পেমেন্ট নোডে রিডাইরেক্ট করা হবে। সিকিউর ট্রানজেকশন নিশ্চিত করুন।
                  </p>
                )}
                {paymentMethod === "card" && (
                  <p>
                    <strong className="text-brand-gold">Card Payment Node:</strong> Supports Visa, Mastercard, American Express, and internet banking via securely audited SSL protocols.
                  </p>
                )}
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  paymentMethod === "bkash"
                    ? "bg-[#E2136E] text-white hover:bg-[#c61060]"
                    : paymentMethod === "nagad"
                    ? "bg-[#F47216] text-white hover:bg-[#da620f]"
                    : "bg-brand-gold hover:bg-amber-400"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin text-current" />
                    গেটওয়ে লোড হচ্ছে, অপেক্ষা করুন...
                  </>
                ) : (
                  `${paymentMethod === "bkash" ? "বিকাশ" : paymentMethod === "nagad" ? "নগদ" : "কার্ড"} দিয়ে পেমেন্ট করুন (${priceLabel})`
                )}
              </button>
            </form>
          </div>

          {/* Secure Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-neutral-500 px-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> সুরক্ষিত পেমেন্ট গেটওয়ে (SSL Secured)
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw size={14} className="text-brand-gold" /> ৭ দিনের রিফান্ড পলিসি প্রযোজ্য
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Order Summary Box */}
        <section className="lg:col-span-5 lg:sticky lg:top-24 lg:order-2 order-1">
          <div className="bg-[#141312] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-brand-gold mb-1">
                আপনার সিলেক্টেড কোর্স
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{planData.title}</h2>
                  <span className="text-xs text-neutral-400 mt-0.5 block font-medium">{planData.label}</span>
                </div>
                <span className="text-2xl bg-white/5 p-2 rounded-xl">{planData.icon}</span>
              </div>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Curriculum Mini Roadmap */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono text-neutral-400 tracking-wider flex items-center gap-1.5">
                <Calendar size={12} className="text-brand-gold" /> ৩ মাসের রোডম্যাপ প্ল্যান
              </h3>
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                {planData.plan.map((step, idx) => (
                  <div key={idx} className="bg-black/20 border border-white/5 p-2.5 rounded-lg text-xs">
                    <div className="flex justify-between font-bold text-white mb-0.5">
                      <span>{step.month}</span>
                      <span className="text-brand-gold font-normal text-[11px]">{step.focus}</span>
                    </div>
                    <p className="text-neutral-400 font-normal leading-normal">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Total Calculation breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-400">
                <span>কোর্সের মেয়াদ</span>
                <span className="text-white font-medium">৩ মাস (ফুল এক্সেস)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>মোট কোর্স ফি</span>
                <span className="text-white font-medium">{priceLabel}</span>
              </div>
              
              <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-baseline">
                <span className="font-bold text-base">সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-3xl font-black text-brand-gold tracking-tight">{priceLabel}</span>
              </div>
            </div>

            {/* Extra Benefits Reminder */}
            {planData.additional && (
              <div className="bg-brand-gold/5 border border-brand-gold/10 rounded-xl p-4 text-xs text-neutral-400">
                <span className="font-bold text-brand-gold block mb-1">🎁 কোর্সের সাথে ফ্রিতে পাচ্ছেন:</span>
                {planData.additional}
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}