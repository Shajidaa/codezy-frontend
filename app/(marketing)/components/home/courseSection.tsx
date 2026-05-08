"use client";
import React from 'react';
import { Search, Code, Layout, Palette, Braces, Database, Sparkles, TrendingUp, Users, Clock, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';

// Dummy data for courses with images
const coursesData = [
  {
    id: 1,
    title: "Python",
    description: "Learn programming fundamentals such as variables, control flow, and loops with real-world projects.",
    level: "BEGINNER",
    category: "Computer Science",
    duration: "40 hours",
    students: 15234,
    rating: 4.8,
    isNew: false,
    icon: <Code size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
    imageAlt: "Python programming concept with code on screen"
  },
  {
    id: 2,
    title: "HTML",
    description: "Create your first website with HTML, the building blocks of the web and dive into semantic structure.",
    level: "BEGINNER",
    category: "Web Development",
    duration: "25 hours",
    students: 28456,
    rating: 4.9,
    isNew: false,
    icon: <Layout size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
    imageAlt: "HTML code on computer screen"
  },
  {
    id: 3,
    title: "CSS",
    description: "Learn to use CSS selectors and properties to stylize your HTML pages with colors, fonts, and animations.",
    level: "BEGINNER",
    category: "Web Development",
    duration: "35 hours",
    students: 21789,
    rating: 4.7,
    isNew: false,
    icon: <Palette size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
    imageAlt: "CSS styling and design concept"
  },
  {
    id: 4,
    title: "JavaScript",
    description: "Learn variables, loops, functions, and events to start building interactive web apps with modern JS.",
    level: "BEGINNER",
    category: "Web Development",
    duration: "50 hours",
    students: 19873,
    rating: 4.9,
    isNew: true,
    icon: <Braces size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop",
    imageAlt: "JavaScript code on editor"
  },
  {
    id: 5,
    title: "SQL",
    description: "Learn database basics, queries, calculations, and more to start managing and analyzing data like a pro.",
    level: "BEGINNER",
    category: "Data Science",
    duration: "30 hours",
    students: 12453,
    rating: 4.6,
    isNew: false,
    icon: <Database size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a164?w=800&h=600&fit=crop",
    imageAlt: "SQL database management"
  },
  {
    id: 6,
    title: "GitHub Copilot",
    description: "Learn how to use GitHub Copilot, your AI pair programmer, which helps you write code faster and smarter.",
    level: "INTERMEDIATE",
    category: "AI",
    duration: "15 hours",
    students: 8765,
    rating: 4.8,
    isNew: false,
    icon: <Sparkles size={24} />,
    color: "from-[#EEB30D] to-[#EEB30D]/80",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    imageAlt: "AI programming assistance concept"
  }
];

// Category filters with icons
const categories = [
  { id: "all", name: "Popular", icon: <TrendingUp size={18} /> },
  { id: "web", name: "Web Development", icon: <Code size={18} /> },
  { id: "data", name: "Data Science", icon: <Database size={18} /> },
  { id: "cs", name: "Computer Science", icon: <BookOpen size={18} /> },
  { id: "ai", name: "AI", icon: <Sparkles size={18} /> },
  { id: "game", name: "Game Development", icon: <Layout size={18} /> }
];

// Badge component for course level with brand colors
const LevelBadge: React.FC<{ level: string }> = ({ level }) => {
  const isBeginner = level === "BEGINNER";
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${isBeginner 
        ? 'bg-[#EEB30D]/10 text-[#EEB30D]' 
        : 'bg-[#949293]/20 text-[#949293]'
      }
    `}>
      {level}
    </span>
  );
};

// Course card component with brand colors
const CourseCard: React.FC<{ course: typeof coursesData[0] }> = ({ course }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="group relative bg-[#FFFFFF] dark:bg-[#393536] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#949293]/20 hover:-translate-y-1">
      {/* Image section */}
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
          className={`
            w-full h-full object-cover transition-all duration-500 group-hover:scale-105
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#393536]/60 via-transparent to-transparent" />
        
        {/* Icon overlay with brand gold */}
        <div className={`absolute bottom-3 left-3 p-2 rounded-xl bg-gradient-to-br ${course.color} shadow-lg`}>
          {React.cloneElement(course.icon, { size: 20, className: "text-[#393536]" })}
        </div>
        
        {/* New badge overlay with brand gold */}
        {course.isNew && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EEB30D] text-[#393536] shadow-lg">
              NEW!
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        {/* Title and stats */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#393536] dark:text-[#FFFFFF] mb-2 group-hover:text-[#EEB30D] transition-colors">
            {course.title}
          </h3>
          
          {/* Stats row with brand gray */}
          <div className="flex items-center gap-3 text-xs text-[#949293]">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-[#EEB30D] fill-[#EEB30D]" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Description with brand gray */}
        <p className="text-[#949293] text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        {/* Footer with brand colors */}
        <div className="flex items-center justify-between pt-3 border-t border-[#949293]/10">
          <LevelBadge level={course.level} />
          <Link href="/register" className="text-sm font-medium text-[#EEB30D] hover:text-[#EEB30D]/80 transition-colors flex items-center gap-1 group-hover:gap-2">
            Enroll Now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main component with brand colors
const CourseSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");

  // Filter courses based on search and category
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
                            (activeCategory === "web" && course.category === "Web Development") ||
                            (activeCategory === "data" && course.category === "Data Science") ||
                            (activeCategory === "cs" && course.category === "Computer Science") ||
                            (activeCategory === "ai" && course.category === "AI") ||
                            (activeCategory === "game" && course.category === "Game Development");
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/95 dark:from-[#393536] dark:to-[#393536]/95">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEB30D]/10 text-[#EEB30D] text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>250+ hours of content</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#393536] to-[#949293] dark:from-[#FFFFFF] dark:to-[#949293] bg-clip-text text-transparent mb-4">
            Explore free interactive coding lessons
          </h1>
          <p className="text-lg text-[#949293] max-w-2xl mx-auto">
            Learn to code with fun, interactive courses handcrafted by industry experts and educators.
          </p>
        </div>

        {/* Search and filters bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#949293]" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#949293]/20 bg-[#FFFFFF] dark:bg-[#393536] text-[#393536] dark:text-[#FFFFFF] placeholder:text-[#949293]/60 focus:outline-none focus:ring-2 focus:ring-[#EEB30D] focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
                  ${activeCategory === cat.id
                    ? 'bg-[#EEB30D] text-[#393536] shadow-md shadow-[#EEB30D]/20'
                    : 'bg-[#FFFFFF] dark:bg-[#393536] text-[#949293] border border-[#949293]/20 hover:bg-[#EEB30D]/5'
                  }
                `}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-[#949293]">
            Showing <span className="font-semibold text-[#393536] dark:text-[#FFFFFF]">{filteredCourses.length}</span> courses
          </p>
          <div className="flex items-center gap-2 text-sm text-[#949293]">
            <Users size={16} />
            <span>Join 100k+ learners worldwide</span>
          </div>
        </div>

        {/* Course grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EEB30D]/10 mb-4">
              <Search size={32} className="text-[#EEB30D]" />
            </div>
            <h3 className="text-xl font-semibold text-[#393536] dark:text-[#FFFFFF] mb-2">No courses found</h3>
            <p className="text-[#949293]">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;