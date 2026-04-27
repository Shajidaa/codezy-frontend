"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Presentation, ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-brand-gold/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-dark/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full  bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-brand-gray/10 overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        
        {/* Left Side: Brand Experience */}
        <div className="w-full lg:w-[42%] bg-brand-dark p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#949293 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-brand-gold text-2xl font-black tracking-tighter mb-12 flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center text-brand-dark">
                <Sparkles size={18} fill="currentColor" />
              </div>
              CODEZY
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
              Empowering the next gen of <span className="text-brand-gold">builders.</span>
            </h2>
            
            <ul className="space-y-5">
              {[
                { text: "Industry-standard curriculum", icon: <ShieldCheck size={20}/> },
                { text: "Hands-on MERN projects", icon: <Sparkles size={20}/> },
                { text: "Verified certification", icon: <Check size={20}/> }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-3 text-brand-gray"
                >
                  <span className="text-brand-gold">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-12 pt-10 border-t border-brand-gray/20">
            <p className="text-xs text-brand-gray leading-loose italic">
              "Codezy isn't just a platform; it's the bridge between learning and professional excellence."
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="w-full lg:w-[58%] p-10 md:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight mb-2">Create Account</h1>
              <p className="text-brand-gray font-medium">Join the community today.</p>
            </div>

            {/* Premium Role Selector */}
            <div className="flex p-1.5 bg-brand-dark/5 rounded-2xl mb-10 relative">
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <button 
                onClick={() => setRole('student')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${role === 'student' ? 'text-brand-dark' : 'text-brand-gray'}`}
              >
                <GraduationCap size={18} /> Student
              </button>
              <button 
                onClick={() => setRole('teacher')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${role === 'teacher' ? 'text-brand-dark' : 'text-brand-gray'}`}
              >
                <Presentation size={18} /> Teacher
              </button>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
                <FloatingInput label="Full Name" type="text" placeholder="e.g. Shajida Akter" />
                <FloatingInput label="Email Address" type="email" placeholder="name@example.com" />
                <FloatingInput label="Password" type="password" placeholder="••••••••" />
              </div>

              <AnimatePresence mode="wait">
                {role === 'teacher' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray mb-2 block px-1">Expertise</label>
                    <select className="w-full px-5 py-4 bg-brand-dark/5 border-none rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-semibold text-brand-dark appearance-none">
                      <option>Full Stack (MERN)</option>
                      <option>Next.js & Cloud</option>
                      <option>UI/UX Engineering</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-gold text-brand-white font-black py-5 rounded-[1.25rem] shadow-[0_20px_40px_-12px_rgba(238,179,13,0.3)] hover:shadow-[0_24px_48px_-12px_rgba(238,179,13,0.4)] transition-all flex items-center justify-center gap-3 group"
              >
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <p className="mt-10 text-center text-sm font-medium text-brand-gray">
              Already a member? <span className="text-brand-dark font-bold hover:text-brand-gold cursor-pointer transition-colors">Sign in here</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper component for cleaner inputs
function FloatingInput({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
  return (
    <div className="group">
      <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray mb-2 block px-1 group-focus-within:text-brand-gold transition-colors">
        {label}
      </label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-brand-dark/5 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-gold/20 focus:ring-4 focus:ring-brand-gold/5 outline-none text-sm font-medium text-brand-dark transition-all placeholder:text-brand-gray/40"
      />
    </div>
  );
}