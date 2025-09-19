import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Briefcase } from "lucide-react"

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
      details: ["123 Technology Drive", "Innovation District", "Lagos, Nigeria"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 (0) 123 456 7890", "+234 (0) 987 654 3210"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@boffinstechnologies.com", "support@boffinstechnologies.com"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      color: "from-orange-500 to-red-500",
    },
  ],

  divisions: [
    {
      name: "Education & Training",
      description: "Inquiries about our tech education programs and training courses",
      email: "education@boffinstechnologies.com",
      icon: Users,
    },
    {
      name: "Product Division",
      description: "Questions about Ubuxa, Vikmid, RevenueHub+ and other products",
      email: "products@boffinstechnologies.com",
      icon: Briefcase,
    },
    {
      name: "Hardware Division",
      description: "IoT devices, networking services, and hardware solutions",
      email: "hardware@boffinstechnologies.com",
      icon: MessageSquare,
    },
    {
      name: "Media Company",
      description: "Social media management and content creation services",
      email: "media@boffinstechnologies.com",
      icon: MessageSquare,
    },
    {
      name: "Bespoke Division",
      description: "Custom software development and technical consulting",
      email: "bespoke@boffinstechnologies.com",
      icon: Briefcase,
    },
  ],

  office: {
    title: "Visit Our Office",
    description:
      "Located in the heart of Lagos' innovation district, our office is easily accessible and equipped with modern facilities for client meetings and consultations.",
    address: {
      name: "Boffins Technologies",
      street: "123 Technology Drive",
      city: "Innovation District, Lagos, Nigeria",
    },
  },
}
