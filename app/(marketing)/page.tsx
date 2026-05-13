

import HeroSection from './components/home/HeroSection';
import Text from './components/home/Text';
import CourseSection from './components/home/courseSection';
import FeaturesSection from './components/home/FeaturesSection';
import HeroFuture from './components/home/HeroFuture';
import CourseLaunch from './components/home/CourseLaunch';
import BenefitsSection from './components/home/BenefitsSection';

export default function HomePage() {
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
     <Text/>
     <CourseLaunch/>
<CourseSection/>
<HeroFuture/>

<BenefitsSection />



      {/* Feature Cards */}
      <FeaturesSection/>

  
    </div>
  );
}