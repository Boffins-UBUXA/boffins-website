"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MousePointerClick,
  RotateCcw,
  Sparkles,
} from "lucide-react"

import { trackEvent } from "@/lib/analytics"
import {
  sharedStartCard,
  softwareCards,
  totalProjectScopeCards,
  websiteCards,
  type AnswerOption,
  type ProjectRoute,
  type ProjectScopeAnswers,
  type ProjectScopeCard,
} from "./project-scope-flow"
import { buildWhatsAppUrl, getTrafficSource } from "./project-scope-utils"

const SWIPE_THRESHOLD = 80

const cardTheme = {
  orange: "from-[#0f766e] via-[#0ea5e9] to-[#ea580c]",
  purple: "from-[#0f766e] via-[#0284c7] to-[#ea580c]",
  green: "from-[#0d9488] via-[#0ea5e9] to-[#f97316]",
  blue: "from-[#0369a1] via-[#0f766e] to-[#ea580c]",
  pink: "from-[#0f766e] via-[#0891b2] to-[#f97316]",
  dark: "from-[#061923] via-[#0f766e] to-[#7c2d12]",
} satisfies Record<ProjectScopeCard["accent"], string>

const visualImages = {
  trust: {
    src: "/professional-business-manager.jpg",
    alt: "Business owner reviewing project direction",
  },
  ads: {
    src: "/professional-woman-content-creator.jpg",
    alt: "Business owner planning online leads",
  },
  content: {
    src: "/social-media-content-creation-photography-studio.jpg",
    alt: "Business team preparing brand content",
  },
  budget: {
    src: "/cfo-finance-officer-professional.jpg",
    alt: "Finance professional reviewing project budget",
  },
  timeline: {
    src: "/professional-man-tech-ceo.jpg",
    alt: "Founder planning the next business step",
  },
  software: {
    src: "/professional-woman-developer.jpg",
    alt: "Software professional building a business system",
  },
  team: {
    src: "/hr-manager-human-resources-professional.jpg",
    alt: "Internal team planning a better workflow",
  },
  mobile: {
    src: "/professional-man-designer.jpg",
    alt: "Product designer planning a digital platform",
  },
} satisfies Record<ProjectScopeCard["visualType"], { src: string; alt: string }>

