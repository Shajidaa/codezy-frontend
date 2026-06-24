"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar, Video, Clock, PlusCircle } from 'lucide-react';

export default function TeacherSchedulePage() {
  const { data: session } = useSession();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    targetStudentEmail: '',
    topic: '',
    classDate: '',
    classTime: '',
    meetLink: ''
  });

  const fetchSchedules = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/schedule/${session.user.email}`);
      setSchedules(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/teacher/schedule`, {
        teacherEmail: session?.user?.email,
        ...formData
      });
      toast.success("Class Scheduled Successfully! 🎉");
      setFormData({ targetStudentEmail: '', topic: '', classDate: '', classTime: '', meetLink: '' });
      fetchSchedules(); // তালিকা রিফ্রেশ করুন
    } catch (err) {
      toast.error("Failed to add schedule");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen rounded-3xl border border-gray-100 shadow-sm my-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-[#393536] mb-6 flex items-center gap-2">
        <Calendar className="text-[#EEB30D]" /> Manage Class Schedules
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* শিডিউল অ্যাড করার ফর্ম */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 h-fit">
          <h3 className="text-lg font-bold text-[#393536] flex items-center gap-2 mb-2">
            <PlusCircle className="text-[#EEB30D] w-5 h-5" /> Schedule New Class
          </h3>
          
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Topic/Class Title</label>
            <input 
              type="text" required placeholder="e.g., JavaScript Variables"
              className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-[#EEB30D]"
              value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Student Email (Optional)</label>
            <input 
              type="email" placeholder="Leave empty for all students"
              className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-[#EEB30D]"
              value={formData.targetStudentEmail} onChange={e => setFormData({...formData, targetStudentEmail: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Date</label>
              <input 
                type="date" required
                className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-[#EEB30D]"
                value={formData.classDate} onChange={e => setFormData({...formData, classDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Time</label>
              <input 
                type="time" required
                className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-[#EEB30D]"
                value={formData.classTime} onChange={e => setFormData({...formData, classTime: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Meeting Link (Google Meet/Zoom)</label>
            <input 
              type="url" placeholder="https://meet.google.com/..."
              className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-[#EEB30D]"
              value={formData.meetLink} onChange={e => setFormData({...formData, meetLink: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full py-3 bg-[#EEB30D] text-white font-bold rounded-xl hover:bg-[#EEB30D]/90 transition-colors">
            Confirm Schedule
          </button>
        </form>

        {/* আসন্ন শিডিউলগুলোর লিস্ট */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-[#393536]">My Scheduled Classes</h3>
          {schedules.length === 0 ? (
            <p className="text-gray-400 italic">No scheduled meetings found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {schedules.map((sch, i) => (
                <div key={i} className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow transition-shadow">
                  <h4 className="font-bold text-lg text-[#393536] mb-2">{sch.topic}</h4>
                  <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                    <p className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#EEB30D]" /> {sch.classDate} @ {sch.classTime}</p>
                    <p className="text-xs bg-gray-100 w-fit px-2 py-0.5 rounded text-gray-600">Student: {sch.targetStudentEmail}</p>
                  </div>
                  {sch.meetLink && (
                    <a 
                      href={sch.meetLink} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <Video className="w-4 h-4" /> Join Class Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}