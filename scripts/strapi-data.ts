// @ts-nocheck
/**
 * STRAPI DATA AGGREGATOR
 * -------------------------------------------------------
 * Aggregates all Boffins Technology website content into one object
 * for the migration script to consume.
 */

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeSeo(title, description) {
  return {
    metaTitle: title || "",
    metaDescription: description || "",
    keywords: "",
  };
}

function getImageSrc(image) {
  if (!image) return "";
  if (typeof image === 'string') return image;
  if (image.src) return image.src;
  return "";
}

function getIconName(icon) {
  if (!icon) return "";
  if (typeof icon === "string") return icon;
  return icon.displayName || icon.name || "";
}

function sanitizeForJson(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeForJson);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => typeof entryValue !== "function")
        .map(([key, entryValue]) => [key, sanitizeForJson(entryValue)])
    );
  }

  return typeof value === "function" ? undefined : value;
}

// Import all data from lib/data files
import { blogPosts } from '../lib/data/blog-data';
import { caseStudies } from '../lib/data/case-studies';
import { aboutData } from '../lib/data/about-data';
import { contactData } from '../lib/data/contact-data';
import { servicesData } from '../lib/data/services-data';
import { landingPageData } from '../lib/data/landing-page';
import { bespokeData } from '../lib/data/bespoke';
import { academyData } from '../lib/data/academy';
import { hardwareData } from '../lib/data/hardware';
import { mediaData } from '../lib/data/media';
import { productsData } from '../lib/data/products';

