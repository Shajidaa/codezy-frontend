'use client';

import React from 'react';
import { Code2, Trophy, Briefcase, Users, ArrowRight, Star, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Code2 size={28} strokeWidth={1.5} />,
      title: "Level up your learning",
      description: "Master Python, JavaScript, HTML, and more with real-world projects. Earn verified certificates and unlock achievement badges.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      alt: "Developer coding on laptop",
      stats: "15+ languages",
      badge: "Most Popular"
    },
    {
      icon: <Trophy size={28} strokeWidth={1.5} />,
      title: "Practice your coding chops",
      description: "Challenge yourself with 500+ algorithmic problems. Sharpen your skills with instant feedback and detailed solutions.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      alt: "Code on screen",
      stats: "500+ challenges",
      badge: "New"
    },
    {
      icon: <Briefcase size={28} strokeWidth={1.5} />,
      title: "Build an awesome portfolio",
      description: "Create production-ready applications. Showcase your work on GitHub, Behance, or LinkedIn with our builder tools.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      alt: "Portfolio projects showcase",
      stats: "50+ templates",
      badge: "Featured"
    },
    {
      icon: <Users size={28} strokeWidth={1.5} />,
      title: "Join a motivating community",
      description: "Connect with 50,000+ developers worldwide. Participate in hackathons and pair programming sessions.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      alt: "Developers collaborating",
      stats: "50k+ members",
      badge: "Active"
    }
  ];





  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" // TypeScript now knows this is a valid Easing value
      }
    }
  };

  return (
    <section className="bg-brand-dark py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-5 py-2 rounded-full mb-5 border border-brand-gold/20">
            <TrendingUp size={16} className="text-brand-gold" />
            <span className="text-sm font-semibold text-brand-gold">Trusted by 50,000+ developers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-5 tracking-tight">
            Everything you need to
            <span className="text-brand-gold block mt-2">accelerate your career</span>
          </h2>
          
          <p className="text-brand-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who leveled up their skills with our comprehensive learning platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
            
              className="group relative bg-brand-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.alt}
                 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    {feature.badge}
                  </span>
                </div>
                
                <div className="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-white/10 rounded-lg px-3 py-1.5 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-brand-gold" />
                    <span className="text-white text-xs font-semibold">{feature.stats}</span>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <Link 
                      href="/courses" 
                      className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm uppercase tracking-widest group/link"
                    >
                      <span>Explore path</span>
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/courses" 
              className="bg-brand-gold text-brand-dark px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-brand-gold/20"
            >
              Start Learning Now
            </Link>
            
            <Link 
              href="/pricing" 
              className="flex items-center gap-2 text-brand-gray font-semibold hover:text-brand-dark transition-colors"
            >
              View pricing plans
              <Star size={18} className="text-brand-gold" />
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm font-medium text-brand-gray/70">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> 14-day free trial
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}