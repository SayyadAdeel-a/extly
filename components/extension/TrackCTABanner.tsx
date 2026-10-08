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
    <div className="bg-gradient-to-b from-white to-gray-50/80 border border-border-subtle rounded-2xl p-8 md:p-10 text-center mt-12 shadow-xs">
      <div className="bg-blue-50 text-accent-blue w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
        <Share2 size={22} />
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-2">
        Share or Pin {extensionName}
      </h3>
      <p className="text-text-secondary text-sm mb-6 max-w-lg mx-auto leading-relaxed">
        Extly is 100% free and open source. Pin this extension to your browser list for zero-friction tracking, or share this live intelligence report with your team.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <Button 
          onClick={onSave} 
          variant={isSaved ? "secondary" : "primary"} 
          size="lg" 
          className={`h-11 font-semibold ${isSaved ? "border-emerald-200 text-emerald-700 bg-emerald-50/40" : ""}`}
        >
          {isSaved ? <Check size={16} className="mr-2 text-emerald-600 stroke-[2.5]" /> : <Bookmark size={16} className="mr-2" />}
          {isSaved ? "Saved to My List" : "Save to My List"}
        </Button>
        <Button 
          onClick={handleCopy} 
          variant="secondary" 
          size="lg" 
          className="h-11 font-semibold bg-white"
        >
          {copied ? <Check size={16} className="mr-2 text-emerald-600 stroke-[2.5]" /> : <Copy size={16} className="mr-2" />}
          {copied ? "Link Copied!" : "Copy Report Link"}
        </Button>
      </div>
    </div>
  )
}
