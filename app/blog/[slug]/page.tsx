import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react"
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from "@/lib/data/blog-data"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { Metadata } from "next"
import ShareButtons from "@/components/blog/share-buttons"
import { ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found | Tech Insights",
      description: "The article you're looking for doesn't exist.",
      robots: { index: false, follow: false },
    }
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/blog/${slug}`

  return {
    title: `${post.title} | Tech Insights`,
    description: post.excerpt,
    keywords: [post.category, "tech", "blog", "insights"],
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [
        {
          url: post.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/og-image.jpg"],
      creator: "@yourhandle",
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug)

  // Generate table of contents from content
  const headings = post.content
    .split("\n\n")
    .filter((line) => line.startsWith("##") || line.startsWith("###"))
    .map((line, index) => ({
      id: `section-${index}`,
      level: line.startsWith("###") ? 3 : 2,
      text: line.replace(/^#+\s/, ""),
    }))

  return (
    <>
      {/* Schema.org structured data */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: post.author,
          },
          articleBody: post.content,
        })}
      </script>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Header with Category Badge */}
          <div className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Button
                asChild
                variant="ghost"
                className="mb-12 hover:bg-muted transition-colors"
              >
                <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="font-medium">Back to Blog</span>
                </Link>
              </Button>

              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-xs uppercase tracking-widest">
                    {post.category}
                  </Badge>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                    {post.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Author</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-0 sm:pl-6 border-l-0 sm:border-l border-border">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">{post.date}</p>
                        <p className="text-sm text-muted-foreground">Published</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-0 sm:pl-6 border-l-0 sm:border-l border-border">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">{post.readTime}</p>
                        <p className="text-sm text-muted-foreground">Read time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative h-96 md:h-[500px] w-full overflow-hidden bg-muted">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            </div>
          )}

          {/* Article Content with TOC */}
          <article className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="max-w-3xl">
                    <div className="prose prose-lg dark:prose-invert prose-p:text-lg prose-p:leading-8 prose-headings:font-bold prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 space-y-10">
                      {post.content.split("\n\n").map((paragraph, index) => (
                        <React.Fragment key={index}>
                          {paragraph.startsWith("##") ? (
                            <h2 id={`section-${index}`} className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-foreground leading-tight text-balance scroll-mt-24">
                              {paragraph.replace("## ", "")}
                            </h2>
                          ) : paragraph.startsWith("###") ? (
                            <h3 id={`section-${index}`} className="text-2xl md:text-3xl font-semibold mt-10 mb-5 text-foreground leading-snug text-balance scroll-mt-24">
                              {paragraph.replace("### ", "")}
                            </h3>
                          ) : paragraph.startsWith("-") ? (
                            <ul className="space-y-4 my-8 ml-6 pl-4 border-l-2 border-primary/30">
                              {paragraph.split("\n").map((item, i) => (
                                <li key={i} className="flex gap-4">
                                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">–</span>
                                  <span className="text-foreground/80 leading-8 text-pretty">
                                    {item.replace("- ", "")}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-lg md:text-lg text-foreground/80 leading-9 text-pretty font-normal">
                              {paragraph}
                            </p>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - TOC & Utilities */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-20 space-y-8">
                    {/* Table of Contents */}
                    {headings.length > 0 && (
                      <nav className="bg-muted/50 rounded-lg p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                          On this page
                        </h3>
                        <ul className="space-y-3 text-sm">
                          {headings.map((heading) => (
                            <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
                              <a
                                href={`#${heading.id}`}
                                className="text-muted-foreground hover:text-foreground transition-colors line-clamp-2"
                              >
                                {heading.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )}

                    {/* Share Buttons */}
                    <ShareButtons title={post.title} slug={slug} />
                  </div>
                </aside>
              </div>
            </div>
          </article>

          {/* Author Bio Section */}
          <section className="border-y border-border py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="flex items-start sm:items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">Published {post.date}</p>
                    <p className="text-sm text-muted-foreground mt-2">Tech writer & developer</p>
                  </div>
                </div>
                <Button variant="outline" size="lg" className="bg-transparent">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </section>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="py-20 md:py-28 bg-muted/50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-3">
                      Explore More Articles
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Continue reading related content from our latest posts
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group h-full">
                        <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-primary/50">
                          <div className="relative h-56 overflow-hidden bg-muted">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <CardHeader className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                              <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wide">
                                {relatedPost.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-medium">
                                {relatedPost.readTime}
                              </span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors leading-snug">
                              {relatedPost.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
