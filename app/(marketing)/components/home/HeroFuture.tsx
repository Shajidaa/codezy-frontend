"use client"; // Required for Framer Motion in Next.js App Router

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaCode } from 'react-icons/fa';

// Animation Variants for reusability
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const FeaturePoint = ({ text }: { text: string }) => (
  <motion.li 
    variants={fadeInUp}
    className="flex items-start gap-3 group"
  >
    <FaCheckCircle className="text-brand-gold mt-1 shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
    <span className="text-brand-gray text-sm lg:text-base leading-relaxed group-hover:text-brand-white transition-colors">
      {text}
    </span>
  </motion.li>
);

export default function HeroFuture() {
  return (
    <section className="bg-brand-dark py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Visual Assets with subtle floating animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-gold/10 blur-[120px] rounded-full animate-pulse" />
          
          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image 
                src="/Boy.png" 
                width={500}
                height={500}
                alt="Learning Future"
                className="object-contain drop-shadow-[0_20px_50px_rgba(238,179,13,0.2)]"
                priority
              />
            </motion.div>
            
            {/* Animated Badge */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -right-4 lg:right-0 bg-gradient-to-br from-brand-gold to-[#d4a00b] p-6 rounded-2xl shadow-2xl max-w-[280px] hover:rotate-1 transition-transform cursor-default"
            >
              <p className="text-brand-dark font-bold text-sm lg:text-base leading-tight">
                Fosters computational thinking and problem-solving abilities through STEAM education
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Content with staggered entry */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <header className="space-y-4">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-bold uppercase tracking-widest"
            >
              <FaRocket className="animate-bounce" /> Next-Gen Learning
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-black text-brand-white leading-[1.1]">
              Prepare Kids Ready for <br />
              <span className="text-brand-gold italic">The Future</span>
            </motion.h2>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-1.5 bg-brand-gold rounded-full" 
            />
          </header>

          <motion.div variants={fadeInUp} className="space-y-6 text-brand-gray border-l-2 border-brand-gray/20 pl-4">
            <p className="leading-relaxed">
              At <span className="text-brand-white font-semibold">Codezy Academy</span>, our mission is to provide crucial skills and knowledge that will add value to your child&#39;s future career prospects. 
            </p>
            <p className="leading-relaxed">
              Equipping children with the skills they need for their future careers is our priority.
            </p>
          </motion.div>

          <motion.ul variants={staggerContainer} className="grid grid-cols-1 gap-4">
            <FeaturePoint text="Dynamic and future-ready educational experience." />
            <FeaturePoint text="Focus on Science, Technology, Engineering, Arts, and Mathematics." />
            <FeaturePoint text="Ensures access to various careers and global opportunities." />
          </motion.ul>
        </motion.div>

      </div>
    </section>
  );
}