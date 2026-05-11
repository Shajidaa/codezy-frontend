'use client';

import React from 'react';
import { Code2, Trophy, Briefcase, Users, ArrowRight, Star, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Code2 size={28} strokeWidth={1.5} />,
      title: "Level up your learning",
      description: "Master Python, JavaScript, HTML, and more with real-world projects. Earn verified certificates and unlock achievement badges as you progress through our comprehensive curriculum.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      alt: "Developer coding on laptop",
      stats: "15+ languages",
      badge: "Most Popular"
    },
    {
      icon: <Trophy size={28} strokeWidth={1.5} />,
      title: "Practice your coding chops",
      description: "Challenge yourself with 500+ algorithmic problems and real-world scenarios. Sharpen your problem-solving skills with instant feedback and detailed solutions.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      alt: "Code on screen",
      stats: "500+ challenges",
      badge: "New"
    },
    {
      icon: <Briefcase size={28} strokeWidth={1.5} />,
      title: "Build an awesome portfolio",
      description: "Create production-ready applications, from freelance websites to mobile apps. Showcase your work on GitHub, Behance, or LinkedIn with our portfolio builder tools.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      alt: "Portfolio projects showcase",
      stats: "50+ templates",
      badge: "Featured"
    },
    {
      icon: <Users size={28} strokeWidth={1.5} />,
      title: "Join a motivating community",
      description: "Connect with 50,000+ developers worldwide. Participate in hackathons, code reviews, and pair programming sessions that accelerate your growth.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      alt: "Developers collaborating",
      stats: "50k+ members",
      badge: "Active"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-brand-white via-gray-50/30 to-brand-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 backdrop-blur-sm px-5 py-2 rounded-full mb-5 border border-brand-gold/20">
            <TrendingUp size={16} className="text-brand-gold" />
            <span className="text-sm font-semibold text-brand-gold">Trusted by 50,000+ developers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-5 tracking-tight">
            Everything you need to
            <span className="text-brand-gold block mt-2">accelerate your career</span>
          </h2>
          
          <p className="text-brand-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who leveled up their skills with our comprehensive learning platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.alt}
                 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {feature.badge}
                  </span>
                </div>
                
                {/* Stats Badge */}
                <div className="absolute bottom-4 left-4 z-10 backdrop-blur-md bg-black/50 rounded-lg px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-brand-gold" />
                    <span className="text-white text-xs font-semibold">{feature.stats}</span>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="p-2.5 bg-brand-gold/10 rounded-xl text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed text-base">
                      {feature.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <Link 
                      href="/courses" 
                      className="inline-flex items-center gap-2 mt-4 text-brand-gold font-medium text-sm hover:gap-3 transition-all duration-300"
                    >
                      <span>Explore path</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>Explore all learning paths</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 text-brand-gray font-medium px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              <span>View pricing plans</span>
              <Star size={16} />
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-brand-gray">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}