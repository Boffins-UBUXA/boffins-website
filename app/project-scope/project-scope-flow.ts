export type ProjectRoute = "website" | "software" | null

export type AnswerOption = {
  id: "left" | "right"
  label: string
  value: string
  route?: Exclude<ProjectRoute, null>
}

export type ProjectScopeCard = {
  id: string
  key: string
  route: "shared" | Exclude<ProjectRoute, null>
  question: string
  helperText: string
  visualType: "trust" | "ads" | "content" | "budget" | "timeline" | "software" | "team" | "mobile"
  accent: "orange" | "purple" | "green" | "blue" | "pink" | "dark"
  options: AnswerOption[]
}

export type ProjectScopeAnswers = Record<string, string>

export const sharedStartCard: ProjectScopeCard = {
  id: "start",
  key: "main_goal",
  route: "shared",
  question: "What do you want Boffins to help you fix first?",
  helperText: "Let's know the kind of business problem you want to solve.",
  visualType: "trust",
  accent: "orange",
  options: [
    {
      id: "left",
      label: "I need more customers to trust me online.",
      value: "Need more customers to trust the business online",
      route: "website",
    },
    {
      id: "right",
      label: "I need software to manage or grow my business.",
      value: "Need software to manage or grow the business",
      route: "software",
    },
  ],
}

export const websiteCards: ProjectScopeCard[] = [
  {
    id: "trust-problem",
    key: "trust_problem",
    route: "website",
    question: "Do people still ask too many questions before they trust your business?",
    helperText: "A good website should explain your business before the WhatsApp chat starts.",
    visualType: "trust",
    accent: "purple",
    options: [
      {
        id: "left",
        label: "Yes, I explain my business too much.",
        value: "Explains business too much",
      },
      {
        id: "right",
        label: "No, they understand, but they don't buy fast.",
        value: "People understand but do not buy fast",
      },
    ],
  },
  {
    id: "website-goal",
    key: "website_goal",
    route: "website",
    question: "What should your page help you do first?",
    helperText: "Your website should not just look fine. It should help customers take action.",
    visualType: "ads",
    accent: "green",
    options: [
      {
        id: "left",
        label: "Make my business look trusted.",
        value: "Build trust and credibility",
      },
      {
        id: "right",
        label: "Help me get better leads from ads.",
        value: "Improve ad lead conversion",
      },
    ],
  },
  {
    id: "content-readiness",
    key: "content_readiness",
    route: "website",
    question: "Do you already have your business content ready?",
    helperText: "Logo, pictures, service details, pricing idea, and write-up help us move faster.",
    visualType: "content",
    accent: "blue",
    options: [
      {
        id: "left",
        label: "Yes, I have logo, pictures, and write-up.",
        value: "Content is ready",
      },
      {
        id: "right",
        label: "No, I need help packaging everything.",
        value: "Needs content packaging support",
      },
    ],
  },
  {
    id: "website-budget",
    key: "budget",
    route: "website",
    question: "What budget range are you working with?",
    helperText: "Websites start from ₦150k. Sales funnel pages start from ₦180k.",
    visualType: "budget",
    accent: "pink",
    options: [
      {
        id: "left",
        label: "Under ₦500k",
        value: "Under ₦500k",
      },
      {
        id: "right",
        label: "₦500k and above",
        value: "₦500k and above",
      },
    ],
  },
  {
    id: "website-timeline",
    key: "timeline",
    route: "website",
    question: "When do you want to start?",
    helperText: "Serious projects move faster when the scope is clear.",
    visualType: "timeline",
    accent: "dark",
    options: [
      {
        id: "left",
        label: "I want to start this month.",
        value: "Start this month",
      },
      {
        id: "right",
        label: "I am still planning.",
        value: "Still planning",
      },
    ],
  },
]

export const softwareCards: ProjectScopeCard[] = [
  {
    id: "software-users",
    key: "software_users",
    route: "software",
    question: "Who is the software mainly for?",
    helperText: "This helps us know if you need a customer-facing product or an internal business system.",
    visualType: "software",
    accent: "purple",
    options: [
      {
        id: "left",
        label: "My customers or end users.",
        value: "Customers or end users",
      },
      {
        id: "right",
        label: "My staff or internal team.",
        value: "Staff or internal team",
      },
    ],
  },
  {
    id: "software-problem",
    key: "software_problem",
    route: "software",
    question: "What is the main wahala right now?",
    helperText: "Software should remove stress, organize work, and help the business scale.",
    visualType: "team",
    accent: "green",
    options: [
      {
        id: "left",
        label: "Manual work, scattered records, and poor follow-up.",
        value: "Manual work, scattered records, and poor follow-up",
      },
      {
        id: "right",
        label: "I have a software/app idea I want to build.",
        value: "New software or app idea",
      },
    ],
  },
  {
    id: "preferred-platform",
    key: "preferred_platform",
    route: "software",
    question: "Where do you want it to work first?",
    helperText: "Start with the platform that solves the biggest problem first.",
    visualType: "mobile",
    accent: "blue",
    options: [
      {
        id: "left",
        label: "Web dashboard or portal.",
        value: "Web dashboard or portal",
      },
      {
        id: "right",
        label: "Mobile app.",
        value: "Mobile app",
      },
    ],
  },
  {
    id: "software-budget",
    key: "budget",
    route: "software",
    question: "What budget range are you working with?",
    helperText: "Custom internal systems start from ₦3.5m. Web/mobile app projects start from ₦10m.",
    visualType: "budget",
    accent: "pink",
    options: [
      {
        id: "left",
        label: "Under ₦15m",
        value: "Under ₦15m",
      },
      {
        id: "right",
        label: "₦15m and above",
        value: "₦15m and above",
      },
    ],
  },
  {
    id: "software-timeline",
    key: "timeline",
    route: "software",
    question: "When do you want to start?",
    helperText: "Good software starts with proper scoping before development.",
    visualType: "timeline",
    accent: "dark",
    options: [
      {
        id: "left",
        label: "I want to scope it now.",
        value: "Ready to scope now",
      },
      {
        id: "right",
        label: "I am still planning.",
        value: "Still planning",
      },
    ],
  },
]

export const totalProjectScopeCards = 6
