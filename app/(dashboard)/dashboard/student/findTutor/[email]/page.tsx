"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

import Link from 'next/link';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CheckCircle,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  BookOpen,
  Calendar,
  Star,
  Users,
  Award,
  Mail,
  Loader2,
  ArrowLeft,
  Clock,
  Globe,
  Share2,
} from 'lucide-react';
import { CalendlyEventData, Education, Experience, Subject, Tutor } from '../types';






// ==================== COMPONENT ====================
export default function TutorProfilePage() {
  const params = useParams();
  const email = params?.email as string;
  
  const { data: session } = useSession();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  
  // Refs
  const toastIdRef = useRef<any>(null);

  // ===== FETCH TUTOR =====
  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/email/${email}`
        );
        setTutor(response.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load tutor profile. Please try again later.");
        toast.error("Could not load tutor profile");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchTutorProfile();
    }
  }, [email]);

  // ===== CALENDLY LOAD STATE =====
  useEffect(() => {
    const checkCalendly = () => {
      // @ts-ignore
      if (window.Calendly) {
        setCalendlyLoaded(true);
      } else {
        const interval = setInterval(() => {
          // @ts-ignore
          if (window.Calendly) {
            setCalendlyLoaded(true);
            clearInterval(interval);
          }
        }, 500);
        return () => clearInterval(interval);
      }
    };
    checkCalendly();
  }, []);

  // ===== OPEN CALENDLY =====
  const openCalendly = useCallback(() => {
    if (!tutor?.profile?.calendlyLink) {
      toast.warning("No scheduling link available");
      return;
    }

    // @ts-ignore
    if (window.Calendly) {
      setIsBooking(true);
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: tutor.profile.calendlyLink,
        prefill: {
          email: session?.user?.email || undefined,
          name: session?.user?.name || undefined,
        },
      });
      // Reset booking state after popup opens
      setTimeout(() => setIsBooking(false), 1000);
    } else {
      toast.warning("Calendly is still loading. Please wait a moment and try again.");
      // Fallback: open in new tab
      window.open(tutor.profile.calendlyLink, '_blank');
    }
  }, [tutor, session]);

  // ===== HANDLE CALENDLY EVENT =====
  useEffect(() => {
    const handleCalendlyEvent = async (event: MessageEvent) => {
      try {
        const data = event.data as CalendlyEventData;
        
        if (data?.event === "calendly.event_scheduled") {
          const inviteeUri = data.payload?.invitee?.uri;
          
          if (!inviteeUri || !tutor) {
            console.warn("Missing invitee URI or tutor data");
            return;
          }

          // Show loading toast
          toastIdRef.current = toast.loading("Saving your booking...");

          const bookingData = {
            tutorEmail: tutor.email,
            studentEmail: session?.user?.email || "guest@codezy.com",
            studentName: session?.user?.name || "Guest Student",
            inviteeUri: inviteeUri,
            startTime: new Date().toISOString(),
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/manual`,
            bookingData
          );

          if (response.status === 200 || response.status === 201) {
            toast.update(toastIdRef.current, {
              render: "🎉 Meeting booked successfully! Check your email for details.",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          } else {
            throw new Error("Booking save failed");
          }
        }
      } catch (error) {
        console.error("Error saving booking:", error);
        if (toastIdRef.current) {
          toast.update(toastIdRef.current, {
            render: "Failed to save booking. Please contact support.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.error("Booking failed. Please try again.");
        }
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, [tutor, session]);

  // ===== SHARE PROFILE =====
  const shareProfile = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${tutor?.name} - Tutor Profile`,
        text: `Check out ${tutor?.name}'s tutoring profile!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        toast.success("Profile link copied to clipboard!");
      }).catch(() => {});
    }
  }, [tutor]);

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
        <Loader2 className="w-12 h-12 text-[#EEB30D] animate-spin" />
        <p className="mt-4 text-[#949293] font-medium">Loading tutor profile...</p>
      </div>
    );
  }

  // ===== ERROR STATE =====
  if (error || !tutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
        <div className="bg-red-50 rounded-2xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-[#393536] mb-2">Tutor Not Found</h2>
          <p className="text-[#949293] mb-6">{error || "The tutor you're looking for doesn't exist."}</p>
          <Link
            href="/dashboard/student/findTutor"
            className="inline-flex items-center gap-2 text-[#EEB30D] font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Find Tutors
          </Link>
        </div>
      </div>
    );
  }

  const profile = tutor.profile || {};
  const subjects = tutor.subjects || [];
  const education = tutor.education || [];
  const experience = tutor.experience || [];
  const imageUrl = profile.image || tutor.image || '/images/default-avatar.jpg';
  const isVerified = profile.verified || tutor.verified || false;
  const rating = profile.rating || tutor.rating || 0;
  const reviewCount = profile.totalReviews || tutor.totalReviews || 0;
