'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { extractChromeId } from '@/lib/scraper/extractId'
import { Button } from '@/components/ui/Button'

export function DirectAnalyzeHero() {
  const [inputVal, setInputVal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmed = inputVal.trim()
    if (!trimmed) {
      setError('Please paste a Chrome Web Store link, extension ID, or keyword')
      return
    }

    setLoading(true)

    // 1. If it's a Chrome ID or full Chrome Web Store link, jump straight to the analytics page
    const chromeId = extractChromeId(trimmed)
    if (chromeId) {
      router.push(`/extension/${chromeId}`)
      return
    }

    // 2. If it's a keyword search (e.g. "adblock", "react", "translator"), jump to live search
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Input Box */}
      <form onSubmit={handleAnalyze} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl border-2 border-accent-blue/30 shadow-xl focus-within:border-accent-blue transition-all">
          <div className="flex-1 flex items-center px-3 gap-3">
            <Search className="text-accent-blue shrink-0" size={22} />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
                if (error) setError(null)
              }}
              placeholder="Paste any Chrome Web Store link, extension ID, or search keyword..."
              className="w-full bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-base md:text-lg"
              disabled={loading}
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            disabled={loading} 
            className="sm:w-auto w-full h-12 md:h-14 px-8 text-base font-semibold rounded-xl shrink-0"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Now
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-3 text-sm text-accent-red bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg animate-in fade-in">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Format Tips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
        <span>✓ Direct URL paste</span>
        <span>•</span>
        <span>✓ 32-character Extension ID</span>
        <span>•</span>
        <span>✓ Keyword & developer search</span>
      </div>
    </div>
  )
}
