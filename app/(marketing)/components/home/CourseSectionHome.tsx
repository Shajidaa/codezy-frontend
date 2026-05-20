"use client";
import { Course } from '@/app/types/course';
import { AlertCircle,  Sparkles } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import CourseCard from '../Card/CourseCard';
import Link from 'next/link';



const CourseSectionHome: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
       
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

 

  return (
    <div className="relative">
      <section className="relative py-16 px-4 
      bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/95
       dark:from-[#393536] dark:to-[#393536]/95 overflow-hidden min-h-screen">
        {/* Bottom curve SVG */}
        <div className="absolute bottom-0 left-0 
        w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[150px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#EEB30D] opacity-20"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEB30D]/10 text-[#EEB30D] text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>250+ hours of content</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#393536] to-[#949293] dark:from-[#FFFFFF] dark:to-[#949293] bg-clip-text text-transparent mb-4">
              Explore free interactive coding lessons
            </h1>
            <p className="text-lg text-[#949293] max-w-2xl mx-auto">
              Learn to code with fun, interactive courses handcrafted by industry experts.
            </p>
          </div>


          {/* Conditional Rendering */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map(n => <div key={n} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl" />)}
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">
               <AlertCircle size={48} className="mx-auto mb-4" />
               <p>Unable to load courses. Please check if the backend is running.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => <CourseCard
               key={course._id || course.id} course={course} />)}
            </div>
          ) }
        </div>
        <div className='flex justify-center items-center mt-12 mb-12'>
  <Link href="/courses" className="inline-flex
    items-center gap-2 text-[#EEB30D] text-center
    p-2 justify-center border border-[#EEB30D] hover:bg-[#EEB30D] hover:text-white transition-colors">
              View All Courses
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
        </div>
 
      </section>
    </div>
  );
};

export default CourseSectionHome;