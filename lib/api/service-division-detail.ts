import qs from "qs"

import { academyData } from "@/lib/data/academy"
import { bespokeData } from "@/lib/data/bespoke"
import { hardwareData } from "@/lib/data/hardware"
import { mediaData } from "@/lib/data/media"
import { productsData } from "@/lib/data/products"
import { fetchStrapi, getStrapiMediaUrl, type StrapiResponse } from "@/lib/strapi"

type FeatureItem = {
  icon?: string | null
  title?: string | null
  description?: string | null
  features?: string[] | null
  skills?: string[] | null
  benefits?: string[] | null
  color?: string | null
  featured?: boolean | null
  duration?: string | null
  level?: string | null
  projects?: number | null
  name?: string | null
  tagline?: string | null
  image?: string | null
  website?: string | null
  category?: string | null
}

type StrapiDivision = {
  name?: string | null
  slug?: string | null
  description?: string | null
  color?: string | null
  hero?: {
    badge?: string | null
    title?: string | null
    subtitle?: string | null
    description?: string | null
    image?: string | null
    primaryCtaLabel?: string | null
    primaryCtaUrl?: string | null
    secondaryCtaLabel?: string | null
    secondaryCtaUrl?: string | null
  } | null
  stats?: Array<{ icon?: string | null; value?: string | null; label?: string | null }> | null
  services?: FeatureItem[] | null
  programs?: FeatureItem[] | null
  products?: FeatureItem[] | null
  portfolio?: Array<Record<string, any>> | null
  testimonials?: Array<Record<string, any>> | null
  process?: Array<Record<string, any>> | null
  successStories?: Array<Record<string, any>> | null
  applications?: Array<Record<string, any>> | null
  features?: Array<Record<string, any>> | null
  platforms?: Array<Record<string, any>> | null
  learningOptions?: Record<string, any> | null
  cta?: {
    title?: string | null
    description?: string | null
    primaryCTA?: { text?: string | null; href?: string | null; external?: boolean | null } | null
    secondaryCTA?: { text?: string | null; href?: string | null; external?: boolean | null } | null
  } | null
  ubuxaIoTPro?: Record<string, any> | null
}

export type DivisionDetailData = {
  slug: string
  name: string
  description: string
  hero: NonNullable<StrapiDivision["hero"]>
  stats: Array<{ icon: string; value: string; label: string }>
  primaryItems: FeatureItem[]
  primaryItemsTitle: string
  primaryItemsDescription: string
  portfolio: Array<Record<string, any>>
  testimonials: Array<Record<string, any>>
  process: Array<Record<string, any>>
  successStories: Array<Record<string, any>>
  applications: Array<Record<string, any>>
  features: Array<Record<string, any>>
  platforms: Array<Record<string, any>>
  learningOptions?: Record<string, any> | null
  cta?: StrapiDivision["cta"]
  ubuxaIoTPro?: Record<string, any> | null
}

const staticBySlug: Record<string, any> = {
  bespoke: bespokeData,
  education: academyData,
  hardware: hardwareData,
  media: mediaData,
  products: productsData,
}

function textOrFallback(value: string | null | undefined, fallback = "") {
  return value?.trim() || fallback
}

function imageUrl(value: unknown) {
  return getStrapiMediaUrl(typeof value === "string" ? value : "") || (typeof value === "string" ? value : "")
}

