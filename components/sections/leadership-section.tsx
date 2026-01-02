"use client"

import Image from "next/image"
import { sectionStyles, responsive } from "@/lib/style-utils"

interface LeadershipRole {
  name: string
  role: string
  description: string
  image?: {
    src: string
    alt: string
  }
}

interface LeadershipSectionProps {
  leadership?: LeadershipRole[]
  title?: string
  subtitle?: string
  className?: string
}

function LeadershipCard({ leader }: { leader: LeadershipRole }) {
  return (
    <div className="flex flex-col h-full group">
      <div className="relative w-full aspect-[1/1] mb-3 rounded-lg overflow-hidden bg-muted">
        {leader.image ? (
          <Image
            src={leader.image.src || "/placeholder.svg"}
            alt={leader.image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-1">{leader.name}</h3>
        <p className="text-xs font-semibold text-primary mb-2">{leader.role}</p>
        <p className="text-sm text-muted-foreground text-pretty leading-relaxed flex-grow">{leader.description}</p>
      </div>
    </div>
  )
}

export function LeadershipSection({
  leadership = [],
  title = "Organizational Structure",
  subtitle = "Our lean but effective leadership structure ensures strategic alignment while maintaining operational efficiency across all divisions.",
  className,
}: LeadershipSectionProps) {
  if (leadership.length === 0) return null

  return (
    <section className={sectionStyles({ padding: "lg", className })}>
      <div className={responsive.container}>
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4 px-4">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto px-4">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {leadership.map((leader, index) => (
            <LeadershipCard key={index} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  )
}
