import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { CaseStudyCard } from "@/components/case-study-card"
import { getCaseStudiesPageData, getCaseStudiesPageSettings, getStaticCaseStudiesPageData } from "@/lib/api/case-studies"
import { Briefcase } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getCaseStudiesPageSettings()

    return {
      title: settings.seo.metaTitle,
      description: settings.seo.metaDescription,
    }
  } catch {
    const settings = getStaticCaseStudiesPageData()

    return {
      title: settings.seo.metaTitle,
      description: settings.seo.metaDescription,
    }
  }
}

export default async function CaseStudiesPage() {
  let pageData;

  try {
    pageData = await getCaseStudiesPageData();
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    pageData = getStaticCaseStudiesPageData();
  }

  const caseStudies = pageData.caseStudies
  const featuredStudy = caseStudies[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <Badge variant="secondary" className="w-fit mx-auto">
                <Briefcase className="h-3 w-3 mr-1" />
                {pageData.heroBadgeLabel}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                {pageData.heroTitle} <span className="text-primary">{pageData.heroHighlightedTitle}</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                {pageData.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        {featuredStudy && (
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">{pageData.featuredTitle}</h2>
                <p className="text-muted-foreground">{pageData.featuredSubtitle}</p>
              </div>
              <CaseStudyCard study={featuredStudy} featured={true} ctaLabel={pageData.featuredCardCtaLabel} />
            </div>
          </section>
        )}

        {/* All Case Studies Grid */}
        {caseStudies.length > 0 && (
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">{pageData.allTitle}</h2>
                <p className="text-muted-foreground">
                  {caseStudies.length} {caseStudies.length === 1 ? pageData.singleCountLabel : pageData.pluralCountLabel}
                </p>
              </div>

              {caseStudies.length === 1 ? (
                <div className="grid grid-cols-1 gap-8">
                  <CaseStudyCard study={caseStudies[0]} ctaLabel={pageData.cardCtaLabel} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseStudies.map((study) => (
                    <CaseStudyCard key={study.id} study={study} ctaLabel={pageData.cardCtaLabel} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
