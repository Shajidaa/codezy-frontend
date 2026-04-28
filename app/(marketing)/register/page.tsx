"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Presentation, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

// --- Types ---
type UserRole = 'student' | 'teacher';

// --- Sub-components ---
const BrandSection = () => (
  <div className="w-full lg:w-[42%] bg-brand-dark p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#949293 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
    <div className="relative z-10">
      <div className="text-brand-gold text-2xl font-black tracking-tighter mb-12 flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center text-brand-dark">
          <Sparkles size={18} fill="currentColor" />
        </div>
        CODEZY
      </div>
      <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
        Empowering the next gen of <span className="text-brand-gold">builders.</span>
      </h2>
    </div>
    <div className="relative z-10 mt-12 pt-10 border-t border-brand-gray/20">
      <p className="text-xs text-brand-gray leading-loose italic">
        Codezy isn&apos;t just a platform; it&apos;s the bridge between learning and professional excellence.
      </p>
    </div>
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    expertise: 'Full Stack (MERN)'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.error("Please fill all fields");

    setIsLoading(true);
    try {
      // 1. External Express API Call
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // 2. NextAuth Strategy: Immediate Sign In
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Welcome to Codezy!");
        router.push("/dashboard");
      } else {
        throw new Error("Login failed after registration");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 md:p-10 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-brand-gray/10 overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        <BrandSection />

        <div className="w-full lg:w-[58%] p-10 md:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Create Account</h1>
              <p className="text-brand-gray font-medium">Start your journey today.</p>
            </header>

            {/* Role Switcher */}
            <div className="flex p-1.5 bg-brand-dark/5 rounded-2xl mb-10 relative">
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{ left: role === 'student' ? '6px' : 'calc(50%)' }}
              />
              <RoleButton active={role === 'student'} onClick={() => setRole('student')} icon={<GraduationCap size={18}/>} label="Student" />
              <RoleButton active={role === 'teacher'} onClick={() => setRole('teacher')} icon={<Presentation size={18}/>} label="Teacher" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <FloatingInput label="Full Name" type="text" value={formData.name} onChange={(v) => handleInputChange('name', v)} placeholder="Shajida Akter" />
                <FloatingInput label="Email Address" type="email" value={formData.email} onChange={(v) => handleInputChange('email', v)} placeholder="name@example.com" />
                <FloatingInput label="Password" type="password" value={formData.password} onChange={(v) => handleInputChange('password', v)} placeholder="••••••••" />
              </div>

              <AnimatePresence>
                {role === 'teacher' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray mb-2 block px-1">Expertise</label>
                    <select 
                      value={formData.expertise} 
                      onChange={(e) => handleInputChange('expertise', e.target.value)}
                      className="w-full px-5 py-4 bg-brand-dark/5 border-none rounded-2xl outline-none text-sm font-semibold text-brand-dark"
                    >
                      <option>Full Stack (MERN)</option>
                      <option>Next.js & Cloud</option>
                      <option>UI/UX Engineering</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-brand-gold text-white font-black py-5 rounded-2xl shadow-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RoleButton({ active, onClick, icon, label }: any) {
  return (
    <button type="button" onClick={onClick} className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${active ? 'text-brand-dark' : 'text-brand-gray'}`}>
      {icon} {label}
    </button>
  );
}

function FloatingInput({ label, type, placeholder, value, onChange }: any) {
  return (
    <div className="group">
      <label className="text-[11px] font-black uppercase tracking-widest text-brand-gray mb-2 block px-1 group-focus-within:text-brand-gold transition-colors">{label}</label>
      <input 
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-brand-dark/5 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-gold/20 outline-none text-sm font-medium transition-all"
      />
    </div>
  );
}