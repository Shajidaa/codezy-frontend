'use client';


import { Terminal, Code2, Cpu, Laptop, Binary, Brackets, Blocks, Database, ArrowRight, 
         Sparkles, Rocket, Star, Gamepad2, Bot, Smile, Brain, Trophy, 
         Code,
         CodeSquare} from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  
  return (
    <section className="relative w-full overflow-hidden bg-brand-white">
      {/* Main Container */}
      <div 
        className="relative flex 
         flex-col items-center justify-center bg-brand-dark  pb-8 pt-10 text-center"
        style={{ 
          clipPath: 'ellipse(100% 85% at 50% 15%)' 
        }}
      >
        
        {/* Animated Background Elements - Kid-Friendly Fun */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          
          {/* Floating Emojis & Characters */}
          <div className="absolute top-[5%] left-[3%] animate-float-bounce">
            <div className="text-4xl">🚀</div>
          </div>
          
          <div className="absolute top-[15%] right-[4%] animate-float-spin">
            <div className="text-5xl">⭐</div>
          </div>
          
          <div className="absolute bottom-[30%] left-[2%] animate-wiggle">
            <Bot size={45} className="text-brand-white opacity-20" />
          </div>
          
          <div className="absolute top-[40%] right-[8%] animate-bounce-gentle">
            <Smile size={50} className="text-brand-white opacity-15" />
          </div>
          
          <div className="absolute bottom-[15%] right-[5%] animate-float-delayed">
            <Gamepad2 size={42} className="text-brand-white opacity-12" />
          </div>

          {/* Original Tech Icons with Enhanced Animations */}
          <div className="absolute top-[8%] left-[15%] animate-float-slow">
            <Terminal size={48} className="text-brand-white opacity-10 animate-spin-slow" />
          </div>
          
          <div className="absolute top-[30%] left-[8%] animate-float-medium">
            <Code2 size={70} className="text-brand-white opacity-20 animate-pulse-gentle" />
          </div>
          
          <div className="absolute top-[55%] left-[12%] animate-float-fast">
            <Blocks size={45} className="text-brand-white opacity-10 animate-bounce-subtle" />
          </div>
          
          <div className="absolute bottom-[25%] left-[20%] animate-slide-horizontal">
            <Cpu size={40} className="text-brand-white opacity-15 animate-rotate-slow" />
          </div>

          <div className="absolute top-[10%] right-[12%] animate-float-medium">
            <Brackets size={55} className="text-brand-white opacity-10 animate-rotate-reverse" />
          </div>
          
          <div className="absolute top-[35%] right-[6%] animate-float-fast">
            <Laptop size={65} className="text-brand-white opacity-20 animate-pulse-gentle" />
          </div>
          
          <div className="absolute top-[70%] right-[15%] animate-float-slow">
            <Database size={42} className="text-brand-white opacity-15 animate-spin-slow" />
          </div>
          
          <div className="absolute bottom-[20%] right-[10%] animate-bounce-gentle">
            <Binary size={50} className="text-brand-white opacity-10 animate-rotate-slow" />
          </div>

          {/* Fun Addition - Floating Code Snippets */}
          <div className="absolute top-[20%] left-[25%] animate-code-float">
            <div className="bg-brand-gold/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono text-brand-gold opacity-50">
              {'<div>Hello</div>'}
            </div>
          </div>
          
          <div className="absolute bottom-[40%] right-[22%] animate-code-float-delayed">
            <div className="bg-brand-gold/10 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-mono text-brand-gold opacity-45">
              {'print("Coding Fun!")'}
            </div>
          </div>

          {/* Sparkle Particles */}
          {/* {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Sparkles size={12 + Math.random() * 8} className="text-brand-gold opacity-90" />
            </div>
          ))} */}

          {/* Center Pulse Effect */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring">
            <div className="w-64 h-64 rounded-full border-2 border-brand-gold/5"></div>
          </div>
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring-delayed">
            <div className="w-96 h-96 rounded-full border-2 border-brand-gold/3"></div>
          </div>
        </div>

        {/* Main Content with Fun Animations */}
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Fun Badge Above Title */}
          <div className="animate-slide-down mb-4">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-gold/20">
              <Rocket size={18} className="text-brand-gold animate-bounce-subtle" />
              <span className="text-brand-gold text-sm font-semibold">Learn to Code & Have Fun!</span>
              <Star size={14} className="text-brand-gold animate-spin-slow" />
            </div>
          </div>

          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[8px_8px_0px_rgba(0,0,0,0.5)] leading-tight">
              Master Your Craft with <br />
              <span className="text-[#FFD700] inline-block animate-text-shimmer bg-gradient-to-r from-[#FFD700] via-[#FFF5CC] to-[#FFD700] bg-clip-text text-transparent bg-[length:200%_auto] hover:scale-105 transition-transform duration-300 inline-block">
                Codezy
              </span> Excellence
              <span className="inline-block animate-wave-hand ml-2"><CodeSquare /></span>
            </h1>
          </div>
          
          <div className="animate-slide-up animation-delay-200 max-w-2xl">
            <p className="text-brand-gray text-lg md:text-xl mb-6 leading-relaxed animate-fade-in">
              Where <span className="text-brand-gold font-semibold inline-block animate-bounce-subtle">kids</span> discover the magic of coding and{' '}
              <span className="text-brand-gold font-semibold inline-block animate-pulse-gentle">adults</span> advance their careers!
            </p>
            <p className="text-brand-gray/80 text-base md:text-lg mb-10 leading-relaxed">
              Build games, apps, and websites with the world's best instructors. 
              Join our community of 10,000+ happy learners!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
            <Link href="/courses" 
              className="group bg-brand-gold text-brand-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20 hover:shadow-2xl hover:shadow-brand-gold/40">
              <span>Start Learning Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
      
            </Link>
            <Link href="/booking" 
              className="group border-2 bg-amber-50 border-brand-dark text-brand-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-gold hover:text-brand-white hover:border-brand-gold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2">
              <span>Book a Free Demo</span>
              <Brain size={18} className="group-hover:animate-pulse-gentle" />
            </Link>
          </div>

          {/* Fun Stats Bar */}
          {/* <div className="mt-12 flex flex-wrap justify-center gap-8 animate-slide-up animation-delay-600">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-brand-gold">10K+</div>
              <div className="text-xs text-brand-gray">Happy Students</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-brand-gold">500+</div>
              <div className="text-xs text-brand-gray">Interactive Lessons</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-brand-gold">24/7</div>
              <div className="text-xs text-brand-gray">Mentor Support</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* CSS Animations - Using global styles instead of styled-jsx */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(-12px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(18px); }
        }
        
        @keyframes float-bounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        @keyframes float-spin {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-22px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes slide-horizontal {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes wave-hand {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes code-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-15px) rotate(2deg); opacity: 0.5; }
        }
        
        /* Animation Classes */
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3.5s ease-in-out infinite; }
        .animate-float-bounce { animation: float-bounce 4s ease-in-out infinite; }
        .animate-float-spin { animation: float-spin 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5.5s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2.5s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 3s ease-in-out infinite; }
        .animate-slide-horizontal { animation: slide-horizontal 6s ease-in-out infinite; }
        .animate-spin-slow { animation: rotate-slow 12s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 10s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 15s linear infinite; }
        .animate-rotate-reverse { animation: spin-reverse 8s linear infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-out infinite; }
        .animate-pulse-ring-delayed { animation: pulse-ring 3s ease-out infinite 1.5s; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-slide-down { animation: slide-down 0.6s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-text-shimmer { animation: text-shimmer 3s linear infinite; background-size: 200% auto; }
        .animate-wave-hand { animation: wave-hand 2s ease-in-out infinite; transform-origin: center; display: inline-block; }
        .animate-code-float { animation: code-float 4s ease-in-out infinite; }
        .animate-code-float-delayed { animation: code-float 4.5s ease-in-out infinite 1s; }
        
        /* Animation Delays */
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
}