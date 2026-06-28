// ==================== TYPES ====================
export interface TutorProfile {
  title: string;
  bio: string;
  location: string;
  phone: string;
  calendlyLink: string;
  image?: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  education?: Education[];
  subjects?: Subject[];
  experience?: Experience[];
}
export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Subject {
  name: string;
  level?: string;
}

export interface Experience {
  institution: string;
  role: string;
  years: string;
}
export interface Tutor {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  expertise: string;
  profile: TutorProfile;
  rating: number;
  totalReviews: number;
  verified: boolean;
  createdAt: string;
  updated_at: string;
  education?: Education[];
  subjects?: Subject[];
  experience?: Experience[];
}

export interface CalendlyEventData {
  event: string;
  payload: {
    invitee: {
      uri: string;
    };
  };
}
