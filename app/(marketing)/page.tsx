

import HeroSection from './components/home/HeroSection';
import Text from './components/home/Text';
import CourseSection from './components/home/courseSection';
import FeaturesSection from './components/home/FeaturesSection';
import HeroFuture from './components/home/HeroFuture';

export default function HomePage() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
     <Text/>
<CourseSection/>
<HeroFuture/>
      {/* Feature Cards */}
      <FeaturesSection/>

  
    </div>
  );
}