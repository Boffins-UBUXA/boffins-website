// lib/contact-data.ts
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Users,
  Briefcase,
} from "lucide-react"

export const contactData = {
  hero: {
    badge: "Get In Touch",
    title: "Let's Build Something",
    subtitle: "Amazing Together",
    description:
      "Ready to transform your business with cutting-edge technology? Our team of experts is here to help you achieve your goals. Reach out to us today and let's start the conversation.",
  },

  contactInfo: [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "Plot 902 Ibrahim Isyaku street Mabushi abuja",
        "Mabushi",
        "Abuja, Nigeria",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 (0) 815 665 3196"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@boffinstechnology.com.ng"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      color: "from-orange-500 to-red-500",
    },
  ],

  divisions: [
    {
      name: "Academy",
      description: "Inquiries about our tech programs and training courses",
      email: "academy@boffinstechnology.com.ng",
      icon: Users,
    },
    {
      name: "Product Division",
      description: "Questions about Ubuxa, Vikmid, RevenueHub+ and other products",
      email: "info@boffinstechnology.com.ng",
      icon: Briefcase,
    },
    {
      name: "Hardware Division",
      description: "IoT devices, networking services, and hardware solutions",
      email: "info@boffinstechnology.com.ng",
      icon: MessageSquare,
    },
    {
      name: "Media Company",
      description: "Social media management and content creation services",
      email: "media@boffinstechnology.com.ng",
      icon: MessageSquare,
    },
    {
      name: "Bespoke Division",
      description: "Custom software development and technical consulting",
      email: "info@boffinstechnology.com.ng",
      icon: Briefcase,
    },
  ],

  office: {
    title: "Visit Our Office",
    description:
      "Plot 902 Ibrahim Isyaku street Mabushi abuja off regent secondary school.",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9547892166767!2d7.455959!3d9.071875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMTguOCJOIDfCsDI3JzIxLjUiRQ!5e0!3m2!1sen!2sng!4v1234567890",
  },
}
