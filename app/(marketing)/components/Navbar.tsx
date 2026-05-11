"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'; 
import MyContainer from './MyContainer';
import Image from 'next/image';
import Logo from './logo';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
  ];

  return (
    <nav className="bg-brand-dark sticky top-0 z-50 shadow-md">
      <MyContainer className="text-brand-white py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        {/* <Link href="/" className="text-2xl flex   items-end font-black tracking-tighter text-brand-white">
         
         <div className="flex items-center">
          <Image width={40} height={40} src="/logo.jpg" alt="Codezy Logo" className="h-15 w-auto" />
        <span className="ml-2 text-brand-gold">Codezy</span>
          </div>
        <span className=" text-start text-sm text-brand-gray">Academy</span>
        </Link> */}
<Logo/>
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-brand-gray hover:text-brand-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href={session.user?.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'} 
                className="flex items-center gap-2 text-sm font-semibold text-brand-gray hover:text-brand-white transition-all"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link href="/register" className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
              Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-brand-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </MyContainer>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/5 px-6 py-8 space-y-6 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-brand-gray"
              >
                {link.name}
              </Link>
            ))}
            
            <hr className="border-white/5" />

            {session ? (
              <div className="space-y-4 pt-2">
                <Link 
                  href={session.user?.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-brand-white font-semibold"
                >
                  <LayoutDashboard size={20} className="text-brand-gold" />
                  Dashboard
                </Link>
                <button 
                  onClick={() => { signOut(); setIsOpen(false); }}
                  className="flex items-center gap-3 text-red-500 font-semibold w-full"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="block text-center bg-brand-gold text-brand-dark py-4 rounded-2xl font-bold"
              >
                Register Now
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;