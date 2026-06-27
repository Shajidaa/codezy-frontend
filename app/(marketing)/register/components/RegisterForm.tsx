"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, GraduationCap, Presentation, Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { BrandSection } from './BrandSection';
import { RoleButton } from './RoleButton';
import { FloatingInput } from './FloatingInput';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { UserRole } from '../types';
import { EXPERTISE_OPTIONS } from '../utils/constants';

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  
  const { formData, updateField } = useRegisterForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const callbackUrl = searchParams.get("callbackUrl") || 
      (role === 'teacher' ? "/dashboard/teacher" : "/dashboard/student");

    try {
      // 1. Register the user
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 409) {
          toast.error('This email is already registered. Please login instead.');
        } else {
          throw new Error(data.message || "Registration failed");
        }
        setIsLoading(false);
        return;
      }

      // 2. Sign in the user
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      console.log("SignIn result:", result);

      // 3. Check if sign in was successful
      if (result?.error) {
        toast.error(`Login failed: ${result.error}. Please try logging in manually.`);
        setIsLoading(false);
        return;
      }

      // 4. Success! Show toast and redirect
      if (result?.ok) {
        // Show success toast
        toast.success(`Welcome, ${formData.name}! 🎉`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Wait for toast to be visible before redirecting
        setTimeout(() => {
          router.push(callbackUrl);
        }, 1500); // Increased delay to let user see the toast
      }
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl bg-white dark:bg-[#2d292a] rounded-[2.5rem] shadow-2xl border border-[#949293]/10 overflow-hidden flex flex-col lg:flex-row relative z-10"
    >
      <BrandSection />

      <div className="w-full lg:w-[58%] p-8 md:p-16 bg-white dark:bg-[#2d292a] flex items-center">
        <div className="max-w-md w-full mx-auto">
          <FormHeader />
          
          <RoleSelector role={role} setRole={setRole} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <FloatingInput 
                label="Full Name" 
                type="text" 
                value={formData.name} 
                onChange={(v) => updateField('name', v)} 
                placeholder="Shajida Akter" 
                icon="user"
              />
              
              <FloatingInput 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={(v) => updateField('email', v)} 
                placeholder="name@example.com" 
                icon="mail"
              />
              
              <FloatingInput 
                label="Age" 
                type="number" 
                value={formData.age} 
                onChange={(v) => updateField('age', v)} 
                placeholder="18"
                icon="user"
              />
              
              <FloatingInput 
                label="School" 
                type="text" 
                value={formData.school} 
                onChange={(v) => updateField('school', v)} 
                placeholder="Your School" 
                icon="graduation"
              />
              
              <FloatingInput 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={(v) => updateField('password', v)} 
                placeholder="••••••••" 
                icon="lock"
                isPassword
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </div>

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
                    <span className="absolute left-5 text-[#949293]">
                      <Briefcase size={18} />
                    </span>
                    <select 
                      value={formData.expertise} 
                      onChange={(e) => updateField('expertise', e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-[#393536]/5 dark:bg-white/5 border-2 border-transparent rounded-2xl outline-none text-sm font-semibold text-[#393536] dark:text-white focus:border-[#EEB30D]/20 focus:bg-white dark:focus:bg-[#393536] transition-all appearance-none cursor-pointer"
                    >
                      {EXPERTISE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-5 text-[#949293] pointer-events-none text-xs">▼</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <SubmitButton isLoading={isLoading} />
            
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
  );
}

// Sub-components
function FormHeader() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-black text-[#393536] dark:text-white tracking-tight">
        Create Account
      </h1>
      <p className="text-[#949293] font-semibold mt-1">
        Start your journey today.
      </p>
    </header>
  );
}

function RoleSelector({ role, setRole }: { role: UserRole; setRole: (role: UserRole) => void }) {
  return (
    <div className="flex p-1.5 bg-[#393536]/5 dark:bg-white/5 rounded-2xl mb-8 relative border border-[#949293]/10">
      <motion.div 
        layoutId="activeTab"
        className="absolute inset-1.5 w-[calc(50%-6px)] bg-white dark:bg-[#393536] rounded-xl shadow-md"
        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        style={{ left: role === 'student' ? '6px' : 'calc(50%)' }}
      />
      <RoleButton 
        active={role === 'student'} 
        onClick={() => setRole('student')} 
        icon={<GraduationCap size={18}/>} 
        label="Student" 
      />
      <RoleButton 
        active={role === 'teacher'} 
        onClick={() => setRole('teacher')} 
        icon={<Presentation size={18}/>} 
        label="Teacher" 
      />
    </div>
  );
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
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
  );
}