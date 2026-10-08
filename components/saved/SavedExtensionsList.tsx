'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bookmark, Trash2, ArrowRight, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'

const STORAGE_KEY = 'extly_saved_extensions'

interface SavedItem {
  id: string
  name: string
  iconUrl?: string
  developer?: string
  users?: number
  rating?: number
}

export function SavedExtensionsList() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [items, setItems] = useState<SavedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const ids: string[] = JSON.parse(raw)
        setSavedIds(ids)
        // Fetch preview info for saved IDs
        fetchPreviewData(ids)
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }, [])

  const fetchPreviewData = async (ids: string[]) => {
    if (ids.length === 0) {
      setLoading(false)
      return
    }

    try {
      const fetched: SavedItem[] = await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await fetch(`/api/extension/fetch?id=${id}`)
            if (res.ok) {
              const json = await res.json()
              return {
                id,
                name: json.data?.name || id,
                iconUrl: json.data?.icon_url,
                developer: json.data?.developer,
                users: json.data?.user_count,
                rating: json.data?.rating,
              }
            }
          } catch {
            // fallback
          }
          return { id, name: id }
        })
      )
      setItems(fetched)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (id: string) => {
    const nextIds = savedIds.filter((item) => item !== id)
    setSavedIds(nextIds)
    setItems((prev) => prev.filter((item) => item.id !== id))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds))
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
        <Loader2 className="animate-spin text-accent-blue mb-4" size={32} />
        <p>Loading your saved extensions...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved extensions yet"
        description="Search or paste any Chrome extension link on the homepage and click 'Save to My List' to pin it here."
        action={{
          label: "Find Extensions",
          href: "/"
        }}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gray-50 border border-border-subtle flex items-center justify-center overflow-hidden shrink-0">
                {item.iconUrl ? (
                  <img src={item.iconUrl} alt={item.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="font-serif text-xl font-bold text-accent-blue">{item.name.charAt(0)}</span>
                )}
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-text-muted hover:text-accent-red p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                title="Remove from saved"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-accent-blue transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs text-text-secondary mb-4 line-clamp-1">
              by {item.developer || 'Unknown Developer'}
            </p>

            <div className="flex items-center gap-2 mb-6">
              {item.rating && <Badge variant="blue">{item.rating} ★</Badge>}
              {item.users && (
                <span className="text-xs font-mono text-text-muted">
                  {item.users.toLocaleString()} users
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-between items-center">
            <Link
              href={`/extension/${item.id}`}
              className="text-sm font-semibold text-accent-blue flex items-center gap-1 hover:underline"
            >
              View Analytics <ArrowRight size={14} />
            </Link>
            <a
              href={`https://chromewebstore.google.com/detail/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary text-xs flex items-center gap-1"
            >
              Store <ExternalLink size={12} />
            </a>
          </div>
        </Card>
      ))}
    </div>
  )
}
