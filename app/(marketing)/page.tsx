

import HeroSection from './components/home/HeroSection';
import Text from './components/home/Text';
import CourseSection from './components/home/courseSection';
import FeaturesSection from './components/home/FeaturesSection';

export default function HomePage() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
     <Text/>
<CourseSection/>
      {/* Feature Cards */}
      <FeaturesSection/>

  
    </div>
  );
}