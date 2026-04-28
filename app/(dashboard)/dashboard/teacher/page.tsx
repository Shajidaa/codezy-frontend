"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Plus, 
  MoreVertical, 
  ArrowUpRight 
} from 'lucide-react';

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold">
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
          {trend} <TrendingUp size={12} />
        </span>
      )}
    </div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
    <p className="text-3xl font-black text-brand-dark mt-1">{value}</p>
  </div>
);

const CourseRow = ({ name, students, status }: any) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-brand-dark text-sm">{name}</h4>
        <p className="text-xs text-gray-400">{students} Students Enrolled</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
        status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
      }`}>
        {status}
      </span>
      <button className="text-gray-300 group-hover:text-brand-dark transition-colors">
        <MoreVertical size={18} />
      </button>
    </div>
  </div>
);

// --- Main Page ---

export default function TeacherDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Teacher Overview</h1>
          <p className="text-gray-500 font-medium text-sm">Manage your curriculum and track student performance.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-brand-gold transition-all shadow-lg shadow-brand-dark/10">
          <Plus size={18} /> Create New Course
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,284" icon={Users} trend="+12%" />
        <StatCard title="Active Courses" value="06" icon={BookOpen} />
        <StatCard title="Course Completion" value="84%" icon={TrendingUp} trend="+5%" />
        <StatCard title="Total Revenue" value="$14,200" icon={ArrowUpRight} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Courses List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-brand-dark text-lg uppercase tracking-tight">Active Courses</h3>
            <button className="text-sm font-bold text-brand-gold hover:underline">View All</button>
          </div>
          
          <div className="space-y-2">
            <CourseRow name="MERN Stack Masterclass" students="450" status="Active" />
            <CourseRow name="Advanced Next.js Architecture" students="210" status="Active" />
            <CourseRow name="UI/UX for Developers" students="125" status="Draft" />
            <CourseRow name="Docker & Kubernetes" students="89" status="Active" />
          </div>
        </div>

        {/* Student Feedback / Announcements */}
        <div className="bg-brand-dark p-8 rounded-[2.5rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          
          <h3 className="font-bold text-lg mb-6 relative z-10">Quick Support</h3>
          <div className="space-y-6 relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-brand-gold font-black uppercase mb-1">Notice</p>
              <p className="text-sm text-gray-300 leading-relaxed">Your "MERN Stack" course has 12 new pending assignments to grade.</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-brand-gold font-black uppercase mb-1">Platform Tip</p>
              <p className="text-sm text-gray-300 leading-relaxed">Regularly updating your course content improves student engagement by 40%.</p>
            </div>
          </div>

          <button className="w-full mt-10 bg-brand-gold text-brand-dark py-4 rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform">
            Go to Instructor Hub
          </button>
        </div>
      </div>
    </motion.div>
  );
}