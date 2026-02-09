import { Lightbulb, Handshake, Award, TrendingUp } from "lucide-react"

export const aboutData = {
  hero: {
    title: "About",
    subtitle: "Boffins Technology",
    description:
      "We are a diversified technology holding company with multiple specialized subsidiaries. Each division operates semi-independently but collaborates within the Boffins ecosystem to deliver comprehensive solutions that transform businesses and empower individuals.",
    heroImage: {
      src: "/about-hero-image.jpg",
      alt: "Boffins Technology About Us",
    },
    primaryCTA: { text: "Our Services", href: "/services" },
    secondaryCTA: { text: "Contact Us", href: "/contact" },
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
        "We maintain the highest standards in everything we do, from academy to product development and client service.",
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
      name: "Kingsley C. Achumie",
      role: "Co-founder & CEO",
      description: "Responsible for setting the strategic direction and ensuring alignment across all divisions.",
      image: {
        src: "/executive-ceo-businessman-professional.png",
        alt: "CEO - Group Lead",
      },
    },
    {
      name: "Chukwuemeka Nwodo",
      role: "Co-founder & Chief Operation Officer",
      description: "Ensures smooth operations and facilitates collaboration between our specialized divisions.",
      image: {
        src: "/operations-officer-professional-executive.jpeg",
        alt: "COO - Operations Officer",
      },
    },
    {
      name: "Nwoko Collins",
      role: "Co-founder & CTO",
      description: "Manages finances, group reporting, and ensures sustainable growth across the ecosystem.",
      image: {
        src: "/cfo-finance-officer-professional.jpeg",
        alt: "CFO - Chief Financial Officer",
      },
    },
    {
      name: "Faith Danjuma",
      role: "Co-founder & Head of Marketing/Human Resources",
      description: "Manages staffing, HR policies, and maintains our collaborative culture.",
      image: {
        src: "/hor-human-resource.jpeg",
        alt: "Head of HR - Human Resources",
      },
    },
    {
      name: "Legal/Compliance Officer",
      role: "Legal & Compliance",
      description: "Oversees contracts, compliance, and intellectual property protection.",
      image: {
        src: "",
        alt: "Legal & Compliance Officer",
      },
    },
  ],

  milestones: [
    {
      year: "2019",
      title: "Company Founded",
      description: "Boffins Technology founded.",
    },
    {
      year: "2020",
      title: "Launch of two products",
      description: "SquickyKlin Digital Laundry Agent and CorrectPower Electricity Power Vending & Token Generation.",
    },
    {
      year: "2021",
      title: "Partnership with Skillz Systems",
      description:
        "Pelivery of Market Construction & Sales Management System (AH Properties & Abuja Investment), Registry Management System (OGFZA), Bartum Energy CRM Project, SAO Energy CRM Project.",
    },
    {
      year: "2022",
      title: "Research began for UBUXA Renewable Energy Project",
      description: "Partnership with Skillz Systems to build Construction/Real Estate Management System for Tibilon.",
    },
    {
      year: "2023",
      title: "Parnership",
      description: "Partnership with Skillz Systems to execute Gas Sales & Management Solution.",
    },
    {
      year: "2024",
      title: "Collaboration",
      description: "Partnership with Skillz Systems to build CRM for Renewable Energy Companies (A4T & Salpha Energy).",
    },
    {
      year: "2025",
      title: "Innovated Products",
      description:
        "Development of two SaaS platforms (Ubuxa for renewable & last-mile distribution, Vikmid creator monetization platform); launch of Media, Academy, Bespoke, and Hardware divisions.",
    },
  ],

  collaboration: {
    title: "Our Collaboration Model",
    description:
      "The strength of Boffins Technology lies in collaboration. Each division is autonomous but interdependent, sharing resources and expertise while maintaining accountability.",
    features: [
      "Shared Talent Pool - Developers and trainers rotate between divisions",
      "Internal Economy - Divisions pay each other for services, maintaining accountability",
      "Joint Ventures - Multiple divisions collaborate on ecosystem-wide projects",
      "Scalability - Each division can expand as opportunities grow",
    ],
    image: {
      src: "/images/boffins-collaboration-model.png",
      alt: "Boffins Technology Collaboration Model",
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
