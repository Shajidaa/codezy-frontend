"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfessionalDemoForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/api/leads/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#FFFFFF] border-t-4 border-[#EEB30D] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            {/* Header with Brand Colors */}
            <div className="bg-[#393536] p-8 text-center">
              <h2 className="text-[#EEB30D] text-3xl font-black uppercase tracking-tight">
                Start Coding Today
              </h2>
              <p className="text-[#949293] mt-2 font-medium">
                Book a free 1-on-1 session with our expert mentors.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent Info */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#393536] uppercase tracking-wider">Parent Name</label>
                <input
                  name="parentName"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-[#EEB30D] outline-none transition-all"
                  placeholder="Enter full name"
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#393536] uppercase tracking-wider">WhatsApp Number</label>
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-[#EEB30D] outline-none transition-all"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>

              {/* Child Info */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#393536] uppercase tracking-wider">Student Age</label>
                <input
                  name="childAge"
                  type="number"
                  min="6"
                  max="18"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-[#EEB30D] outline-none transition-all"
                  placeholder="e.g. 12"
                />
              </div>

              {/* Interest Selection - CRITICAL FOR LEAD QUALITY */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#393536] uppercase tracking-wider">Interested Course</label>
                <select 
                  name="interest"
                  className="w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-200 focus:border-[#EEB30D] outline-none appearance-none"
                >
                  <option value="Web Development">Web Development (HTML, CSS, JS)</option>
                  <option value="Python Mastery">Python Mastery</option>
                  <option value="App Development">Mobile App Development</option>
                  <option value="Game Design">Game Design with Scratch/Roblox</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 w-full py-4 bg-[#393536] hover:bg-[#EEB30D] text-white hover:text-[#393536] rounded-lg font-black text-lg transition-all transform active:scale-95 shadow-xl uppercase tracking-widest"
              >
                {loading ? "Registering..." : "Claim Free Trial Class"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-[#EEB30D] p-12 rounded-3xl text-center shadow-2xl"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-black text-[#393536]">AWESOME!</h2>
            <p className="text-[#949293] mt-4 text-lg">
              We&rsquo;ve received your request. A **Codezy Education Consultant** will reach out on WhatsApp shortly.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 px-8 py-3 border-2 border-[#393536] text-[#393536] font-bold rounded-full hover:bg-[#393536] hover:text-white transition-all"
            >
              Back to Courses
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}