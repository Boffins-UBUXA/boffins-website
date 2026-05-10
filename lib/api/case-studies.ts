import qs from "qs"

import { getAllCaseStudies, type CaseStudy } from "@/lib/data/case-studies"
import { fetchStrapi, getStrapiMediaUrl, type StrapiResponse } from "@/lib/strapi"

type StrapiCaseStudyPage = {
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
  heroBadgeLabel?: string | null
  heroTitle?: string | null
  heroHighlightedTitle?: string | null
  heroDescription?: string | null
  featuredTitle?: string | null
  featuredSubtitle?: string | null
  featuredCardCtaLabel?: string | null
  allTitle?: string | null
  singleCountLabel?: string | null
  pluralCountLabel?: string | null
  cardCtaLabel?: string | null
  fallbackCategoryLabel?: string | null
  fallbackImage?: string | null
  notFoundTitle?: string | null
  detailBackLabel?: string | null
  detailVisitProjectFallbackLabel?: string | null
  detailCtaTitle?: string | null
  detailCtaDescription?: string | null
  detailCtaPrimaryLabel?: string | null
  detailCtaPrimaryUrl?: string | null
  detailCtaSecondaryLabel?: string | null
  detailCtaSecondaryUrl?: string | null
}

type StrapiCaseStudy = {
  id: number
  documentId?: string
  slug?: string | null
  title?: string | null
  subtitle?: string | null
  intro?: string | null
  excerpt?: string | null
  content?: string | null
  image?: string | null
  category?: string | null
  client?: string | null
  ctaUrl?: string | null
  ctaText?: string | null
  sections?: CaseStudy["sections"] | null
  rawData?: Partial<CaseStudy> | null
}

export type CaseStudiesPageData = {
  seo: {
    metaTitle: string
    metaDescription: string
  }
  heroBadgeLabel: string
  heroTitle: string
  heroHighlightedTitle: string
  heroDescription: string
  featuredTitle: string
  featuredSubtitle: string
  featuredCardCtaLabel: string
  allTitle: string
  singleCountLabel: string
  pluralCountLabel: string
  cardCtaLabel: string
  notFoundTitle: string
  detailBackLabel: string
  detailVisitProjectFallbackLabel: string
  detailCtaTitle: string
  detailCtaDescription: string
  detailCtaPrimaryLabel: string
  detailCtaPrimaryUrl: string
  detailCtaSecondaryLabel: string
  detailCtaSecondaryUrl: string
  caseStudies: CaseStudy[]
}

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function normalizeCaseStudy(study: StrapiCaseStudy, page: StrapiCaseStudyPage | null | undefined): CaseStudy {
  const title = textOrFallback(study.title, "Untitled Case Study")
  const raw = study.rawData || {}
  const rawSections = Array.isArray(raw.sections) ? raw.sections : []
  const sections = Array.isArray(study.sections) && study.sections.length ? study.sections : rawSections

  return {
    id: study.documentId || String(study.id),
    slug: textOrFallback(study.slug, raw.slug || String(study.id)),
    title,
    subtitle: textOrFallback(study.subtitle, raw.subtitle || ""),
    intro: textOrFallback(study.intro || study.excerpt || study.content?.slice(0, 200), raw.intro || ""),
    image: getStrapiMediaUrl(study.image) || raw.image || textOrFallback(page?.fallbackImage, "/placeholder.svg"),
    category: textOrFallback(study.category, raw.category || textOrFallback(page?.fallbackCategoryLabel, "Case Study")),
    client: textOrFallback(study.client, raw.client || title),
    ctaUrl: study.ctaUrl || raw.ctaUrl || undefined,
    ctaText: study.ctaText || raw.ctaText || undefined,
    sections: sections.map((section, index) => ({
      id: textOrFallback(section.id, `section-${index + 1}`),
      title: textOrFallback(section.title, `Section ${index + 1}`),
      subtitle: section.subtitle || undefined,
      content: textOrFallback(section.content, ""),
      items: Array.isArray(section.items) ? section.items : [],
    })),
  }
}

