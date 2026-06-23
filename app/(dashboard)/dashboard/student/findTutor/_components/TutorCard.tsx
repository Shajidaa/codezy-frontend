
import { CheckCircle,} from 'lucide-react'; 
import Link from 'next/link';




const TutorCard = ({ tutor }: { tutor: 
    {_id: string;
        name: string;
        email: string;
        image: string;
        profile: {
        title: string;
     verified: boolean;
            rating: number;
            totalReviews: number;
            subjects:{
                name: string;
            }
        };
  
    }
 }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white   hover:border-brand-light transition-all duration-300">
      {/* Profile Image & Header Area */}
      <div className="relative h-32 bg-brand-gold/10 w-full flex items-center justify-center">
        <img 
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover absolute -bottom-10"
          src={tutor.image} 
          alt={tutor.name} 
        />
      </div>

      <div className="pt-12 pb-6 px-6 text-center">
        {/* Name & Verification */}
        <div className="flex items-center justify-center gap-1 mb-1">
          <h2 className="text-xl font-bold text-brand-dark">{tutor.name}</h2>
          {tutor.profile?.verified && (
            <CheckCircle className="w-5 h-5 text-red-500" fill="currentColor" />
          )}
        </div>

        {/* Professional Title */}
        <p className="text-brand-gold font-medium text-sm mb-3">
          {tutor.profile?.title}
        </p>

     

        <Link href={`/dashboard/student/findTutor/${tutor.email}`} className="w-full mt-5 bg-brand-gold hover:bg-brand-light text-white font-semibold py-2 px-4 rounded-xl transition-colors">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;