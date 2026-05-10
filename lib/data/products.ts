import { Zap, Users, TrendingUp, Shield, Star, Battery, Video } from "lucide-react"

export const productsData = {
  hero: {
    badge: "Product Division",
    title: "Innovative",
    subtitle: "Software Products",
    description:
      "Discover our suite of cutting-edge software products designed to solve real-world problems and drive business growth across various industries.",
    primaryCTA: {
      text: "Explore Products",
      href: "#products",
    },
    secondaryCTA: {
      text: "Get Started",
      href: "/contact",
    },
  },

  stats: [
    { label: "Active Users", value: "100+", icon: Users },
    { label: "Revenue Earned", value: "$5M+", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Shield },
    { label: "Customer Satisfaction", value: "4.9/5", icon: Star },
  ],

  products: [
    {
      name: "Ubuxa",
      tagline: "Renewable Energy Management Solution",
      description:
        "Comprehensive platform for monitoring, managing, and optimizing renewable energy systems with real-time analytics and predictive maintenance.",
      icon: Battery,
      features: [
        "Real-time energy monitoring",
        "Predictive maintenance alerts",
        "Performance optimization",
        "Cost analysis and reporting",
        "Grid integration management",
        "Mobile and web dashboards",
      ],
      benefits: [
        "Reduce energy costs by up to 30%",
        "Increase system efficiency",
        "Minimize downtime",
        "Environmental impact tracking",
      ],
      image: "/renewable-energy-dashboard-solar-panels-monitoring.jpg",
      color: "from-green-500 to-emerald-500",
      category: "Energy Management",
      website: "https://www.ubuxa.ng/",
    },
    {
      name: "Vikmid",
      tagline: "Creator Management Solution",
      description:
        "All-in-one platform for content creators to manage their brand, audience, collaborations, and revenue streams across multiple platforms.",
      icon: Video,
      features: [
        "Multi-platform content scheduling",
        "Audience analytics and insights",
        "Collaboration management",
        "Revenue tracking and optimization",
        "Brand partnership tools",
        "Content performance metrics",
      ],
      benefits: [
        "Streamline content workflow",
        "Increase audience engagement",
        "Maximize revenue opportunities",
        "Professional brand management",
      ],
      image: "/content-creator-dashboard-social-media-analytics.jpg",
      color: "from-purple-500 to-pink-500",
      category: "Creator Tools",
      website: "https://www.vicmid.ng/",
    },
  ],

  testimonials: [
    {
      name: "David Thompson",
      company: "GreenTech Solutions",
      product: "Ubuxa",
      image: "/professional-man-energy-company.jpg",
      testimonial:
        "Ubuxa has revolutionized how we manage our solar installations. The predictive maintenance feature alone has saved us thousands in repair costs. We've seen a 35% improvement in system efficiency and our maintenance team now responds to issues before they become problems.",
      rating: 5,
    },
    {
      name: "Sarah Martinez",
      company: "Creative Studios Inc",
      product: "Vikmid",
      image: "/professional-woman-content-creator.jpg",
      testimonial:
        "As a content creator managing multiple platforms, Vikmid has been a game-changer. My engagement rates have increased by 60% since using it. The analytics dashboard provides insights that help me optimize content strategy, and the scheduling feature saves hours every week.",
      rating: 5,
    },
  ],

  cta: {
    title: "Ready to Transform Your Business?",
    description:
      "Join thousands of satisfied customers who have improved their operations with our innovative products.",
    primaryCTA: {
      text: "Let's Talk",
      href: "https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products",
      external: true,
    },
    secondaryCTA: {
      text: "View All Services",
      href: "/services",
    },
  },
}
