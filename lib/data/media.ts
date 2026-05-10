import { TrendingUp, Camera, Megaphone, Instagram, Facebook, Linkedin } from "lucide-react"

export const mediaData = {
  hero: {
    badge: "Media Company",
    title: "Amplify Your",
    subtitle: "Brand's Voice",
    description:
      "Transform your digital presence with our comprehensive media services. From social media management to content creation, we help brands connect with their audience and drive meaningful engagement.",
    heroImage: {
      src: "/social-media-content-creation-studio.jpg",
      alt: "Content creation and social media management",
    },
    primaryCTA: {
      text: "Start Your Campaign",
      href: "https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products",
      external: true,
    },
    secondaryCTA: {
      text: "View Services",
      href: "#services",
    },
    stats: [
      { value: "500+", label: "Brands Managed" },
      { value: "50M+", label: "Content Views" },
      { value: "450%", label: "Avg. Growth" },
    ],
  },

  services: [
    {
      title: "Social Media Management",
      description: "Complete social media strategy, content creation, and community management across all platforms.",
      icon: Instagram,
      features: [
        "Content strategy development",
        "Daily posting and scheduling",
        "Community engagement",
        "Performance analytics",
        "Hashtag optimization",
        "Influencer collaboration",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Content Creation",
      description: "High-quality visual and written content that captures your brand's voice and engages your audience.",
      icon: Camera,
      features: [
        "Photography and videography",
        "Graphic design and branding",
        "Copywriting and storytelling",
        "Video editing and production",
        "Animation and motion graphics",
        "Content optimization",
      ],
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Brand Strategy",
      description: "Comprehensive brand development and positioning to establish a strong market presence.",
      icon: Megaphone,
      features: [
        "Brand identity development",
        "Market research and analysis",
        "Competitive positioning",
        "Brand guidelines creation",
        "Voice and tone development",
        "Brand consistency monitoring",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Digital Marketing Campaigns",
      description: "Data-driven marketing campaigns that drive engagement, leads, and conversions.",
      icon: TrendingUp,
      features: [
        "Paid advertising (PPC, Social)",
        "Email marketing campaigns",
        "SEO and content marketing",
        "Conversion optimization",
        "Analytics and reporting",
        "ROI tracking and analysis",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ],

  platforms: [
    { name: "Instagram", icon: Instagram, color: "text-pink-500" },
    { name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { name: "X", icon: "XSocialIcon", color: "text-black" },
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { name: "TikTok", icon: "TikTokIcon", color: "text-black" },
    { name: "YouTube", icon: "YouTubeIcon", color: "text-red-600" },
  ],

  portfolio: [
    {
      client: "Ubuxa",
      industry: "Fintech",
      service: "Complete Brand Overhaul & Social Strategy",
      results: "500% increase in social engagement",
      image: "/fintech-app-ubuxa.jpg",
      metrics: {
        engagement: "+500%",
        followers: "+350%",
        leads: "+450%",
      },
    },
    {
      client: "Tims Auto",
      industry: "Automotive",
      service: "Social Media Management & Content Creation",
      results: "300% increase in showroom traffic",
      image: "/automotive-dealership-cars.jpg",
      metrics: {
        footTraffic: "+300%",
        onlineInquiries: "+280%",
        brandAwareness: "+420%",
      },
    },
    {
      client: "Bekwyn Law",
      industry: "Legal Services",
      service: "Brand Strategy & Content Marketing",
      results: "250% growth in client inquiries",
      image: "/bekwyn-law.jpg",
      metrics: {
        inquiries: "+250%",
        websiteTraffic: "+180%",
        socialEngagement: "+320%",
      },
    },
    {
      client: "Boffins Academy",
      industry: "Education",
      service: "Social Media Strategy & Content Marketing",
      results: "380% increase in student enrollments",
      image: "/education-academy-classroom.jpeg",
      metrics: {
        enrollments: "+380%",
        socialReach: "+420%",
        engagement: "+310%",
      },
    },
  ],

  testimonials: [
    {
      name: "CEO, Ubuxa",
      company: "Ubuxa",
      image: "/executive-ceo-businessman-professional.png",
      testimonial:
        "Their social media strategy transformed our brand presence. Within months, we saw massive growth in user acquisition and engagement. The team was incredibly responsive and understood our fintech market perfectly. Truly exceptional work and a partnership we value deeply!",
      rating: 5,
    },
    {
      name: "Manager, Tims Auto",
      company: "Tims Auto",
      image: "/professional-business-manager.jpg",
      testimonial:
        "The content creation team delivered incredible visuals and marketing materials. Our showroom traffic increased significantly. The social media campaigns have been consistently high-quality and our customers comment on how professional our brand looks now.",
      rating: 5,
    },
    {
      name: "Partner, Bekwyn Law",
      company: "Bekwyn Law",
      image: "/professional-lawyer-attorney.jpg",
      testimonial:
        "Their brand strategy positioned us as thought leaders in our industry. Client inquiries have never been higher. The team's understanding of legal services combined with their marketing expertise is unmatched. We couldn't be happier with the results.",
      rating: 5,
    },
    {
      name: "Director, Boffins Academy",
      company: "Boffins Academy",
      image: "/hor-human-resource.jpeg",
      testimonial:
        "The team's approach to educational marketing is exceptional. They understood our unique positioning and helped us reach the right students. Our enrollment numbers speak for themselves. The strategic content and social media management have truly transformed our institution's reach and reputation.",
      rating: 5,
    },
  ],

  cta: {
    title: "Ready to Grow Your Brand?",
    description:
      "Let's create a digital presence that drives real results. Our team is ready to help you connect with your audience and achieve your business goals.",
    primaryCTA: {
      text: "Start Your Campaign",
      href: "https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products",
      external: true,
    },
  },
}
