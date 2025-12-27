import { GraduationCap, Cpu, HardDrive, Megaphone, Code, Users, Award, TrendingUp, CheckCircle } from "lucide-react"

export const landingPageData = {
  hero: {
    title: "Digitizing Africa's ",
    subtitle: "Enterprises",
    description:
      "Boffins Technology is a diversified technology holding company with specialized subsidiaries in academy, products, hardware, media, and bespoke solutions. We transform ideas into reality.",
    primaryCTA: {
      text: "Explore Our Services",
      href: "/services",
    },
    secondaryCTA: {
      text: "Get In Touch",
      href: "/contact",
    },
    heroImage: {
      src: "/modern-technology-workspace-with-multiple-screens-.jpg",
      alt: "Boffins Technology Innovation",
    },
  },

  stats: [
    { icon: Users, value: "500+", label: "Students Trained" },
    { icon: Award, value: "50+", label: "Projects Delivered" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: CheckCircle, value: "24/7", label: "Support Available" },
  ],

  divisions: [
    {
      title: "Bespoke Division",
      description:
        "Custom software solutions tailored to your unique business requirements and operational challenges.",
      features: ["Coming to Canada - Immigration Website", "Bekwyn Law Firm Website", "Custom Enterprise Solutions"],
      href: "/services/bespoke",
      icon: Code,
    },
    {
      title: "Product Division",
      description:
        "Innovative software solutions that drive business growth and operational efficiency across industries.",
      features: [
        "Ubuxa - Renewable Energy Management",
        "Vikmid - Creator Management",
        "RevenueHub+ - Revenue Collection",
      ],
      href: "/services/products",
      icon: Cpu,
    },
    {
      title: "Media Company",
      description: "Strategic digital marketing and content creation services to amplify your brand's online presence.",
      features: ["Social Media Management", "Content Creation", "Brand Strategy", "Digital Campaigns"],
      href: "/services/media",
      icon: Megaphone,
    },
    {
      title: "Academy",
      description:
        "Comprehensive tech education programs designed to transform careers and build industry-ready professionals.",
      features: [
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Mobile App Development",
      ],
      href: "/services/education",
      icon: GraduationCap,
    },
    {
      title: "Hardware Division",
      description: "Cutting-edge IoT devices and networking solutions for modern business infrastructure needs.",
      features: ["IoT Device Development", "Networking Services", "Ubuxa-IoT-Pro Protection Device"],
      href: "/services/hardware",
      icon: HardDrive,
    },
  ],

  features: {
    title: "Why Choose Boffins Technology?",
    description:
      "Our strength lies in collaboration and innovation. Each division brings unique expertise while working together to deliver exceptional results.",
    features: [
      "Diverse expertise across multiple technology domains",
      "Collaborative approach with shared talent pool",
      "Proven track record with 95% project success rate",
      "24/7 support and ongoing maintenance",
      "Scalable solutions that grow with your business",
    ],
    image: {
      src: "/diverse-team-of-technology-professionals-collabora.jpg",
      alt: "Boffins Technology Team",
    },
    cta: {
      text: "Learn More About Us",
      href: "/about",
    },
  },

  cta: {
    title: "Ready to Transform Your Business?",
    description:
      "Let's discuss how our specialized divisions can work together to deliver the perfect solution for your unique challenges.",
    primaryCTA: {
      text: "Start Your Project",
      href: "https://wa.me/2348061286691?text=I%20want%20to%20know%20more%20about%20the%20project",
      external: true,
    },
    secondaryCTA: {
      text: "View All Services",
      href: "/services",
    },
  }
  
}
