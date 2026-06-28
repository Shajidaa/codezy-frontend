"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
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
  Share2,
  Lock,
  X,
  ArrowRight,
} from 'lucide-react';
import { CalendlyEventData, Education, Experience, Subject, Tutor } from '../types';
import { InlineWidget } from 'react-calendly';

// ==================== TYPES ====================
interface BookingDetails {
  id?: string;
  bookingDate?: string;
  bookingTime?: string;
  instructorName?: string;
  status?: 'active' | 'completed' | 'cancelled';
  endTime?: string;
}

// ==================== CUSTOM HOOK: useBookingGuard ====================
const useBookingGuard = (userEmail: string | undefined) => {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [checkError, setCheckError] = useState<string | null>(null);

  const checkBookingStatus = useCallback(async () => {
    if (!userEmail) {
      setIsChecking(false);
      return;
    }

    try {
      setIsChecking(true);
      setCheckError(null);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/check-status?email=${encodeURIComponent(userEmail)}`
      );

      if (response.data?.hasActiveBooking) {
        setHasActiveBooking(true);
        setBookingDetails(response.data.bookingDetails || null);
      } else {
        setHasActiveBooking(false);
        setBookingDetails(null);
      }
    } catch (error) {
      console.error('[BookingGuard] Error checking status:', error);
      setCheckError('Failed to check booking status');
      setHasActiveBooking(false);
    } finally {
      setIsChecking(false);
    }
  }, [userEmail]);

  useEffect(() => {
    checkBookingStatus();
  }, [checkBookingStatus]);

  return {
    hasActiveBooking,
    bookingDetails,
    isChecking,
    checkError,
    refetch: checkBookingStatus,
    setHasActiveBooking,
  };
};

// ==================== COMPONENT: ActiveBookingModal ====================
const ActiveBookingModal: React.FC<{
  email: string;
  bookingDetails: BookingDetails | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ email, bookingDetails, isOpen, onClose }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-[#393536] rounded-3xl max-w-md w-full p-8 shadow-2xl border-t-8 border-red-500 relative animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center bg-red-500/10 p-4 rounded-full">
            <Lock className="w-12 h-12 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            আপনি ইতিমধ্যে একটি স্লট বুক করেছেন! 🚫
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            আপনার বর্তমান ক্লাসটি সম্পূর্ণ শেষ না হওয়া পর্যন্ত একই ইমেইল (
            <span className="text-[#EEB30D] font-semibold">{email}</span>
            ) দিয়ে নতুন কোনো ক্লাস বা স্লট বুক করা যাবে না।
          </p>

          {bookingDetails && (
            <div className="bg-slate-800/50 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-gray-400 font-medium">আপনার বর্তমান বুকিং তথ্য:</p>
              <div className="text-sm text-white space-y-1.5">
                {bookingDetails.bookingDate && (
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#EEB30D]" />
                    তারিখ: {formatDate(bookingDetails.bookingDate)}
                  </p>
                )}
                {bookingDetails.bookingTime && (
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#EEB30D]" />
                    সময়: {bookingDetails.bookingTime}
                  </p>
                )}
                {bookingDetails.instructorName && (
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#EEB30D]" />
                    শিক্ষক: {bookingDetails.instructorName}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <Link
              href="/dashboard/student/courses"
              className="inline-flex items-center justify-center bg-[#EEB30D] text-[#393536] font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-500 transition-all text-sm w-full"
              onClick={() => onClose()}
            >
              ড্যাশবোর্ডে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPONENT: BookingGuardWrapper ====================
const BookingGuardWrapper: React.FC<{
  children: React.ReactNode;
  userEmail: string | undefined;
}> = ({ children, userEmail }) => {
  const { hasActiveBooking, bookingDetails, isChecking, setHasActiveBooking } = 
    useBookingGuard(userEmail);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hasActiveBooking) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [hasActiveBooking]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#EEB30D] animate-spin mx-auto" />
          <p className="text-[#949293] font-medium">Checking your booking status...</p>
        </div>
      </div>
    );
  }

  if (hasActiveBooking && userEmail) {
    return (
      <>
        <div className="opacity-50 pointer-events-none blur-sm select-none">
          {children}
        </div>
        <ActiveBookingModal
          email={userEmail}
          bookingDetails={bookingDetails}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      </>
    );
  }

  return <>{children}</>;
};

// ==================== MAIN COMPONENT ====================
export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const email = params?.email as string;
  
  const { data: session } = useSession();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  
  // New state for two-step booking
  const [currentStep, setCurrentStep] = useState(1); // 1 = Google Form, 2 = Calendly
  const [showBookingForm, setShowBookingForm] = useState(false);
  
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
            
            setTimeout(() => {
              window.location.reload();
            }, 3000);
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

  // ===== OPEN BOOKING (Step 1: Show Google Form) =====
  const openBooking = useCallback(async () => {
    if (!session?.user?.email) {
      toast.warning("Please login first to book a session");
      router.push('/login');
      return;
    }

    // Check if user has active booking
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/check-status?email=${encodeURIComponent(
          session?.user?.email || ''
        )}`
      );

      if (response.data?.hasActiveBooking) {
        toast.error("আপনি ইতিমধ্যে একটি স্লট বুক করেছেন! নতুন বুকিং করা সম্ভব নয়।");
        return;
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
    }

    // Show the booking form (Google Form + Calendly)
    setShowBookingForm(true);
    setCurrentStep(1);
  }, [session, router]);

  // ===== GO TO CALENDLY STEP =====
  const goToCalendly = useCallback(() => {
    setCurrentStep(2);
  }, []);

  // ===== CLOSE BOOKING FORM =====
  const closeBookingForm = useCallback(() => {
    setShowBookingForm(false);
    setCurrentStep(1);
  }, []);

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
const userEmail = session?.user?.email ?? undefined;
  // ===== RENDER =====
  return (
    <BookingGuardWrapper userEmail={userEmail}>
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
              className="rounded-2xl object-cover ring-4 ring-[#EEB30D]/10 w-full h-full"
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

            {/* Booking Button - Opens the two-step form */}
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EEB30D] text-[#FFFFFF] font-bold mt-5 rounded-xl hover:bg-[#EEB30D]/90 transition-all shadow-lg shadow-[#EEB30D]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Calendar className="w-5 h-5" />
              Schedule time with me
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

      {/* ===== BOOKING MODAL (Two-Step: Google Form → Calendly) ===== */}
      {showBookingForm && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeBookingForm();
            }
          }}
        >
          <div 
            className="bg-[#393536] rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border-t-8 border-[#EEB30D] relative animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeBookingForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
              aria-label="Close booking form"
            >
              <X className="w-6 h-6" />
            </button>

            {currentStep === 1 ? (
              // ===== STEP 1: Google Form =====
              <div className="p-8 space-y-8">
                <header>
                  <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
                    First, please fill out this quick form 📝
                  </h1>
                  <p className="text-sm text-slate-400 mt-2 font-medium">
                    It helps us understand your child&rsquo;s needs better before booking.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 px-3 py-1.5 rounded-full">
                    <span className="text-amber-400 text-xs font-semibold">
                      ⚡ আপনার ইমেইল: {session?.user?.email}
                    </span>
                  </div>
                </header>

                <div className="w-full bg-white shadow-sm rounded-3xl overflow-hidden p-4 border border-slate-200">
                  <iframe
                    src={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                    width="100%"
                    height="600"
                    className="border-none"
                    title="Google Form"
                  >
                    Loading…
                  </iframe>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={goToCalendly}
                    className="inline-flex items-center gap-2 bg-[#EEB30D] text-gray-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md"
                  >
                    I&rsquo;ve filled the form, Continue to Booking{" "}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              // ===== STEP 2: Calendly =====
              <div className="space-y-6 p-8">
                <div className="bg-[#393536] text-white p-6 rounded-3xl shadow-md border-b-4 border-[#EEB30D] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black uppercase text-[#EEB30D]">
                      Step 2: Select Date & Time
                    </h2>
                    <p className="text-xs text-gray-300 mt-1">
                      Complete your registration by selecting a verified slot on the calendar.
                    </p>
                    <p className="text-xs text-amber-400 mt-2">
                      📧 Booking with: {session?.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold self-start md:self-auto transition-all"
                  >
                    ← Edit Form Info
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                  <InlineWidget
                    url={tutor?.profile?.calendlyLink || "https://calendly.com/shajidaislam34/30min"}
                    styles={{ height: "650px", width: "100%" }}
                    pageSettings={{
                      backgroundColor: "ffffff",
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: "EEB30D",
                      textColor: "393536",
                    }}
                    prefill={{
                      email: session?.user?.email || "",
                      name: session?.user?.name || "",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-100 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                      <CheckCircle className="text-[#EEB30D] w-4 h-4" /> Reschedule anytime instantly
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                      <CheckCircle className="text-[#EEB30D] w-4 h-4" /> 1-on-1 personalized dedicated workspace
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-bold text-xs">
                      <CheckCircle className="text-[#EEB30D] w-4 h-4" /> একই ইমেইল দিয়ে একবারই বুকিং করা যাবে
                    </div>
                  </div>

                  <div className="bg-amber-50/60 border-l-4 border-[#EEB30D] p-4 rounded-r-2xl flex items-start gap-2">
                    <Clock className="text-[#EEB30D] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong>Important Notice:</strong> Your assigned professional instructor blocks off this specific slot explicitly for you. Please attend promptly.
                      <br />
                      <span className="text-amber-600 font-semibold mt-1 block">
                        ⚠️ একবার বুকিং করলে আর বুকিং করা যাবে না।
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
    </BookingGuardWrapper>
  );
}