import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from "@/lib/data/blog-data"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist.",
    }
  }

  return {
    title: `${post.title} | Tech Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              asChild
              variant="ghost"
              className="mb-12 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Link
                href="/blog"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Blog</span>
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-6">
                <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold text-xs uppercase tracking-widest">
                  {post.category}
                </Badge>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 dark:text-slate-50 leading-tight text-balance">
                  {post.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-slate-300 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{post.author}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Author</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-0 sm:pl-6 border-l-0 sm:border-l border-slate-300 dark:border-slate-700">
                    <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-500" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{post.date}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Published</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-0 sm:pl-6 border-l-0 sm:border-l border-slate-300 dark:border-slate-700">
                    <span className="h-5 w-5 flex items-center justify-center text-slate-500 dark:text-slate-500 text-sm">
                      ◊
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{post.readTime}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Read time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {post.image && (
          <div className="relative h-96 md:h-[550px] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
          </div>
        )}

        <article className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-10">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph.startsWith("##") ? (
                      <h2 className="text-4xl md:text-5xl font-serif font-bold mt-12 mb-6 text-slate-900 dark:text-slate-50 leading-tight text-balance">
                        {paragraph.replace("## ", "")}
                      </h2>
                    ) : paragraph.startsWith("###") ? (
                      <h3 className="text-2xl md:text-3xl font-serif font-semibold mt-10 mb-5 text-slate-900 dark:text-slate-100 leading-snug text-balance">
                        {paragraph.replace("### ", "")}
                      </h3>
                    ) : paragraph.startsWith("-") ? (
                      <ul className="space-y-4 my-8 ml-6 pl-4 border-l-2 border-slate-300 dark:border-slate-700">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i} className="flex gap-4">
                            <span className="text-slate-900 dark:text-slate-400 font-bold flex-shrink-0 mt-0.5">–</span>
                            <span className="text-slate-700 dark:text-slate-300 leading-8 text-justify hyphens-auto">
                              {item.replace("- ", "")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-9 text-justify hyphens-auto font-light">
                        {paragraph}
                      </p>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="border-t border-b border-slate-300 dark:border-slate-700 py-12 md:py-16 my-16 md:my-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="flex items-start sm:items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-xl font-serif font-semibold text-slate-900 dark:text-slate-50">{post.author}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Published {post.date}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Tech writer & developer</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium transition-colors bg-transparent"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-slate-900 dark:text-slate-50 text-balance">
                  Explore More Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group h-full">
                      <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900">
                        <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardHeader className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <Badge
                              variant="secondary"
                              className="text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 uppercase tracking-wide"
                            >
                              {relatedPost.category}
                            </Badge>
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                              {relatedPost.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-xl md:text-2xl font-serif group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-snug">
                            {relatedPost.title}
                          </CardTitle>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
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
  )
}
