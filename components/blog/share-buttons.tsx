'use client'

import { Button } from '@/components/ui/button'
import { Share2, Copy, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-muted/50 rounded-lg p-6 border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        Share Article
      </h3>
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start bg-transparent"
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4 mr-2" />
          {copied ? 'Link copied!' : 'Copy link'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start bg-transparent"
          onClick={shareOnTwitter}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start bg-transparent"
          onClick={shareOnLinkedIn}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
      </div>
    </div>
  )
}