function normalizePage(page?: StrapiCaseStudyPage | null) {
  return {
    seo: {
      metaTitle: textOrFallback(page?.seo?.metaTitle, "Case Studies | Boffins Technology"),
      metaDescription: textOrFallback(
        page?.seo?.metaDescription,
        "Explore our latest case studies showcasing successful technology solutions and client success stories."
      ),
    },
    heroBadgeLabel: textOrFallback(page?.heroBadgeLabel, "Client Success Stories"),
    heroTitle: textOrFallback(page?.heroTitle, "Our"),
    heroHighlightedTitle: textOrFallback(page?.heroHighlightedTitle, "Case Studies"),
    heroDescription: textOrFallback(
      page?.heroDescription,
      "Discover how we've helped innovative companies solve complex technology challenges and achieve their business goals."
    ),
    featuredTitle: textOrFallback(page?.featuredTitle, "Featured Case Study"),
    featuredSubtitle: textOrFallback(page?.featuredSubtitle, "Our latest and most impactful work"),
    featuredCardCtaLabel: textOrFallback(page?.featuredCardCtaLabel, "View Case Study"),
    allTitle: textOrFallback(page?.allTitle, "All Case Studies"),
    singleCountLabel: textOrFallback(page?.singleCountLabel, "case study"),
    pluralCountLabel: textOrFallback(page?.pluralCountLabel, "case studies"),
    cardCtaLabel: textOrFallback(page?.cardCtaLabel, "Learn More"),
    notFoundTitle: textOrFallback(page?.notFoundTitle, "Case Study Not Found | Boffins Technology"),
    detailBackLabel: textOrFallback(page?.detailBackLabel, "Back to Case Studies"),
    detailVisitProjectFallbackLabel: textOrFallback(page?.detailVisitProjectFallbackLabel, "Visit Project"),
    detailCtaTitle: textOrFallback(page?.detailCtaTitle, "Ready to Build Something Amazing?"),
    detailCtaDescription: textOrFallback(
      page?.detailCtaDescription,
      "Let us help you solve your complex technology challenges. Get in touch with our team today."
    ),
    detailCtaPrimaryLabel: textOrFallback(page?.detailCtaPrimaryLabel, "Start a Project"),
    detailCtaPrimaryUrl: textOrFallback(page?.detailCtaPrimaryUrl, "/contact"),
    detailCtaSecondaryLabel: textOrFallback(page?.detailCtaSecondaryLabel, "View More Case Studies"),
    detailCtaSecondaryUrl: textOrFallback(page?.detailCtaSecondaryUrl, "/case-studies"),
  }
}

export async function getCaseStudiesPageSettings() {
  const query = qs.stringify(
    {
      populate: {
        seo: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiCaseStudyPage>>(`/api/case-study-page?${query}`, {
    cache: "no-store",
  })

  return normalizePage(response.data)
}

export async function getCaseStudiesPageData(): Promise<CaseStudiesPageData> {
  const pageQuery = qs.stringify(
    {
      populate: {
        seo: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const caseStudiesQuery = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 100,
      },
      sort: ["id:asc"],
    },
    { encodeValuesOnly: true }
  )

  const [pageResponse, studiesResponse] = await Promise.all([
    fetchStrapi<StrapiResponse<StrapiCaseStudyPage>>(`/api/case-study-page?${pageQuery}`, { cache: "no-store" }),
    fetchStrapi<StrapiResponse<StrapiCaseStudy[]>>(`/api/case-studies?${caseStudiesQuery}`, { cache: "no-store" }),
  ])

  return {
    ...normalizePage(pageResponse.data),
    caseStudies: (studiesResponse.data || []).map((study) => normalizeCaseStudy(study, pageResponse.data)),
  }
}

export async function getCaseStudyDetailData(slug: string): Promise<{
  caseStudy: CaseStudy | undefined
  settings: Omit<CaseStudiesPageData, "caseStudies">
}> {
  const pageQuery = qs.stringify(
    {
      populate: {
        seo: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const studyQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    { encodeValuesOnly: true }
  )

  const [pageResponse, studyResponse] = await Promise.all([
    fetchStrapi<StrapiResponse<StrapiCaseStudyPage>>(`/api/case-study-page?${pageQuery}`, { cache: "no-store" }),
    fetchStrapi<StrapiResponse<StrapiCaseStudy[]>>(`/api/case-studies?${studyQuery}`, { cache: "no-store" }),
  ])

  return {
    settings: normalizePage(pageResponse.data),
    caseStudy: studyResponse.data?.[0] ? normalizeCaseStudy(studyResponse.data[0], pageResponse.data) : undefined,
  }
}

export function getStaticCaseStudiesPageData(): CaseStudiesPageData {
  return {
    ...normalizePage(null),
    caseStudies: getAllCaseStudies(),
  }
}
