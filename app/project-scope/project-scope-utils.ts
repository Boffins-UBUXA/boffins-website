import type { ProjectRoute, ProjectScopeAnswers } from "./project-scope-flow"

const BOFFINS_WHATSAPP_NUMBER = "23480156653196"

export function getTrafficSource(searchParams: URLSearchParams) {
  return (
    searchParams.get("utm_source") ||
    searchParams.get("source") ||
    searchParams.get("ref") ||
    "Direct / unknown"
  )
}

export function buildWhatsAppUrl(route: ProjectRoute, answers: ProjectScopeAnswers, source: string) {
  const projectType = route === "software" ? "Software / Business System" : "Website / Landing Page"
  const lines = [
    "Hi Boffins Technology, I saw your ad and used the project scope page.",
    "",
    `Project type: ${projectType}`,
    `Main goal: ${answers.main_goal || "Not selected"}`,
  ]

  if (route === "software") {
    lines.push(
      `Software for: ${answers.software_users || "Not selected"}`,
      `Main problem: ${answers.software_problem || "Not selected"}`,
      `Preferred platform: ${answers.preferred_platform || "Not selected"}`,
    )
  } else {
    lines.push(
      `Current issue: ${answers.trust_problem || "Not selected"}`,
      `Page goal: ${answers.website_goal || "Not selected"}`,
      `Content readiness: ${answers.content_readiness || "Not selected"}`,
    )
  }

  lines.push(
    `Budget: ${answers.budget || "Not selected"}`,
    `Timeline: ${answers.timeline || "Not selected"}`,
    `Source: ${source}`,
    "",
    "Please advise on the best solution, estimated scope, and next steps.",
  )

  return `https://wa.me/${BOFFINS_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`
}
