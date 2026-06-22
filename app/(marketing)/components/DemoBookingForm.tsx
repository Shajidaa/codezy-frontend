"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



const TIME_SLOTS = ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "07:00 PM", "09:00 PM"];

export default function ProfessionalBookingForm() {

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/booking");
    }
  }, [status, router]);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return toast.error("Please select Date and Time");
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 font-sans">
      
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className=" rounded-3xl shadow-2xl overflow-hidden bg-[#393536] border-t-8 border-[#EEB30D]"
          >
            <div>
              <Link href="/" className="text-sm
               flex items-end font-black tracking-tighter text-white ml-3 mb-8">
                 Back 
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3">
              
              {/* লেফট সাইডবার: ক্যালেন্ডার লজিক */}
              <div className="bg-[#393536] p-8 text-white">
                <h3 className="text-[#EEB30D] text-xl font-bold mb-4">Book a Free Session</h3>
                <p className="text-gray-400 text-sm mb-6">Select a date and time that works best for you and your child.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-gray-500">Pick Date</label>
                    <input 
                      type="date" 
                      min={today}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full mt-2 p-3 bg-[#4a4647] border-none rounded-lg text-white outline-none focus:ring-2 focus:ring-[#EEB30D]"
                    />
                  </div>

                  {selectedDate && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <label className="text-xs uppercase font-bold text-gray-500">Available Slots</label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 text-xs rounded border ${selectedTime === time ? 'bg-[#EEB30D] border-[#EEB30D] text-black' : 'border-gray-600 text-gray-300'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* রাইট সাইড: ফর্ম ইনপুটস */}
             



<div className="md:col-span-2 p-8">
  <form onSubmit={handleSubmit} className="space-y-4">
    
    {/* Parent & Gmail Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Parent Name</label>
        <input name="parentName" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#EEB30D] outline-none transition-all" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Gmail Address</label>
        <input name="email" type="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D]" placeholder="example@gmail.com" />
      </div>
    </div>

    {/* Age & WhatsApp Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Student Age (Min 6)</label>
        <input name="childAge" type="number" min="6" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D]" placeholder="Age 6+" />
      </div>
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">WhatsApp Number</label>
        <input name="phoneNumber" type="tel" placeholder="+880" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D]" />
      </div>
    </div>

    {/* Course Sector & Experience Row (NEW) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Select Sector</label>
        <select name="sector" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D] appearance-none cursor-pointer">
          <option value="">Choose Course</option>
          <option value="Scratch">Visual Coding (Scratch)</option>
          <option value="WebDev">Web Development (HTML/CSS/JS)</option>
          <option value="Python">Python Programming</option>
          <option value="AppDev">App Development</option>
          <option value="Robotics">Robotics & IoT</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Experience Level</label>
        <select name="experienceLevel" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D] appearance-none cursor-pointer">
          <option value="Beginner">Absolute Beginner</option>
          <option value="Intermediate">Knows Basics</option>
          <option value="Advanced">Advanced / Project Based</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-[10px] font-black mb-1 uppercase text-gray-400 tracking-widest">Current School</label>
      <input name="schoolName" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#EEB30D]" placeholder="Enter school name" />
    </div>

    <button
      disabled={loading}
      className="w-full py-4 bg-[#393536] text-[#EEB30D] rounded-xl font-black uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50 shadow-xl mt-2"
    >
      {loading ? "Booking Session..." : "Claim Free Trial Class"}
    </button>
  </form>
</div>
            </div>
            </div>
            
          </motion.div>
        ) : (
          <SuccessMessage onReset={() => setSubmitted(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-3xl text-center shadow-xl border-t-8 border-[#EEB30D]">
      <div className="text-5xl mb-4">📅</div>
      <h2 className="text-2xl font-black">BOOKING CONFIRMED!</h2>
      <p className="text-gray-500 mt-2">Check your WhatsApp. Our mentor will join you soon.</p>
      <button onClick={onReset} className="mt-6 text-sm font-bold underline">Book another session</button>
    </motion.div>
  );
}