export const strapiData = {
  // -----------------------------------------------------
  // SINGLE TYPES
  // -----------------------------------------------------
  siteSetting: {
    brandName: "Boffins Technology",
    logoSrc: "/images/logo.png",
    logoAlt: "Boffins Technology",
    navigation: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    footerDescription:
      "A diversified technology holding company with specialized subsidiaries in academy, products, hardware, media, and bespoke solutions.",
    footerDivisionsTitle: "Our Divisions",
    footerDivisions: [
      { name: "Academy", href: "/services/education" },
      { name: "Product Division", href: "/services/products" },
      { name: "Hardware Division", href: "/services/hardware" },
      { name: "Media Company", href: "/services/media" },
      { name: "Bespoke Division", href: "/services/bespoke" },
    ],
    footerQuickLinksTitle: "Quick Links",
    footerQuickLinks: [
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    footerContactTitle: "Contact Us",
    footerContactItems: [
      { type: "email", label: "info@boffinstechnology.com.ng", href: "mailto:info@boffinstechnology.com.ng" },
      { type: "phone", label: "+234 (801) 566-53196", href: "tel:+23480156653196" },
      { type: "address", label: "Plot 902 Ibrahim Isyaku St, Abuja, Nigeria" },
    ],
    socialLinks: [
      { platform: "tiktok", name: "TikTok", href: "https://www.tiktok.com/@boffinstechnology" },
      { platform: "twitter", name: "Twitter", href: "https://twitter.com/boffinstech" },
      { platform: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/in/ubuxa-ubuxa-297427379/" },
    ],
    copyrightText: "© {year} Boffins Technology. All rights reserved.",
  },

  homePage: {
    route: "/",
    seo: normalizeSeo(
      `${landingPageData.hero.title} ${landingPageData.hero.subtitle}`,
      landingPageData.hero.description
    ),
    hero: {
      title: landingPageData.hero.title,
      subtitle: landingPageData.hero.subtitle,
      description: landingPageData.hero.description,
      image: getImageSrc(landingPageData.hero.heroImage),
      primaryCtaLabel: landingPageData.hero.primaryCTA.text,
      primaryCtaUrl: landingPageData.hero.primaryCTA.href,
      secondaryCtaLabel: landingPageData.hero.secondaryCTA.text,
      secondaryCtaUrl: landingPageData.hero.secondaryCTA.href,
    },
    stats: (landingPageData.stats || []).map(stat => ({
      value: stat.value,
      label: stat.label,
    })),
    divisionsTitle: "Our Specialized Divisions",
    divisionsSubtitle:
      "Each division operates semi-independently while collaborating within the Boffins ecosystem to deliver comprehensive technology solutions.",
    features: landingPageData.features.features || [],
    featuresTitle: landingPageData.features.title,
    featuresDescription: landingPageData.features.description,
    featuresImage: getImageSrc(landingPageData.features.image),
    featuresImageAlt: landingPageData.features.image?.alt || "",
    featuresCtaLabel: landingPageData.features.cta?.text || "",
    featuresCtaUrl: landingPageData.features.cta?.href || "",
    ctaTitle: landingPageData.cta.title,
    ctaDescription: landingPageData.cta.description,
  },

  blogPage: {
    route: "/blog",
    seo: normalizeSeo(
      "Blog | Boffins Technology",
      "Discover the latest trends, best practices, and innovations in technology from across our divisions."
    ),
    heroBadge: "Tech Insights",
    heroTitle: "Stay Ahead with",
    heroHighlightedTitle: "Tech Insights",
    heroDescription:
      "Discover the latest trends, best practices, and innovations in technology from across our divisions.",
    searchPlaceholder: "Search articles...",
    searchButtonLabel: "Search",
    featuredTitle: "Featured Article",
    featuredDescription: "Our latest and most popular content",
    featuredEmptyTitle: "No Featured Article",
    featuredEmptyDescription: "Check back soon for our latest featured content",
    featuredCtaLabel: "Read Full Article",
    latestTitle: "Latest Articles",
    searchResultsLabelTemplate: 'Showing results for "{query}"',
    divisionResultsLabelTemplate: "in {division}",
    noArticlesTitle: "No Articles Found",
    noArticlesSearchDescription: "Try adjusting your search terms or filters",
    noArticlesDefaultDescription: "Check back soon for new content",
    clearFiltersLabel: "Clear Filters",
    loadMoreLabel: "Load More Articles",
    loadingLabel: "Loading...",
    divisionsTitle: "Divisions",
    allDivisionsLabel: "All",
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Subscribe to our newsletter for the latest tech insights and updates.",
    newsletterPlaceholder: "Enter your email",
    newsletterSubmitLabel: "Subscribe",
    newsletterSubmittingLabel: "Subscribing...",
    toastCloseLabel: "Close",
    invalidEmailTitle: "Invalid Email",
    invalidEmailDescription: "Please enter a valid email address",
    subscribeSuccessTitle: "Successfully Subscribed!",
    subscribeSuccessDescription: "You'll receive our latest updates in your inbox.",
    detailBackLabel: "Back to Blog",
    detailNotFoundTitle: "Post Not Found | Boffins Technology",
    relatedTitle: "Related Articles",
    relatedDescription: "More insights and stories from our team that you might find interesting.",
    publishedInLabel: "Published in",
  },

  aboutPage: {
    route: "/about",
    seo: normalizeSeo(
      `${aboutData.hero.title} ${aboutData.hero.subtitle}`,
      aboutData.hero.description
    ),
    hero: {
      title: aboutData.hero.title,
      subtitle: aboutData.hero.subtitle,
      description: aboutData.hero.description,
      image: getImageSrc(aboutData.hero.heroImage),
      primaryCtaLabel: aboutData.hero.primaryCTA.text,
      primaryCtaUrl: aboutData.hero.primaryCTA.href,
      secondaryCtaLabel: aboutData.hero.secondaryCTA.text,
      secondaryCtaUrl: aboutData.hero.secondaryCTA.href,
    },
    missionTitle: aboutData.mission.title,
    missionDescription: aboutData.mission.description,
    visionTitle: aboutData.vision.title,
    visionDescription: aboutData.vision.description,
    values: (aboutData.values || []).map(v => ({
      icon: v.icon?.displayName || v.icon?.name || "",
      title: v.title,
      description: v.description,
    })),
    valuesTitle: "Our Core Values",
    valuesSubtitle: "These values guide every decision we make and every solution we create across all our divisions.",
    leadership: (aboutData.leadership || []).map(l => ({
      name: l.name,
      role: l.role,
      description: l.description,
      image: getImageSrc(l.image),
      imageAlt: l.image?.alt || "",
    })),
    leadershipTitle: "Organizational Structure",
    leadershipSubtitle:
      "Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions.",
    milestones: (aboutData.milestones || []).map(m => ({
      year: m.year,
      title: m.title,
      description: m.description,
    })),
    milestonesTitle: "Our Journey",
    milestonesSubtitle: "From a single vision to a diversified technology ecosystem - here's how we've grown and evolved.",
    collaboration: aboutData.collaboration,
    ctaTitle: aboutData.cta.title,
    ctaDescription: aboutData.cta.description,
    ctaPrimaryLabel: aboutData.cta.primaryCTA.text,
    ctaPrimaryUrl: aboutData.cta.primaryCTA.href,
    ctaSecondaryLabel: aboutData.cta.secondaryCTA.text,
    ctaSecondaryUrl: aboutData.cta.secondaryCTA.href,
  },

  contactPage: {
    route: "/contact",
    seo: normalizeSeo(
      `${contactData.hero.title} ${contactData.hero.subtitle}`,
      contactData.hero.description
    ),
    heroBadge: contactData.hero.badge,
    hero: {
      title: contactData.hero.title,
      subtitle: contactData.hero.subtitle,
      description: contactData.hero.description,
    },
    contactInfo: (contactData.contactInfo || []).map(item => ({
      icon: item.icon?.displayName || item.icon?.name || "",
      title: item.title,
      details: item.details.join("\n"),
      color: item.color,
    })),
    formTitle: "Send Us a Message",
    formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
    firstNameLabel: "First Name *",
    firstNamePlaceholder: "John",
    lastNameLabel: "Last Name *",
    lastNamePlaceholder: "Doe",
    emailLabel: "Email Address *",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+234 (0) 123 456 7890",
    companyLabel: "Company",
    companyPlaceholder: "Your Company Name",
    serviceLabel: "Service of Interest",
    servicePlaceholder: "Select a service",
    serviceOptions: [
      { value: "bespoke", label: "Bespoke Division" },
      { value: "products", label: "Product Division" },
      { value: "media", label: "Media Company" },
      { value: "academy", label: "Academy" },
      { value: "hardware", label: "Hardware Division" },
    ],
    messageLabel: "Message *",
    messagePlaceholder: "Tell us about your project or inquiry...",
    submitLabel: "Send Message",
    submittingLabel: "Sending...",
    toastCloseLabel: "Close",
    validationErrorTitle: "Missing Required Fields",
    validationErrorDescription: "Please fill in all required fields (marked with *)",
    successTitle: "Message Sent Successfully!",
    successDescription: "Thank you for contacting us! Our team will respond to your inquiry within 10 minutes to 24 hours.",
    errorTitle: "Failed to Send Message",
    errorDescription: "We couldn't send your message. Please try again or contact us directly at info@boffinstechnology.com.ng",
    mailRecipient: "info@boffinstechnology.com.ng",
    mailSubjectPrefix: "Contact Form Submission from",
    divisionsTitle: "Contact Our Divisions",
    divisionsDescription:
      "Get in touch with the specific division that best matches your needs for faster, more targeted assistance.",
    divisions: (contactData.divisions || []).map((division) => ({
      name: division.name,
      description: division.description,
      email: division.email,
      icon: division.icon?.displayName || division.icon?.name || "",
      socialMedia: division.socialMedia || {},
    })),
    socialAriaLabelTemplate: "Visit our {platform} page",
    officeTitle: contactData.office.title,
    officeDescription: contactData.office.description,
    officeMapUrl: contactData.office.mapUrl,
    officeMapTitle: "Boffins Technology Office Location",
  },

  servicePage: {
    route: "/services",
    seo: normalizeSeo(
      `${servicesData.hero.title} ${servicesData.hero.subtitle}`,
      servicesData.hero.description
    ),
    hero: {
      title: servicesData.hero.title,
      subtitle: servicesData.hero.subtitle,
      description: servicesData.hero.description,
      image: getImageSrc(servicesData.hero.heroImage),
      primaryCtaLabel: servicesData.hero.primaryCTA.text,
      primaryCtaUrl: servicesData.hero.primaryCTA.href,
      secondaryCtaLabel: servicesData.hero.secondaryCTA.text,
      secondaryCtaUrl: servicesData.hero.secondaryCTA.href,
    },
    divisionsTitle: "Our Service Divisions",
    divisionsSubtitle:
      "Each division operates with specialized expertise while collaborating within our integrated ecosystem to deliver comprehensive solutions.",
    divisionCardCtaLabel: "Learn More",
    divisionMoreLabel: "More",
    divisionLessLabel: "Less",
    benefitsTitle: "Why Choose Boffins Technology?",
    benefitsSubtitle:
      "Our unique approach combines specialized expertise with collaborative innovation to deliver exceptional results.",
    benefits: (servicesData.benefits || []).map((benefit) => ({
      icon: benefit.icon?.displayName || benefit.icon?.name || "",
      title: benefit.title,
      description: benefit.description,
    })),
    benefitSeeMoreLabel: "See More",
    benefitSeeLessLabel: "See Less",
    processTitle: servicesData.process.title,
    processDescription: servicesData.process.description,
    processSteps: (servicesData.process.steps || []).map((step) => ({
      stepNumber: step.step,
      title: step.title,
      description: step.description,
    })),
    processImage: getImageSrc(servicesData.process.image),
    processImageAlt: servicesData.process.image?.alt || "",
    processMoreLabel: "More",
    processLessLabel: "Less",
    processViewAllLabel: "View All {count} Steps",
    ctaTitle: servicesData.cta.title,
    ctaDescription: servicesData.cta.description,
    ctaPrimaryLabel: servicesData.cta.primaryCTA.text,
    ctaPrimaryUrl: servicesData.cta.primaryCTA.href,
    ctaSecondaryLabel: servicesData.cta.secondaryCTA.text,
    ctaSecondaryUrl: servicesData.cta.secondaryCTA.href,
  },

  caseStudyPage: {
    route: "/case-studies",
    seo: normalizeSeo(
      "Case Studies | Boffins Technology",
      "Explore our latest case studies showcasing successful technology solutions and client success stories."
    ),
    heroBadgeLabel: "Client Success Stories",
    heroTitle: "Our",
    heroHighlightedTitle: "Case Studies",
    heroDescription:
      "Discover how we've helped innovative companies solve complex technology challenges and achieve their business goals.",
    featuredTitle: "Featured Case Study",
    featuredSubtitle: "Our latest and most impactful work",
    featuredCardCtaLabel: "View Case Study",
    allTitle: "All Case Studies",
    singleCountLabel: "case study",
    pluralCountLabel: "case studies",
    cardCtaLabel: "Learn More",
    fallbackCategoryLabel: "Case Study",
    fallbackImage: "/placeholder.svg",
    notFoundTitle: "Case Study Not Found | Boffins Technology",
    detailBackLabel: "Back to Case Studies",
    detailVisitProjectFallbackLabel: "Visit Project",
    detailCtaTitle: "Ready to Build Something Amazing?",
    detailCtaDescription:
      "Let us help you solve your complex technology challenges. Get in touch with our team today.",
    detailCtaPrimaryLabel: "Start a Project",
    detailCtaPrimaryUrl: "/contact",
    detailCtaSecondaryLabel: "View More Case Studies",
    detailCtaSecondaryUrl: "/case-studies",
  },

  // -----------------------------------------------------
  // COLLECTION TYPES
  // -----------------------------------------------------
  blogPosts: (blogPosts || []).map(post => ({
    externalId: `blog-${slugify(post.slug)}`,
    title: post.title || "",
    slug: slugify(post.slug),
    excerpt: post.excerpt || "",
    content: post.content || "",
    author: post.author || "",
    category: post.category || "",
    publishDate: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    readTime: post.readTime || "",
    image: post.image || "",
  })),

  caseStudies: (caseStudies || []).map(study => ({
    externalId: `case-${slugify(study.slug)}`,
    title: study.title || "",
    slug: slugify(study.slug),
    subtitle: study.subtitle || "",
    intro: study.intro || "",
    image: study.image || "",
    category: study.category || "",
    client: study.client || "",
    ctaUrl: study.ctaUrl || "",
    ctaText: study.ctaText || "",
    sections: study.sections || [],
    rawData: sanitizeForJson(study),
  })),

  serviceDivisions: [
    {
      externalId: "division-bespoke",
      name: "Bespoke Division",
      slug: "bespoke",
      description: (bespokeData.services && bespokeData.services[0]) ? bespokeData.services[0].description : "",
      icon: "🛠️",
      color: "from-indigo-500 to-purple-500",
      hero: {
        badge: bespokeData.hero.badge,
        title: bespokeData.hero.title,
        subtitle: bespokeData.hero.subtitle,
        description: bespokeData.hero.description,
        image: getImageSrc(bespokeData.hero.heroImage),
        primaryCtaLabel: bespokeData.hero.primaryCTA?.text || "",
        primaryCtaUrl: bespokeData.hero.primaryCTA?.href || "",
        secondaryCtaLabel: bespokeData.hero.secondaryCTA?.text || "",
        secondaryCtaUrl: bespokeData.hero.secondaryCTA?.href || "",
      },
      stats: (bespokeData.hero.stats || []).map(stat => ({
        icon: getIconName(stat.icon),
        value: stat.value,
        label: stat.label,
      })),
      services: (bespokeData.services || []).map(s => ({
        icon: getIconName(s.icon),
        title: s.title,
        description: s.description,
        features: s.features,
        color: s.color,
      })),
      portfolio: (bespokeData.portfolio || []).map(p => ({
        name: p.name,
        description: p.description,
        image: p.image,
        technologies: p.technologies,
        features: p.features,
        link: p.link,
        category: p.category,
      })),
      testimonials: (bespokeData.testimonials || []).map(t => ({
        name: t.name,
        company: t.company,
        image: getImageSrc(t.image),
        content: t.testimonial,
        rating: t.rating,
        project: t.project,
      })),
      process: (bespokeData.process || []).map(p => ({
        stepNumber: p.step,
        title: p.title,
        description: p.description,
      })),
      cta: sanitizeForJson(bespokeData.cta || {}),
      rawData: sanitizeForJson(bespokeData),
    },
    {
      externalId: "division-academy",
      name: "Academy",
      slug: "education",
      description: (academyData.programs && academyData.programs[0]) ? academyData.programs[0].description : "",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
      hero: {
        badge: academyData.hero.badge,
        title: academyData.hero.title,
        subtitle: academyData.hero.subtitle,
        description: academyData.hero.description,
        image: getImageSrc(academyData.hero.heroImage),
        primaryCtaLabel: academyData.hero.primaryCTA?.text || "",
        primaryCtaUrl: academyData.hero.primaryCTA?.href || "",
        secondaryCtaLabel: academyData.hero.secondaryCTA?.text || "",
        secondaryCtaUrl: academyData.hero.secondaryCTA?.href || "",
      },
      stats: (academyData.hero.stats || []).map(stat => ({
        icon: getIconName(stat.icon),
        value: stat.value,
        label: stat.label,
      })),
      programs: (academyData.programs || []).map(p => ({
        title: p.title,
        duration: p.duration,
        level: p.level,
        description: p.description,
        skills: p.skills,
        projects: p.projects,
        color: p.color,
      })),
      successStories: (academyData.successStories || []).map(s => ({
        name: s.name,
        program: s.program,
        role: s.role,
        content: s.testimonial,
        salary: s.salary,
        image: getImageSrc(s.image),
      })),
      features: (academyData.features || []).map(f => ({
        ...sanitizeForJson(f),
        icon: getIconName(f.icon),
      })),
      learningOptions: sanitizeForJson(academyData.learningOptions || {}),
      cta: sanitizeForJson(academyData.cta || {}),
      rawData: sanitizeForJson(academyData),
    },
    {
      externalId: "division-hardware",
      name: "Hardware Division",
      slug: "hardware",
      description: (hardwareData.services && hardwareData.services[0]) ? hardwareData.services[0].description : "",
      icon: "⚡",
      color: "from-orange-500 to-red-500",
      hero: {
        badge: hardwareData.hero.badge,
        title: hardwareData.hero.title,
        subtitle: hardwareData.hero.subtitle,
        description: hardwareData.hero.description,
        image: getImageSrc(hardwareData.hero.heroImage),
        primaryCtaLabel: hardwareData.hero.primaryCTA?.text || "",
        primaryCtaUrl: hardwareData.hero.primaryCTA?.href || "",
        secondaryCtaLabel: hardwareData.hero.secondaryCTA?.text || "",
        secondaryCtaUrl: hardwareData.hero.secondaryCTA?.href || "",
      },
      stats: (hardwareData.hero.stats || []).map(stat => ({
        icon: getIconName(stat.icon),
        value: stat.value,
        label: stat.label,
      })),
      services: (hardwareData.services || []).map(s => ({
        icon: getIconName(s.icon),
        title: s.title,
        description: s.description,
        features: s.features,
        featured: s.featured || false,
        color: s.color,
      })),
      ubuxaIoTPro: hardwareData.ubuxaIoTPro || {},
      applications: (hardwareData.applications || []).map(a => ({
        industry: a.industry,
        description: a.description,
        benefits: a.benefits,
        image: a.image,
      })),
      cta: sanitizeForJson(hardwareData.cta || {}),
      rawData: sanitizeForJson(hardwareData),
    },
    {
      externalId: "division-media",
      name: "Media Company",
      slug: "media",
      description: (mediaData.services && mediaData.services[0]) ? mediaData.services[0].description : "",
      icon: "📱",
      color: "from-green-500 to-teal-500",
      hero: {
        badge: mediaData.hero.badge,
        title: mediaData.hero.title,
        subtitle: mediaData.hero.subtitle,
        description: mediaData.hero.description,
        image: getImageSrc(mediaData.hero.heroImage),
        primaryCtaLabel: mediaData.hero.primaryCTA?.text || "",
        primaryCtaUrl: mediaData.hero.primaryCTA?.href || "",
        secondaryCtaLabel: mediaData.hero.secondaryCTA?.text || "",
        secondaryCtaUrl: mediaData.hero.secondaryCTA?.href || "",
      },
      stats: (mediaData.hero.stats || []).map(stat => ({
        icon: getIconName(stat.icon),
        value: stat.value,
        label: stat.label,
      })),
      services: (mediaData.services || []).map(s => ({
        icon: getIconName(s.icon),
        title: s.title,
        description: s.description,
        features: s.features,
        color: s.color,
      })),
      portfolio: (mediaData.portfolio || []).map(p => ({
        client: p.client,
        industry: p.industry,
        service: p.service,
        results: p.results,
        image: p.image,
        metrics: p.metrics,
      })),
      testimonials: (mediaData.testimonials || []).map(t => ({
        name: t.name,
        company: t.company,
        image: getImageSrc(t.image),
        content: t.testimonial,
        rating: t.rating,
      })),
      platforms: (mediaData.platforms || []).map(p => ({
        ...sanitizeForJson(p),
        icon: getIconName(p.icon),
      })),
      cta: sanitizeForJson(mediaData.cta || {}),
      rawData: sanitizeForJson(mediaData),
    },
    {
      externalId: "division-products",
      name: "Product Division",
      slug: "products",
      description: (productsData.products && productsData.products[0]) ? productsData.products[0].description : "",
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
      hero: {
        badge: productsData.hero.badge,
        title: productsData.hero.title,
        subtitle: productsData.hero.subtitle,
        description: productsData.hero.description,
        image: getImageSrc(productsData.hero.heroImage),
        primaryCtaLabel: productsData.hero.primaryCTA?.text || "",
        primaryCtaUrl: productsData.hero.primaryCTA?.href || "",
        secondaryCtaLabel: productsData.hero.secondaryCTA?.text || "",
        secondaryCtaUrl: productsData.hero.secondaryCTA?.href || "",
      },
      stats: (productsData.stats || []).map(stat => ({
        icon: getIconName(stat.icon),
        value: stat.value,
        label: stat.label,
      })),
      products: (productsData.products || []).map(p => ({
        icon: getIconName(p.icon),
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        features: p.features,
        benefits: p.benefits,
        image: p.image,
        website: p.website,
        color: p.color,
        category: p.category,
      })),
      testimonials: (productsData.testimonials || []).map(t => ({
        name: t.name,
        company: t.company,
        product: t.product,
        image: getImageSrc(t.image),
        content: t.testimonial,
        rating: t.rating,
      })),
      cta: sanitizeForJson(productsData.cta || {}),
      rawData: sanitizeForJson(productsData),
    },
  ],
};
