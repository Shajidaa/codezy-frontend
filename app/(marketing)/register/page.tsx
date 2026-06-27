"use client";

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { RegisterForm } from './components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFDFD] dark:bg-[#1e1b1c] flex items-center justify-center p-4 md:pb-28 md:pt-28 font-sans transition-colors duration-300">
      <BackgroundDecoration />
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-100">
          <Loader2 className="animate-spin text-brand-gold" size={40} />
        </div>
      }>
        <RegisterForm />
      </Suspense>
    </div>
  );
}

function BackgroundDecoration() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
      <svg 
        className="relative block w-full h-37.5 md:h-20" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
          className="fill-brand-gold opacity-20"
        />
      </svg>
    </div>
  );
}