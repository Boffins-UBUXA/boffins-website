import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Search, TrendingUp, BookOpen, Code } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Renewable Energy Management: How AI is Transforming the Industry",
    excerpt:
      "Discover how artificial intelligence and IoT technologies are revolutionizing renewable energy management, making sustainable power more efficient and accessible than ever before.",
    image: "/ai-renewable-energy-future-technology.jpg",
    author: "Dr. Sarah Johnson",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Technology",
    slug: "future-renewable-energy-ai-transformation",
  }

  const blogPosts = [
    {
      title: "Building Scalable Web Applications with Next.js and TypeScript",
      excerpt:
        "Learn the best practices for creating robust, scalable web applications using modern development frameworks and tools.",
      image: "/nextjs-typescript-web-development.jpg",
      author: "Michael Chen",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "Development",
      slug: "scalable-web-apps-nextjs-typescript",
    },
    {
      title: "IoT Security: Protecting Your Smart Devices from Cyber Threats",
      excerpt:
        "Essential security measures and best practices to keep your IoT devices and networks safe from evolving cyber threats.",
      image: "/iot-security-cyber-protection.jpg",
      author: "Alex Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Security",
      slug: "iot-security-cyber-protection",
    },
    {
      title: "The Rise of No-Code Platforms: Democratizing Software Development",
      excerpt:
        "Exploring how no-code and low-code platforms are changing the software development landscape and empowering non-technical users.",
      image: "/no-code-platforms-software-development.jpg",
      author: "Emma Thompson",
      date: "December 8, 2024",
      readTime: "5 min read",
      category: "Innovation",
      slug: "no-code-platforms-democratizing-development",
    },
    {
      title: "Digital Transformation in Small Businesses: A Practical Guide",
      excerpt:
        "Step-by-step strategies for small businesses to successfully navigate digital transformation and stay competitive.",
      image: "/digital-transformation-small-business.jpg",
      author: "David Park",
      date: "December 5, 2024",
      readTime: "9 min read",
      category: "Business",
      slug: "digital-transformation-small-business-guide",
    },
    {
      title: "Machine Learning in Content Creation: Tools and Techniques",
      excerpt:
        "Discover how machine learning is revolutionizing content creation, from automated writing to intelligent design assistance.",
      image: "/machine-learning-content-creation.jpg",
      author: "Lisa Wang",
      date: "December 3, 2024",
      readTime: "6 min read",
      category: "AI/ML",
      slug: "machine-learning-content-creation-tools",
    },
    {
      title: "Sustainable Tech: Green Computing Practices for Modern Businesses",
      excerpt:
        "Learn about eco-friendly computing practices and how businesses can reduce their environmental impact through sustainable technology choices.",
      image: "/sustainable-tech-green-computing.jpg",
      author: "James Miller",
      date: "December 1, 2024",
      readTime: "7 min read",
      category: "Sustainability",
      slug: "sustainable-tech-green-computing-practices",
    },
  ]

  const categories = [
    { name: "All", count: 24, active: true },
    { name: "Technology", count: 8 },
    { name: "Development", count: 6 },
    { name: "Business", count: 4 },
    { name: "AI/ML", count: 3 },
    { name: "Security", count: 2 },
    { name: "Innovation", count: 1 },
  ]

  const popularTags = [
    "Next.js",
    "TypeScript",
    "IoT",
    "AI",
    "Machine Learning",
    "Cybersecurity",
    "Digital Transformation",
    "Renewable Energy",
    "Web Development",
    "Mobile Apps",
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <BookOpen className="h-3 w-3 mr-1" />
              Tech Insights
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Stay Ahead with <span className="text-primary">Tech Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Discover the latest trends, best practices, and innovations in technology. Our expert team shares insights
              to help you navigate the ever-evolving digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Article</h2>
            <p className="text-muted-foreground">Our latest and most popular content</p>
          </div>

          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge>{featuredPost.category}</Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-balance">{featuredPost.title}</h3>
                  <p className="text-muted-foreground text-pretty">{featuredPost.excerpt}</p>
                  <Button asChild>
                    <Link href={`/blog/${featuredPost.slug}`} className="flex items-center space-x-2">
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
                <p className="text-muted-foreground">Stay updated with our latest insights and tutorials</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-balance">{post.title}</CardTitle>
                      <CardDescription className="text-pretty">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`} className="flex items-center space-x-1">
                            <span>Read More</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={category.active ? "default" : "ghost"}
                      className="w-full justify-between"
                      size="sm"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <span>Popular Tags</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>
                    Subscribe to our newsletter for the latest tech insights and updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                  <p className="text-xs text-muted-foreground text-center">No spam, unsubscribe at any time.</p>
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
