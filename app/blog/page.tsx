import { Suspense } from "react"
import BlogPageContent from "./blog-content"
import { getBlogPageData, getStaticBlogPageData } from "@/lib/api/blog"

export default async function BlogPage() {
  let blogPageData

  try {
    blogPageData = await getBlogPageData()
  } catch (error) {
    console.error("Failed to fetch blog page data:", error)
    blogPageData = getStaticBlogPageData()
  }

  return (
    <Suspense fallback={null}>
      <BlogPageContent data={blogPageData} />
    </Suspense>
  )
}
