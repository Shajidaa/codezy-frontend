import React from 'react';
import { Terminal, Code2, Cpu, Laptop, Binary, Brackets, Blocks, Database,
     ArrowRight, 
     } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-white">
      {/* Main Container */}
      <div 
        className="relative flex min-h-150 flex-col items-center justify-center bg-brand-dark px-6 pb-24 pt-20 text-center"
        style={{ 
          clipPath: 'ellipse(100% 85% at 50% 15%)' 
        }}
      >
        
        {/* Background Icons - Distributed and Balanced */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Left Side */}
          <div className="absolute top-[10%] left-[5%] opacity-10 text-brand-white -rotate-12"><Terminal size={48} /></div>
          <div className="absolute top-[35%] left-[12%] opacity-20 text-brand-white rotate-12 animate-pulse"><Code2 size={70} /></div>
          <div className="absolute top-[60%] left-[8%] opacity-10 text-brand-white -rotate-45"><Blocks size={45} /></div>
          <div className="absolute bottom-[20%] left-[18%] opacity-15 text-brand-white"><Cpu size={40} /></div>

          {/* Right Side */}
          <div className="absolute top-[12%] right-[6%] opacity-10 text-brand-white rotate-12"><Brackets size={55} /></div>
          <div className="absolute top-[38%] right-[14%] opacity-20 text-brand-white -rotate-12 animate-pulse"><Laptop size={65} /></div>
          <div className="absolute top-[65%] right-[10%] opacity-15 text-brand-white rotate-45"><Database size={42} /></div>
          <div className="absolute bottom-[25%] right-[20%] opacity-10 text-brand-white"><Binary size={50} /></div>

          {/* Center-ish subtle accents */}
          <div className="absolute top-[5%] left-[50%] -translate-x-1/2 opacity-5 text-brand-white"><Code2 size={120} /></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Master Your Craft with <br />
              <span className="text-brand-gold">Codezy</span> Excellence
            </h1>
            
            <p className="max-w-2xl text-brand-gray text-lg md:text-xl mb-10 leading-relaxed">
              Build high-performance applications with the world’s best instructors. 
              Join a community of developers pushing the boundaries of web technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="bg-brand-gold text-brand-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20">
                Start Learning Now <ArrowRight size={20} />
              </Link>
              <Link href="/DemoBooking" className="border-2 bg-amber-50 border-brand-dark
               text-brand-dark px-8 py-4 rounded-xl font-bold text-lg
                hover:bg-brand-gold hover:text-brand-white transition-all">
                Book a Free Demo
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}