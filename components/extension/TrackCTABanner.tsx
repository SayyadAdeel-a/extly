'use client'

import React, { useState } from 'react'
import { Share2, Bookmark, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface TrackCTABannerProps {
  extensionName: string
  isSaved?: boolean
  onSave?: () => void
}

export function TrackCTABanner({ extensionName, isSaved, onSave }: TrackCTABannerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center mt-12">
      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
        <Share2 className="text-accent-blue" size={24} />
      </div>
      <h3 className="text-2xl font-bold mb-3">Share or Save {extensionName}</h3>
      <p className="text-text-secondary mb-8 max-w-lg mx-auto">
        Extly is 100% free and open for everyone. Bookmark this extension to check updates anytime, or share this live analytics report with your team.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <Button onClick={onSave} variant={isSaved ? "secondary" : "primary"} size="lg" className="h-12">
          {isSaved ? <Check size={18} className="mr-2 text-accent-green" /> : <Bookmark size={18} className="mr-2" />}
          {isSaved ? "Saved in Browser" : "Save to My List"}
        </Button>
        <Button onClick={handleCopy} variant="secondary" size="lg" className="h-12 bg-white">
          {copied ? <Check size={18} className="mr-2 text-accent-green" /> : <Copy size={18} className="mr-2" />}
          {copied ? "Link Copied!" : "Copy Report Link"}
        </Button>
      </div>
    </div>
  )
}
