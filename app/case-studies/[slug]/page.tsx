import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getCaseStudyBySlug } from "@/lib/data/case-studies"
import { ChevronLeft, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Boffins Technology",
    }
  }

  return {
    title: `${caseStudy.title} | Boffins Technology`,
    description: caseStudy.intro,
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="sm" asChild className="hover:bg-transparent pl-0 -ml-4">
                  <Link href="/case-studies" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Case Studies
                  </Link>
                </Button>
                <div className="flex-grow" />
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  {caseStudy.category}
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-muted-foreground text-balance">{caseStudy.subtitle}</p>
              </div>

              <p className="text-foreground leading-relaxed max-w-2xl">{caseStudy.intro}</p>

              {caseStudy.ctaUrl && (
                <div className="pt-4">
                  <Button asChild>
                    <a href={caseStudy.ctaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {caseStudy.ctaText || "Visit Project"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Featured Image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
          <div className="relative max-w-5xl mx-auto aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={caseStudy.image || "/placeholder.svg"}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-20">
              {caseStudy.sections.map((section, index) => (
                <div key={section.id} className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl lg:text-4xl font-bold">{section.title}</h2>
                    {section.subtitle && <p className="text-lg text-muted-foreground">{section.subtitle}</p>}
                  </div>

                  <p className="text-foreground leading-relaxed text-lg">{section.content}</p>

                  {section.items && section.items.length > 0 && (
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary mt-3 flex-shrink-0" />
                          <span className="text-foreground/90 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {index < caseStudy.sections.length - 1 && <Separator className="mt-12" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Let us help you solve your complex technology challenges. Get in touch with our team today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/case-studies">View More Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
