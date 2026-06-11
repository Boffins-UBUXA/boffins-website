import type { Metadata } from "next"

import { ProjectScopeClient } from "./project-scope-client"

export const metadata: Metadata = {
  title: "Project Scope | Boffins Technology",
  description:
    "Answer 6 quick questions and let Boffins Technology recommend the right website, app, software, or automation starting point for your business.",
  alternates: {
    canonical: "/project-scope",
  },
  openGraph: {
    title: "Project Scope | Boffins Technology",
    description:
      "Answer 6 quick questions and let Boffins Technology recommend the right website, app, software, or automation starting point for your business.",
    url: "https://boffinstechnology.com.ng/project-scope",
    siteName: "Boffins Technology",
    images: [
      {
        url: "/professional-business-manager.jpg",
        width: 1200,
        height: 630,
        alt: "Boffins Technology project scope funnel",
      },
    ],
    type: "website",
  },
}

export default function ProjectScopePage() {
  return <ProjectScopeClient />
}
