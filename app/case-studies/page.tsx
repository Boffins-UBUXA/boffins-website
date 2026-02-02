import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { CaseStudyCard } from "@/components/case-study-card"
import { getAllCaseStudies } from "@/lib/data/case-studies"
import { Briefcase } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies | Boffins Technology",
  description: "Explore our latest case studies showcasing successful technology solutions and client success stories.",
}

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies()
  const featuredStudy = caseStudies[0]
  const otherStudies = caseStudies.slice(1)

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
                Client Success Stories
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                Our <span className="text-primary">Case Studies</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Discover how we&apos;ve helped innovative companies solve complex technology challenges and achieve their business goals.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        {featuredStudy && (
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Case Study</h2>
                <p className="text-muted-foreground">Our latest and most impactful work</p>
              </div>
              <CaseStudyCard study={featuredStudy} featured={true} />
            </div>
          </section>
        )}

        {/* All Case Studies Grid */}
        {caseStudies.length > 0 && (
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">All Case Studies</h2>
                <p className="text-muted-foreground">
                  {caseStudies.length} {caseStudies.length === 1 ? "case study" : "case studies"}
                </p>
              </div>

              {caseStudies.length === 1 ? (
                <div className="grid grid-cols-1 gap-8">
                  <CaseStudyCard study={caseStudies[0]} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caseStudies.map((study) => (
                    <CaseStudyCard key={study.id} study={study} />
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
