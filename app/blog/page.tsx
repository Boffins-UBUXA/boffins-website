import { Suspense } from "react"
import BlogPageContent from "./blog-content"

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogPageContent />
    </Suspense>
  )
}
