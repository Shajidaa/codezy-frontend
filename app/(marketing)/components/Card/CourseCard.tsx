
import { Course } from "@/app/types/course";
import  {  Code, Layout, Palette, Braces, Database, Sparkles,
     TrendingUp, Users, Clock, BookOpen, Star, } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


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

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
    const { data: session } = useSession();
  // Use MongoDB _id if available, otherwise fall back to standard id
  const courseId = course._id || course.id;
  const targetBookingUrl = `/booking?courseId=${courseId}`;
  
const bookingPath = session 
    ? targetBookingUrl 
    : `/register?callbackUrl=${encodeURIComponent(targetBookingUrl)}`;
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
        
            
           
            {/* Action Links */}
          <div className="flex items-center justify-between pt-3 border-t border-[#949293]/10 mt-auto">
            <Link href={`/courses/${courseId}`} className="text-sm font-medium text-[#EEB30D] hover:text-[#EEB30D]/80 transition-colors flex items-center gap-1 group-hover:gap-2">
              View Course
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
           
            <Link href={bookingPath} className="text-sm font-medium text-[#EEB30D] hover:text-[#EEB30D]/80 transition-colors flex items-center gap-1 group-hover:gap-2">
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

export default CourseCard;