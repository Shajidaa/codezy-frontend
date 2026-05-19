"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Presentation, ArrowRight, Sparkles, Loader2, Eye, EyeOff, Mail, Lock, User, Briefcase } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// --- Types ---
type UserRole = 'student' | 'teacher';

// --- Sub-components ---
const BrandSection = () => (
  <div className="w-full lg:w-[42%] bg-[#393536] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden min-h-[300px] lg:min-h-auto">
    {/* Decorative background design grids */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#949293 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#EEB30D]/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
    
    <div className="relative z-10">
      <div className="text-[#EEB30D] text-2xl font-black tracking-tighter mb-12 flex items-center gap-2">
        <div className="w-9 h-9 bg-[#EEB30D] rounded-xl flex items-center justify-center text-[#393536] shadow-lg shadow-[#EEB30D]/20 animate-pulse">
          <Sparkles size={18} fill="currentColor" />
        </div>
        CODEZY
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] mb-6 tracking-tight">
        Empowering the next gen of <span className="text-[#EEB30D] bg-clip-text">builders.</span>
      </h2>
      <p className="text-[#949293] text-sm md:text-base max-w-sm font-medium leading-relaxed">
        Join our elite community of developers and educators mastering real-world architecture.
      </p>
    </div>
    
    <div className="relative z-10 mt-12 pt-10 border-t border-[#949293]/20">
      <p className="text-xs text-[#949293] leading-loose italic font-medium">
        Codezy isn&apos;t just a platform; it&apos;s the bridge between learning and professional excellence.
      </p>
    </div>
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    age: '',

    password: '',

    expertise: 'Full Stack (MERN)'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Backend Registration
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // 2. NextAuth Sign In
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, 
      });

      if (result?.ok) {
        toast.success(`Welcome, ${formData.name}!`);
        
        // 3. Role-Based Redirection Logic
        if (role === 'teacher') {
          router.push("/dashboard/teacher");
        } else {
          router.push("/dashboard/student");
        }
      } else {
        throw new Error("Automatic login failed. Please sign in manually.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#1e1b1c] flex items-center justify-center p-4 md:p-10 font-sans transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white dark:bg-[#2d292a] rounded-[2.5rem] shadow-2xl border border-[#949293]/10 overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        <BrandSection />

        <div className="w-full lg:w-[58%] p-8 md:p-16 bg-white dark:bg-[#2d292a] flex items-center">
          <div className="max-w-md w-full mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-black text-[#393536] dark:text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-[#949293] font-semibold mt-1">
                Start your journey today.
              </p>
            </header>

            {/* Role Switcher */}
            <div className="flex p-1.5 bg-[#393536]/5 dark:bg-white/5 rounded-2xl mb-8 relative border border-[#949293]/10">
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-1.5 w-[calc(50%-6px)] bg-white dark:bg-[#393536] rounded-xl shadow-md"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                style={{ left: role === 'student' ? '6px' : 'calc(50%)' }}
              />
              <RoleButton active={role === 'student'} onClick={() => setRole('student')} icon={<GraduationCap size={18}/>} label="Student" />
              <RoleButton active={role === 'teacher'} onClick={() => setRole('teacher')} icon={<Presentation size={18}/>} label="Teacher" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <FloatingInput 
                  label="Full Name" 
                  type="text" 
                  value={formData.name} 
                  onChange={(v: string) => handleInputChange('name', v)} 
                  placeholder="Shajida Akter" 
                  icon={<User size={18} />}
                />
                
                <FloatingInput 
                  label="Email Address" 
                  type="email" 
                  value={formData.email} 
                  onChange={(v: string) => handleInputChange('email', v)} 
                  placeholder="name@example.com" 
                  icon={<Mail size={18} />}
                />
                <FloatingInput 
                  label="Age" 
                  type="number" 
                  value={formData.age} 
                  onChange={(v: string) => handleInputChange('age', v)} 
                  placeholder="18"
                  
                  icon={<User size={18} />}
                />
                <FloatingInput 
                  label="School" 
                  type="text" 
                  value={formData.school} 
                  onChange={(v: string) => handleInputChange('school', v)} 
                  placeholder="Your School" 
                  icon={<GraduationCap size={18} />}
                />
                
                <FloatingInput 
                  label="Password" 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={(v: string) => handleInputChange('password', v)} 
                  placeholder="••••••••" 
                  icon={<Lock size={18} />}
                  isPassword
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </div>

              {/* Dynamic Expertise Selector Block */}
              <AnimatePresence mode="wait">
                {role === 'teacher' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, y: -10 }} 
                    animate={{ height: 'auto', opacity: 1, y: 0 }} 
                    exit={{ height: 0, opacity: 0, y: -10 }} 
                    className="overflow-hidden"
                  >
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#949293] mb-2 block px-1">
                      Expertise Field
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-5 text-[#949293]"><Briefcase size={18} /></span>
                      <select 
                        value={formData.expertise} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('expertise', e.target.value)}
                        className="w-full pl-12 pr-5 py-4 bg-[#393536]/5 dark:bg-white/5 border-2 border-transparent rounded-2xl outline-none text-sm font-semibold text-[#393536] dark:text-white focus:border-[#EEB30D]/20 focus:bg-white dark:focus:bg-[#393536] transition-all appearance-none cursor-pointer"
                      >
                        <option value="Full Stack (MERN)">Full Stack (MERN)</option>
                        <option value="Next.js & Cloud">Next.js & Cloud</option>
                        <option value="UI/UX Engineering">UI/UX Engineering</option>
                      </select>
                      <span className="absolute right-5 text-[#949293] pointer-events-none text-xs">▼</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                disabled={isLoading}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="w-full bg-[#EEB30D] text-[#393536] font-black py-4.5 rounded-2xl shadow-lg shadow-[#EEB30D]/10 hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-h-[56px] text-sm uppercase tracking-wider mt-2"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-[#393536]" size={20} />
                ) : (
                  <>Get Started <ArrowRight size={18} strokeWidth={2.5} /></>
                )}
              </motion.button>
              <div className="text-center mt-4">
                <p className="text-sm text-[#949293] font-medium">
                  Do you have an account?{' '}
                  <Link href="/login" className="text-[#EEB30D] hover:underline font-bold">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
          
        </div>
        
      </motion.div>
     
    </div>
  );
}

function RoleButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${
        active ? 'text-[#393536] dark:text-white' : 'text-[#949293]'
      }`}
    >
      {icon} 
      <span>{label}</span>
    </button>
  );
}

interface FloatingInputProps {
  label: string;
  type: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function FloatingInput({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  isPassword = false, 
  showPassword = false, 
  onTogglePassword 
}: FloatingInputProps) {
  return (
    <div className="group space-y-1.5">
      <label className="text-[11px] font-black uppercase tracking-widest text-[#949293] block px-1 group-focus-within:text-[#EEB30D] transition-colors duration-200">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-5 text-[#949293] group-focus-within:text-[#EEB30D] transition-colors duration-200">
          {icon}
        </span>
        <input 
          required
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-[#393536]/5 dark:bg-white/5 border-2 border-transparent rounded-2xl focus:bg-white dark:focus:bg-[#393536] focus:border-[#EEB30D]/30 outline-none text-sm font-medium transition-all text-[#393536] dark:text-white placeholder-[#949293]/60"
        />
        
        {/* Eye/EyeOff Icon Trigger */}
        {isPassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 p-1.5 rounded-xl text-[#949293] hover:bg-[#393536]/5 dark:hover:bg-white/5 hover:text-[#393536] dark:hover:text-white transition-all outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}