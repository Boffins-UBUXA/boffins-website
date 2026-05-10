import { Code, Smartphone, Globe, Settings } from "lucide-react"

export const bespokeData = {
  hero: {
    badge: "Bespoke Division",
    title: "Custom",
    subtitle: "Software Solutions",
    description:
      "Transform your business with tailor-made software solutions. From web applications to mobile apps and system integrations, we build exactly what you need to succeed.",
    heroImage: {
      src: "/boffins-bespoke-hero-image.png",
      alt: "Custom software development team",
    },
    primaryCTA: {
      text: "Start Your Project",
      href: "https://wa.me/2348061286691?text=I%20want%20to%20know%20more%20about%20the%20project",
      external: true,
    },
    secondaryCTA: {
      text: "View Services",
      href: "#services",
    },
    stats: [
      { value: "50+", label: "Clients" },
      { value: "98%", label: "Satisfaction" },
      { value: "24/7", label: "Support" },
    ],
  },

  services: [
    {
      title: "Beautiful Websites that Convert",
      description: "Custom web experiences designed to engage visitors and drive meaningful conversions.",
      icon: Globe,
      features: [
        "Responsive design",
        "Performance optimization",
        "SEO implementation",
        "User experience focused",
        "Fast loading times",
        "Mobile-first approach",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Custom Web Applications that Solve Real Problems",
      description: "Tailored web solutions built with modern technologies to address your specific business challenges.",
      icon: Code,
      features: [
        "Full-stack development",
        "Database integration",
        "API development",
        "Scalable architecture",
        "Security implementation",
        "Real-time features",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "User Friendly Mobile Applications",
      description: "Native and cross-platform mobile applications with seamless, intuitive user experiences.",
      icon: Smartphone,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "Intuitive UI/UX design",
        "App store deployment",
        "Push notifications",
        "Offline functionality",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Experienced Technical Consulting Services",
      description: "Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.",
      icon: Settings,
      features: [
        "Technology assessment",
        "Architecture planning",
        "Code review and optimization",
        "Performance auditing",
        "Security consulting",
        "Team training",
      ],
      color: "from-orange-500 to-red-500",
    },
  ],

  portfolio: [
    {
      name: "Ubuxa Website",
      description:
        "Renewable energy management platform website with interactive dashboards and real-time analytics visualization.",
      image: "/multi-tenant-pasges.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      features: [
        "Interactive energy analytics",
        "Real-time monitoring",
        "Performance metrics",
        "Cost analysis tools",
        "Mobile responsive design",
      ],
      link: "#",
      category: "Energy Management",
    },
    {
      name: "Tims Auto Website",
      description: "Automotive service website with online booking system, service catalog, and customer testimonials.",
      image: "/automotive-service-website-booking.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Online booking system",
        "Service catalog",
        "Customer reviews",
        "Payment integration",
        "Service history tracking",
      ],
      link: "#",
      category: "Automotive Services",
    },
    {
      name: "Renewable Energy Website",
      description: "Educational platform for renewable energy solutions with case studies and implementation guides.",
      image: "/renewable.png",
      technologies: ["Next.js", "Supabase", "Tailwind CSS", "MDX"],
      features: [
        "Educational content",
        "Case studies section",
        "Interactive guides",
        "Resource library",
        "Newsletter integration",
      ],
      link: "#",
      category: "Energy Education",
    },
    {
      name: "Immigration Website",
      description:
        "Comprehensive immigration services platform with visa tracking, document management, and consultation booking.",
      image: "/immigration-services-website-portal.jpg",
      technologies: ["Next.js", "Supabase", "Stripe", "Auth0"],
      features: [
        "Visa application tracking",
        "Document management",
        "Consultation booking",
        "Payment processing",
        "Multi-language support",
      ],
      link: "#",
      category: "Immigration Services",
    },
    {
      name: "Bekwyn Law Website",
      description: "Professional law firm website with case management system and secure client portal.",
      image: "/bekwyn-law.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      features: [
        "Case management system",
        "Client portal",
        "Document storage",
        "Appointment scheduling",
        "Secure messaging",
      ],
      link: "#",
      category: "Legal Services",
    },
  ],

  testimonials: [
    {
      name: "Thomas Okonkwo",
      company: "Tims Auto Services",
      image: "/auto-service-owner.jpg",
      testimonial:
        "The website Boffins built transformed our business. Online booking increased our appointments by 40%, and customers love the seamless experience. Their team was professional and understood our industry perfectly.",
      rating: 5,
      project: "Automotive Website",
    },
    {
      name: "David Bekwyn",
      company: "Bekwyn Law Firm",
      image: "/lawyer-professional.jpg",
      testimonial:
        "Their technical expertise combined with understanding of our legal processes was exceptional. The case management system perfectly fits our workflow. The secure client portal has improved client satisfaction significantly.",
      rating: 5,
      project: "Legal Case Management",
    },
  ],

  process: [
    {
      step: "01",
      title: "Discovery & Requirements",
      description: "We conduct thorough analysis of your business needs, current systems, and desired outcomes.",
      icon: Settings,
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Our experts design the optimal solution architecture and create detailed technical specifications.",
      icon: Code,
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development process with continuous testing and quality assurance throughout the build.",
      icon: Globe,
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "Seamless deployment with comprehensive training and ongoing support for your team.",
      icon: Smartphone,
    },
  ],

  cta: {
    title: "Ready to Build Your Custom Solution?",
    description:
      "Let's discuss your project requirements and create a solution that perfectly fits your business needs. Our team is ready to bring your vision to life.",
    primaryCTA: {
      text: "Start Your Project",
      href: "https://wa.me/2348061286691?text=I%20want%20to%20know%20more%20about%20the%20project",
      external: true,
    },
    secondaryCTA: {
      text: "View All Services",
      href: "/services",
    },
  },
}
