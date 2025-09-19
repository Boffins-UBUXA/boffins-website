import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sectionStyles, responsive } from "@/lib/style-utils"
import type { LucideIcon } from "lucide-react"

interface ContactInfo {
  icon: React.ReactElement<LucideIcon>
  title: string
  details: string[]
  color: string
}

interface ContactInfoSectionProps {
  contactInfo?: ContactInfo[]
  className?: string
}

export function ContactInfoSection({ contactInfo = [], className }: ContactInfoSectionProps) {
  if (contactInfo.length === 0) return null

  return (
    <section
      className={sectionStyles({
        padding: "lg",
        className,
      })}
    >
      <div className={responsive.container}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader className="space-y-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center text-white mx-auto`}
                >
                  {info.icon}
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
