

import HeroSection from './components/home/HeroSection';
import Text from './components/home/Text';

import FeaturesSection from './components/home/FeaturesSection';
import HeroFuture from './components/home/HeroFuture';
import CourseLaunch from './components/home/CourseLaunch';
import BenefitsSection from './components/home/BenefitsSection';
import CourseSectionHome from './components/home/CourseSectionHome';

export default function HomePage() {
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
     <Text/>
     <CourseLaunch/>
<CourseSectionHome/>
<HeroFuture/>

<BenefitsSection />



      {/* Feature Cards */}
      <FeaturesSection/>

  
    </div>
  );
}