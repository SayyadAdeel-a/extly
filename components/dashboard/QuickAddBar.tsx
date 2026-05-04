'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function QuickAddBar() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Simple extraction regex for Chrome Store URLs
      const chromeIdMatch = url.match(/([a-z]{32})/i)
      const chromeId = chromeIdMatch ? chromeIdMatch[1] : url.trim()

      const res = await fetch('/api/extension/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chromeId, action: 'track' })
      })

      const data = await res.json()

      if (res.ok) {
        setUrl('')
        router.refresh()
      } else {
        setError(data.error || 'Failed to track extension')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-accent-blue transition-colors">
          <Plus size={20} />
        </div>
        <Input 
          value={url}
          onChange={(val) => setUrl(val)}
          placeholder="Paste Chrome Web Store URL to track instantly..."
          className="pl-12 pr-32 h-14 bg-white border-border-subtle focus:border-accent-blue shadow-sm text-base"
          disabled={isLoading}
        />
        <div className="absolute inset-y-2 right-2">
          <Button 
            type="submit" 
            disabled={!url.trim() || isLoading}
            className="h-full px-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
              <span className="flex items-center gap-2">
                Track <ArrowRight size={16} />
              </span>
            )}
          </Button>
        </div>
      </form>
      {error && (
        <p className="text-sm text-accent-red mt-2 px-4 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}
