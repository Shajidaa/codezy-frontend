
import CourseSection from '../components/home/courseSection';

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
      <CourseSection/>
    </div>
  );
}