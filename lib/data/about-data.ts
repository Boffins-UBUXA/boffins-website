import { Lightbulb, Handshake, Award, TrendingUp } from "lucide-react"

export const aboutData = {
  hero: {
    title: "About",
    subtitle: "Boffins Technologies",
    description:
      "We are a diversified technology holding company with multiple specialized subsidiaries. Each division operates semi-independently but collaborates within the Boffins ecosystem to deliver comprehensive solutions that transform businesses and empower individuals.",
  },

  mission: {
    title: "Our Mission",
    description:
      "To democratize technology by providing world-class education, innovative products, and bespoke solutions that empower businesses and individuals to thrive in the digital age.",
  },

  vision: {
    title: "Our Vision",
    description:
      "To be the leading technology ecosystem that bridges the gap between innovation and practical application, creating sustainable value for all stakeholders.",
  },

  values: [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push the boundaries of technology to create solutions that transform industries and improve lives.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description:
        "Our strength lies in the synergy between our divisions, sharing expertise and resources for optimal results.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in everything we do, from education to product development and client service.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description:
        "We're committed to continuous learning and adaptation, ensuring we stay ahead of technological trends.",
    },
  ],

  leadership: [
    {
      name: "CEO (Group Lead)",
      role: "Overall Vision & Strategy",
      description: "Responsible for setting the strategic direction and ensuring alignment across all divisions.",
    },
    {
      name: "COO (Operations)",
      role: "Cross-Division Collaboration",
      description: "Ensures smooth operations and facilitates collaboration between our specialized divisions.",
    },
    {
      name: "CFO (Finance/Accounting)",
      role: "Financial Management",
      description: "Manages finances, group reporting, and ensures sustainable growth across the ecosystem.",
    },
    {
      name: "Head of HR/Admin",
      role: "Human Resources",
      description: "Manages staffing, HR policies, and maintains our collaborative culture.",
    },
    {
      name: "Legal/Compliance Officer",
      role: "Legal & Compliance",
      description: "Oversees contracts, compliance, and intellectual property protection.",
    },
  ],

  milestones: [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "Boffins Technologies established as a technology holding company with a vision for diversified innovation.",
    },
    {
      year: "2021",
      title: "Education Division Launch",
      description: "Launched our comprehensive tech education programs, training the next generation of developers.",
    },
    {
      year: "2022",
      title: "Product Portfolio Expansion",
      description: "Developed Ubuxa, Vikmid, and RevenueHub+ - our flagship software products.",
    },
    {
      year: "2023",
      title: "Hardware Innovation",
      description: "Introduced IoT solutions and the Ubuxa-IoT-Pro device for electronic protection.",
    },
    {
      year: "2024",
      title: "Full Ecosystem Integration",
      description: "Achieved seamless collaboration across all divisions with 500+ successful projects delivered.",
    },
  ],

  collaboration: {
    title: "Our Collaboration Model",
    description:
      "The strength of Boffins Technologies lies in collaboration. Each division is autonomous but interdependent, sharing resources and expertise while maintaining accountability.",
    features: [
      "Shared Talent Pool - Developers and trainers rotate between divisions",
      "Internal Economy - Divisions pay each other for services, maintaining accountability",
      "Joint Ventures - Multiple divisions collaborate on ecosystem-wide projects",
      "Scalability - Each division can expand as opportunities grow",
    ],
    image: {
      src: "/placeholder.svg?key=collaboration",
      alt: "Boffins Technologies Collaboration Model",
    },
    cta: {
      text: "Explore Our Services",
      href: "/services",
    },
  },

  cta: {
    title: "Join Our Technology Ecosystem",
    description:
      "Whether you're looking to advance your career, grow your business, or innovate with technology, we have the expertise and solutions to help you succeed.",
    primaryCTA: {
      text: "Get Started Today",
      href: "/contact",
    },
    secondaryCTA: {
      text: "View Our Services",
      href: "/services",
    },
  },
}
