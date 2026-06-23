import { Plus, Trash2, Save, X, Loader2, BookOpen, GraduationCap, Briefcase, MapPin, Phone } from 'lucide-react';
import { ProfileData, Education, Experience, Subject } from '../page';

interface EditProps {
    formData: ProfileData;
    setFormData: React.Dispatch<React.SetStateAction<ProfileData>>;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    saving: boolean;
}

export function ProfileEditForm({ formData, setFormData, onSubmit, onCancel, saving }: EditProps) {

    const updateField = (field: keyof ProfileData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateArrayField = (arrayName: 'education' | 'experience' | 'subjects', index: number, field: string, value: string) => {
        const newArray = [...formData[arrayName]] as Education[] | Experience[] | Subject[];
        newArray[index] = { ...newArray[index], [field]: value };
        updateField(arrayName, newArray);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-3xl shadow-2xl p-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Edit Your Profile</h1>
                    <p className="text-[#EEB30D]">Update your information to showcase your expertise</p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-3 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#EEB30D]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
                        <input
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#393536] focus:ring-2 focus:ring-[#EEB30D]/20 transition-all outline-none"
                            placeholder="e.g., Mathematics & Physics Teacher"
                            value={formData.title}
                            onChange={e => updateField('title', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / About Me</label>
                        <textarea
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#393536] focus:ring-2 focus:ring-[#EEB30D]/20 transition-all outline-none resize-none"
                            placeholder="Share your teaching philosophy, experience, and what makes you unique..."
                            rows={5}
                            value={formData.bio}
                            onChange={e => updateField('bio', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#393536]" /> Location
                            </label>
                            <input
                                placeholder="City, State, ZIP"
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#393536] focus:ring-2 focus:ring-[#EEB30D]/20 transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#393536]" /> Phone Number
                            </label>
                            <input
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#393536] focus:ring-2 focus:ring-[#EEB30D]/20 transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                                <Phone className="w-4 h-4 text-[#393536]" /> Calendly Link
                            </label>
                            <input
                                placeholder="https://calendly.com/your-link"
                                value={formData.calendlyLink}
                                onChange={(e) => updateField('calendlyLink', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#393536] focus:ring-2 focus:ring-[#EEB30D]/20 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#EEB30D] to-[#c9960a] rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Education Background</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => updateField('education', [...formData.education, { degree: '', institution: '', year: '', field: '' }])}
                        className="flex items-center gap-2 px-4 py-2 bg-[#EEB30D] text-[#393536] rounded-xl hover:bg-[#ffc524] transition-all font-semibold shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Add Education
                    </button>
                </div>

                <div className="space-y-4">
                    {formData?.education?.map((edu, idx) => (
                        <div key={idx} className="relative p-5 border-2 border-gray-200 rounded-2xl hover:border-[#EEB30D] transition-all bg-gray-50">
                            <button
                                type="button"
                                onClick={() => updateField('education', formData.education.filter((_, i) => i !== idx))}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all shadow-lg"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Degree</label>
                                    <input
                                        placeholder="e.g., Master of Education"
                                        value={edu.degree}
                                        onChange={e => updateArrayField('education', idx, 'degree', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Institution</label>
                                    <input
                                        placeholder="e.g., Stanford University"
                                        value={edu.institution}
                                        onChange={e => updateArrayField('education', idx, 'institution', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Year</label>
                                    <input
                                        placeholder="e.g., 2018 - 2020"
                                        value={edu.year}
                                        onChange={e => updateArrayField('education', idx, 'year', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Field of Study</label>
                                    <input
                                        placeholder="e.g., Mathematics Education"
                                        value={edu.field}
                                        onChange={e => updateArrayField('education', idx, 'field', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subjects Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-[#EEB30D]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Subjects I Teach</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => updateField('subjects', [...formData.subjects, { name: '', level: '' }])}
                        className="flex items-center gap-2 px-4 py-2 bg-[#EEB30D] text-[#393536] rounded-xl hover:bg-[#ffc524] transition-all font-semibold shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Add Subject
                    </button>
                </div>

                <div className="space-y-3">
                    {formData?.subjects?.map((sub, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-3 items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#EEB30D] transition-all bg-gray-50">
                            <input
                                placeholder="Subject (e.g., Algebra)"
                                value={sub.name}
                                onChange={e => updateArrayField('subjects', idx, 'name', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none"
                            />
                            <input
                                placeholder="Level (e.g., Grades 6-12)"
                                value={sub.level}
                                onChange={e => updateArrayField('subjects', idx, 'level', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => updateField('subjects', formData.subjects.filter((_, i) => i !== idx))}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#393536] to-[#4a4647] rounded-xl flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Teaching Experience</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => updateField('experience', [...formData.experience, { role: '', institution: '', period: '', description: '' }])}
                        className="flex items-center gap-2 px-4 py-2 bg-[#EEB30D] text-[#393536] rounded-xl hover:bg-[#ffc524] transition-all font-semibold shadow-md"
                    >
                        <Plus className="w-4 h-4" /> Add Experience
                    </button>
                </div>

                <div className="space-y-4">
                    {formData?.experience?.map((exp, idx) => (
                        <div key={idx} className="relative p-5 border-2 border-gray-200 rounded-2xl hover:border-[#EEB30D] transition-all bg-gray-50">
                            <button
                                type="button"
                                onClick={() => updateField('experience', formData.experience.filter((_, i) => i !== idx))}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all shadow-lg"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Role / Position</label>
                                        <input
                                            placeholder="e.g., Senior Math Teacher"
                                            value={exp.role}
                                            onChange={e => updateArrayField('experience', idx, 'role', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Institution</label>
                                        <input
                                            placeholder="e.g., Lincoln High School"
                                            value={exp.institution}
                                            onChange={e => updateArrayField('experience', idx, 'institution', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Period</label>
                                    <input
                                        placeholder="e.g., 2018 - Present"
                                        value={exp.period}
                                        onChange={e => updateArrayField('experience', idx, 'period', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                                    <textarea
                                        placeholder="Brief description of your role and responsibilities..."
                                        value={exp.description}
                                        onChange={e => updateArrayField('experience', idx, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#393536] focus:ring-1 focus:ring-[#EEB30D]/20 outline-none text-sm resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-[#393536] to-[#4a4647] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" /> Save Profile
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}