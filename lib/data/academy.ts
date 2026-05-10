import { Clock, Users, Award, BookOpen, Code, Palette, Database } from "lucide-react"

export const academyData = {
  hero: {
    badge: "Boffins Academy",
    title: "Launch Your",
    subtitle: "Tech Career",
    description:
      "Transform your future with our comprehensive tech programs. From social media advertising to full-stack development, we provide the skills and support you need to succeed in the technology industry.",
    heroImage: {
      src: "/students-learning-programming-coding-bootcamp.jpeg",
      alt: "Students learning technology",
    },
    primaryCTA: {
      text: "Learn More",
      href: "https://wa.me/08083430800?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20tech%20programs%20at%20Boffins%20Academy.",
      external: true,
    },
    secondaryCTA: {
      text: "View Programs",
      href: "#programs",
    },
    stats: [
      { value: "500+", label: "Graduates" },
      { value: "95%", label: "Job Placement" },
      { value: "4.9", label: "Rating" },
    ],
  },

  programs: [
    {
      title: "Social Media Advertising",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      description:
        "Master the strategies and tools needed to create effective social media advertising campaigns. Learn platform optimization, audience targeting, and performance analytics.",
      icon: Palette,
      skills: ["Facebook Ads", "Instagram Ads", "TikTok Ads", "Analytics", "A/B Testing", "Campaign Management"],
      projects: 6,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Frontend Development",
      duration: "16 weeks",
      level: "Beginner to Intermediate",
      description: "Build modern, responsive web applications using the latest frontend technologies and frameworks.",
      icon: Code,
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
      projects: 12,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend Development",
      duration: "20 weeks",
      level: "Intermediate to Advanced",
      description: "Learn server-side development, databases, and API design to build robust backend systems.",
      icon: Database,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
      projects: 10,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Full Stack Development",
      duration: "24 weeks",
      level: "Intermediate to Advanced",
      description: "Comprehensive program covering both frontend and backend development for complete web applications.",
      icon: BookOpen,
      skills: ["React", "Node.js", "Databases", "DevOps", "Testing", "Deployment"],
      projects: 15,
      color: "from-purple-500 to-violet-500",
    },
  ],

  successStories: [
    {
      name: "Chisom Okafor",
      program: "Full Stack Development",
      role: "Software Engineer at TechCorp Nigeria",
      image: "/professional-woman-developer.jpg",
      testimonial:
        "Boffins Academy transformed my career journey. The hands-on projects and mentorship prepared me perfectly for industry challenges. I landed my dream job within 3 months of graduation!",
      salary: "$1,500/month",
    },
    {
      name: "Adebayo Akinsanya",
      program: "Frontend Development",
      role: "UI/UX Developer at Digital Innovations",
      image: "/professional-man-designer.jpg",
      testimonial:
        "The Frontend Development program exceeded my expectations. I went from zero coding knowledge to building production-ready applications. The instructors are incredibly supportive and knowledgeable.",
      salary: "$1,200/month",
    },
    {
      name: "Zainab Mohammed",
      program: "Backend Development",
      role: "Backend Engineer at Fintech Solutions",
      image: "/professional-woman-developers.jpg",
      testimonial:
        "The comprehensive backend curriculum and real-world projects gave me the confidence to tackle complex system design. I'm now leading backend initiatives at my company.",
      salary: "$1,400/month",
    },
  ],

  features: [
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience",
    },
    {
      icon: Award,
      title: "Industry Certification",
      description: "Receive recognized certifications upon successful program completion",
    },
    {
      icon: BookOpen,
      title: "Hands-on Projects",
      description: "Build a portfolio of real-world projects to showcase your skills",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Self-paced learning and online cohort options to fit your lifestyle",
    },
  ],

  learningOptions: {
    selfPaced: {
      title: "Self-Paced Learning",
      subtitle: "Learn on your schedule",
      features: [
        "Access course materials anytime, anywhere",
        "Progress at your own pace",
        "Lifetime access to course resources",
      ],
    },
    cohort: {
      title: "Online Cohorts",
      subtitle: "Structured live learning",
      features: [
        "Live instructor-led sessions",
        "Peer collaboration and networking",
        "Structured timeline and accountability",
      ],
    },
  },

  cta: {
    title: "Ready to Start Your Tech Journey?",
    description:
      "Join hundreds of successful graduates who have transformed their careers with our comprehensive training programs.",
    primaryCTA: {
      text: "Learn More",
      href: "https://wa.me/08083430800?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20your%20tech%20programs%20at%20Boffins%20Academy.",
      external: true,
    },
    secondaryCTA: {
      text: "View All Services",
      href: "/services",
    },
  },
}
