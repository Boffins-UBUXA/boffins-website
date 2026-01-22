module.exports.strapiData = {
    // Collection Type: Service Divisions
    serviceDivisions: [
        {
            name: "Bespoke Division",
            slug: "bespoke",
            introText: "Transform your business with tailor-made software solutions. From web applications to mobile apps and system integrations, we build exactly what you need to succeed.",
            heroImage: "/custom-software-development.png", // Placeholder path
            servicesList: [
                {
                    title: "Beautiful Websites that Convert",
                    description: "Custom web experiences designed to engage visitors and drive meaningful conversions.",
                    icon: "Globe", // Lucide icon name
                    features: ["Responsive design", "Performance optimization", "SEO implementation", "User experience focused"]
                },
                {
                    title: "Custom Web Applications",
                    description: "Tailored web solutions built with modern technologies to address your specific business challenges.",
                    icon: "Code",
                    features: ["Full-stack development", "Database integration", "API development", "Scalable architecture"]
                },
                {
                    title: "Mobile Applications",
                    description: "Native and cross-platform mobile applications with seamless, intuitive user experiences.",
                    icon: "Smartphone",
                    features: ["iOS and Android development", "Cross-platform solutions", "Intuitive UI/UX design"]
                },
                {
                    title: "Technical Consulting",
                    description: "Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.",
                    icon: "Settings",
                    features: ["Technology assessment", "Architecture planning", "Code review and optimization"]
                }
            ],
            portfolio: [
                {
                    title: "Ubuxa Website",
                    description: "Renewable energy management platform website with interactive dashboards.",
                    image: "/renewable-energy-website-dashboard.jpg",
                    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
                    features: ["Interactive energy analytics", "Real-time monitoring", "Mobile responsive"],
                    category: "Energy Management"
                },
                {
                    title: "Tims Auto Website",
                    description: "Automotive service website with online booking system and service catalog.",
                    image: "/automotive-service-website-booking.jpg",
                    technologies: ["React", "Node.js", "MongoDB"],
                    features: ["Online booking system", "Service catalog", "Customer reviews"],
                    category: "Automotive Services"
                }
            ],
            process: [
                { step: "01", title: "Discovery & Requirements", description: "This phase involves a deep dive into your business needs...", icon: "Settings" },
                { step: "02", title: "Design & Architecture", description: "Our architects design a robust and scalable solution...", icon: "Code" },
                { step: "03", title: "Development & Testing", description: "Agile development with continuous feedback loops...", icon: "Globe" },
                { step: "04", title: "Deployment & Support", description: "Smooth deployment and ongoing maintenance support...", icon: "Smartphone" }
            ],
            testimonials: [
                {
                    name: "Tim Johnson",
                    company: "Tims Auto Services",
                    content: "The website Boffins built transformed our business. Online booking increased our appointments by 40%.",
                    rating: 5,
                    project: "Automotive Website"
                },
                {
                    name: "David Bekwyn",
                    company: "Bekwyn Law Firm",
                    content: "Their technical expertise combined with understanding of our legal processes was exceptional.",
                    rating: 5,
                    project: "Legal Case Management"
                }
            ]
        },
        {
            name: "Academy",
            slug: "education",
            introText: "Transform your future with our comprehensive tech programs. From social media advertising to full-stack development, we provide the skills you need.",
            heroImage: "/students-learning-programming-coding-bootcamp.jpg",
            servicesList: [
                {
                    title: "Social Media Advertising",
                    description: "Master the strategies and tools needed to create effective social media advertising campaigns.",
                    icon: "Palette",
                    features: ["Facebook Ads", "Instagram Ads", "Analytics", "Campaign Management"]
                },
                {
                    title: "Frontend Development",
                    description: "Build modern, responsive web applications using the latest frontend technologies.",
                    icon: "Code",
                    features: ["HTML5", "CSS3", "React", "Next.js", "Tailwind CSS"]
                },
                {
                    title: "Backend Development",
                    description: "Learn server-side development, databases, and API design to build robust backend systems.",
                    icon: "Database",
                    features: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
                },
                {
                    title: "Full Stack Development",
                    description: "Comprehensive program covering both frontend and backend development.",
                    icon: "BookOpen",
                    features: ["React", "Node.js", "Databases", "DevOps", "Deployment"]
                }
            ],
            portfolio: [], // Academy uses Success Stories instead, mapping to portfolio for now or creating separate component
            process: [],
            testimonials: [
                {
                    name: "Chisom Okafor",
                    company: "TechCorp Nigeria",
                    content: "Boffins Academy transformed my career journey. I landed my dream job within 3 months of graduation!",
                    rating: 5,
                    project: "Full Stack Development"
                },
                {
                    name: "Adebayo Akinsanya",
                    company: "Digital Innovations",
                    content: "The Frontend Development program exceeded my expectations. I went from zero coding knowledge to building apps.",
                    rating: 5,
                    project: "Frontend Development"
                }
            ]
        },
        {
            name: "Hardware Division",
            slug: "hardware",
            introText: "Protect and optimize your electronic infrastructure with our cutting-edge IoT devices and networking solutions.",
            heroImage: "/iot-devices-smart-sensors-industrial-monitoring.jpg",
            servicesList: [
                {
                    title: "IoT Device Management",
                    description: "Effortlessly manage your IoT devices with our intuitive platform.",
                    icon: "Router",
                    features: ["Device provisioning", "Real-time monitoring", "Remote management"]
                },
                {
                    title: "Industrial Connectivity",
                    description: "Ensure seamless connectivity for your industrial applications.",
                    icon: "Cpu",
                    features: ["High-speed data transfer", "Robust network infrastructure", "Scalable solutions"]
                },
                {
                    title: "Power Protection",
                    description: "Protect your critical equipment from power anomalies.",
                    icon: "Battery",
                    features: ["Surge protection", "Voltage regulation", "Battery backup"]
                }
            ],
            portfolio: [],
            process: [],
            testimonials: []
        },
        {
            name: "Media Company",
            slug: "media",
            introText: "Transform your digital presence with our comprehensive media services. We help brands connect with their audience.",
            heroImage: "/social-media-content-creation-studio.jpg",
            servicesList: [
                {
                    title: "Social Media Management",
                    description: "Complete social media strategy, content creation, and community management.",
                    icon: "Instagram",
                    features: ["Content strategy", "Daily posting", "Community engagement", "Analytics"]
                },
                {
                    title: "Content Creation",
                    description: "High-quality visual and written content that captures your brand's voice.",
                    icon: "Camera",
                    features: ["Photography", "Videography", "Graphic design", "Copywriting"]
                },
                {
                    title: "Brand Strategy",
                    description: "Comprehensive brand development and positioning.",
                    icon: "Megaphone",
                    features: ["Brand identity", "Market research", "Competitive positioning"]
                }
            ],
            portfolio: [
                {
                    title: "Ubuxa Brand Overhaul",
                    description: "Complete Brand Overhaul & Social Strategy for Fintech.",
                    image: "/fintech-app-ubuxa.jpg",
                    technologies: ["Social Media", "Branding"],
                    features: ["500% increase in engagement", "350% increase in followers"],
                    category: "Fintech"
                },
                {
                    title: "Tims Auto Marketing",
                    description: "Social Media Management & Content Creation for Automotive.",
                    image: "/automotive-dealership-cars.jpg",
                    technologies: ["Content Creation", "Social Ads"],
                    features: ["300% increase in traffic", "280% increase in inquiries"],
                    category: "Automotive"
                }
            ],
            process: [],
            testimonials: [
                {
                    name: "CEO, Ubuxa",
                    company: "Ubuxa",
                    content: "Their social media strategy transformed our brand presence. Within months, we saw massive growth.",
                    rating: 5,
                    project: "Brand Strategy"
                },
                {
                    name: "Manager, Tims Auto",
                    company: "Tims Auto",
                    content: "The content creation team delivered incredible visuals. Our showroom traffic increased significantly.",
                    rating: 5,
                    project: "Content Creation"
                }
            ]
        },
        {
            name: "Product Division",
            slug: "products",
            introText: "Discover our suite of cutting-edge software products designed to solve real-world problems and drive business growth.",
            heroImage: "/product-division-hero.jpg", // Placeholder
            servicesList: [
                {
                    title: "Ubuxa",
                    description: "Renewable Energy Management Solution. Monitoring and optimizing renewable energy systems.",
                    icon: "Battery",
                    features: ["Real-time monitoring", "Predictive maintenance", "Cost analysis"]
                },
                {
                    title: "Vikmid",
                    description: "Creator Management Solution. Manage brand, audience, collaborations, and revenue.",
                    icon: "Video",
                    features: ["Multi-platform scheduling", "Audience analytics", "Revenue tracking"]
                }
            ],
            portfolio: [],
            process: [],
            testimonials: [
                {
                    name: "David Thompson",
                    company: "GreenTech Solutions",
                    content: "Ubuxa has revolutionized how we manage our solar installations. Saved us thousands.",
                    rating: 5,
                    project: "Ubuxa"
                },
                {
                    name: "Sarah Martinez",
                    company: "Creative Studios Inc",
                    content: "Vikmid has been a game-changer. My engagement rates have increased by 60%.",
                    rating: 5,
                    project: "Vikmid"
                }
            ]
        }
    ],

    // Blog Posts
    blogPosts: [
        {
            title: "Building Scalable Web Applications with Next.js and TypeScript",
            excerpt: "Learn the best practices for creating robust, scalable web applications using modern development frameworks and tools.",
            image: "/nextjs-typescript-web-development.jpg",
            author: "Michael Chen",
            date: "December 12, 2024",
            readTime: "6 min read",
            category: "Bespoke",
            slug: "scalable-web-apps-nextjs-typescript",
            content: `Next.js combined with TypeScript provides a powerful foundation for building scalable web applications... (Full content truncated for brevity)`
        },
        {
            title: "IoT Security: Protecting Your Smart Devices from Cyber Threats",
            excerpt: "Essential security measures and best practices to keep your IoT devices and networks safe from evolving cyber threats.",
            image: "/iot-security-cyber-protection.jpg",
            author: "Alex Rodriguez",
            date: "December 10, 2024",
            readTime: "7 min read",
            category: "Hardware",
            slug: "iot-security-cyber-protection",
            content: "The Internet of Things (IoT) is growing exponentially..."
        },
        {
            title: "The Rise of No-Code Platforms: Democratizing Software Development",
            excerpt: "Exploring how no-code and low-code platforms are changing the software development landscape.",
            image: "/no-code-platforms-software-development.jpg",
            author: "Emma Thompson",
            date: "December 8, 2024",
            readTime: "5 min read",
            category: "Product",
            slug: "no-code-platforms-democratizing-development",
            content: "No-code and low-code platforms are revolutionizing how software is built..."
        }
    ],

    // Single Types Data
    homepage: {
        hero: {
            title: "Digitizing Africa's Enterprises",
            subtitle: "Innovative Solutions, Sustainable Growth",
            image: "/hero-image.jpg"
        }
    },
    contactPage: {
        hero: {
            badge: "Get In Touch",
            title: "Let's Build Something Amazing Together",
            subtitle: "",
            description: "Ready to transform your business with cutting-edge technology? Reach out to us today."
        },
        officeLocation: {
            address: "Plot 902 Ibrahim Isyaku street Mabushi abuja",
            mapUrl: "https://www.google.com/maps/embed?..."
        }
    }
};
