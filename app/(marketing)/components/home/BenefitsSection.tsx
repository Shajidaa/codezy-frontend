"use client";
import React, { JSX } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Users, 
  Trophy, 
  Cpu, 
  Briefcase 
} from 'lucide-react';
import { Benefit } from '@/app/types/course';



const benefits: Benefit[] = [
  {
    title: "Project-Based Learning",
    desc: "আমরা শুধু থিওরি শেখাই না, রিয়েল-ওয়ার্ল্ড প্রজেক্টের মাধ্যমে হাত কলমে কাজ শেখাই।",
    icon: <Rocket className="w-8 h-8" />,
  },
  {
    title: "Expert Mentorship",
    desc: "ইন্ডাস্ট্রি এক্সপার্টদের থেকে সরাসরি গাইডেন্স এবং সাপোর্ট পাওয়ার নিশ্চয়তা।",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Problem Solving",
    desc: "লজিক্যাল থিংকিং এবং ক্রিটিক্যাল প্রবলেম সলভিং স্কিল ডেভেলপমেন্ট।",
    icon: <Target className="w-8 h-8" />,
  },
  {
    title: "Modern Tech Stack",
    desc: "মার্কেট ডিমান্ড অনুযায়ী লেটেস্ট টেকনোলজি (Next.js, Python, AI) শেখানো হয়।",
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    title: "Career Support",
    desc: "লেভেল-২ স্টুডেন্টদের জন্য সিভি মেকিং এবং ইন্টারভিউ প্রিপারেশন গাইড।",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    title: "Certification",
    desc: "বুটক্যাম্প শেষে স্কিল ভেরিফাইড সার্টিফিকেট যা আপনার পোর্টফোলিওকে সমৃদ্ধ করবে।",
    icon: <Trophy className="w-8 h-8" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function BenefitsSection(): JSX.Element {
  return (
    <section className="relative bg-brand-dark py-24 px-6 overflow-hidden">
      
   
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 1440 320" className="w-full h-auto transform scale-150 md:scale-100">
          <path 
            fill="#EAB308" 
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-white text-3xl md:text-5xl font-extrabold mb-4"
          >
            Why Join Our <span className="text-brand-gold">Bootcamp?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-gray max-w-2xl mx-auto text-lg leading-relaxed font-medium"
          >
            আমাদের কারিকুলাম এমনভাবে ডিজাইন করা হয়েছে যাতে আপনি বা আপনার সন্তান ভবিষ্যতের টেক লিডার হিসেবে গড়ে উঠতে পারে।
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                backgroundColor: "rgba(42, 39, 40, 0.8)",
                transition: { duration: 0.2 }
              }}
              className="p-8 rounded-3xl bg-[#2a2728]/40 backdrop-blur-md border border-brand-gray/10 hover:border-brand-gold/40 transition-colors group shadow-2xl"
            >
              <div className="text-brand-gold mb-6 bg-brand-dark w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg border border-brand-gold/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-brand-white text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors">
                {benefit.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed font-normal opacity-90 group-hover:opacity-100">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}