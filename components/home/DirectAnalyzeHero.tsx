'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { extractChromeId } from '@/lib/scraper/extractId'
import { Button } from '@/components/ui/Button'

const POPULAR_EXAMPLES = [
  { name: 'uBlock Origin', id: 'cjpalhdlnbpafiamejdnhcphjbkeiagm' },
  { name: 'Grammarly', id: 'kbfnbcaeplbcioakkpcpgfkobkghlhen' },
  { name: 'Dark Reader', id: 'eimadpbcbfnmbkopoojfekhnkhdbieeh' },
  { name: 'React DevTools', id: 'fmkadmapgofadopljbjfkapdkoienihi' },
  { name: 'Loom', id: 'liecbddmkiiihnedobmlmillhodjkdmb' },
  { name: 'Bitwarden', id: 'nngceckbapebfimnlniiiahkandclblb' },
]

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
      setError('Please paste a Chrome Web Store link or extension ID')
      return
    }

    const chromeId = extractChromeId(trimmed)
    if (!chromeId) {
      setError('Invalid link or ID. Please paste a valid Chrome Web Store URL or 32-character ID.')
      return
    }

    setLoading(true)
    router.push(`/extension/${chromeId}`)
  }

  const handleQuickPick = (id: string) => {
    setLoading(true)
    router.push(`/extension/${id}`)
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
              placeholder="Paste Chrome Web Store URL or Extension ID..."
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
                Analyze Extension
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

      {/* Quick Picks */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-text-muted flex items-center gap-1.5 font-medium mr-1">
          <Sparkles size={14} className="text-accent-blue" />
          Or try popular:
        </span>
        {POPULAR_EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => handleQuickPick(ex.id)}
            disabled={loading}
            className="px-3.5 py-1.5 bg-white border border-border-subtle rounded-full text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:bg-blue-50/50 transition-all shadow-sm text-xs md:text-sm font-medium"
          >
            {ex.name}
          </button>
        ))}
      </div>
    </div>
  )
}
