import React from 'react';
import { Sparkles } from 'lucide-react';

export function BrandSection() {
  return (
    <div className="w-full lg:w-[42%] bg-[#393536] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden min-h-[300px] lg:min-h-auto">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#949293 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#EEB30D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <Logo />
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
}

function Logo() {
  return (
    <div className="text-[#EEB30D] text-2xl font-black tracking-tighter mb-12 flex items-center gap-2">
      <div className="w-9 h-9 bg-[#EEB30D] rounded-xl flex items-center justify-center text-[#393536] shadow-lg shadow-[#EEB30D]/20 animate-pulse">
        <Sparkles size={18} fill="currentColor" />
      </div>
      CODEZY
    </div>
  );
}