"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Award, BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function StudentProgressPage() {
  const { data: session } = useSession();
  const [progressList, setProgressList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/${session.user.email}`);
        setProgressList(res.data);
      } catch (err) {
        console.error("Error loading progress data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [session]);

  if (loading) return <div className="p-10 text-[#EEB30D] font-bold text-center">Loading Progress...</div>;

  return (
    <div className="p-6 bg-white min-h-screen rounded-3xl border border-gray-100 shadow-sm my-5">
      <h1 className="text-3xl font-bold text-[#393536] mb-2 flex items-center gap-2">
        <Award className="text-[#EEB30D]" /> My Learning Progress
      </h1>
      <p className="text-gray-500 mb-8">Track your course compilation and performance here.</p>

      {progressList.length === 0 ? (
        <div className="p-10 text-center border rounded-2xl bg-gray-50 text-gray-400">
          No progress tracking found yet. Ask your teacher to update your progress!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {progressList.map((prog, index) => {
            const percentage = Math.min(Math.round((prog.completedClasses / prog.totalClasses) * 100), 100);
            return (
              <div key={index} className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider bg-[#EEB30D]/10 text-[#EEB30D] px-3 py-1 rounded-full font-bold">
                      Course: {prog.courseId}
                    </span>
                    <h3 className="text-xl font-bold text-[#393536] mt-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gray-400" /> overall progress
                    </h3>
                  </div>
                  <span className="text-2xl font-black text-[#EEB30D]">{percentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-3 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="bg-[#EEB30D] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4 border-gray-50">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Completed: {prog.completedClasses}/{prog.totalClasses}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-right justify-end">
                    Performance: <span className="text-[#EEB30D]">{prog.performanceScore}</span>
                  </span>
                </div>
                {prog.notes && (
                  <p className="mt-3 text-xs text-gray-400 italic bg-gray-50 p-2 rounded-lg">
                    * Teacher&apos;s Note: {prog.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}