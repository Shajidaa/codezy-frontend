import React from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaRocket, FaLightbulb, FaMicrochip } from 'react-icons/fa';

const FeaturePoint = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 group">
    <FaCheckCircle className="text-brand-gold mt-1 shrink-0 group-hover:scale-110 transition-transform" />
    <span className="text-brand-gray text-sm lg:text-base leading-relaxed group-hover:text-brand-white transition-colors">
      {text}
    </span>
  </li>
);

export default function HeroFuture() {
  return (
    <section className="bg-brand-dark py-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Visual Assets */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          {/* Decorative Background Glow */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <Image 
              src="/Boy.png" 
              width={500}
              height={500}
              alt="Learning Future"
              className="object-contain drop-shadow-2xl"
              priority
            />
            
            {/* Professional Floating Badge */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-gradient-to-br from-brand-gold to-[#d4a00b] p-6 rounded-2xl shadow-xl max-w-[280px] transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-brand-dark font-bold text-sm lg:text-base leading-tight">
                Fosters computational thinking and problem-solving abilities through STEAM education
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <FaRocket /> Next-Gen Learning
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-white leading-[1.1]">
              Prepare Kids Ready for <br />
              <span className="text-brand-gold italic">The Future</span>
            </h2>
            <div className="h-1.5 w-24 bg-brand-gold rounded-full" />
          </header>

          <div className="space-y-6 text-brand-gray">
            <p className="leading-relaxed border-l-2 border-brand-gray/20 pl-4">
              At <span className="text-brand-white font-semibold">Codezy Academy</span>, our mission is to provide crucial skills and knowledge that will add value to your child&#39;s future career prospects. 
            </p>
            
            <p className="leading-relaxed pl-4">
              Equipping children with the skills they need for their future careers is our priority. We offer curriculum designed to enhance technical capabilities while aligning with global educational aspirations.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <FeaturePoint text="Dynamic and future-ready educational experience enabling students to thrive in tech-driven society." />
            <FeaturePoint text="Focus on Science, Technology, Engineering, Arts, and Mathematics (STEAM) pathways." />
            <FeaturePoint text="Ensures access to various careers, empowering children to explore and excel in diverse fields." />
          </ul>
        </div>

      </div>
    </section>
  );
}