import qs from "qs"

import { servicesData } from "@/lib/data/services-data"
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

type StrapiBenefit = {
  icon?: string | null
  title?: string | null
  description?: string | null
}

type StrapiProcessStep = {
  stepNumber?: string | null
  step?: string | null
  title?: string | null
  description?: string | null
}

type StrapiServicePage = {
  hero?: StrapiHero | null
  divisionsTitle?: string | null
  divisionsSubtitle?: string | null
  divisionCardCtaLabel?: string | null
  divisionMoreLabel?: string | null
  divisionLessLabel?: string | null
  benefitsTitle?: string | null
  benefitsSubtitle?: string | null
  benefits?: StrapiBenefit[] | null
  benefitSeeMoreLabel?: string | null
  benefitSeeLessLabel?: string | null
  processTitle?: string | null
  processDescription?: string | null
  processSteps?: StrapiProcessStep[] | null
  processImage?: string | null
  processImageAlt?: string | null
  processMoreLabel?: string | null
  processLessLabel?: string | null
  processViewAllLabel?: string | null
  ctaTitle?: string | null
  ctaDescription?: string | null
  ctaPrimaryLabel?: string | null
  ctaPrimaryUrl?: string | null
  ctaSecondaryLabel?: string | null
  ctaSecondaryUrl?: string | null
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
  color?: string | null
  services?: StrapiFeatureGroup[] | null
  programs?: StrapiFeatureGroup[] | null
  products?: StrapiFeatureGroup[] | null
}

export type ServicesPageData = {
  hero: typeof servicesData.hero
  divisions: typeof servicesData.divisions
  divisionsTitle: string
  divisionsSubtitle: string
  divisionCardCtaLabel: string
  divisionMoreLabel: string
  divisionLessLabel: string
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  benefitsTitle: string
  benefitsSubtitle: string
  benefitSeeMoreLabel: string
  benefitSeeLessLabel: string
  process: typeof servicesData.process
  processMoreLabel: string
  processLessLabel: string
  processViewAllLabel: string
  cta: typeof servicesData.cta
}

const benefitIconFallbacks = ["Users", "Zap", "Shield", "Lightbulb"]

const divisionIconFallbacks: Record<string, string> = {
  bespoke: "🛠️",
  education: "🎓",
  hardware: "⚡",
  media: "📱",
  products: "🚀",
}

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function getFeatureList(division: StrapiDivision) {
  const source = division.programs?.length
    ? division.programs
    : division.products?.length
      ? division.products
      : division.services?.length
        ? division.services
        : []

  return source
    .map((item) => item.title || item.description)
    .filter((feature): feature is string => Boolean(feature))
}

function normalizeDivisions(divisions: StrapiDivision[]) {
  if (!divisions.length) return servicesData.divisions

  return divisions.map((division) => {
    const slug = division.slug || ""
    const fallback = servicesData.divisions.find((item) => item.href.endsWith(`/${slug}`))
    const features = getFeatureList(division)

    return {
      title: textOrFallback(division.name, fallback?.title || ""),
      description: textOrFallback(division.description, fallback?.description || ""),
      icon: textOrFallback(division.icon, fallback?.icon || divisionIconFallbacks[slug] || "🚀"),
      href: `/services/${slug}`,
      features: features.length ? features : fallback?.features || [],
      color: textOrFallback(division.color, fallback?.color || "from-primary to-primary/70"),
    }
  })
}

