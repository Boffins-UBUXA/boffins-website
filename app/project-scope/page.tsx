import type { Metadata } from "next"
import { Suspense } from "react"

import { ProjectScopeClient } from "./project-scope-client"

export const metadata: Metadata = {
  title: "Project Scope | Boffins Technology",
  description: "Scope your website, landing page, software, or business system project before chatting with Boffins.",
  alternates: {
    canonical: "/project-scope",
  },
  openGraph: {
    title: "Project Scope | Boffins Technology",
    description: "Answer a few quick cards so Boffins can understand your project direction faster.",
    url: "https://boffinstechnology.com.ng/project-scope",
    siteName: "Boffins Technology",
    type: "website",
  },
}

export default function ProjectScopePage() {
  return (
    <Suspense fallback={null}>
      <ProjectScopeClient />
    </Suspense>
  )
}
