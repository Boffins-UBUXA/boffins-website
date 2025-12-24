"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image?: string
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Renewable Energy Management with Ubuxa",
    excerpt: "Discover how our innovative IoT solutions are revolutionizing energy management across industries.",
    author: "Tech Team",
    date: "2024-01-15",
    category: "Product Innovation",
  },
  {
    id: "2",
    title: "Building Scalable Web Applications: Lessons from Our Bespoke Division",
    excerpt: "Key insights and best practices from our custom development projects for enterprise clients.",
    author: "Development Team",
    date: "2024-01-10",
    category: "Development",
  },
  {
    id: "3",
    title: "Success Stories: Transforming Careers Through Tech Education",
    excerpt: "Meet our graduates who landed dream jobs after completing our comprehensive training programs.",
    author: "Academy Team",
    date: "2024-01-05",
    category: "Academy",
  },
]

function BlogCard({ post }: { post: BlogPost }) {
  const [titleExpanded, setTitleExpanded] = useState(false)
  const [excerptExpanded, setExcerptExpanded] = useState(false)
  const [canExpandTitle, setCanExpandTitle] = useState(false)
  const [canExpandExcerpt, setCanExpandExcerpt] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const excerptRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const titleEl = titleRef.current
    const excerptEl = excerptRef.current

    if (titleEl) {
      setCanExpandTitle(titleEl.scrollHeight > titleEl.clientHeight)
    }

    if (excerptEl) {
      setCanExpandExcerpt(excerptEl.scrollHeight > excerptEl.clientHeight)
    }
  }, [])

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader className="flex-1">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{post.author}</span>
          </div>
        </div>

        {/* TITLE — WITH ELLIPSIS & SCROLL */}
        <div className="relative">
          <CardTitle
            ref={titleRef}
            className={`
              text-lg 
              text-balance 
              group-hover:text-primary 
              transition-colors
              ${titleExpanded 
                ? "max-h-[100px] overflow-y-auto pr-2" 
                : "line-clamp-2"
              }
            `}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--primary)) transparent'
            }}
          >
            {post.title}
          </CardTitle>

          {canExpandTitle && (
            <button
              type="button"
              onClick={() => setTitleExpanded(!titleExpanded)}
              className="
                mt-1
                text-xs
                text-primary
                hover:underline
                font-medium
              "
            >
              {titleExpanded ? "Show less" : "Show more..."}
            </button>
          )}
        </div>

        {/* EXCERPT — WITH ELLIPSIS & SCROLL */}
        <div className="relative mt-2">
          <CardDescription
            ref={excerptRef}
            className={`
              text-pretty
              transition-all
              ${excerptExpanded 
                ? "max-h-[120px] overflow-y-auto pr-2" 
                : "line-clamp-3"
              }
            `}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--primary)) transparent'
            }}
          >
            {post.excerpt}
          </CardDescription>

          {canExpandExcerpt && (
            <button
              type="button"
              onClick={() => setExcerptExpanded(!excerptExpanded)}
              className="
                mt-1
                text-xs
                text-primary
                hover:underline
                font-medium
              "
            >
              {excerptExpanded ? "Show less" : "Show more..."}
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full truncate max-w-[150px]">
            {post.category}
          </span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/blog/${post.id}`} className="flex items-center space-x-1 flex-shrink-0">
              <span>Read More</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        :global(.overflow-y-auto::-webkit-scrollbar) {
          width: 6px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-track) {
          background: transparent;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
          background: hsl(var(--primary));
          border-radius: 3px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </Card>
  )
}

export function BlogPreview() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Latest from Our Blog</h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Stay updated with the latest insights, innovations, and success stories from across our divisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {samplePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}