"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight, Search, TrendingUp, BookOpen, Loader2, FileText } from "lucide-react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-data"
import type { BlogPageData } from "@/lib/api/blog"

// Types
interface ToastState {
  show: boolean
  title: string
  description: string
  variant?: "default" | "destructive"
}

// Toast Component
function Toast({ toast, onClose, closeLabel }: { toast: ToastState; onClose: () => void; closeLabel: string }) {
  if (!toast.show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className={`w-80 ${toast.variant === "destructive" ? "border-destructive" : ""}`}>
        <CardHeader>
          <CardTitle className="text-sm">{toast.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{toast.description}</p>
          <Button size="sm" variant="outline" className="mt-2 bg-transparent" onClick={onClose}>
            {closeLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Featured Article Card Component
function FeaturedArticleCard({ post, data }: { post: BlogPost | null; data: BlogPageData }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = post?.excerpt && post.excerpt.length > 150

  if (!post) {
    return (
      <Card className="overflow-hidden h-[400px]">
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{data.featuredEmptyTitle}</h3>
          <p className="text-muted-foreground">{data.featuredEmptyDescription}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-[400px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative h-64 lg:h-full">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <Badge>{post.category}</Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-center overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span className="truncate">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
            <div>
              <p className={`text-muted-foreground text-sm ${!isExpanded && shouldTruncate ? "line-clamp-3" : ""}`}>
                {post.excerpt}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      Less <ChevronUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      More <ChevronDown className="h-3 w-3" />
                    </>
                  )}
                </button>
              )}
            </div>
            <Button asChild size="sm">
              <Link href={`/blog/${post.slug}`} className="flex items-center space-x-2">
                <span>{data.featuredCtaLabel}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Blog Post Card Component
// Local BlogPostCard removed in favor of shared component
import { BlogPostCard } from "@/components/blog-card"

// Main Blog Page Content Component
export default function BlogPageContent({ data }: { data: BlogPageData }) {
  const blogPosts = data.posts
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDivision, setSelectedDivision] = useState(data.allDivisionsLabel)
  const [displayedPosts, setDisplayedPosts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, title: "", description: "" })

  const divisions = [
    { name: data.allDivisionsLabel, count: blogPosts.length },
    ...Array.from(new Set(blogPosts.map((post) => post.category).filter(Boolean))).map((category) => ({
      name: category,
      count: blogPosts.filter((post) => post.category === category).length,
    })),
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDivision = selectedDivision === data.allDivisionsLabel || post.category === selectedDivision

    return matchesSearch && matchesDivision
  })

  const visiblePosts = filteredPosts.slice(0, displayedPosts)

  const handleSearch = () => {
    // Search is handled by the filter
  }

  const handleLoadMore = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setDisplayedPosts((prev) => prev + 6)
    setIsLoading(false)
  }

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setToast({
        show: true,
        title: data.invalidEmailTitle,
        description: data.invalidEmailDescription,
        variant: "destructive",
      })
      return
    }

    setIsSubscribing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setToast({
      show: true,
      title: data.subscribeSuccessTitle,
      description: data.subscribeSuccessDescription,
    })

    setEmail("")
    setIsSubscribing(false)
  }

  const sampleFeaturedPost = blogPosts[0]

  return (
    <div className="min-h-screen">
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} closeLabel={data.toastCloseLabel} />

      {/* Hero Section */}
      <Header />
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <BookOpen className="h-3 w-3 mr-1" />
              {data.heroBadge}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              {data.heroTitle} <span className="text-primary">{data.heroHighlightedTitle}</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={data.searchPlaceholder}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>{data.searchButtonLabel}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.featuredTitle}</h2>
            <p className="text-muted-foreground">{data.featuredDescription}</p>
          </div>
          <FeaturedArticleCard post={sampleFeaturedPost} data={data} />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">{data.latestTitle}</h2>
                <p className="text-muted-foreground">
                  {searchQuery && data.searchResultsLabelTemplate.replace("{query}", searchQuery)}
                  {selectedDivision !== data.allDivisionsLabel &&
                    ` ${data.divisionResultsLabelTemplate.replace("{division}", selectedDivision)}`}
                </p>
              </div>

              {visiblePosts.length === 0 ? (
                <Card className="p-12">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{data.noArticlesTitle}</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? data.noArticlesSearchDescription : data.noArticlesDefaultDescription}
                    </p>
                    {(searchQuery || selectedDivision !== data.allDivisionsLabel) && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedDivision(data.allDivisionsLabel)
                        }}
                      >
                        {data.clearFiltersLabel}
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visiblePosts.map((post, index) => (
                      <BlogPostCard key={index} post={post} />
                    ))}
                  </div>

                  {visiblePosts.length < filteredPosts.length && (
                    <div className="text-center mt-12">
                      <Button
                        size="lg"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {data.loadingLabel}
                          </>
                        ) : (
                          data.loadMoreLabel
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Divisions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>{data.divisionsTitle}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {divisions.map((division, index) => (
                    <Button
                      key={index}
                      variant={selectedDivision === division.name ? "default" : "ghost"}
                      className="w-full justify-between"
                      size="sm"
                      onClick={() => setSelectedDivision(division.name)}
                    >
                      <span>{division.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {division.count}
                      </Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>{data.newsletterTitle}</CardTitle>
                  <CardDescription>
                    {data.newsletterDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder={data.newsletterPlaceholder}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className="w-full" onClick={handleSubscribe} disabled={isSubscribing}>
                    {isSubscribing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {data.newsletterSubmittingLabel}
                      </>
                    ) : (
                      data.newsletterSubmitLabel
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
