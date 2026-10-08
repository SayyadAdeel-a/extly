'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon, X, Loader2, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { ExtensionCard, SkeletonCard } from '@/components/extension/ExtensionCard'
import type { Extension } from '@/types'

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Extension[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    const trimmed = searchQuery.trim()
    if (!trimmed || trimmed.length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/extension/search?q=${encodeURIComponent(trimmed)}`)
      if (res.ok) {
        const data = await res.json()
        
        // Handle single result from direct ID / pasted URL
        if (data.success && data.data?.chrome_id) {
          router.push(`/extension/${data.data.chrome_id}`)
          return
        }

        // Handle list of live search results
        const mappedResults: Extension[] = (data.results || []).map((item: any) => ({
          id: item.id || item.chromeId,
          chrome_id: item.chromeId || item.id,
          name: item.name,
          developer: item.developer,
          icon_url: item.iconUrl || item.icon_url,
          rating: item.rating,
          user_count: item.userCount || item.user_count,
          chrome_url: item.chromeUrl || `https://chromewebstore.google.com/detail/${item.id}`,
          created_at: new Date().toISOString(),
          last_fetched_at: new Date().toISOString(),
          is_active: true,
          description: null,
          category: 'Extension'
        }))

        setResults(mappedResults)
      }
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }, [router])

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    const timer = setTimeout(() => {
      performSearch(query)
    }, 400)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          {loading ? <Loader2 size={20} className="animate-spin text-accent-blue" /> : <SearchIcon size={20} />}
        </div>
        <Input
          value={query}
          onChange={(val) => setQuery(val)}
          placeholder="Search any extension keyword, or paste Chrome Web Store link..."
          className="pl-12 pr-10 h-14 text-base md:text-lg shadow-sm border-border-subtle focus:border-accent-blue bg-white"
        />
        {query && (
          <button 
            type="button"
            onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
          >
            <X size={18} />
          </button>
        )}
      </form>

      <p className="mt-3 text-center text-xs text-text-muted">
        Tip: Paste any Chrome Web Store URL directly or search by any keyword.
      </p>

      <div className="mt-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : searched && results.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-text-muted px-1">
              <span>Found {results.length} extensions for &ldquo;{query}&rdquo;</span>
              <span>Live from Chrome Web Store</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((ext) => (
                <ExtensionCard key={ext.chrome_id} extension={ext} />
              ))}
            </div>
          </div>
        ) : searched ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-border-subtle">
            <div className="bg-white p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-xs border border-border-subtle">
              <SearchIcon size={24} className="text-text-muted" />
            </div>
            <h3 className="font-display text-lg font-bold mb-1 text-text-primary">No extensions found</h3>
            <p className="text-text-secondary text-sm max-w-sm mx-auto">
              No results found for &ldquo;{query}&rdquo;. <br />
              Try a different keyword or paste the full Chrome Web Store link.
            </p>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-border-subtle shadow-xs">
            <div className="bg-blue-50 text-accent-blue p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <Sparkles size={22} />
            </div>
            <h3 className="font-display text-base font-bold text-text-primary mb-1">
              Search Any Chrome Extension
            </h3>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              Type any keyword (e.g., &ldquo;adblock&rdquo;, &ldquo;react&rdquo;, &ldquo;translator&rdquo;, &ldquo;ai&rdquo;) or paste any Chrome extension link to view real-time metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
