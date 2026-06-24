"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { CheckCircle, MapPin, Phone, GraduationCap, Briefcase, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
// সঠিক ইমপোর্ট
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function TutorProfilePage() {
  const { email } = useParams();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${email}`);
        setTutor(response.data);
      } catch (error) {
        console.error("Error loading profile", error);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchTutorProfile();
  }, [email]);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: tutor?.profile?.calendlyLink || 'https://calendly.com/shajidaislam34/30min', 
      });
    } else {
      toast.warning("Calendly is still loading. Please try again.");
    }
  };

  useEffect(() => {
    const handleCalendlyEvent = async (e: any) => {
      if (e.data.event && e.data.event === "calendly.event_scheduled") {
        const inviteeUri = e.data.payload.invitee.uri;

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/manual`, {
            tutorEmail: tutor.email,
            studentEmail: session?.user?.email || "guest@codezy.com", // ব্যাকআপ ইমেইল
            studentName: session?.user?.name || "Guest Student",     
            inviteeUri: inviteeUri,
            startTime: new Date().toISOString(), 
          });
          
          // সফল হলে টোস্ট দেখাবে
          toast.success("🚀 Meeting booked successfully!");
        } catch (error) {
          console.error("Error saving booking:", error);
          toast.error("Failed to save booking data.");
        }
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, [tutor, session]);

  if (loading) return <div className="p-10 text-[#EEB30D] font-bold">Loading Profile...</div>;
  if (!tutor) return <div className="p-10 text-red-500 font-bold">Tutor not found.</div>;

  return (
    <div className=" p-6 bg-[#FFFFFF] shadow-sm rounded-3xl my-10 border border-[#949293]/20">
      <Link href={'/dashboard/student/findTutor'} className="text-[#EEB30D] hover:text-[#EEB30D]/80 font-medium mb-4 inline-block">← Back to Find Tutors</Link>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8 border-[#949293]/10">
        <img src={tutor.image} alt={tutor.name} className="w-32 h-32 rounded-2xl object-cover ring-4 ring-[#EEB30D]/10" />
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-3xl font-bold text-[#393536]">{tutor.name}</h1>
            {tutor.role === 'teacher' && <CheckCircle className="text-[#EEB30D] w-6 h-6" fill="currentColor" />}
          </div>
          <p className="text-[#EEB30D] font-semibold text-lg">{tutor.profile?.title}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-[#949293] text-sm">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {tutor.profile?.location}</span>
            <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {tutor.profile?.phone}</span>
          </div>
          
          <button 
            onClick={openCalendly}
            className="flex items-center gap-2 px-6 py-3 bg-[#EEB30D] text-[#FFFFFF] font-bold mt-5 rounded-xl hover:bg-[#EEB30D]/90 transition-colors shadow-lg shadow-[#EEB30D]/20"
          >
            <Calendar className="w-5 h-5" />
            Schedule time with me
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-8">
        <h3 className="text-xl font-bold text-[#393536] mb-3 flex items-center gap-2">
          <BookOpen className="text-[#EEB30D]" /> About Me
        </h3>
        <p className="text-[#949293] leading-relaxed">{tutor.profile?.bio}</p>
      </div>

      {/* Experience & Education Grid */}
      <div className="grid md:grid-cols-2 gap-8 py-8 border-t border-[#949293]/10">
        <div>
          <h3 className="text-xl font-bold text-[#393536] mb-4 flex items-center gap-2">
            <GraduationCap className="text-[#EEB30D]" /> Education
          </h3>
          {tutor.profile?.education?.map((edu: any, index: number) => (
            <div key={index} className="mb-3 p-3 bg-[#EEB30D]/5 rounded-xl">
              <p className="font-bold text-[#393536]">{edu.degree}</p>
              <p className="text-sm text-[#949293]">{edu.institution}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#393536] mb-4 flex items-center gap-2">
            <Briefcase className="text-[#EEB30D]" /> Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {tutor.profile?.subjects?.map((sub: any, index: number) => (
              <span key={index} className="bg-[#FFFFFF] border border-[#EEB30D]/30 text-[#EEB30D] px-3 py-1 rounded-full text-sm font-medium">
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Calendly Resources */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      {/* ToastContainer যোগ করা হলো যেন নোটিফিকেশন রেন্ডার হতে পারে */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}