function normalizeDivision(division: StrapiDivision, slug: string): DivisionDetailData {
  const fallback = staticBySlug[slug] || {}
  const hero = division.hero || {}
  const primaryItems = division.programs?.length
    ? division.programs
    : division.products?.length
      ? division.products
      : division.services || []

  return {
    slug,
    name: textOrFallback(division.name, fallback.hero?.badge || slug),
    description: textOrFallback(division.description, fallback.hero?.description || ""),
    hero: {
      badge: textOrFallback(hero.badge, fallback.hero?.badge || division.name || slug),
      title: textOrFallback(hero.title, fallback.hero?.title || division.name || slug),
      subtitle: textOrFallback(hero.subtitle, fallback.hero?.subtitle || ""),
      description: textOrFallback(hero.description, fallback.hero?.description || ""),
      image: imageUrl(hero.image) || fallback.hero?.heroImage?.src || "",
      primaryCtaLabel: textOrFallback(hero.primaryCtaLabel, fallback.hero?.primaryCTA?.text || "Learn More"),
      primaryCtaUrl: textOrFallback(hero.primaryCtaUrl, fallback.hero?.primaryCTA?.href || "/contact"),
      secondaryCtaLabel: textOrFallback(hero.secondaryCtaLabel, fallback.hero?.secondaryCTA?.text || "View Services"),
      secondaryCtaUrl: textOrFallback(hero.secondaryCtaUrl, fallback.hero?.secondaryCTA?.href || "#services"),
    },
    stats: (division.stats || fallback.hero?.stats || fallback.stats || []).map((stat: any) => ({
      icon: textOrFallback(stat.icon, ""),
      value: textOrFallback(stat.value, ""),
      label: textOrFallback(stat.label, ""),
    })),
    primaryItems,
    primaryItemsTitle:
      slug === "education" ? "Our Training Programs" : slug === "products" ? "Our Product Portfolio" : `Our ${division.name || "Services"}`,
    primaryItemsDescription: textOrFallback(division.description, fallback.hero?.description || ""),
    portfolio: division.portfolio || fallback.portfolio || [],
    testimonials: (division.testimonials || fallback.testimonials || []).map((item: any) => ({
      ...item,
      testimonial: item.testimonial || item.content || "",
    })),
    process: division.process || fallback.process || [],
    successStories: (division.successStories || fallback.successStories || []).map((item: any) => ({
      ...item,
      testimonial: item.testimonial || item.content || "",
    })),
    applications: division.applications || fallback.applications || [],
    features: division.features || fallback.features || [],
    platforms: division.platforms || fallback.platforms || [],
    learningOptions: division.learningOptions || fallback.learningOptions,
    cta: division.cta || fallback.cta,
    ubuxaIoTPro: division.ubuxaIoTPro || fallback.ubuxaIoTPro,
  }
}

export async function getServiceDivisionDetailData(slug: string): Promise<DivisionDetailData> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        hero: true,
        stats: true,
        services: true,
        programs: true,
        products: true,
        portfolio: true,
        testimonials: true,
        process: true,
        successStories: true,
        applications: true,
      },
      pagination: { page: 1, pageSize: 1 },
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiDivision[]>>(`/api/service-divisions?${query}`, {
    cache: "no-store",
  })
  const division = response.data?.[0]

  if (!division) return getStaticServiceDivisionDetailData(slug)

  return normalizeDivision(division, slug)
}

export function getStaticServiceDivisionDetailData(slug: string): DivisionDetailData {
  const fallback = staticBySlug[slug]
  return normalizeDivision(
    {
      name: fallback?.hero?.badge || slug,
      slug,
      description: fallback?.hero?.description,
      hero: {
        badge: fallback?.hero?.badge,
        title: fallback?.hero?.title,
        subtitle: fallback?.hero?.subtitle,
        description: fallback?.hero?.description,
        image: fallback?.hero?.heroImage?.src,
        primaryCtaLabel: fallback?.hero?.primaryCTA?.text,
        primaryCtaUrl: fallback?.hero?.primaryCTA?.href,
        secondaryCtaLabel: fallback?.hero?.secondaryCTA?.text,
        secondaryCtaUrl: fallback?.hero?.secondaryCTA?.href,
      },
      stats: fallback?.hero?.stats || fallback?.stats,
      services: fallback?.services,
      programs: fallback?.programs,
      products: fallback?.products,
      portfolio: fallback?.portfolio,
      testimonials: fallback?.testimonials,
      process: fallback?.process,
      successStories: fallback?.successStories,
      applications: fallback?.applications,
      features: fallback?.features,
      platforms: fallback?.platforms,
      learningOptions: fallback?.learningOptions,
      cta: fallback?.cta,
      ubuxaIoTPro: fallback?.ubuxaIoTPro,
    },
    slug
  )
}
