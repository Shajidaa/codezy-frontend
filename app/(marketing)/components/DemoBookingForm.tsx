"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { InlineWidget } from "react-calendly";
import { HiArrowRight, HiCheckCircle, HiClock, HiLockClosed } from "react-icons/hi";

export default function ProfessionalBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<{
    bookingDate?: string;
    bookingTime?: string;
    instructorName?: string;
  }>({});

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to registration
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register?callbackUrl=/booking");
    }
  }, [status, router]);

  // Check if user has an active booking
  useEffect(() => {
    const checkUserBooking = async () => {
      if (status !== "authenticated" || !session?.user?.email) {
        setCheckingBooking(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/check-status?email=${encodeURIComponent(
            session.user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to check booking status");
        }

        const data = await response.json();

        if (data.hasActiveBooking) {
          setHasActiveBooking(true);
          // Store booking details if available
          if (data.bookingDetails) {
            setBookingDetails(data.bookingDetails);
          }
        }
      } catch (error) {
        console.error("Booking status check failed:", error);
        // Optionally show error toast/notification here
      } finally {
        setCheckingBooking(false);
      }
    };

    checkUserBooking();
  }, [status, session]);

  // Loading state
  if (status === "loading" || checkingBooking) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EEB30D] mx-auto"></div>
          <p className="animate-pulse font-medium text-gray-300">
            Loading details, please wait...
          </p>
        </div>
      </div>
    );
  }

  // Show message if user already has an active booking
  if (hasActiveBooking) {
    return (
      <div className="max-w-xl mx-auto my-12 px-4 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl shadow-2xl p-8 bg-[#393536] border-t-8 border-red-500 text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center bg-red-500/10 p-4 rounded-full text-red-500">
            <HiLockClosed className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            আপনি ইতিমধ্যে একটি স্লট বুক করেছেন! 🚫
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            আপনার বর্তমান ক্লাসটি সম্পূর্ণ শেষ না হওয়া পর্যন্ত একই ইমেইল (
            <span className="text-[#EEB30D] font-semibold">
              {session?.user?.email}
            </span>
            ) দিয়ে নতুন কোনো ক্লাস বা স্লট বুক করা যাবে না।
          </p>

          {/* Show existing booking details if available */}
          {bookingDetails.bookingDate && (
            <div className="bg-slate-800/50 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-gray-400">আপনার বর্তমান বুকিং তথ্য:</p>
              <div className="text-sm text-white space-y-1">
                {bookingDetails.bookingDate && (
                  <p>📅 তারিখ: {new Date(bookingDetails.bookingDate).toLocaleDateString('bn-BD')}</p>
                )}
                {bookingDetails.bookingTime && (
                  <p>⏰ সময়: {bookingDetails.bookingTime}</p>
                )}
                {bookingDetails.instructorName && (
                  <p>👨‍🏫 শিক্ষক: {bookingDetails.instructorName}</p>
                )}
              </div>
            </div>
          )}

       

        
        </motion.div>
      </div>
    );
  }

  // Main booking form
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
                  <p className="text-sm text-slate-400 mt-2 font-medium">
                    It helps us understand your child&rsquo;s needs better before booking.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-full">
                    <span className="text-amber-400 text-xs font-semibold">
                      ⚡ আপনার ইমেইল: {session?.user?.email}
                    </span>
                  </div>
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

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 bg-[#EEB30D] text-gray-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md"
                  >
                    I&rsquo;ve filled the form, Continue to Booking{" "}
                    <HiArrowRight className="w-5 h-5" />
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
            <div className="bg-[#393536] text-white p-6 rounded-3xl shadow-md border-b-4 border-[#EEB30D] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black uppercase text-[#EEB30D]">
                  Step 2: Select Date & Time
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Complete your registration by selecting a verified slot on the calendar.
                </p>
                <p className="text-xs text-amber-400 mt-2">
                  📧 Booking with: {session?.user?.email}
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold self-start md:self-auto transition-all"
              >
                ← Edit Form Info
              </button>
            </div>

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
                prefill={{
                  email: session?.user?.email || "",
                  name: session?.user?.name || "",
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                  <HiCheckCircle className="text-[#EEB30D] w-4 h-4" /> Reschedule anytime instantly
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                  <HiCheckCircle className="text-[#EEB30D] w-4 h-4" /> 1-on-1 personalized dedicated workspace
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                  <HiCheckCircle className="text-[#EEB30D] w-4 h-4" /> একই ইমেইল দিয়ে একবারই বুকিং করা যাবে
                </div>
              </div>

              <div className="bg-amber-50/60 border-l-4 border-[#EEB30D] p-4 rounded-r-2xl flex items-start gap-2">
                <HiClock className="text-[#EEB30D] w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Important Notice:</strong> Your assigned professional instructor blocks off this specific slot explicitly for you. Please attend promptly.
                  <br />
                  <span className="text-amber-600 font-semibold mt-1 block">
                    ⚠️ একবার বুকিং করলে আর বুকিং করা যাবে না।
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}