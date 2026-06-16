export type ProjectRoute = "website" | "software" | null

export type ProjectScopeAnswers = Record<string, string>

export type AnswerOption = {
  id: "left" | "right"
  label: string
  value: string
  route?: Exclude<ProjectRoute, null>
}

export type ProjectScopeCard = {
  id: string
  key: string
  question: string
  helperText: string
  accent: "orange" | "purple" | "green" | "blue" | "pink" | "dark"
  visualType: "trust" | "ads" | "content" | "budget" | "timeline" | "software" | "team" | "mobile"
  options: [AnswerOption, AnswerOption]
}

export const sharedStartCard: ProjectScopeCard = {
  id: "project-type",
  key: "main_goal",
  question: "What do you want Boffins to help you build?",
  helperText: "Start with the closest direction. We will use your answers to shape the WhatsApp brief.",
  accent: "dark",
  visualType: "trust",
  options: [
    {
      id: "left",
      label: "Website or landing page",
      value: "Website / Landing Page",
      route: "website",
    },
    {
      id: "right",
      label: "Software or business system",
      value: "Software / Business System",
      route: "software",
    },
  ],
}

export const websiteCards: ProjectScopeCard[] = [
  {
    id: "trust-problem",
    key: "trust_problem",
    question: "What is making customers hesitate right now?",
    helperText: "This helps us know whether the page needs more clarity, proof, speed, or conversion focus.",
    accent: "blue",
    visualType: "ads",
    options: [
      {
        id: "left",
        label: "They do not understand my offer",
        value: "Customers do not understand the offer clearly",
      },
      {
        id: "right",
        label: "They ask many questions before buying",
        value: "Customers need more trust and explanation before buying",
      },
    ],
  },
  {
    id: "website-goal",
    key: "website_goal",
    question: "What should the page do first?",
    helperText: "A page can inform, qualify, sell, or collect leads. Picking the main job keeps it focused.",
    accent: "green",
    visualType: "content",
    options: [
      {
        id: "left",
        label: "Explain my business clearly",
        value: "Explain the business clearly",
      },
      {
        id: "right",
        label: "Bring serious enquiries",
        value: "Generate serious enquiries",
      },
    ],
  },
  {
    id: "content-readiness",
    key: "content_readiness",
    question: "How ready is your content?",
    helperText: "Your answer tells us whether to plan mostly design/build work or content support too.",
    accent: "orange",
    visualType: "content",
    options: [
      {
        id: "left",
        label: "I have text, images, and details",
        value: "Content is mostly ready",
      },
      {
        id: "right",
        label: "I need help shaping the content",
        value: "Needs help with content and structure",
      },
    ],
  },
  {
    id: "budget",
    key: "budget",
    question: "What budget range should we plan around?",
    helperText: "This keeps the recommendation realistic from the first conversation.",
    accent: "pink",
    visualType: "budget",
    options: [
      {
        id: "left",
        label: "Starter or lean budget",
        value: "Starter / lean budget",
      },
      {
        id: "right",
        label: "I can invest for stronger results",
        value: "Growth / results-focused budget",
      },
    ],
  },
  {
    id: "timeline",
    key: "timeline",
    question: "When do you want to start?",
    helperText: "Serious projects move faster when the scope is clear.",
    accent: "dark",
    visualType: "timeline",
    options: [
      {
        id: "left",
        label: "I want to scope it now.",
        value: "Ready to scope now",
      },
      {
        id: "right",
        label: "I am planning ahead",
        value: "Planning ahead",
      },
    ],
  },
]

export const softwareCards: ProjectScopeCard[] = [
  {
    id: "software-users",
    key: "software_users",
    question: "Who will use the system most?",
    helperText: "This helps us think about access, dashboards, approvals, and workflow complexity.",
    accent: "blue",
    visualType: "team",
    options: [
      {
        id: "left",
        label: "My internal team",
        value: "Internal team",
      },
      {
        id: "right",
        label: "Customers or external users",
        value: "Customers / external users",
      },
    ],
  },
  {
    id: "software-problem",
    key: "software_problem",
    question: "What problem should the system solve first?",
    helperText: "A clear first problem makes the first version easier to price, build, and improve.",
    accent: "green",
    visualType: "software",
    options: [
      {
        id: "left",
        label: "Organize records and workflow",
        value: "Organize records and workflow",
      },
      {
        id: "right",
        label: "Automate tasks and reporting",
        value: "Automate tasks and reporting",
      },
    ],
  },
  {
    id: "preferred-platform",
    key: "preferred_platform",
    question: "Where should people use it?",
    helperText: "Platform choice affects design, development time, and rollout plan.",
    accent: "purple",
    visualType: "mobile",
    options: [
      {
        id: "left",
        label: "Web dashboard or portal",
        value: "Web dashboard / portal",
      },
      {
        id: "right",
        label: "Mobile app or mobile-first system",
        value: "Mobile app / mobile-first system",
      },
    ],
  },
  {
    id: "budget",
    key: "budget",
    question: "What budget range should we plan around?",
    helperText: "This keeps the recommendation realistic from the first conversation.",
    accent: "pink",
    visualType: "budget",
    options: [
      {
        id: "left",
        label: "Start with an MVP",
        value: "MVP / phased budget",
      },
      {
        id: "right",
        label: "Build a more complete version",
        value: "Fuller product budget",
      },
    ],
  },
  {
    id: "timeline",
    key: "timeline",
    question: "When do you want to start?",
    helperText: "Serious projects move faster when the scope is clear.",
    accent: "dark",
    visualType: "timeline",
    options: [
      {
        id: "left",
        label: "I want to scope it now.",
        value: "Ready to scope now",
      },
      {
        id: "right",
        label: "I am planning ahead",
        value: "Planning ahead",
      },
    ],
  },
]

export const totalProjectScopeCards = 6
