"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-data"

export function BlogPostCard({ post }: { post: BlogPost }) {
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
