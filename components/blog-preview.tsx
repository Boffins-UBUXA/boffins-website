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
    author: "Education Team",
    date: "2024-01-05",
    category: "Education",
  },
]

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
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-balance group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-pretty">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{post.category}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.id}`} className="flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