export function ProjectScopeClient() {
  const searchParams = useSearchParams()
  const source = useMemo(() => getTrafficSource(searchParams), [searchParams])
  const [route, setRoute] = useState<ProjectRoute>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<ProjectScopeAnswers>({})
  const [showSummary, setShowSummary] = useState(false)
  const startedTrackedRef = useRef(false)
  const summaryTrackedRef = useRef(false)

  const activeCards = useMemo(
    () => [sharedStartCard, ...(route === "software" ? softwareCards : websiteCards)],
    [route],
  )
  const currentCard = activeCards[currentIndex]
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(route, answers, source), [answers, route, source])

  useEffect(() => {
    if (startedTrackedRef.current) return
    startedTrackedRef.current = true
    trackEvent("project_scope_started", { source })
  }, [source])

  useEffect(() => {
    if (!showSummary || summaryTrackedRef.current) return
    summaryTrackedRef.current = true
    trackEvent("project_scope_summary_viewed", {
      route,
      source,
      budget: answers.budget,
      timeline: answers.timeline,
    })
  }, [answers.budget, answers.timeline, route, showSummary, source])

  function handleAnswer(card: ProjectScopeCard, option: AnswerOption, method: "tap" | "swipe") {
    const nextRoute = option.route ?? route
    const nextAnswers = { ...answers, [card.key]: option.value }
    const nextIndex = currentIndex + 1

    setAnswers(nextAnswers)

    if (option.route) {
      setRoute(option.route)
      trackEvent("project_scope_route_selected", {
        route: option.route,
        source,
      })
    }

    trackEvent("project_scope_card_answered", {
      route: nextRoute,
      card_id: card.id,
      answer_key: card.key,
      selected_answer: option.value,
      source,
      method,
      budget: nextAnswers.budget,
      timeline: nextAnswers.timeline,
    })

    if (nextIndex >= totalProjectScopeCards) {
      setShowSummary(true)
      return
    }

    setCurrentIndex(nextIndex)
  }

  function handleBack() {
    if (showSummary) {
      setShowSummary(false)
      setCurrentIndex(totalProjectScopeCards - 1)
      summaryTrackedRef.current = false
      return
    }

    setCurrentIndex((index) => Math.max(index - 1, 0))
  }

  function handleEditAnswers() {
    setShowSummary(false)
    setCurrentIndex(0)
    summaryTrackedRef.current = false
  }

  function handleRestart() {
    setAnswers({})
    setCurrentIndex(0)
    setRoute(null)
    setShowSummary(false)
    summaryTrackedRef.current = false
  }

  function handleWhatsappClick() {
    trackEvent("project_scope_whatsapp_clicked", {
      route,
      source,
      budget: answers.budget,
      timeline: answers.timeline,
    })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#061923] text-white">
      <div className="min-h-screen bg-[linear-gradient(135deg,#061923_0%,#0f766e_38%,#0ea5e9_68%,#ea580c_100%)]">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/65">Boffins Technology</p>
              <h1 className="mt-1 text-2xl font-black leading-tight sm:text-4xl">Project Scope</h1>
            </div>
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold shadow-sm backdrop-blur">
              {showSummary ? "Done" : `${currentIndex + 1} of ${totalProjectScopeCards}`}
            </div>
          </header>

          <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="hidden max-w-md lg:block">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                6 quick cards
              </div>
              <h2 className="mt-5 text-5xl font-black leading-[0.98]">
                Scope your next move before the WhatsApp chat.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-white/75">
                Pick what fits. Swipe or tap. Boffins gets a clean message with your project direction.
              </p>
            </section>

            <section aria-live="polite" className="mx-auto w-full max-w-xl">
              {showSummary ? (
                <SummaryScreen
                  answers={answers}
                  onEditAnswers={handleEditAnswers}
                  onRestart={handleRestart}
                  onWhatsappClick={handleWhatsappClick}
                  route={route}
                  source={source}
                  whatsappUrl={whatsappUrl}
                />
              ) : (
                <div className="space-y-4">
                  <ProgressDots currentIndex={currentIndex} />
                  <SwipeCard
                    card={currentCard}
                    currentIndex={currentIndex}
                    onAnswer={(option, method) => handleAnswer(currentCard, option, method)}
                  />
                  <div className="flex items-center justify-between gap-3 text-sm text-white/75">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={currentIndex === 0}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 font-semibold transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <span className="inline-flex items-center gap-2 text-right">
                      <MousePointerClick className="h-4 w-4" />
                      Swipe or tap to continue
                    </span>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function SwipeCard({
  card,
  currentIndex,
  onAnswer,
}: {
  card: ProjectScopeCard
  currentIndex: number
  onAnswer: (option: AnswerOption, method: "tap" | "swipe") => void
}) {
  const [dragX, setDragX] = useState(0)
  const startXRef = useRef<number | null>(null)
  const activePointerRef = useRef<number | null>(null)
  const image = visualImages[card.visualType]
  const leftOption = card.options.find((option) => option.id === "left") ?? card.options[0]
  const rightOption = card.options.find((option) => option.id === "right") ?? card.options[1]

  function resetDrag() {
    startXRef.current = null
    activePointerRef.current = null
    setDragX(0)
  }

  return (
    <div className="relative min-h-[560px] sm:min-h-[590px]">
      <div className="absolute inset-x-4 top-6 h-[510px] rotate-3 rounded-[2rem] bg-white/25 shadow-2xl sm:h-[540px]" />
      <div className="absolute inset-x-2 top-3 h-[530px] -rotate-2 rounded-[2rem] bg-white/30 shadow-2xl sm:h-[560px]" />

      <article
        key={card.id}
        className={`relative min-h-[550px] touch-pan-y overflow-hidden rounded-[2rem] bg-gradient-to-br ${cardTheme[card.accent]} p-4 shadow-2xl sm:min-h-[580px] sm:p-5`}
        onPointerDown={(event) => {
          startXRef.current = event.clientX
          activePointerRef.current = event.pointerId
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (activePointerRef.current !== event.pointerId || startXRef.current === null) return
          setDragX(event.clientX - startXRef.current)
        }}
        onPointerCancel={resetDrag}
        onPointerUp={(event) => {
          if (activePointerRef.current !== event.pointerId) return

          if (dragX <= -SWIPE_THRESHOLD) {
            onAnswer(leftOption, "swipe")
          } else if (dragX >= SWIPE_THRESHOLD) {
            onAnswer(rightOption, "swipe")
          }

          resetDrag()
        }}
        style={{
          transform: `translateX(${dragX}px) rotate(${dragX / 24}deg)`,
          transition: dragX === 0 ? "transform 180ms ease" : "none",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.18)_100%)]" />
        <div className="relative z-10 flex min-h-[520px] flex-col sm:min-h-[540px]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/85">
              Card {currentIndex + 1}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
              Pick one
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-black/15 shadow-inner">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={currentIndex === 0}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            </div>
          </div>

          <div className="mt-4 flex-1">
            <h2 className="text-2xl font-black leading-[1.04] text-white sm:text-3xl">{card.question}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/85 sm:text-base">{card.helperText}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AnswerButton direction="left" option={leftOption} onClick={() => onAnswer(leftOption, "tap")} />
            <AnswerButton direction="right" option={rightOption} onClick={() => onAnswer(rightOption, "tap")} />
          </div>
        </div>
      </article>
    </div>
  )
}

function AnswerButton({
  direction,
  option,
  onClick,
}: {
  direction: "left" | "right"
  option: AnswerOption
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-black leading-snug text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
      aria-label={option.label}
    >
      {direction === "left" ? <ArrowLeft className="h-5 w-5 shrink-0 text-slate-500" /> : null}
      <span className="min-w-0 flex-1">{option.label}</span>
      {direction === "right" ? <ArrowRight className="h-5 w-5 shrink-0 text-slate-500" /> : null}
    </button>
  )
}

function ProgressDots({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="grid grid-cols-6 gap-2" aria-label={`Progress ${currentIndex + 1} of ${totalProjectScopeCards}`}>
      {Array.from({ length: totalProjectScopeCards }).map((_, index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition ${
            index <= currentIndex ? "bg-white shadow-sm" : "bg-white/25"
          }`}
        />
      ))}
    </div>
  )
}

function SummaryScreen({
  answers,
  onEditAnswers,
  onRestart,
  onWhatsappClick,
  route,
  source,
  whatsappUrl,
}: {
  answers: ProjectScopeAnswers
  onEditAnswers: () => void
  onRestart: () => void
  onWhatsappClick: () => void
  route: ProjectRoute
  source: string
  whatsappUrl: string
}) {
  const rows = getSummaryRows(route, answers)
  const projectType = route === "software" ? "Software / Business System" : "Website / Landing Page"

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl">
      <div className="bg-gradient-to-br from-[#0f766e] via-[#0ea5e9] to-[#ea580c] p-5 text-white sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
              <CheckCircle2 className="h-4 w-4" />
              Ready
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Your project direction is ready.</h2>
            <p className="mt-3 max-w-md text-base font-semibold leading-7 text-white/85">
              We have prepared your answers so Boffins can understand your request faster.
            </p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Restart project scope"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Project type</p>
          <p className="mt-1 text-xl font-black">{projectType}</p>
        </div>

        <div className="grid gap-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{row.label}</p>
              <p className="mt-1 text-base font-bold leading-6">{row.value}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Source</p>
            <p className="mt-1 text-base font-bold leading-6">{source}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsappClick}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-center text-base font-black text-white shadow-lg transition hover:bg-[#1fb457] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with Boffins on WhatsApp
          </a>
          <button
            type="button"
            onClick={onEditAnswers}
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-base font-black transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
          >
            Edit my answers
          </button>
        </div>
      </div>
    </div>
  )
}

function getSummaryRows(route: ProjectRoute, answers: ProjectScopeAnswers) {
  const safeAnswer = (key: string) => answers[key] || "Not selected"

  if (route === "software") {
    return [
      { label: "Main goal", value: safeAnswer("main_goal") },
      { label: "Software for", value: safeAnswer("software_users") },
      { label: "Main problem", value: safeAnswer("software_problem") },
      { label: "Preferred platform", value: safeAnswer("preferred_platform") },
      { label: "Budget", value: safeAnswer("budget") },
      { label: "Timeline", value: safeAnswer("timeline") },
    ]
  }

  return [
    { label: "Main goal", value: safeAnswer("main_goal") },
    { label: "Current issue", value: safeAnswer("trust_problem") },
    { label: "Page goal", value: safeAnswer("website_goal") },
    { label: "Content readiness", value: safeAnswer("content_readiness") },
    { label: "Budget", value: safeAnswer("budget") },
    { label: "Timeline", value: safeAnswer("timeline") },
  ]
}
