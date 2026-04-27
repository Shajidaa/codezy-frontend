import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span className="text-sm font-medium">New Courses for 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tight">
              Master Your Craft with <br />
              <span className="text-brand-gold">Codezy</span> Excellence
            </h1>
            
            <p className="max-w-2xl text-brand-gray text-lg md:text-xl mb-10 leading-relaxed">
              Build high-performance applications with the world’s best instructors. 
              Join a community of developers pushing the boundaries of web technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-gold text-brand-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20">
                Start Learning Now <ArrowRight size={20} />
              </button>
              <button className="border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark hover:text-brand-white transition-all">
                Browse Library
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-brand-white p-8 rounded-2xl shadow-sm border border-brand-gray/10 hover:border-brand-gold/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-dark rounded-lg flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Project Based</h3>
              <p className="text-brand-gray">
                Learn by building real-world applications using MERN, Next.js, and TypeScript.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-white p-8 rounded-2xl shadow-sm border border-brand-gray/10 hover:border-brand-gold/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-dark rounded-lg flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Expert Mentors</h3>
              <p className="text-brand-gray">
                Get direct feedback from industry professionals and experienced developers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-white p-8 rounded-2xl shadow-sm border border-brand-gray/10 hover:border-brand-gold/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-dark rounded-lg flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Live Sessions</h3>
              <p className="text-brand-gray">
                Join our interactive weekly workshops and Q&A sessions to solve your doubts.
              </p>
            </div>
          </div>
        </div>
      </section>

  
    </div>
  );
}