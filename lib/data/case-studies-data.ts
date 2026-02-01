export interface CaseStudy {
    id: string
    slug: string
    title: string
    subtitle: string
    description: string
    excerpt: string
    image: string
    category: string
    division: string
    client: string
    challenge: string
    solution: string
    results: string[]
    testimonial?: {
      quote: string
      author: string
      role: string
    }
    metrics?: Array<{
      label: string
      value: string
    }>
    technologies?: string[]
    date: string
    status: string
  }
  
  export const caseStudies: CaseStudy[] = [
    {
      id: "ubuxa-001",
      slug: "ubuxa",
      title: "Ubuxa - Transforming E-Commerce in West Africa",
      subtitle: "Building a scalable platform for seamless online retail",
      description:
        "Ubuxa (ubuxa.ng) is a leading e-commerce platform revolutionizing online retail across West Africa. Boffins Technology partnered with Ubuxa to build a scalable, robust platform that handles high-traffic transactions and provides an exceptional user experience.",
      excerpt:
        "Learn how we built a scalable e-commerce platform that serves thousands of merchants and millions of customers across West Africa.",
      image: "/images/case-studies/ubuxa.jpg",
      category: "E-Commerce",
      division: "Bespoke",
      client: "Ubuxa",
      challenge:
        "Ubuxa needed a robust, scalable platform capable of handling high transaction volumes, multiple payment methods, inventory management across thousands of merchants, and providing a seamless shopping experience for customers. They required a solution that could grow with their rapidly expanding user base and merchant network.",
      solution:
        "We built a comprehensive e-commerce platform using modern web technologies with microservices architecture. The platform features real-time inventory synchronization, multiple payment gateway integrations, advanced search and recommendation systems, and a powerful merchant dashboard. We implemented caching strategies, database optimization, and CDN distribution to ensure fast load times across the continent.",
      results: [
        "Increased transaction capacity by 300%",
        "Reduced page load times from 5s to under 1s",
        "Enabled onboarding of 5,000+ merchants",
        "Processed over 100,000 daily transactions",
        "Achieved 99.9% platform uptime",
        "Increased customer retention by 45%",
      ],
      testimonial: {
        quote:
          "Boffins Technology transformed our vision into reality. Their team's expertise in building scalable systems helped us scale from hundreds to millions of transactions per month. We couldn't have done this without them.",
        author: "CEO, Ubuxa",
        role: "Chief Executive Officer",
      },
      metrics: [
        { label: "Merchants Onboarded", value: "5,000+" },
        { label: "Daily Transactions", value: "100K+" },
        { label: "Platform Uptime", value: "99.9%" },
        { label: "Load Time Reduction", value: "80%" },
        { label: "Customer Growth", value: "45%" },
      ],
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "AWS",
        "Docker",
        "Kubernetes",
      ],
      date: "2024-01-15",
      status: "Active",
    },
  ]
  
  export const caseStudyCategories = [
    "All",
    "E-Commerce",
    "FinTech",
    "Healthcare",
    "Education",
    "Media",
    "Enterprise",
  ]
  
  export const caseStudyDivisions = [
    "All",
    "Bespoke",
    "Product",
    "Media",
    "Academy",
    "Hardware",
  ]
  