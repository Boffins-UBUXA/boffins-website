import qs from "qs"

import { landingPageData } from "@/lib/data/landing-page"
import { fetchStrapi, getStrapiMediaUrl, type StrapiResponse } from "@/lib/strapi"

type StrapiHero = {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  image?: string | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
}

type StrapiStat = {
  value?: string | null
  label?: string | null
}

type StrapiHomePage = {
  hero?: StrapiHero | null
  stats?: StrapiStat[] | null
  divisionsTitle?: string | null
  divisionsSubtitle?: string | null
  features?: unknown
  featuresTitle?: string | null
  featuresDescription?: string | null
  featuresImage?: string | null
  featuresImageAlt?: string | null
  featuresCtaLabel?: string | null
  featuresCtaUrl?: string | null
  ctaTitle?: string | null
  ctaDescription?: string | null
}

type StrapiFeatureGroup = {
  title?: string | null
  description?: string | null
  features?: string[] | null
}

type StrapiDivision = {
  id: number
  name?: string | null
  slug?: string | null
  description?: string | null
  icon?: string | null
  services?: StrapiFeatureGroup[] | null
  programs?: StrapiFeatureGroup[] | null
  products?: StrapiFeatureGroup[] | null
}

type StrapiBlogPost = {
  id: number
  documentId?: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  author?: string | null
  category?: string | null
  publishDate?: string | null
  image?: string | null
}

export type HomepageBlogPost = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image?: string
  slug?: string
}

export type HomepageData = {
  hero: typeof landingPageData.hero
  stats: Array<{
    icon: string
    value: string
    label: string
  }>
  divisions: Array<{
    title: string
    description: string
    features: string[]
    href: string
    icon: string
  }>
  divisionsTitle: string
  divisionsSubtitle: string
  features: typeof landingPageData.features
  cta: typeof landingPageData.cta
  blogPosts: HomepageBlogPost[]
}

const divisionIconMap: Record<string, string> = {
  academy: "GraduationCap",
  bespoke: "Code",
  education: "GraduationCap",
  hardware: "HardDrive",
  media: "Megaphone",
  products: "Cpu",
}

const statIconFallbacks = ["Users", "Award", "TrendingUp", "CheckCircle"]

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function getFeatureList(division: StrapiDivision) {
  const source = division.services?.length
    ? division.services
    : division.programs?.length
      ? division.programs
      : division.products?.length
        ? division.products
        : []

  return source
    .map((item) => item.title || item.description)
    .filter((feature): feature is string => Boolean(feature))
}

function normalizeHomePage(homePage?: StrapiHomePage | null) {
  const fallback = landingPageData
  const hero = homePage?.hero
  const features = Array.isArray(homePage?.features)
    ? homePage.features.filter((feature): feature is string => typeof feature === "string")
    : fallback.features.features

  return {
    hero: {
      title: textOrFallback(hero?.title, fallback.hero.title),
      subtitle: textOrFallback(hero?.subtitle, fallback.hero.subtitle),
      description: textOrFallback(hero?.description, fallback.hero.description),
      primaryCTA: {
        text: textOrFallback(hero?.primaryCtaLabel, fallback.hero.primaryCTA.text),
        href: textOrFallback(hero?.primaryCtaUrl, fallback.hero.primaryCTA.href),
      },
      secondaryCTA: {
        text: textOrFallback(hero?.secondaryCtaLabel, fallback.hero.secondaryCTA.text),
        href: textOrFallback(hero?.secondaryCtaUrl, fallback.hero.secondaryCTA.href),
      },
      heroImage: {
        src: getStrapiMediaUrl(hero?.image) || fallback.hero.heroImage.src,
        alt: fallback.hero.heroImage.alt,
      },
    },
    stats:
      homePage?.stats?.map((stat, index) => ({
        icon: statIconFallbacks[index] || "CheckCircle",
        value: textOrFallback(stat.value, fallback.stats[index]?.value || ""),
        label: textOrFallback(stat.label, fallback.stats[index]?.label || ""),
      })) || fallback.stats,
    features: {
      ...fallback.features,
      title: textOrFallback(homePage?.featuresTitle, fallback.features.title),
      description: textOrFallback(homePage?.featuresDescription, fallback.features.description),
      features,
      image: {
        src: getStrapiMediaUrl(homePage?.featuresImage) || fallback.features.image.src,
        alt: textOrFallback(homePage?.featuresImageAlt, fallback.features.image.alt),
      },
      cta: {
        text: textOrFallback(homePage?.featuresCtaLabel, fallback.features.cta.text),
        href: textOrFallback(homePage?.featuresCtaUrl, fallback.features.cta.href),
      },
    },
    divisionsTitle: textOrFallback(homePage?.divisionsTitle, "Our Specialized Divisions"),
    divisionsSubtitle: textOrFallback(
      homePage?.divisionsSubtitle,
      "Each division operates semi-independently while collaborating within the Boffins ecosystem to deliver comprehensive technology solutions."
    ),
    cta: {
      ...fallback.cta,
      title: textOrFallback(homePage?.ctaTitle, fallback.cta.title),
      description: textOrFallback(homePage?.ctaDescription, fallback.cta.description),
    },
  }
}

function normalizeDivisions(divisions: StrapiDivision[]) {
  if (!divisions.length) return landingPageData.divisions

  return divisions.map((division) => {
    const slug = division.slug || ""
    const fallback = landingPageData.divisions.find((item) => item.href.endsWith(`/${slug}`))
    const features = getFeatureList(division)

    return {
      title: textOrFallback(division.name, fallback?.title || ""),
      description: textOrFallback(division.description, fallback?.description || ""),
      features: features.length ? features : fallback?.features || [],
      href: `/services/${slug}`,
      icon: divisionIconMap[slug] || fallback?.icon || "Cpu",
    }
  })
}

function normalizeBlogPosts(posts: StrapiBlogPost[]): HomepageBlogPost[] {
  return posts.map((post) => ({
    id: post.documentId || String(post.id),
    title: post.title || "",
    excerpt: post.excerpt || "",
    author: post.author || "",
    date: post.publishDate || "",
    category: post.category || "",
    image: getStrapiMediaUrl(post.image) || undefined,
    slug: post.slug || undefined,
  }))
}

export async function getHomepageData(): Promise<HomepageData> {
  const homeQuery = qs.stringify(
    {
      populate: {
        seo: true,
        hero: true,
        stats: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const divisionsQuery = qs.stringify(
    {
      populate: {
        services: true,
        programs: true,
        products: true,
      },
      sort: ["id:asc"],
    },
    { encodeValuesOnly: true }
  )

  const blogQuery = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 3,
      },
      sort: ["publishDate:desc"],
    },
    { encodeValuesOnly: true }
  )

  const [homePage, divisions, blogPosts] = await Promise.all([
    fetchStrapi<StrapiResponse<StrapiHomePage>>(`/api/home-page?${homeQuery}`, { cache: "no-store" }),
    fetchStrapi<StrapiResponse<StrapiDivision[]>>(`/api/service-divisions?${divisionsQuery}`, {
      cache: "no-store",
    }),
    fetchStrapi<StrapiResponse<StrapiBlogPost[]>>(`/api/blog-posts?${blogQuery}`, { cache: "no-store" }),
  ])

  return {
    ...normalizeHomePage(homePage.data),
    divisions: normalizeDivisions(divisions.data || []),
    blogPosts: normalizeBlogPosts(blogPosts.data || []),
  }
}
