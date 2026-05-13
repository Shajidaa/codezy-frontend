"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Users, 
  Trophy, 
  Cpu, 
  Briefcase 
} from 'lucide-react';

const benefits = [
  {
    title: "Project-Based Learning",
    desc: "আমরা শুধু থিওরি শেখাই না, রিয়েল-ওয়ার্ল্ড প্রজেক্টের মাধ্যমে হাত কলমে কাজ শেখাই।",
    icon: <Rocket className="w-8 h-8" />,
  },
  {
    title: "Expert Mentorship",
    desc: "ইন্ডাস্ট্রি এক্সপার্টদের থেকে সরাসরি গাইডেন্স এবং সাপোর্ট পাওয়ার নিশ্চয়তা।",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Problem Solving",
    desc: "লজিক্যাল থিংকিং এবং ক্রিটিক্যাল প্রবলেম সলভিং স্কিল ডেভেলপমেন্ট।",
    icon: <Target className="w-8 h-8" />,
  },
  {
    title: "Modern Tech Stack",
    desc: "মার্কেট ডিমান্ড অনুযায়ী লেটেস্ট টেকনোলজি (Next.js, Python, AI) শেখানো হয়।",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function BenefitsSection() {
  return (
    <section className="bg-brand-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-brand-white text-3xl md:text-4xl font-bold mb-4">
            Why Join Our <span className="text-brand-gold">Bootcamp?</span>
          </h2>
          <p className="text-brand-gray max-w-2xl mx-auto">
            আমাদের কারিকুলাম এমনভাবে ডিজাইন করা হয়েছে যাতে আপনি বা আপনার সন্তান ভবিষ্যতের টেক লিডার হিসেবে গড়ে উঠতে পারে।
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-[#2a2728] border border-brand-gray/10 hover:border-brand-gold/30 transition-all group"
            >
              <div className="text-brand-gold mb-6 bg-brand-dark w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-brand-white text-xl font-bold mb-3">
                {benefit.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}