"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Lock, Mail, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const result = await signIn('credentials', {
//         ...formData,
//         redirect: false,
//       });

//       if (result?.error) {
//         toast.error("Invalid email or password");
//       } else if (result?.ok) {
//         toast.success("Welcome back!");
//         router.refresh();
//         router.push('/dashboard'); // Middleware handles role-based redirect
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // try {
 
    //   const result = await signIn('credentials', {
    //     email: formData.email,
    //     password: formData.password,
    //     redirect: false, 
    //   });

    //   if (result?.error) {
   
    //     toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড!");
    //   } else if (result?.ok) {
    //     toast.success("লগইন সফল হয়েছে!");
        
  
    //     router.refresh();

       
    //     router.push('/dashboard'); 
    //   }
    // } catch (error) {
    //   toast.error("সার্ভারে সমস্যা হচ্ছে, আবার চেষ্টা করুন।");
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 font-sans selection:bg-brand-gold/30">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-brand-dark/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-brand-gray/10 p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-brand-dark rounded-2xl mb-6 shadow-xl shadow-brand-dark/10"
          >
            <Sparkles className="text-brand-gold" size={24} fill="currentColor" />
          </motion.div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight mb-2">Welcome Back</h1>
          <p className="text-brand-gray font-medium">Log in to continue your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray px-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-gold transition-colors" size={18} />
              <input 
                required
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-5 py-4 bg-brand-dark/5 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-gold/20 focus:ring-4 focus:ring-brand-gold/5 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray">Password</label>
              <Link href="/forgot-password"  className="text-[10px] font-bold text-brand-gold hover:underline">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-gold transition-colors" size={18} />
              <input 
                required
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-5 py-4 bg-brand-dark/5 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-gold/20 focus:ring-4 focus:ring-brand-gold/5 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <motion.button 
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl shadow-lg hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Sign In <ArrowRight size={20} className="text-brand-gold group-hover:translate-x-1 transition-transform" /></>
            )}
          </motion.button>
        </form>

        <div className="mt-10 pt-8 border-t border-brand-gray/10 text-center text-sm">
          <p className="text-brand-gray font-medium">
            Don&apos;t have an account? {' '}
            <Link href="/register" className="text-brand-dark font-black hover:text-brand-gold transition-colors">
              Join Codezy for free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}