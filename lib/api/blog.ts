import qs from "qs"

import { blogPosts as staticBlogPosts, type BlogPost } from "@/lib/data/blog-data"
import { fetchStrapi, getStrapiMediaUrl, type StrapiResponse } from "@/lib/strapi"

type StrapiBlogPage = {
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
  heroBadge?: string | null
  heroTitle?: string | null
  heroHighlightedTitle?: string | null
  heroDescription?: string | null
  searchPlaceholder?: string | null
  searchButtonLabel?: string | null
  featuredTitle?: string | null
  featuredDescription?: string | null
  featuredEmptyTitle?: string | null
  featuredEmptyDescription?: string | null
  featuredCtaLabel?: string | null
  latestTitle?: string | null
  searchResultsLabelTemplate?: string | null
  divisionResultsLabelTemplate?: string | null
  noArticlesTitle?: string | null
  noArticlesSearchDescription?: string | null
  noArticlesDefaultDescription?: string | null
  clearFiltersLabel?: string | null
  loadMoreLabel?: string | null
  loadingLabel?: string | null
  divisionsTitle?: string | null
  allDivisionsLabel?: string | null
  newsletterTitle?: string | null
  newsletterDescription?: string | null
  newsletterPlaceholder?: string | null
  newsletterSubmitLabel?: string | null
  newsletterSubmittingLabel?: string | null
  toastCloseLabel?: string | null
  invalidEmailTitle?: string | null
  invalidEmailDescription?: string | null
  subscribeSuccessTitle?: string | null
  subscribeSuccessDescription?: string | null
  detailBackLabel?: string | null
  detailNotFoundTitle?: string | null
  relatedTitle?: string | null
  relatedDescription?: string | null
  publishedInLabel?: string | null
}

type StrapiBlogPost = {
  id: number
  documentId?: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  content?: string | null
  author?: string | null
  category?: string | null
  publishDate?: string | null
  readTime?: string | null
  image?: string | null
}

export type BlogPageCopy = {
  seo: {
    metaTitle: string
    metaDescription: string
  }
  heroBadge: string
  heroTitle: string
  heroHighlightedTitle: string
  heroDescription: string
  searchPlaceholder: string
  searchButtonLabel: string
  featuredTitle: string
  featuredDescription: string
  featuredEmptyTitle: string
  featuredEmptyDescription: string
  featuredCtaLabel: string
  latestTitle: string
  searchResultsLabelTemplate: string
  divisionResultsLabelTemplate: string
  noArticlesTitle: string
  noArticlesSearchDescription: string
  noArticlesDefaultDescription: string
  clearFiltersLabel: string
  loadMoreLabel: string
  loadingLabel: string
  divisionsTitle: string
  allDivisionsLabel: string
  newsletterTitle: string
  newsletterDescription: string
  newsletterPlaceholder: string
  newsletterSubmitLabel: string
  newsletterSubmittingLabel: string
  toastCloseLabel: string
  invalidEmailTitle: string
  invalidEmailDescription: string
  subscribeSuccessTitle: string
  subscribeSuccessDescription: string
  detailBackLabel: string
  detailNotFoundTitle: string
  relatedTitle: string
  relatedDescription: string
  publishedInLabel: string
}

export type BlogPageData = BlogPageCopy & {
  posts: BlogPost[]
}

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback
}

