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

// Types
interface BlogPost {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  slug: string
  content?: string
}

interface ToastState {
  show: boolean
  title: string
  description: string
  variant?: "default" | "destructive"
}

// Sample Data
const sampleFeaturedPost: BlogPost = {
  title: "The Future of Renewable Energy Management: How AI is Transforming the Industry",
  excerpt:
    "Discover how artificial intelligence and IoT technologies are revolutionizing renewable energy management, making sustainable power more efficient and accessible than ever before.",
  image: "/ai-renewable-energy-future-technology.jpg",
  author: "Dr. Sarah Johnson",
  date: "December 15, 2024",
  readTime: "8 min read",
  category: "Product",
  slug: "future-renewable-energy-ai-transformation",
  content: "Full article content here..."
}

const sampleBlogPosts: BlogPost[] = [
  {
    title: "Building Scalable Web Applications with Next.js and TypeScript",
    excerpt:
      "Learn the best practices for creating robust, scalable web applications using modern development frameworks and tools.",
    image: "/nextjs-typescript-web-development.jpg",
    author: "Michael Chen",
    date: "December 12, 2024",
    readTime: "6 min read",
    category: "Bespoke",
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
    category: "Hardware",
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
    category: "Product",
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
    category: "Bespoke",
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
    category: "Media",
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
    category: "Academy",
    slug: "sustainable-tech-green-computing-practices",
  },
]

// Toast Component
function Toast({ toast, onClose }: { toast: ToastState, onClose: () => void }) {
  if (!toast.show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className={`w-80 ${toast.variant === "destructive" ? "border-destructive" : ""}`}>
        <CardHeader>
          <CardTitle className="text-sm">{toast.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{toast.description}</p>
          <Button size="sm" variant="outline" className="mt-2" onClick={onClose}>
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Featured Article Card Component
function FeaturedArticleCard({ post }: { post: BlogPost | null }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = post?.excerpt && post.excerpt.length > 150

  if (!post) {
    return (
      <Card className="overflow-hidden h-[400px]">
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Featured Article</h3>
          <p className="text-muted-foreground">Check back soon for our latest featured content</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-[400px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative h-64 lg:h-full">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
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
              <p
                className={`text-muted-foreground text-sm ${
                  !isExpanded && shouldTruncate ? "line-clamp-3" : ""
                }`}
              >
                {post.excerpt}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>Less <ChevronUp className="h-3 w-3" /></>
                  ) : (
                    <>More <ChevronDown className="h-3 w-3" /></>
                  )}
                </button>
              )}
            </div>
            <Button asChild size="sm">
              <Link href={`/blog/${post.slug}`} className="flex items-center space-x-2">
                <span>Read Full Article</span>
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
function BlogPostCard({ post }: { post: BlogPost }) {
  const [titleExpanded, setTitleExpanded] = useState(false)
  const [excerptExpanded, setExcerptExpanded] = useState(false)
  const shouldTruncateTitle = post.title.length > 80
  const shouldTruncateExcerpt = post.excerpt.length > 120

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[500px]">
      <div className="relative h-48 flex-shrink-0">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
      </div>
      <CardHeader className="flex-grow">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span className="truncate">{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
        </div>
        <div>
          <CardTitle className={`text-base ${!titleExpanded && shouldTruncateTitle ? "line-clamp-2" : ""}`}>
            {post.title}
          </CardTitle>
          {shouldTruncateTitle && (
            <button
              onClick={() => setTitleExpanded(!titleExpanded)}
              className="mt-1 text-xs font-medium text-primary hover:underline"
            >
              {titleExpanded ? "Less" : "More"}
            </button>
          )}
        </div>
        <div className="mt-2">
          <CardDescription className={`text-sm ${!excerptExpanded && shouldTruncateExcerpt ? "line-clamp-3" : ""}`}>
            {post.excerpt}
          </CardDescription>
          {shouldTruncateExcerpt && (
            <button
              onClick={() => setExcerptExpanded(!excerptExpanded)}
              className="mt-1 text-xs font-medium text-primary hover:underline"
            >
              {excerptExpanded ? "Less" : "More"}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/blog/${post.slug}`} className="flex items-center space-x-1">
              <span>Read More</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Blog Page Component
export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDivision, setSelectedDivision] = useState("All")
  const [displayedPosts, setDisplayedPosts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, title: "", description: "" })

  const divisions = [
    { name: "All", count: sampleBlogPosts.length },
    { name: "Bespoke", count: sampleBlogPosts.filter(p => p.category === "Bespoke").length },
    { name: "Product", count: sampleBlogPosts.filter(p => p.category === "Product").length },
    { name: "Media", count: sampleBlogPosts.filter(p => p.category === "Media").length },
    { name: "Academy", count: sampleBlogPosts.filter(p => p.category === "Academy").length },
    { name: "Hardware", count: sampleBlogPosts.filter(p => p.category === "Hardware").length },
  ]

  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesDivision = selectedDivision === "All" || post.category === selectedDivision
    
    return matchesSearch && matchesDivision
  })

  const visiblePosts = filteredPosts.slice(0, displayedPosts)

  const handleSearch = () => {
    // Search is handled by the filter
  }

  const handleLoadMore = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDisplayedPosts(prev => prev + 6)
    setIsLoading(false)
  }

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setToast({
        show: true,
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubscribing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setToast({
      show: true,
      title: "Successfully Subscribed!",
      description: "You'll receive our latest updates in your inbox.",
    })
    
    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <div className="min-h-screen">
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} />

      {/* Hero Section */}
      <Header />
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
              Discover the latest trends, best practices, and innovations in technology from across our divisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
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
          <FeaturedArticleCard post={sampleFeaturedPost} />
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
                <p className="text-muted-foreground">
                  {searchQuery && `Showing results for "${searchQuery}"`}
                  {selectedDivision !== "All" && ` in ${selectedDivision}`}
                </p>
              </div>

              {visiblePosts.length === 0 ? (
                <Card className="p-12">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery 
                        ? "Try adjusting your search terms or filters" 
                        : "Check back soon for new content"}
                    </p>
                    {(searchQuery || selectedDivision !== "All") && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedDivision("All")
                        }}
                      >
                        Clear Filters
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
                            Loading...
                          </>
                        ) : (
                          "Load More Articles"
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
                    <span>Divisions</span>
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
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>
                    Subscribe to our newsletter for the latest tech insights and updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Enter your email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className="w-full" onClick={handleSubscribe} disabled={isSubscribing}>
                    {isSubscribing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    No spam, unsubscribe at any time.
                  </p>
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