"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const userRole = session?.user?.role || 'student';

 console.log(session);
 
  const navItems = {
    student: [
      { name: 'My Courses', href: '/dashboard/student', icon: BookOpen },
      { name: 'Progress', href: '/dashboard/student/progress', icon: LayoutDashboard },
    ],
    teacher: [
      { name: 'Overview', href: '/dashboard/teacher', icon: LayoutDashboard },
      { name: 'My Classes', href: '/dashboard/teacher/classes', icon: Users },
    ],
    admin: [
      { name: 'Admin Panel', href: '/dashboard/admin', icon: Settings },
      {name:"Students", href:"/dashboard/admin/students", icon: Users},
      {name:"Enrollment Students", href:"/dashboard/admin/paidStudent", icon: BookOpen},
      { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
      { name: 'Course Management', href: '/dashboard/admin/courses', icon: BookOpen },
    ],
  };

  const currentLinks = navItems[userRole as keyof typeof navItems];

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)]/50 flex">
      {/* --- Mobile Sidebar Overlay --- */}
     
        {/* {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )} */}
    

      {/* --- Sidebar --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-brand-dark text-white transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex flex-col h-full">
          <Link href={'/'} className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center text-dark font-bold">C</div>
            <span className="text-xl font-black tracking-tighter">CODEZY</span>
          </Link>

          <nav className="flex-1 space-y-2">
            {currentLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.href ? 'bg-brand-gold text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 w-full rounded-xl transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>

          <div className="flex-1 hidden md:block">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              {userRole} Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-brand-dark transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-gold rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-brand-dark">{session?.user?.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{userRole}</p>
              </div>
              <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-bold">
                {session?.user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}