function formatDate(value: string | null | undefined) {
  if (!value) return ""

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

function normalizePost(post: StrapiBlogPost): BlogPost {
  return {
    title: textOrFallback(post.title, "Untitled Article"),
    slug: textOrFallback(post.slug, String(post.id)),
    excerpt: textOrFallback(post.excerpt, ""),
    content: textOrFallback(post.content, ""),
    author: textOrFallback(post.author, ""),
    category: textOrFallback(post.category, ""),
    date: formatDate(post.publishDate),
    readTime: textOrFallback(post.readTime, ""),
    image: getStrapiMediaUrl(post.image) || "/placeholder.svg",
  }
}

function normalizeCopy(page?: StrapiBlogPage | null): BlogPageCopy {
  return {
    seo: {
      metaTitle: textOrFallback(page?.seo?.metaTitle, "Blog | Boffins Technology"),
      metaDescription: textOrFallback(
        page?.seo?.metaDescription,
        "Discover the latest trends, best practices, and innovations in technology from across our divisions."
      ),
    },
    heroBadge: textOrFallback(page?.heroBadge, "Tech Insights"),
    heroTitle: textOrFallback(page?.heroTitle, "Stay Ahead with"),
    heroHighlightedTitle: textOrFallback(page?.heroHighlightedTitle, "Tech Insights"),
    heroDescription: textOrFallback(
      page?.heroDescription,
      "Discover the latest trends, best practices, and innovations in technology from across our divisions."
    ),
    searchPlaceholder: textOrFallback(page?.searchPlaceholder, "Search articles..."),
    searchButtonLabel: textOrFallback(page?.searchButtonLabel, "Search"),
    featuredTitle: textOrFallback(page?.featuredTitle, "Featured Article"),
    featuredDescription: textOrFallback(page?.featuredDescription, "Our latest and most popular content"),
    featuredEmptyTitle: textOrFallback(page?.featuredEmptyTitle, "No Featured Article"),
    featuredEmptyDescription: textOrFallback(
      page?.featuredEmptyDescription,
      "Check back soon for our latest featured content"
    ),
    featuredCtaLabel: textOrFallback(page?.featuredCtaLabel, "Read Full Article"),
    latestTitle: textOrFallback(page?.latestTitle, "Latest Articles"),
    searchResultsLabelTemplate: textOrFallback(page?.searchResultsLabelTemplate, 'Showing results for "{query}"'),
    divisionResultsLabelTemplate: textOrFallback(page?.divisionResultsLabelTemplate, "in {division}"),
    noArticlesTitle: textOrFallback(page?.noArticlesTitle, "No Articles Found"),
    noArticlesSearchDescription: textOrFallback(
      page?.noArticlesSearchDescription,
      "Try adjusting your search terms or filters"
    ),
    noArticlesDefaultDescription: textOrFallback(
      page?.noArticlesDefaultDescription,
      "Check back soon for new content"
    ),
    clearFiltersLabel: textOrFallback(page?.clearFiltersLabel, "Clear Filters"),
    loadMoreLabel: textOrFallback(page?.loadMoreLabel, "Load More Articles"),
    loadingLabel: textOrFallback(page?.loadingLabel, "Loading..."),
    divisionsTitle: textOrFallback(page?.divisionsTitle, "Divisions"),
    allDivisionsLabel: textOrFallback(page?.allDivisionsLabel, "All"),
    newsletterTitle: textOrFallback(page?.newsletterTitle, "Stay Updated"),
    newsletterDescription: textOrFallback(
      page?.newsletterDescription,
      "Subscribe to our newsletter for the latest tech insights and updates."
    ),
    newsletterPlaceholder: textOrFallback(page?.newsletterPlaceholder, "Enter your email"),
    newsletterSubmitLabel: textOrFallback(page?.newsletterSubmitLabel, "Subscribe"),
    newsletterSubmittingLabel: textOrFallback(page?.newsletterSubmittingLabel, "Subscribing..."),
    toastCloseLabel: textOrFallback(page?.toastCloseLabel, "Close"),
    invalidEmailTitle: textOrFallback(page?.invalidEmailTitle, "Invalid Email"),
    invalidEmailDescription: textOrFallback(page?.invalidEmailDescription, "Please enter a valid email address"),
    subscribeSuccessTitle: textOrFallback(page?.subscribeSuccessTitle, "Successfully Subscribed!"),
    subscribeSuccessDescription: textOrFallback(
      page?.subscribeSuccessDescription,
      "You'll receive our latest updates in your inbox."
    ),
    detailBackLabel: textOrFallback(page?.detailBackLabel, "Back to Blog"),
    detailNotFoundTitle: textOrFallback(page?.detailNotFoundTitle, "Post Not Found | Boffins Technology"),
    relatedTitle: textOrFallback(page?.relatedTitle, "Related Articles"),
    relatedDescription: textOrFallback(
      page?.relatedDescription,
      "More insights and stories from our team that you might find interesting."
    ),
    publishedInLabel: textOrFallback(page?.publishedInLabel, "Published in"),
  }
}

async function fetchBlogCopy() {
  const query = qs.stringify(
    {
      populate: {
        seo: true,
      },
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiBlogPage>>(`/api/blog-page?${query}`, { cache: "no-store" })
  return normalizeCopy(response.data)
}

async function fetchBlogPosts(pageSize = 100) {
  const query = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize,
      },
      sort: ["publishDate:desc", "id:desc"],
    },
    { encodeValuesOnly: true }
  )

  const response = await fetchStrapi<StrapiResponse<StrapiBlogPost[]>>(`/api/blog-posts?${query}`, {
    cache: "no-store",
  })
  return (response.data || []).map(normalizePost)
}

export async function getBlogPageData(): Promise<BlogPageData> {
  const [copy, posts] = await Promise.all([fetchBlogCopy(), fetchBlogPosts()])

  return {
    ...copy,
    posts,
  }
}

export function getStaticBlogPageData(): BlogPageData {
  return {
    ...normalizeCopy(null),
    posts: staticBlogPosts,
  }
}

export async function getBlogPostPageData(slug: string) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    { encodeValuesOnly: true }
  )

  const [copy, postResponse, posts] = await Promise.all([
    fetchBlogCopy(),
    fetchStrapi<StrapiResponse<StrapiBlogPost[]>>(`/api/blog-posts?${query}`, { cache: "no-store" }),
    fetchBlogPosts(4),
  ])
  const post = postResponse.data?.[0] ? normalizePost(postResponse.data[0]) : undefined

  return {
    copy,
    post,
    relatedPosts: posts.filter((item) => item.slug !== slug).slice(0, 3),
  }
}