// console.log(tutor.experience);

  // ===== RENDER =====
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 bg-[#FFFFFF] shadow-sm rounded-3xl my-6 sm:my-10 border border-[#949293]/20">
        {/* ===== BACK BUTTON ===== */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/student/findTutor"
            className="inline-flex items-center gap-2 text-[#EEB30D] hover:text-[#EEB30D]/80 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Find Tutors
          </Link>
          
          <button
            onClick={shareProfile}
            className="p-2 rounded-full hover:bg-[#EEB30D]/10 transition-colors text-[#949293]"
            aria-label="Share profile"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* ===== HEADER SECTION ===== */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8 border-[#949293]/10">
          {/* Avatar */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={imageUrl}
              alt={tutor.name}
             
              className="rounded-2xl object-cover ring-4 ring-[#EEB30D]/10"
              sizes="(max-width: 768px) 128px, 128px"
             
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/default-avatar.jpg';
              }}
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-[#EEB30D] rounded-full p-1 shadow-md">
                <CheckCircle className="w-5 h-5 text-white" fill="currentColor" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#393536]">{tutor.name}</h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle className="w-3 h-3" fill="currentColor" />
                  Verified
                </span>
              )}
            </div>
            
            <p className="text-[#EEB30D] font-semibold text-base sm:text-lg">
              {profile.title || tutor.expertise || "Professional Tutor"}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-[#949293] text-sm">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" /> {profile.phone}
                </span>
              )}
              {tutor.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" /> {tutor.email}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className={`w-5 h-5 ${rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                <span className="font-semibold text-[#393536]">
                  {rating > 0 ? rating.toFixed(1) : 'New'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#949293]">
                <Users className="w-4 h-4" />
                <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
              </div>
              <div className="flex items-center gap-1 text-[#949293]">
                <Clock className="w-4 h-4" />
                <span>Member since {new Date(tutor.createdAt).getFullYear()}</span>
              </div>
            </div>

            {/* Calendly Button */}
            <button
              onClick={openCalendly}
              disabled={isBooking || !calendlyLoaded}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EEB30D] text-[#FFFFFF] font-bold mt-5 rounded-xl hover:bg-[#EEB30D]/90 transition-all shadow-lg shadow-[#EEB30D]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isBooking ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Calendar className="w-5 h-5" />
              )}
              {isBooking ? 'Opening...' : 'Schedule time with me'}
            </button>
          </div>
        </div>

        {/* ===== BIO SECTION ===== */}
        {profile.bio && (
          <div className="py-8 border-b border-[#949293]/10">
            <h3 className="text-xl font-bold text-[#393536] mb-3 flex items-center gap-2">
              <BookOpen className="text-[#EEB30D]" /> About Me
            </h3>
            <p className="text-[#949293] leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
          </div>
        )}

        {/* ===== EDUCATION & SUBJECTS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-b border-[#949293]/10">
          {/* Education */}
          <div>
            <h3 className="text-xl font-bold text-[#393536] mb-4 flex items-center gap-2">
              <GraduationCap className="text-[#EEB30D]" /> Education
            </h3>
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu: Education, index: number) => (
                  <div key={index} className="p-3 bg-[#EEB30D]/5 rounded-xl border border-[#EEB30D]/10">
                    <p className="font-bold text-[#393536]">{edu.degree}</p>
                    <p className="text-sm text-[#949293]">{edu.institution}</p>
                    {edu.year && (
                      <p className="text-xs text-[#949293]/70">{edu.year}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#949293] text-sm">No education information available</p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-xl font-bold text-[#393536] mb-4 flex items-center gap-2">
              <Briefcase className="text-[#EEB30D]" /> Subjects
            </h3>
            {subjects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub: Subject, index: number) => (
                  <span
                    key={index}
                    className="bg-[#FFFFFF] border border-[#EEB30D]/30 text-[#EEB30D] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#EEB30D] hover:text-white transition-colors cursor-default"
                  >
                    {sub.name}
                    {sub.level && (
                      <span className="text-xs opacity-60 ml-1">({sub.level})</span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#949293] text-sm">No subjects listed</p>
            )}
          </div>
        </div>

        {/* ===== EXPERIENCE ===== */}
        {experience.length > 0 && (
          <div className="py-8 border-b border-[#949293]/10">
            <h3 className="text-xl font-bold text-[#393536] mb-4 flex items-center gap-2">
              <Award className="text-[#EEB30D]" /> Experience
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {experience.map((exp: Experience, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-[#393536]">{exp.role}</p>
                  <p className="text-sm text-[#949293]">{exp.institution}</p>
                  {exp.years && (
                    <p className="text-xs text-[#949293]/70">{exp.years}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ===== CALENDLY RESOURCES ===== */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />

      {/* ===== TOAST CONTAINER ===== */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}