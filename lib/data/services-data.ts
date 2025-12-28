import { Users, Zap, Shield, Lightbulb } from "lucide-react"

export const servicesData = {
  hero: {
    title: "Our",
    subtitle: "Services",
    description:
      "Discover our comprehensive range of technology services across five specialized divisions. From Academy to custom software development, we have the expertise to transform your ideas into reality.",
    primaryCTA: {
      text: "Get Started Today",
      href: "/contact",
    },
    secondaryCTA: {
      text: "Learn About Us",
      href: "/about",
    },
  },

  divisions: [
    {
      title: "Academy",
      description:
        "Comprehensive tech programs designed to build the next generation of developers and tech professionals.",
      icon: "🎓",
      href: "/services/education",
      features: [
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Mobile App Development",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Product Division",
      description: "Innovative software products that solve real-world problems for businesses and individuals.",
      icon: "🚀",
      href: "/services/products",
      features: ["Ubuxa - Energy Management", "Vikmid - Creator Management", "RevenueHub+ - Revenue Collection"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Hardware Division",
      description: "IoT devices and networking solutions that protect and optimize your electronic infrastructure.",
      icon: "⚡",
      href: "/services/hardware",
      features: [
        "IoT Device Development",
        "Networking Services",
        "Ubuxa-IoT-Pro Protection",
        "Custom Hardware Solutions",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Media Company",
      description: "Complete digital marketing and content creation services to amplify your brand's presence.",
      icon: "📱",
      href: "/services/media",
      features: ["Social Media Management", "Content Creation", "Brand Strategy", "Digital Marketing Campaigns"],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Bespoke Division",
      description: "Custom software solutions tailored to your unique business requirements and challenges.",
      icon: "🛠️",
      href: "/services/bespoke",
      features: ["Custom Web Applications", "Mobile App Development", "System Integration", "Technical Consulting"],
      color: "from-indigo-500 to-purple-500",
    },
  ],

  benefits: [
    {
      icon: Users,
      title: "Integrated Ecosystem",
      description:
        "All our divisions work together seamlessly to provide comprehensive solutions for your business needs.",
    },
    {
      icon: Zap,
      title: "Rapid Innovation",
      description:
        "We leverage cutting-edge technology and agile methodologies to deliver solutions quickly and efficiently.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every solution undergoes rigorous testing and quality checks to ensure reliability and performance.",
    },
    {
      icon: Lightbulb,
      title: "Custom Solutions",
      description: "We don't believe in one-size-fits-all. Every solution is tailored to your specific requirements.",
    },
  ],

  process: {
    title: "Our Collaborative Process",
    description:
      "We follow a proven methodology that ensures successful project delivery while maintaining the highest standards of quality and innovation.",
    steps: [
      {
        step: "01",
        title: "Discovery & Analysis",
        description: "We understand your needs and challenges through comprehensive consultation.",
      },
      {
        step: "02",
        title: "Strategy & Planning",
        description: "Our experts develop a tailored strategy leveraging our integrated ecosystem.",
      },
      {
        step: "03",
        title: "Development & Implementation",
        description: "Multiple divisions collaborate to build and deploy your solution.",
      },
      {
        step: "04",
        title: "Support & Optimization",
        description: "Ongoing support and continuous improvement to ensure long-term success.",
      },
    ],
    image: {
      src: "/collaborative-technology-process-workflow.jpg",
      alt: "Boffins Technology Collaborative Process",
    },
  },

  cta: {
    title: "Ready to Transform Your Business?",
    description:
      "Let's discuss how our integrated technology ecosystem can help you achieve your goals. Get in touch with our experts today.",
    primaryCTA: {
      text: "Start Your Project",
      href: "https://chat.whatsapp.com/FEOHmsZHBXTJEb5gsBSjlS",
    },
    secondaryCTA: {
      text: "Learn More About Us",
      href: "/about",
    },
  },
}