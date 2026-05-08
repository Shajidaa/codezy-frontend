import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, ArrowRight, Star } from 'lucide-react';
import { DUMMY_COURSES } from '@/app/types/course';

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans">
      {/* Hero Header Section */}
      <section className="bg-[#393536] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-[#EEB30D] text-[#393536] text-sm font-bold mb-6 uppercase tracking-widest">
            Future Coders Academy
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Master the Art of <span className="text-[#EEB30D]">Innovation.</span>
          </h1>
          <p className="text-[#949293] text-lg md:text-xl max-w-2xl mx-auto">
            Professional coding courses designed for kids and teens. Start building games, apps, and robots today.
          </p>
        </div>
      </section>

      {/* Main Course Grid */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DUMMY_COURSES.map((course) => {
            const IconComponent = course.icon;
            
            return (
              <div 
                key={course.id}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#393536]/80 backdrop-blur-md text-white p-2 rounded-xl">
                    <IconComponent size={20} className="text-[#EEB30D]" />
                  </div>
                  {/* Floating Level Tag */}
                  <div className="absolute bottom-4 right-4 bg-[#EEB30D] text-[#393536] px-3 py-1 rounded-lg text-xs font-black uppercase">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#949293] text-xs font-bold uppercase tracking-tighter">
                      Target: {course.ageRange}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#393536] mb-4 group-hover:text-[#EEB30D] transition-colors leading-tight min-h-[3.5rem]">
                    {course.title}
                  </h3>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-[#949293]">
                      <Clock size={14} />
                      <span className="text-xs font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#949293]">
                      <BookOpen size={14} />
                      <span className="text-xs font-medium">{course.lessons} Lessons</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/courses/${course.id}`}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-[#393536] text-white rounded-xl font-bold hover:bg-[#EEB30D] hover:text-[#393536] transition-all group/btn"
                  >
                    View Curriculum
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}