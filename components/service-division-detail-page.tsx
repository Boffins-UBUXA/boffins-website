import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { DivisionDetailData } from "@/lib/api/service-division-detail"

function list(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function itemTitle(item: any) {
  return item.title || item.name || item.industry || item.client || "Untitled"
}

export function ServiceDivisionDetailPage({ data }: { data: DivisionDetailData }) {
  const heroTitle = [data.hero.title, data.hero.subtitle].filter(Boolean).join(" ")
  const primaryCtaExternal = data.hero.primaryCtaUrl?.startsWith("http")

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">{data.hero.badge}</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance">{heroTitle}</h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">{data.hero.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href={data.hero.primaryCtaUrl || "/contact"} target={primaryCtaExternal ? "_blank" : undefined}>
                    {data.hero.primaryCtaLabel}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={data.hero.secondaryCtaUrl || "#services"}>{data.hero.secondaryCtaLabel}</Link>
                </Button>
              </div>
              {data.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                  {data.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {data.hero.image && (
              <Image src={data.hero.image} alt={heroTitle} width={560} height={420} className="rounded-lg shadow-xl object-cover" />
            )}
          </div>
        </div>
      </section>

      {data.primaryItems.length > 0 && (
        <section id="services" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{data.primaryItemsTitle}</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">{data.primaryItemsDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.primaryItems.map((item: any, index) => {
                const points = list(item.features).length ? list(item.features) : list(item.skills).length ? list(item.skills) : list(item.benefits)
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">{item.category || item.level || item.tagline || data.name}</Badge>
                      <CardTitle>{itemTitle(item)}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                      {item.website && (
                        <Button asChild className="w-full">
                          <Link href={item.website} target="_blank">Visit Product <ArrowRight className="h-4 w-4 ml-2" /></Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {data.ubuxaIoTPro && Object.keys(data.ubuxaIoTPro).length > 0 && (
        <Section title={data.ubuxaIoTPro.title || "Featured Technology"} description={data.ubuxaIoTPro.description} image={data.ubuxaIoTPro.image} items={data.ubuxaIoTPro.specs} />
      )}

      <GridSection title="Portfolio" items={data.portfolio} />
      <GridSection title="Applications" items={data.applications} />
      <GridSection title="Success Stories" items={data.successStories} testimonial />
      <GridSection title="Testimonials" items={data.testimonials} testimonial />

      {data.cta && (
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground text-balance">{data.cta.title}</h2>
              <p className="text-xl text-primary-foreground/90 text-pretty">{data.cta.description}</p>
              {data.cta.primaryCTA?.href && (
                <Button size="lg" variant="secondary" asChild>
                  <Link href={data.cta.primaryCTA.href} target={data.cta.primaryCTA.external ? "_blank" : undefined}>
                    {data.cta.primaryCTA.text || "Learn More"}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

function Section({ title, description, image, items }: { title: string; description?: string; image?: string; items?: any[] }) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(items || []).map((item, index) => (
                <div key={index}>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          {image && <Image src={image} alt={title} width={560} height={420} className="rounded-lg shadow-xl object-cover" />}
        </div>
      </div>
    </section>
  )
}

function GridSection({ title, items, testimonial = false }: { title: string; items: any[]; testimonial?: boolean }) {
  if (!items.length) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="h-full overflow-hidden">
              {item.image && (
                <div className="relative h-48">
                  <Image src={item.image} alt={itemTitle(item)} fill className="object-cover" />
                </div>
              )}
              <CardHeader>
                <Badge variant="outline" className="w-fit">{item.category || item.industry || item.program || item.product || item.project || title}</Badge>
                <CardTitle>{itemTitle(item)}</CardTitle>
                <CardDescription>{item.description || item.service || item.role || item.company}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {testimonial && <div className="flex gap-1">{[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>}
                <p className="text-sm text-muted-foreground">{item.testimonial || item.content || item.results}</p>
                {Object.entries(item.metrics || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{String(value)}</span>
                  </div>
                ))}
                {list(item.benefits).map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
