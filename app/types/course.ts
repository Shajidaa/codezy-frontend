// types/course.ts
export interface Course {
  id: string;
  title: string;
  ageRange: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  color: string; // Used for card accents
  icon: string;
  thumbnail: string;
}

import { 
  Rocket, 
  Gamepad2, 
  Code2, 
  MonitorPlay, 
  Brain, 
  Palette, 
  Cpu, 
  ShieldCheck 
} from 'lucide-react';

export const DUMMY_COURSES = [
  {
    id: '1',
    title: 'Scratch Magic: Build Your First Game',
    ageRange: '6-9 Years',
    level: 'Beginner',
    duration: '4 Weeks',
    lessons: 12,
    icon: Rocket,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Python Wizards: Coding with Codey',
    ageRange: '10-14 Years',
    level: 'Intermediate',
    duration: '8 Weeks',
    lessons: 24,
    icon: Code2,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Roblox Studio: Create Epic Worlds',
    ageRange: '9-13 Years',
    level: 'Beginner',
    duration: '6 Weeks',
    lessons: 18,
    icon: Gamepad2,
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'AI Lab: Chatbots & Machine Learning',
    ageRange: '12-16 Years',
    level: 'Advanced',
    duration: '10 Weeks',
    lessons: 30,
    icon: Brain,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Digital Arts & Character Design',
    ageRange: '8-12 Years',
    level: 'Beginner',
    duration: '5 Weeks',
    lessons: 15,
    icon: Palette,
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Minecraft Modding with Java',
    ageRange: '11-15 Years',
    level: 'Intermediate',
    duration: '12 Weeks',
    lessons: 36,
    icon: MonitorPlay,
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Hardware Hero: Intro to Robotics',
    ageRange: '10-14 Years',
    level: 'Intermediate',
    duration: '6 Weeks',
    lessons: 12,
    icon: Cpu,
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Cyber Security: Digital Defense',
    ageRange: '13-17 Years',
    level: 'Advanced',
    duration: '8 Weeks',
    lessons: 20,
    icon: ShieldCheck,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  }
];