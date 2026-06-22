"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { InlineWidget } from "react-calendly";
import { HiArrowRight, HiCheckCircle, HiClock, HiPhone } from "react-icons/hi";

export default function ProfessionalBookingForm() {
  // const [loading, setLoading] = useState(false);
  // Track step: 1 = Details Form, 2 = Calendly Booking
  const [currentStep, setCurrentStep] = useState(1);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register?callbackUrl=/booking");
    }
  }, [status, router]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const payload = Object.fromEntries(formData.entries());

  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/demo`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       toast.success("Details saved! Now pick your slot.");
  //       setCurrentStep(2); // Move to Calendly booking
  //     } else {
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Submission failed", error);
  //     toast.error("Submission failed. Please check your connection.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 font-sans">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl shadow-2xl overflow-hidden bg-[#393536] border-t-8 border-[#EEB30D]"
          >
            <div>
              <Link
                href="/"
                className="text-sm flex items-end font-black tracking-tighter text-white ml-6 mt-6 mb-2 hover:text-[#EEB30D] transition-colors"
              >
                ← Back
              </Link>

              <div className="p-8 space-y-8">
               
              <header>
                <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
                  First, please fill out this quick form 📝
                </h1>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  It helps us understand your child&rsquo;s needs better before booking.
                </p>
              </header>

              <div className="w-full bg-white shadow-sm rounded-3xl overflow-hidden p-4 border border-slate-200">
                <iframe
                  src={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL} 
                  width="100%"
                  height="600"
                  className="border-none"
                  title="Google Form"
                >
                  Loading…
                </iframe>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex justify-end">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 bg-brand-gold text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md"
                >
                  I&rsquo;ve filled the form, Continue to Booking <HiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
              </div>
            
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header Area */}
            <div className="bg-[#393536] text-white p-6 rounded-3xl shadow-md border-b-4 border-[#EEB30D] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black uppercase text-[#EEB30D]">
                  Step 2: Select Date & Time
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Complete your registration by selecting a verified slot on the calendar.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold self-start md:self-auto transition-all"
              >
                ← Edit Form Info
              </button>
            </div>

            {/* Calendly Interactive Widget */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <InlineWidget
                url="https://calendly.com/shajidaislam34/30min"
                styles={{ height: "650px", width: "100%" }}
                pageSettings={{
                  backgroundColor: "ffffff",
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: "EEB30D",
                  textColor: "393536",
                }}
              />
            </div>

            {/* Additional context & trust parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                  <HiCheckCircle className="text-[#EEB30D] w-4 h-4" /> Reschedule anytime instantly
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                  <HiCheckCircle className="text-[#EEB30D] w-4 h-4" /> 1-on-1 personalized dedicated workspace
                </div>
              </div>

              <div className="bg-amber-50/60 border-l-4 border-[#EEB30D] p-4 rounded-r-2xl flex items-start gap-2">
                <HiClock className="text-[#EEB30D] w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Important Notice:</strong> Your assigned professional instructor blocks off this specific slot explicitly for you. Please attend promptly.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}