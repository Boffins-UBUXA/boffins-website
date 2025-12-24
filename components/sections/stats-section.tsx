"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"

interface StatItem {
  icon: React.ReactElement<LucideIcon>
  value: string
  label: string
}

interface StatsSectionProps {
  stats?: StatItem[]
  title?: string
  className?: string
}

function StatCard({ stat }: { stat: StatItem }) {
  const [labelExpanded, setLabelExpanded] = useState(false)
  const [canExpandLabel, setCanExpandLabel] = useState(false)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const labelEl = labelRef.current

    if (labelEl) {
      setCanExpandLabel(labelEl.scrollHeight > labelEl.clientHeight)
    }
  }, [])

  return (
    <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
      <CardContent className="space-y-4">
        <div className="flex justify-center text-primary">{stat.icon}</div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          
          {/* LABEL — WITH ELLIPSIS & SCROLL */}
          <div className="relative">
            <div
              ref={labelRef}
              className={`
                text-sm 
                text-muted-foreground
                transition-all
                ${labelExpanded 
                  ? "max-h-[80px] overflow-y-auto" 
                  : "line-clamp-2"
                }
              `}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--primary)) transparent'
              }}
            >
              {stat.label}
            </div>

            {canExpandLabel && (
              <button
                type="button"
                onClick={() => setLabelExpanded(!labelExpanded)}
                className="
                  mt-1
                  text-xs
                  text-primary
                  hover:underline
                  font-medium
                "
              >
                {labelExpanded ? "Less" : "More..."}
              </button>
            )}
          </div>
        </div>
      </CardContent>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        :global(.overflow-y-auto::-webkit-scrollbar) {
          width: 4px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-track) {
          background: transparent;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
          background: hsl(var(--primary));
          border-radius: 2px;
        }

        :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </Card>
  )
}

export function StatsSection({ stats = [], title, className }: StatsSectionProps) {
  if (stats.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "md",
        background: "muted",
        className,
      })}
    >
      <div className={responsive.container}>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">{title}</h2>
          </div>
        )}
        <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-8`}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}