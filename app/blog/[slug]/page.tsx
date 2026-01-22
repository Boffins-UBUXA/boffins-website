import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ChevronLeft } from "lucide-react"
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog-data"
import { BlogPostCard } from "@/components/blog-card"
import type { Metadata } from "next"

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: "Post Not Found | Boffins Technology",
        }
    }

    return {
        title: `${post.title} | Boffins Technology`,
        description: post.excerpt,
    }
}

export default function BlogPostPage({ params }: PageProps) {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(params.slug)

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 bg-muted/30 overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <Button variant="ghost" size="sm" asChild className="hover:bg-transparent pl-0 -ml-4">
                                    <Link href="/blog" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                                        <ChevronLeft className="h-4 w-4 mr-1" />
                                        Back to Blog
                                    </Link>
                                </Button>
                                <div className="flex-grow" />
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                    {post.category}
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-full bg-primary/10">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="font-medium text-foreground">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
                </section>

                {/* Featured Image */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                    <div className="relative max-w-5xl mx-auto aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </article>

                        {/* Tags/Share/Navigation Footer could go here */}
                        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t">
                            <div className="flex justify-between items-center">
                                <p className="text-muted-foreground italic">
                                    Published in <span className="text-foreground font-medium">{post.category}</span>
                                </p>
                                {/* Add social share buttons here if needed */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-20 bg-muted/50 border-t">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    More insights and stories from our team that you might find interesting.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}
