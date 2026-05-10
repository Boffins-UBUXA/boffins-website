import qs from "qs"

import { aboutData } from "@/lib/data/about-data"
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

type StrapiValue = {
  icon?: string | null
  title?: string | null
  description?: string | null
}

type StrapiLeader = {
  name?: string | null
  role?: string | null
  description?: string | null
  image?: string | null
  imageAlt?: string | null
}

type StrapiMilestone = {
  year?: string | null
  title?: string | null
  description?: string | null
}

type StrapiAboutPage = {
  hero?: StrapiHero | null
  missionTitle?: string | null
  missionDescription?: string | null
  visionTitle?: string | null
  visionDescription?: string | null
  values?: StrapiValue[] | null
  valuesTitle?: string | null
  valuesSubtitle?: string | null
  leadership?: StrapiLeader[] | null
  leadershipTitle?: string | null
  leadershipSubtitle?: string | null
  milestones?: StrapiMilestone[] | null
  milestonesTitle?: string | null
  milestonesSubtitle?: string | null
  collaboration?: typeof aboutData.collaboration | null
  ctaTitle?: string | null
  ctaDescription?: string | null
  ctaPrimaryLabel?: string | null
  ctaPrimaryUrl?: string | null
  ctaSecondaryLabel?: string | null
  ctaSecondaryUrl?: string | null
}

type ValueItem = {
  icon: string
  title: string
  description: string
}

export type AboutPageData = Omit<typeof aboutData, "values"> & {
  values: ValueItem[]
  valuesTitle: string
  valuesSubtitle: string
  leadershipTitle: string
  leadershipSubtitle: string
  milestonesTitle: string
  milestonesSubtitle: string
}

const valueIconFallbacks = ["Lightbulb", "Handshake", "Award", "TrendingUp"]

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function normalizeAboutPage(page?: StrapiAboutPage | null): AboutPageData {
  const hero = page?.hero

  return {
    hero: {
      title: textOrFallback(hero?.title, aboutData.hero.title),
      subtitle: textOrFallback(hero?.subtitle, aboutData.hero.subtitle),
      description: textOrFallback(hero?.description, aboutData.hero.description),
      heroImage: {
        src: getStrapiMediaUrl(hero?.image) || aboutData.hero.heroImage.src,
        alt: aboutData.hero.heroImage.alt,
      },
      primaryCTA: {
        text: textOrFallback(hero?.primaryCtaLabel, aboutData.hero.primaryCTA.text),
        href: textOrFallback(hero?.primaryCtaUrl, aboutData.hero.primaryCTA.href),
      },
      secondaryCTA: {
        text: textOrFallback(hero?.secondaryCtaLabel, aboutData.hero.secondaryCTA.text),
        href: textOrFallback(hero?.secondaryCtaUrl, aboutData.hero.secondaryCTA.href),
      },
    },
    mission: {
      title: textOrFallback(page?.missionTitle, aboutData.mission.title),
      description: textOrFallback(page?.missionDescription, aboutData.mission.description),
    },
    vision: {
      title: textOrFallback(page?.visionTitle, aboutData.vision.title),
      description: textOrFallback(page?.visionDescription, aboutData.vision.description),
    },
    values: page?.values?.length
      ? page.values.map((value, index) => ({
          icon: textOrFallback(value.icon, valueIconFallbacks[index] || "Lightbulb"),
          title: textOrFallback(value.title, aboutData.values[index]?.title || ""),
          description: textOrFallback(value.description, aboutData.values[index]?.description || ""),
        }))
      : aboutData.values.map((value, index) => ({
          ...value,
          icon: valueIconFallbacks[index] || "Lightbulb",
        })),
    valuesTitle: textOrFallback(page?.valuesTitle, "Our Core Values"),
    valuesSubtitle: textOrFallback(
      page?.valuesSubtitle,
      "These values guide every decision we make and every solution we create across all our divisions."
    ),
    leadership: page?.leadership?.length
      ? page.leadership.map((leader, index) => ({
          name: textOrFallback(leader.name, aboutData.leadership[index]?.name || ""),
          role: textOrFallback(leader.role, aboutData.leadership[index]?.role || ""),
          description: textOrFallback(leader.description, aboutData.leadership[index]?.description || ""),
          image: {
            src: getStrapiMediaUrl(leader.image) || aboutData.leadership[index]?.image.src || "",
            alt: textOrFallback(leader.imageAlt, aboutData.leadership[index]?.image.alt || leader.name || ""),
          },
        }))
      : aboutData.leadership,
    leadershipTitle: textOrFallback(page?.leadershipTitle, "Organizational Structure"),
    leadershipSubtitle: textOrFallback(
      page?.leadershipSubtitle,
      "Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions."
    ),
    milestones: page?.milestones?.length
      ? page.milestones.map((milestone, index) => ({
          year: textOrFallback(milestone.year, aboutData.milestones[index]?.year || ""),
          title: textOrFallback(milestone.title, aboutData.milestones[index]?.title || ""),
          description: textOrFallback(milestone.description, aboutData.milestones[index]?.description || ""),
        }))
      : aboutData.milestones,
    milestonesTitle: textOrFallback(page?.milestonesTitle, "Our Journey"),
    milestonesSubtitle: textOrFallback(
      page?.milestonesSubtitle,
      "From a single vision to a diversified technology ecosystem - here's how we've grown and evolved."
    ),
    collaboration: page?.collaboration || aboutData.collaboration,
    cta: {
      title: textOrFallback(page?.ctaTitle, aboutData.cta.title),
      description: textOrFallback(page?.ctaDescription, aboutData.cta.description),
      primaryCTA: {
        text: textOrFallback(page?.ctaPrimaryLabel, aboutData.cta.primaryCTA.text),
        href: textOrFallback(page?.ctaPrimaryUrl, aboutData.cta.primaryCTA.href),
      },
      secondaryCTA: {
        text: textOrFallback(page?.ctaSecondaryLabel, aboutData.cta.secondaryCTA.text),
        href: textOrFallback(page?.ctaSecondaryUrl, aboutData.cta.secondaryCTA.href),
      },
    },
  }
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const query = qs.stringify(
    {
      populate: {
        seo: true,
        hero: true,
        values: true,
        leadership: true,
        milestones: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiAboutPage>>(`/api/about-page?${query}`)

  return normalizeAboutPage(response.data)
}
