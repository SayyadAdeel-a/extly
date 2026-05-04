'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { ExtensionCard, SkeletonCard } from '@/components/extension/ExtensionCard'
import type { Extension } from '@/types'

export function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Extension[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const router = useRouter()

  const suggestions = ['Grammarly', 'uBlock Origin', 'Dark Reader', 'Honey']

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/extension/search?q=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const data = await res.json()
        
        // Handle single result from fetch redirect (pasted URL)
        if (data.success && data.data) {
          router.push(`/extension/${data.data.chrome_id}`)
          return
        }

        // Handle list of results
        setResults(data.results || [])
      }
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    performSearch(suggestion)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          {loading ? <Loader2 size={20} className="animate-spin text-accent-blue" /> : <SearchIcon size={20} />}
        </div>
        <Input
          value={query}
          onChange={(val) => setQuery(val)}
          placeholder="Search by name, developer, or paste Chrome Web Store URL..."
          className="pl-12 h-14 text-lg shadow-sm border-border-subtle focus:border-accent-blue bg-white"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center items-center gap-3 text-sm">
        <span className="text-text-muted">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestionClick(s)}
            className="px-3 py-1 bg-white border border-border-subtle rounded-full hover:border-accent-blue hover:text-accent-blue transition-colors shadow-sm"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : searched && results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((ext) => (
              <ExtensionCard key={ext.id} extension={ext} />
            ))}
          </div>
        ) : searched ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-border-subtle">
            <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <SearchIcon size={32} className="text-text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No extensions found</h3>
            <p className="text-text-secondary max-w-sm mx-auto">
              We couldn't find any extensions matching "{query}". <br />
              Try pasting the full Chrome Web Store URL.
            </p>
          </div>
        ) : !query && (
          <div className="text-center py-20">
            <p className="text-text-secondary">Search for any Chrome extension above to see its performance metrics.</p>
          </div>
        )}
      </div>
    </div>
  )
}