function normalizeServicePage(page?: StrapiServicePage | null): Omit<ServicesPageData, "divisions"> {
  const hero = page?.hero

  return {
    hero: {
      title: textOrFallback(hero?.title, servicesData.hero.title),
      subtitle: textOrFallback(hero?.subtitle, servicesData.hero.subtitle),
      description: textOrFallback(hero?.description, servicesData.hero.description),
      primaryCTA: {
        text: textOrFallback(hero?.primaryCtaLabel, servicesData.hero.primaryCTA.text),
        href: textOrFallback(hero?.primaryCtaUrl, servicesData.hero.primaryCTA.href),
      },
      secondaryCTA: {
        text: textOrFallback(hero?.secondaryCtaLabel, servicesData.hero.secondaryCTA.text),
        href: textOrFallback(hero?.secondaryCtaUrl, servicesData.hero.secondaryCTA.href),
      },
      heroImage: {
        src: getStrapiMediaUrl(hero?.image) || servicesData.hero.heroImage.src,
        alt: servicesData.hero.heroImage.alt,
      },
    },
    divisionsTitle: textOrFallback(page?.divisionsTitle, "Our Service Divisions"),
    divisionsSubtitle: textOrFallback(
      page?.divisionsSubtitle,
      "Each division operates with specialized expertise while collaborating within our integrated ecosystem to deliver comprehensive solutions."
    ),
    divisionCardCtaLabel: textOrFallback(page?.divisionCardCtaLabel, "Learn More"),
    divisionMoreLabel: textOrFallback(page?.divisionMoreLabel, "More"),
    divisionLessLabel: textOrFallback(page?.divisionLessLabel, "Less"),
    benefits: page?.benefits?.length
      ? page.benefits.map((benefit, index) => ({
          icon: textOrFallback(benefit.icon, benefitIconFallbacks[index] || "Lightbulb"),
          title: textOrFallback(benefit.title, servicesData.benefits[index]?.title || ""),
          description: textOrFallback(benefit.description, servicesData.benefits[index]?.description || ""),
        }))
      : servicesData.benefits.map((benefit, index) => ({
          icon: benefitIconFallbacks[index] || "Lightbulb",
          title: benefit.title,
          description: benefit.description,
        })),
    benefitsTitle: textOrFallback(page?.benefitsTitle, "Why Choose Boffins Technology?"),
    benefitsSubtitle: textOrFallback(
      page?.benefitsSubtitle,
      "Our unique approach combines specialized expertise with collaborative innovation to deliver exceptional results."
    ),
    benefitSeeMoreLabel: textOrFallback(page?.benefitSeeMoreLabel, "See More"),
    benefitSeeLessLabel: textOrFallback(page?.benefitSeeLessLabel, "See Less"),
    process: {
      title: textOrFallback(page?.processTitle, servicesData.process.title),
      description: textOrFallback(page?.processDescription, servicesData.process.description),
      steps: page?.processSteps?.length
        ? page.processSteps.map((step, index) => ({
            step: textOrFallback(step.stepNumber || step.step, servicesData.process.steps[index]?.step || ""),
            title: textOrFallback(step.title, servicesData.process.steps[index]?.title || ""),
            description: textOrFallback(step.description, servicesData.process.steps[index]?.description || ""),
          }))
        : servicesData.process.steps,
      image: {
        src: getStrapiMediaUrl(page?.processImage) || servicesData.process.image.src,
        alt: textOrFallback(page?.processImageAlt, servicesData.process.image.alt),
      },
    },
    processMoreLabel: textOrFallback(page?.processMoreLabel, "More"),
    processLessLabel: textOrFallback(page?.processLessLabel, "Less"),
    processViewAllLabel: textOrFallback(page?.processViewAllLabel, "View All {count} Steps"),
    cta: {
      title: textOrFallback(page?.ctaTitle, servicesData.cta.title),
      description: textOrFallback(page?.ctaDescription, servicesData.cta.description),
      primaryCTA: {
        text: textOrFallback(page?.ctaPrimaryLabel, servicesData.cta.primaryCTA.text),
        href: textOrFallback(page?.ctaPrimaryUrl, servicesData.cta.primaryCTA.href),
        external: servicesData.cta.primaryCTA.external,
      },
      secondaryCTA: {
        text: textOrFallback(page?.ctaSecondaryLabel, servicesData.cta.secondaryCTA.text),
        href: textOrFallback(page?.ctaSecondaryUrl, servicesData.cta.secondaryCTA.href),
      },
    },
  }
}

export async function getServicesPageData(): Promise<ServicesPageData> {
  const pageQuery = qs.stringify(
    {
      populate: {
        seo: true,
        hero: true,
        benefits: true,
        processSteps: true,
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

  const [page, divisions] = await Promise.all([
    fetchStrapi<StrapiResponse<StrapiServicePage>>(`/api/service-page?${pageQuery}`, { cache: "no-store" }),
    fetchStrapi<StrapiResponse<StrapiDivision[]>>(`/api/service-divisions?${divisionsQuery}`, { cache: "no-store" }),
  ])

  return {
    ...normalizeServicePage(page.data),
    divisions: normalizeDivisions(divisions.data || []),
  }
}
