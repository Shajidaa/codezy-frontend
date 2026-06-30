"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
// Type definitions
interface Course {
  _id: string;
  id?: number;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  duration: string;
  students: number;
  rating: number;
  isNew: boolean;
  iconName: string;
  color: string;
  image: string;
  imageAlt: string;
  createdAt?: string;
}

interface CourseFormData {
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  duration: string;
  students: number;
  rating: number;
  isNew: boolean;
  iconName: string;
  color: string;
  image: string;
  imageAlt: string;
}
interface ApiResponse {
  success: boolean;
  data: Course[];
}
type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  // Form state for new course
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    level: 'BEGINNER',
    category: '',
    duration: '',
    students: 0,
    rating: 0,
    isNew: false,
    iconName: 'book',
    color: 'from-[#EEB30D] to-[#EEB30D]/80',
    image: '',
    imageAlt: ''
  });

  const levels: Level[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const iconOptions: string[] = ['book', 'code', 'shield', 'brain', 'rocket', 'crown', 'star', 'heart'];
  const colorOptions: string[] = [
    'from-[#EEB30D] to-[#EEB30D]/80', // Gold
    'from-[#393536] to-[#393536]/80', // Dark
    'from-[#949293] to-[#949293]/80', // Gray
    'from-[#FFFFFF] to-[#FFFFFF]/80', // White
  ];

  // Fetch courses
  const fetchCourses = async (category: string = 'all'): Promise<void> => {
    try {
      setLoading(true);
      const url = category && category !== 'all' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/courses?category=${category}`
        : `${process.env.NEXT_PUBLIC_API_URL}/courses`;
      
      const response = await axios.get<Course[]>(url);
      console.log(response);
      
      setCourses(response.data);
     
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data?.map(course => course.category))];
      setCategories(uniqueCategories);
      
      setError('');
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };
console.log(courses);

  useEffect(() => {
    fetchCourses(selectedCategory);
  }, [selectedCategory]);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post<Course>(`${process.env.NEXT_PUBLIC_API_URL}/courses`, formData);
      
      // Add new course to the list
      setCourses(prev => [...prev, response.data]);
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        level: 'BEGINNER',
        category: '',
        duration: '',
        students: 0,
        rating: 0,
        isNew: false,
        iconName: 'book',
        color: 'from-[#EEB30D] to-[#EEB30D]/80',
        image: '',
        imageAlt: ''
      });
      setShowAddModal(false);
      
      // Refresh categories
      const uniqueCategories = [...new Set([...categories, formData.category])];
      setCategories(uniqueCategories);
      
     toast.success('Course added successfully!');
    } catch (err) {
      console.error('Error adding course:', err);
      toast.error('Failed to add course. Please try again.');
    }
  };

  // Delete course


const handleDelete = async (id: string): Promise<void> => {
  // Show SweetAlert confirmation dialog
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    background: '#fff',
    customClass: {
      popup: 'rounded-xl',
      title: 'text-[#393536]',
      confirmButton: 'bg-red-500 hover:bg-red-600',
      cancelButton: 'bg-[#949293] hover:bg-[#787677]',
    }
  });

  // Only proceed if user confirmed
  if (result.isConfirmed) {
    try {
      // Show loading state
      Swal.fire({
        title: 'Deleting...',
        text: 'Please wait while the course is being deleted',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`);
      
      // Update the UI
      setCourses(prev => prev.filter(course => course._id !== id));
      
      // Show success message
      await Swal.fire({
        title: 'Deleted!',
        text: 'The course has been deleted successfully.',
        icon: 'success',
        confirmButtonColor: '#EEB30D',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
      });
      
      toast.success('Course deleted successfully!');
    } catch (err) {
      console.error('Error deleting course:', err);
      
      // Show error message
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete course. Please try again.',
        icon: 'error',
        confirmButtonColor: '#EEB30D',
        confirmButtonText: 'OK',
      });
      
      toast.error('Failed to delete course. Please try again.');
    }
  }
};

  // Get level color
  const getLevelColor = (level: Level): string => {
    const colors = {
      'BEGINNER': 'bg-green-100 text-green-700',
      'INTERMEDIATE': 'bg-yellow-100 text-yellow-700',
      'ADVANCED': 'bg-red-100 text-red-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  if (loading && courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-[#949293]">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#393536]">Course Management</h1>
          <p className="text-[#949293] mt-1">Manage all courses in the system</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-[#EEB30D] text-[#393536] font-semibold rounded-lg hover:bg-[#d4a30b] transition-colors flex items-center gap-2 shadow-md"
        >
          <span className="text-xl">+</span>
          Add New Course
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <label className="font-semibold text-[#393536]">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-[#949293] text-lg">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <div key={course._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-[#949293]/20">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={course.imageAlt || course.title}
                  className="w-full h-full object-cover"
                />
                {course.isNew && (
                  <span className="absolute top-3 right-3 bg-[#EEB30D] text-[#393536] px-3 py-1 rounded-full text-sm font-semibold">
                    NEW
                  </span>
                )}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${course.color || 'from-[#EEB30D] to-[#EEB30D]/80'}`} />
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#393536] line-clamp-1">
                    {course.title}
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                <p className="text-[#949293] text-sm mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-[#949293] mb-3">
                  <span className="flex items-center gap-1">
                    <span>📚</span> {course.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="flex items-center gap-1 text-[#949293]">
                    <span>👨‍🎓</span> {course.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center gap-1 text-[#EEB30D]">
                    <span>⭐</span> {course.rating.toFixed(1)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-[#393536] text-white rounded-lg hover:bg-[#2a2729] transition-colors text-sm font-medium"
                    onClick={() => {
                      alert('Edit functionality coming soon!');
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#393536]">Add New Course</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#949293] hover:text-[#393536] text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  />
                </div>

                {/* Level and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#393536] mb-1">
                      Level *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#393536] mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      list="categories"
                      className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                    />
                    <datalist id="categories">
                      {categories.map(category => (
                        <option key={category} value={category} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Duration and Students */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#393536] mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 8 Weeks"
                      required
                      className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#393536] mb-1">
                      Students
                    </label>
                    <input
                      type="number"
                      name="students"
                      value={formData.students}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                    />
                  </div>
                </div>

                {/* Rating and New */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#393536] mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#393536]">
                      <input
                        type="checkbox"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#EEB30D] focus:ring-[#EEB30D] border-[#949293] rounded"
                      />
                      Mark as New
                    </label>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  />
                </div>

                {/* Image Alt */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleInputChange}
                    placeholder="Description of the image"
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  />
                </div>

                {/* Icon Name */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Icon Name
                  </label>
                  <select
                    name="iconName"
                    value={formData.iconName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                {/* Color Theme */}
                <div>
                  <label className="block text-sm font-medium text-[#393536] mb-1">
                    Color Theme
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#949293] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EEB30D] text-[#393536]"
                  >
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 pt-4 border-t border-[#949293]/20">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-[#949293] text-[#393536] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#EEB30D] text-[#393536] font-semibold rounded-lg hover:bg-[#d4a30b] transition-colors shadow-md"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;