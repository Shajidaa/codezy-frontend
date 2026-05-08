
import { ArrowRight, BookOpen, Code2, Sparkles } from 'lucide-react';
import HeroSection from './components/home/HeroSection';
import Text from './components/home/Text';
import CourseSection from './components/home/courseSection';

export default function HomePage() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
     <Text/>
<CourseSection/>
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