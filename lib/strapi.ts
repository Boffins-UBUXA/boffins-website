/**
 * Shared Strapi API client.
 *
 * Page and feature-specific fetch logic should live in lib/api/* and call the
 * utilities from this file.
 */

import qs from "qs"

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

type FetchStrapiOptions = RequestInit & {
  query?: Record<string, unknown>
}

export function getStrapiUrl(path = "") {
  return `${STRAPI_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
}

export function getStrapiMediaUrl(path?: string | null) {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path
  }

  return getStrapiUrl(path)
}

export async function fetchStrapi<T>(endpoint: string, options: FetchStrapiOptions = {}): Promise<T> {
  const { query, headers: customHeaders, ...fetchOptions } = options
  const queryString = query
    ? qs.stringify(query, {
        encodeValuesOnly: true,
      })
    : ""
  const url = getStrapiUrl(`${endpoint}${queryString ? `?${queryString}` : ""}`)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    ...customHeaders,
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      next: fetchOptions.next ?? { revalidate: 60 },
      cache: fetchOptions.cache,
    })

    if (!response.ok) {
      throw new Error(`Strapi API error (${response.status}) for ${url}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("[Strapi] Error:", error)
    throw error
  }
}

export async function getBlogPostBySlug(slug: string) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': '*',
  });

  const response = await fetchStrapi<StrapiResponse<any[]>>(
    `/api/blog-posts?${params.toString()}`
  );

  return response.data[0] || null;
}

export async function getCaseStudyBySlug(slug: string) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': '*',
  });

  const response = await fetchStrapi<StrapiResponse<any[]>>(
    `/api/case-studies?${params.toString()}`
  );

  return response.data[0] || null;
}

export async function getCaseStudies(page = 1, pageSize = 100) {
  const params = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort': 'createdAt:desc',
    'populate': '*',
  });

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/case-studies?${params.toString()}`
  );
}

export async function getServices() {
  const params = new URLSearchParams({
    'sort': 'name:asc',
    'populate': '*',
  });

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/service-divisions?${params.toString()}`
  );
}

export async function getProducts() {
  const params = new URLSearchParams({
    'sort': 'name:asc',
    'populate': '*',
  });

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/products?${params.toString()}`
  );
}

export async function getTestimonials(product?: string) {
  const params = new URLSearchParams({
    'sort': 'createdAt:desc',
    'populate': '*',
  });

  if (product) {
    params.append('filters[product][$eq]', product);
  }

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/testimonials?${params.toString()}`
  );
}

export async function getTrainingPrograms() {
  const params = new URLSearchParams({
    'sort': 'title:asc',
    'populate': '*',
  });

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/training-programs?${params.toString()}`
  );
}

export async function getHomepage() {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: true,
          hero: true,
          stats: true,
        },
      },
      { encodeValuesOnly: true }
    );

    return await fetchStrapi<StrapiResponse<any>>(`/api/home-page?${query}`);
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
}

export async function getAboutPage() {
  return fetchStrapi<StrapiResponse<any>>('/api/about-page?populate=*');
}

export async function getContactPage() {
  return fetchStrapi<StrapiResponse<any>>('/api/contact-page?populate=*');
}

export async function getBlogPosts(page = 1, pageSize = 3, category?: string) {
  const params = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort': 'publishDate:desc',
    'populate': '*',
  });

  if (category) {
    params.append('filters[category][$eq]', category);
  }

  return fetchStrapi<StrapiResponse<any[]>>(
    `/api/blog-posts?${params.toString()}`
  );
}
