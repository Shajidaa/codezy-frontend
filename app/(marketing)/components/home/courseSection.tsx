"use client";
import React, { useState, useEffect } from 'react';
import { Search, Code, Layout, Palette, Braces, Database, Sparkles, TrendingUp, Users, Clock, BookOpen, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// 1. Icon Mapping System
// Since the backend stores strings, we map them back to Lucide components here
const IconMap: Record<string, React.ReactNode> = {
  code: <Code size={24} />,
  layout: <Layout size={24} />,
  palette: <Palette size={24} />,
  braces: <Braces size={24} />,
  database: <Database size={24} />,
  sparkles: <Sparkles size={24} />,
  book: <BookOpen size={18} />,
  trending: <TrendingUp size={18} />
};

// Types for the Course Data
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
  iconName: string; // Stored as "code", "database", etc.
  color: string;
  image: string;
  imageAlt: string;
}

const categories = [
  { id: "all", name: "Popular", icon: "trending" },
  { id: "Web Development", name: "Web Development", icon: "code" },
  { id: "Data Science", name: "Data Science", icon: "database" },
  { id: "Computer Science", name: "Computer Science", icon: "book" },
  { id: "AI", name: "AI", icon: "sparkles" },
];

const LevelBadge: React.FC<{ level: string }> = ({ level }) => {
  const isBeginner = level === "BEGINNER";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isBeginner ? 'bg-[#EEB30D]/10 text-[#EEB30D]' : 'bg-[#949293]/20 text-[#949293]'
    }`}>
      {level}
    </span>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use MongoDB _id if available, otherwise fall back to standard id
  const courseId = course._id || course.id;

  return (
    
    <Link href={`/courses/${courseId}`} className="block group">
      <div className="relative bg-[#FFFFFF] dark:bg-[#393536] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#949293]/20 hover:-translate-y-1 h-full">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#949293]/10 to-[#949293]/5">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#EEB30D] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={course.image}
            alt={course.imageAlt}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#393536]/60 via-transparent to-transparent" />
          
          <div className={`absolute bottom-3 left-3 p-2 rounded-xl bg-gradient-to-br ${course.color} shadow-lg`}>
            {IconMap[course.iconName] || <Code size={20} />}
            <LevelBadge level={course.level} />
          </div>
          
          {course.isNew && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EEB30D] text-[#393536] shadow-lg">
                NEW!
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-[#393536] dark:text-[#FFFFFF] mb-2 group-hover:text-[#EEB30D] transition-colors line-clamp-1">
              {course.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-[#949293]">
              <div className="flex items-center gap-1"><Clock size={14} /><span className="whitespace-nowrap">{course.duration}</span></div>
              <div className="flex items-center gap-1"><Users size={14} /><span>{course.students.toLocaleString()}</span></div>
              <div className="flex items-center gap-1"><Star size={14} className="text-[#EEB30D] fill-[#EEB30D]" /><span>{course.rating}</span></div>
            </div>
          </div>
          <p className="text-[#949293] text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#949293]/10">
          
            
            <div className="text-sm font-medium text-[#EEB30D] hover:text-[#EEB30D]/80 transition-colors flex items-center gap-1 group-hover:gap-2">
              View Course
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <Link href={'/booking'} className="text-sm font-medium text-[#EEB30D] hover:text-[#EEB30D]/80 transition-colors flex items-center gap-1 group-hover:gap-2">
             Free Booking
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CourseSection: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
       
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative">
      <section className="relative py-16 px-4 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/95 dark:from-[#393536] dark:to-[#393536]/95 overflow-hidden min-h-screen">
        {/* Bottom curve SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[50px] md:h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
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

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#949293]" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#949293]/20 bg-[#FFFFFF] dark:bg-[#393536] text-[#393536] dark:text-[#FFFFFF] focus:ring-2 focus:ring-[#EEB30D] outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeCategory === cat.id ? 'bg-[#EEB30D] text-[#393536] shadow-lg shadow-[#EEB30D]/20' : 'bg-[#FFFFFF] dark:bg-[#393536] text-[#949293] border border-[#949293]/20 hover:bg-[#EEB30D]/5'
                  }`}
                >
                  {IconMap[cat.icon]}
                  {cat.name}
                </button>
              ))}
            </div>
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
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => <CourseCard key={course._id || course.id} course={course} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto mb-4 text-[#949293]" />
              <h3 className="text-xl font-semibold text-[#393536] dark:text-[#FFFFFF]">No courses found</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseSection;