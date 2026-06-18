import type { ProjectRoute, ProjectScopeAnswers } from "./project-scope-flow"

const BOFFINS_WHATSAPP_NUMBER = "2348156653196"

const sourceLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  referral: "Referral",
}

type SearchParamsLike = {
  get: (name: string) => string | null
}

function answer(answers: ProjectScopeAnswers, key: string) {
  return answers[key] || "Not selected"
}

export function getTrafficSource(searchParams: SearchParamsLike | null) {
  const source = searchParams?.get("source")?.toLowerCase()

  if (!source) {
    return "Website"
  }

  return sourceLabels[source] || "Website"
}

export function buildWhatsAppMessage(route: ProjectRoute, answers: ProjectScopeAnswers, source: string) {
  const sourceLine = `Source: ${source}`

  if (route === "software") {
    return `Hi Boffins Technology, I saw your ad and used the project scope page.

I am interested in building software for my business.

Here is my selection:
- Main goal: ${answer(answers, "main_goal")}
- Software for: ${answer(answers, "software_users")}
- Main problem: ${answer(answers, "software_problem")}
- Preferred platform: ${answer(answers, "preferred_platform")}
- Budget: ${answer(answers, "budget")}
- Timeline: ${answer(answers, "timeline")}

Please I would like to discuss the best next step.

${sourceLine}`
  }

  return `Hi Boffins Technology, I saw your ad and used the project scope page.

I am looking to build a website / landing page.

Here is my selection:
- Main goal: ${answer(answers, "main_goal")}
- Current issue: ${answer(answers, "trust_problem")}
- What I want the page to do: ${answer(answers, "website_goal")}
- Content readiness: ${answer(answers, "content_readiness")}
- Budget: ${answer(answers, "budget")}
- Timeline: ${answer(answers, "timeline")}

Please I would like to discuss the best next step.

${sourceLine}`
}

export function buildWhatsAppUrl(route: ProjectRoute, answers: ProjectScopeAnswers, source: string) {
  const encodedMessage = encodeURIComponent(buildWhatsAppMessage(route, answers, source))

  return `https://wa.me/${BOFFINS_WHATSAPP_NUMBER}?text=${encodedMessage}`
}
