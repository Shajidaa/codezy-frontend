import { LevelData } from "@/app/types";




export const levelsData: LevelData[] = [
  {
    id: "level-1",
    label: "Level-1 (Age 8-14)",
    title: "Explorer Bootcamp",
    shortDesc: "Creative foundations & logic mastery",
    priceBDT: "8,000",
    priceUSD: "75",
    benefits: [
      "Game Design & Animation",
      "Logic & Computational Thinking",
      "Collaborative Soft Skills",
      "Intro to Python (Text-based)",
    ],
    plan: [
      {
        month: "Month 1",
        focus: "Block-based Logic & Puzzles",
        detail: "Scratch & coding challenges, algorithmic thinking, digital storytelling.",
      },
      {
        month: "Month 2",
        focus: "Game Development Studio",
        detail: "Create 3 interactive mini-games, learn events & variables, peer testing.",
      },
      {
        month: "Month 3",
        focus: "Python Playground",
        detail: "First Python scripts, turtle graphics, simple text adventures & final showcase.",
      },
    ],
    additional: "Certificate of Completion + Access to Young Coder Community",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: "🎮",
  },
  {
    id: "level-2",
    label: "Level-2 (Age 15-24)",
    title: "Innovator Bootcamp",
    shortDesc: "Full-stack + AI fundamentals for industry",
    priceBDT: "20,000",
    priceUSD: "185",
    benefits: [
      "Full-Stack (React, Next.js, Tailwind)",
      "AI Essentials & Prompt Engineering",
      "Backend & Database (PostgreSQL, Auth)",
      "Job-Ready Portfolio + SaaS Deployment",
    ],
    plan: [
      {
        month: "Month 1",
        focus: "Modern Frontend Mastery",
        detail: "React components, Next.js routing, Tailwind CSS, responsive design & state hooks.",
      },
      {
        month: "Month 2",
        focus: "Backend Architecture & APIs",
        detail: "Node.js/Express, PostgreSQL, Clerk Auth, REST APIs & integration.",
      },
      {
        month: "Month 3",
        focus: "Production & Career Launch",
        detail: "Deploy full-stack SaaS app, write technical resume, mock interviews & open-source contributions.",
      },
    ],
    additional: "1-on-1 Career Mentorship + GitHub Portfolio Review + Interview Prep",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
    icon: "🚀",
  },
];