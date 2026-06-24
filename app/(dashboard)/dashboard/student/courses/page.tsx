"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BookOpen, Calendar, Clock, User, ArrowLeft, Video } from "lucide-react";
import Link from "next/link";

export default function MyCoursesPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/student/${session.user.email}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error loading student bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [session]);

  if (loading) {
    return (
      <div className="p-10 text-[#EEB30D] font-bold text-center text-xl">
        Loading your booked courses...
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen rounded-3xl border border-[#949293]/20 my-5 shadow-sm">
      {/* Back Button & Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/student/findTutor"
          className="text-[#EEB30D] hover:text-[#EEB30D]/80 font-medium inline-flex items-center gap-1 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[#393536] flex items-center gap-2">
          <BookOpen className="text-[#EEB30D]" /> My Booked Courses & Classes
        </h1>
        <p className="text-[#949293] text-sm mt-1">
          Here is the history and schedule of your 1-on-1 booked live sessions.
        </p>
      </div>

      <hr className="border-[#949293]/10 mb-8" />

      {/* No Bookings Found Grid */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#949293]/20 rounded-2xl bg-gray-50/50">
          <Calendar className="w-12 h-12 text-[#949293]/50 mx-auto mb-3" />
          <p className="text-[#393536] font-semibold text-lg">No sessions booked yet!</p>
          <p className="text-[#949293] text-sm mb-5">Book a session with a tutor to get started.</p>
          <Link
            href="/dashboard/student/findTutor"
            className="px-5 py-2.5 bg-[#EEB30D] text-white font-bold rounded-xl hover:bg-[#EEB30D]/90 transition-colors inline-block text-sm"
          >
            Find a Tutor Now
          </Link>
        </div>
      ) : (
        /* Bookings List Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const appointmentDate = new Date(booking.calendly?.scheduledAt);
            
            return (
              <div
                key={booking._id}
                className="border border-[#949293]/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all bg-[#FFFFFF] flex flex-col justify-between"
              >
                <div>
                  {/* Status Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-[#EEB30D]/10 text-[#EEB30D] px-3 py-1 rounded-full">
                      1-on-1 Live Class
                    </span>
                    <span className="text-xs font-semibold capitalize px-2.5 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-200">
                      {booking.status || "Scheduled"}
                    </span>
                  </div>

                  {/* Tutor Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2 text-[#393536]">
                      <User className="w-4 h-4 text-[#EEB30D]" />
                      <span className="font-bold">Tutor Email:</span>
                      <span className="text-sm text-gray-700">{booking.tutorEmail}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#949293] text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        {appointmentDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#949293] text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        {appointmentDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendly Integration / Action Button */}
                {/* {booking.calendly?.inviteeUri && (
                  <div className="pt-3 border-t border-gray-50 mt-2">
                    <a
                      href="https://calendly.com/dashboard/scheduled_events"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-[#393536] hover:bg-gray-100 font-bold text-xs rounded-xl transition-colors"
                    >
                      <Video className="w-4 h-4 text-[#EEB30D]" />
                      View Meeting Details
                    </a>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}