import { Mail, Phone, MapPin, BookOpen, GraduationCap, Briefcase, Edit3, Award, Calendar, Sparkles } from 'lucide-react';
import { ProfileData } from '../page';

export function ProfileView({ data, session, onEdit }: { data: ProfileData, session: any, onEdit: () => void }) {
    const hasContent = data.title || data.bio || data.location || data.phone;

    return (
        <div className="space-y-6">
            {/* Header Card with Gradient */}
            <div className="bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEB30D]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#EEB30D]/5 rounded-full blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4 flex-1">
                        {/* Profile Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#EEB30D]/20 text-[#EEB30D] px-4 py-2 rounded-full border border-[#EEB30D]/30 mb-2">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">Professional Tutor</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            {session?.user?.name || "Tutor Profile"}
                        </h1>
                        <p className="text-xl text-[#EEB30D] font-semibold">
                            {data.title || "Complete your profile to get started"}
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 text-gray-200 pt-2">
                            {data.location && (
                                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                    <MapPin className="w-4 h-4 text-[#EEB30D]" /> {data.location}
                                </span>
                            )}
                            {data.phone && (
                                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                    <Phone className="w-4 h-4 text-[#EEB30D]" /> {data.phone}
                                </span>
                            )}
                            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <Mail className="w-4 h-4 text-[#EEB30D]" /> {session?.user?.email}
                            </span>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-6 py-3 bg-[#EEB30D] text-[#393536] rounded-xl hover:bg-[#ffc524] transition-all shadow-lg hover:shadow-xl font-bold group"
                    >
                        <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-[#EEB30D]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {data.bio || "Share your teaching philosophy, experience, and what makes you unique as an educator."}
                </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Education Section */}
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    </div>

                    <div className="space-y-4">
                        {data?.education?.filter(edu => edu.degree || edu.institution).map((edu, i) => (
                            <div key={i} className="relative pl-6 pb-6 border-l-2 border-[#EEB30D] last:pb-0">
                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#393536] border-4 border-white"></div>
                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                                    <h3 className="font-bold text-gray-900 text-lg">{edu.degree || "Degree"}</h3>
                                    <p className="text-[#393536] font-semibold">{edu.institution || "Institution"}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        {edu.year && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {edu.year}
                                            </span>
                                        )}
                                        {edu.field && (
                                            <span className="flex items-center gap-1">
                                                <Award className="w-3 h-3" /> {edu.field}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data?.education?.filter(edu => edu.degree || edu.institution).length === 0 && (
                            <p className="text-gray-500 italic">No education information added yet.</p>
                        )}
                    </div>
                </div>

                {/* Subjects Section */}
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-[#EEB30D]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Subjects I Teach</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {data?.subjects?.filter(sub => sub.name).map((sub, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#393536] to-[#4a4647] rounded-xl blur opacity-25 group-hover:opacity-40 transition"></div>
                                <div className="relative px-4 py-3 bg-gradient-to-br from-[#EEB30D] to-[#ffc524] text-[#393536] rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
                                    <div className="font-bold">{sub.name}</div>
                                    {sub.level && <div className="text-xs opacity-80">{sub.level}</div>}
                                </div>
                            </div>
                        ))}
                        {data?.subjects?.filter(sub => sub.name).length === 0 && (
                            <p className="text-gray-500 italic">No subjects added yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            {data?.experience?.filter(exp => exp.role || exp.institution).length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Teaching Experience</h2>
                    </div>

                    <div className="space-y-6">
                        {data?.experience?.filter(exp => exp.role || exp.institution).map((exp, i) => (
                            <div key={i} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0">
                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#393536] border-4 border-white"></div>
                                <div className="bg-gray-50 p-5 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{exp.role || "Position"}</h3>
                                        {exp.period && (
                                            <span className="text-sm text-gray-500 flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                                                <Calendar className="w-3 h-3" /> {exp.period}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[#393536] font-semibold mb-2">{exp.institution || "Institution"}</p>
                                    {exp.description && <p className="text-gray-600 leading-relaxed">{exp.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!hasContent && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center border-2 border-dashed border-gray-300">
                    <div className="w-20 h-20 bg-[#EEB30D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Edit3 className="w-10 h-10 text-[#393536]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h3>
                    <p className="text-gray-600 mb-6">Add your information to help students find and connect with you.</p>
                    <button
                        onClick={onEdit}
                        className="px-8 py-3 bg-gradient-to-r from-[#393536] to-[#4a4647] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                        Get Started
                    </button>
                </div>
            )}
        </div>
    );
}