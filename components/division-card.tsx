"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface DivisionCardProps {
  title: string
  description: string
  features: string[]
  href: string
  icon: React.ReactNode
}

export function DivisionCard({
  title,
  description,
  features,
  href,
  icon,
}: DivisionCardProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const [featExpanded, setFeatExpanded] = useState(false)
  const [canExpandDesc, setCanExpandDesc] = useState(false)
  const [canExpandFeat, setCanExpandFeat] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLUListElement>(null)

  /**
   * Detect if content overflows
   */
  useEffect(() => {
    const descEl = descriptionRef.current
    const featEl = featuresRef.current

    if (descEl) {
      setCanExpandDesc(descEl.scrollHeight > descEl.clientHeight)
    }

    if (featEl) {
      setCanExpandFeat(featEl.scrollHeight > featEl.clientHeight)
    }
  }, [])

  return (
    <Card
      className="
        group
        flex
        flex-col
        h-[420px]
        hover:shadow-lg
        transition-all
        duration-300
        border-border
        hover:border-primary/20
      "
    >
      {/* ================= HEADER ================= */}
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {icon}
          </div>

          <CardTitle className="text-xl leading-tight">
            {title}
          </CardTitle>
        </div>

        {/* DESCRIPTION — WITH ELLIPSIS & SCROLL */}
        <div className="relative">
          <CardDescription
            ref={descriptionRef}
            className={`
              text-sm
              leading-relaxed
              transition-all
              ${descExpanded 
                ? "max-h-[120px] overflow-y-auto pr-2" 
                : "line-clamp-3"
              }
            `}
            style={{
              /* Custom scrollbar styling */
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--primary)) transparent'
            }}
          >
            {description}
          </CardDescription>

          {canExpandDesc && (
            <button
              type="button"
              onClick={() => setDescExpanded(!descExpanded)}
              className="
                mt-1
                text-xs
                text-primary
                hover:underline
                font-medium
              "
            >
              {descExpanded ? "Show less" : "Show more..."}
            </button>
          )}
        </div>
      </CardHeader>

      {/* ================= CONTENT ================= */}
      <CardContent className="flex flex-col flex-1">
        {/* FEATURES — WITH ELLIPSIS & SCROLL */}
        <div className="relative flex-1 mb-4">
          <ul
            ref={featuresRef}
            className={`
              space-y-2 
              text-sm 
              text-muted-foreground
              transition-all
              ${featExpanded 
                ? "max-h-[140px] overflow-y-auto pr-2" 
                : "h-[120px] overflow-hidden"
              }
            `}
            style={{
              /* Custom scrollbar styling */
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--primary)) transparent'
            }}
          >
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Gradient overlay when collapsed */}
          {!featExpanded && canExpandFeat && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          )}

          {canExpandFeat && (
            <button
              type="button"
              onClick={() => setFeatExpanded(!featExpanded)}
              className="
                mt-1
                text-xs
                text-primary
                hover:underline
                font-medium
              "
            >
              {featExpanded ? "Show less" : "Show more..."}
            </button>
          )}
        </div>

        {/* CTA — ALWAYS AT BOTTOM */}
        <Button
          asChild
          className="
            mt-auto
            w-full
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
        >
          <Link
            href={href}
            className="flex items-center justify-center space-x-2"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        :global(.overflow-y-auto::-webkit-scrollbar) {
          width: 6px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-track) {
          background: transparent;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
          background: hsl(var(--primary));
          border-radius: 3px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </Card>
  )
}