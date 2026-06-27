import { CheckCircle, Star, Users, MapPin, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ==================== TYPES ====================
interface TutorProfile {
  title: string;
  bio: string;
  location: string;
  phone: string;
  calendlyLink: string;
  image?: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
}

interface TutorSubject {
  name: string;
  level?: string;
}

interface TutorEducation {
  degree: string;
  institution: string;
  year: string;
}

interface TutorExperience {
  institution: string;
  role: string;
  years: string;
}

interface Tutor {
  _id: string;
  name: string;
  email: string;
  image?: string;
  expertise: string;
  profile: TutorProfile;
  subjects: TutorSubject[];
  education: TutorEducation[];
  experience: TutorExperience[];
  rating: number;
  totalReviews: number;
  verified: boolean;
  createdAt: string;
  updated_at: string;
}

// ==================== COMPONENT ====================
interface TutorCardProps {
  tutor: Tutor;
  variant?: 'default' | 'compact' | 'detailed';
  onBookSession?: (tutorId: string) => void;
}

const TutorCard = ({ 
  tutor, 
  variant = 'default',
  onBookSession 
}: TutorCardProps) => {
  // Safe access with fallbacks
  const profile = tutor?.profile || {};
  const subjects = tutor?.subjects || [];
  const imageUrl = profile.image || tutor?.image || '/images/default-avatar.jpg';
  const displayName = tutor?.name || 'Unknown Tutor';
  const displayTitle = profile.title || tutor?.expertise || 'Professional Tutor';
  const isVerified = profile.verified || tutor?.verified || false;
  const rating = profile.rating || tutor?.rating || 0;
  const reviewCount = profile.totalReviews || tutor?.totalReviews || 0;
  const location = profile.location || 'Location not specified';
  const subjectNames = subjects.map(s => s.name).filter(Boolean);

  // Format rating display
  const formatRating = (value: number) => {
    if (value === 0) return 'New';
    return value.toFixed(1);
  };

  return (
    <div className="group max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-light">
      {/* ===== HEADER WITH IMAGE ===== */}
      <div className="relative h-32 bg-gradient-to-r from-brand-gold/20 to-brand-gold/5 w-full flex items-center justify-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden -bottom-10">
          <img
            src={imageUrl}
            alt={displayName}
          
            className="object-cover"
            sizes="(max-width: 768px) 96px, 96px"
            
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/default-avatar.jpg';
            }}
          />
        </div>
        
        {/* Verified Badge - Floating */}
        {isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
            <CheckCircle className="w-3 h-3" fill="white" />
            Verified
          </div>
        )}
      </div>

      {/* ===== BODY ===== */}
      <div className="pt-12 pb-6 px-6">
        <div className="text-center">
          {/* Name */}
          <h2 className="text-xl font-bold text-brand-dark group-hover:text-brand-gold transition-colors line-clamp-1">
            {displayName}
          </h2>

          {/* Title */}
          <p className="text-sm text-gray-600 font-medium mb-2 line-clamp-1">
            {displayTitle}
          </p>

          {/* Location */}
          {location && (
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          {/* ===== RATING & REVIEWS ===== */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className={`w-4 h-4 ${rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              <span className="text-sm font-semibold">{formatRating(rating)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
            </div>
          </div>

          {/* ===== SUBJECTS ===== */}
          {subjectNames.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {subjectNames.slice(0, 3).map((subject, index) => (
                <span 
                  key={index}
                  className="text-xs bg-brand-gold/10 text-brand-gold px-2.5 py-1 rounded-full font-medium"
                >
                  {subject}
                </span>
              ))}
              {subjectNames.length > 3 && (
                <span className="text-xs text-gray-400">+{subjectNames.length - 3}</span>
              )}
            </div>
          )}

          {/* ===== ACTIONS ===== */}
          <div className="flex flex-col gap-2 mt-4">
            <Link 
              href={`/dashboard/student/findTutor/${tutor.email}`}
              className="w-full bg-brand-gold hover:bg-brand-light text-white font-semibold py-2.5 px-4 rounded-xl transition-all hover:shadow-md text-sm"
            >
              View Full Profile
            </Link>
            
            {onBookSession && (
              <button
                onClick={() => onBookSession(tutor._id)}
                className="w-full bg-white border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm"
              >
                Book Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;