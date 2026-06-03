"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Users, Star, ArrowLeft, BookOpen, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Types match your course item architecture
interface Course {
  _id?: string;
  id: number;
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  isNew: boolean;
  iconName: string;
  color: string;
  image: string;
  imageAlt: string;
}

const CourseDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id; // Dynamic route parameter matching [id]

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
   
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`);
        if (!response.ok) throw new Error("Course not found");
        
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        console.error("Fetch details error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#393536] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#EEB30D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#393536] flex flex-col items-center justify-center p-4">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-[#393536] dark:text-[#FFFFFF] mb-2">Course Not Found</h2>
        <p className="text-[#949293] mb-6 text-center max-w-sm">The course you are looking for might have been removed or the backend server is unreachable.</p>
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-6 py-3 bg-[#EEB30D] text-[#393536] font-semibold rounded-xl shadow-lg hover:bg-[#EEB30D]/90 transition-all"
        >
          <ArrowLeft size={18} /> Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#393536] text-[#393536] dark:text-[#FFFFFF] pb-16">
      {/* Header Banner Segment */}
      <div className="relative bg-gradient-to-br from-[#393536] to-[#1e1b1c] py-12 md:py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm text-[#949293] hover:text-[#EEB30D] transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to home
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEB30D] text-[#393536]">
              {course.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10">
              {course.level}
            </span>
            {course.isNew && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white animate-pulse">
                NEW RELEASE
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight max-w-3xl">
            {course.title}
          </h1>

          <p className="text-lg text-[#949293] max-w-3xl mb-6 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#EEB30D]" />
              <span>{course.duration} Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#EEB30D]" />
              <span>{course.students.toLocaleString()} Active Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#EEB30D] fill-[#EEB30D]" />
              <span className="font-bold">{course.rating} / 5.0 Rating</span>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative grid background layer */}
        <div className="absolute inset-0 bg-[radial-gradient(#949293_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      {/* Main Content Layout Block */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Visual overview details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-2xl overflow-hidden border border-[#949293]/20 shadow-xl bg-gray-100 dark:bg-[#1e1b1c] aspect-video">
              <img 
                src={course.image} 
                alt={course.imageAlt} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="border border-[#949293]/20 bg-white dark:bg-[#393536] p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-[#EEB30D]" size={22} /> What you will master in this lesson
              </h3>
              <ul className="space-y-3">
                {[
                  "Core underlying programmatic fundamentals and best development patterns.",
                  "Real-world lab execution scenarios structured around actual ecosystem challenges.",
                  "Production-grade techniques verified directly by technical field authorities."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#949293]">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Interaction Action Panel Box */}
          <div className="space-y-6">
            <div className="border border-[#949293]/20 bg-white dark:bg-[#2d292a] p-6 rounded-2xl shadow-xl sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#949293]">Access Type</span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> 100% FREE
                </span>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-extrabold">$0.00</span>
                <span className="text-xs text-[#949293] block mt-1">Full interactive codebase configuration inclusions</span>
              </div>

              <Link 
                href="/booking" 
                className="block text-center w-full bg-[#EEB30D] hover:bg-[#EEB30D]/90 text-[#393536] font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-[0.98] shadow-md shadow-[#EEB30D]/20 mb-4"
              >
                Claim Free Live Booking
              </Link>

              <p className="text-xs text-center text-[#949293] leading-relaxed">
                No credit cards required. Instantly secure interactive seat access using public sandbox credentials.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;