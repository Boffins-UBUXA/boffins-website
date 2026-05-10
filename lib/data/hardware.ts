import { Zap, Router, Cpu, Battery } from "lucide-react"

export const hardwareData = {
  hero: {
    badge: "Hardware Division",
    title: "Smart",
    subtitle: "IoT Solutions",
    description:
      "Protect and optimize your electronic infrastructure with our cutting-edge IoT devices and networking solutions. From custom hardware development to our proprietary Ubuxa-IoT-Pro protection system.",
    heroImage: {
      src: "/iot-devices-smart-sensors-industrial-monitoring.jpg",
      alt: "IoT devices and smart sensors",
    },
    primaryCTA: {
      text: "Let's Talk",
      href: "https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products",
      external: true,
    },
    secondaryCTA: {
      text: "View Solutions",
      href: "#services",
    },
    stats: [
      { value: "99.8%", label: "Uptime" },
      { value: "24/7", label: "Monitoring" },
    ],
  },

  services: [
    {
      title: "IoT Device Management",
      description: "Effortlessly manage your IoT devices with our intuitive platform.",
      icon: Router,
      features: ["Device provisioning", "Real-time monitoring", "Remote management", "Data analytics"],
      color: "from-primary to-primary/80",
      featured: true,
    },
    {
      title: "Industrial Connectivity",
      description: "Ensure seamless connectivity for your industrial applications.",
      icon: Cpu,
      features: ["High-speed data transfer", "Robust network infrastructure", "Scalable solutions"],
      color: "from-secondary to-secondary/80",
    },
    {
      title: "Power Protection",
      description: "Protect your critical equipment from power anomalies.",
      icon: Battery,
      features: ["Surge protection", "Voltage regulation", "Battery backup"],
      color: "from-accent to-accent/80",
    },
  ],

  ubuxaIoTPro: {
    badge: "Proprietary Technology",
    title: "Ubuxa-IoT-Pro",
    subtitle: "Protection Device",
    description:
      "The Ubuxa-IoT-Pro is a state-of-the-art intelligent protection device designed to safeguard critical electronic equipment such as inverters, air conditioning units, and industrial machinery. By monitoring voltage fluctuations, temperature variations, and power anomalies in real-time, the device provides predictive maintenance alerts and automated protection measures to prevent costly equipment failures.",
    image: "/motherboard-iot-circuit-board-technology.jpg",
    specs: [
      { label: "Operating Temperature", value: "-40°C to +85°C" },
      { label: "Power Consumption", value: "< 5W" },
      { label: "Connectivity", value: "WiFi, Bluetooth, LoRaWAN" },
      { label: "Protection Rating", value: "IP65" },
      { label: "Data Storage", value: "32GB Local + Cloud" },
      { label: "Battery Life", value: "5+ Years" },
    ],
  },

  applications: [
    {
      industry: "Manufacturing",
      description: "Smart factory solutions with IoT sensors for equipment monitoring and predictive maintenance.",
      image: "/smart-factory-iot-sensors-manufacturing.jpg",
      benefits: ["Reduce downtime by 40%", "Optimize production efficiency", "Predictive maintenance alerts"],
    },
    {
      industry: "Energy & Utilities",
      description: "Smart grid solutions and renewable energy monitoring systems for optimal performance.",
      image: "/smart-grid-energy-monitoring-renewable.jpg",
      benefits: ["Real-time energy monitoring", "Grid stability optimization", "Renewable integration"],
    },
    {
      industry: "Smart Buildings",
      description: "Building automation systems for HVAC, lighting, and security management.",
      image: "/smart-building-automation-hvac-lighting.jpg",
      benefits: ["Energy savings up to 30%", "Automated climate control", "Enhanced security"],
    },
  ],

  cta: {
    title: "Protect Your Equipment Today",
    description:
      "Invest in the future of your equipment with our advanced IoT protection technology. Prevent failures before they happen and maximize your operational efficiency.",
    primaryCTA: {
      text: "Let's Talk",
      href: "https://wa.me/?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20products",
      external: true,
    },
  },
}
