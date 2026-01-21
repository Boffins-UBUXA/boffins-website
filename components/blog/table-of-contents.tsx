'use client'

interface Heading {
  id: string
  level: number
  text: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null

  return (
    <nav className="bg-muted/50 rounded-lg p-6 border border-border sticky top-20">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        On this page
      </h3>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors line-clamp-2"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
