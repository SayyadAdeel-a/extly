'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MoreVertical, Users, Star, ArrowUpRight, ArrowDownRight, Trash2, Bell, ExternalLink, Loader2 } from 'lucide-react'
import type { Extension, ExtensionSnapshot } from '@/types'
import { useRouter } from 'next/navigation'

interface TrackedExtensionCardProps {
  extension: Extension
  latestSnapshot: ExtensionSnapshot | null
  hasUnreadAlerts: boolean
}

export function TrackedExtensionCard({ 
  extension, 
  latestSnapshot, 
  hasUnreadAlerts 
}: TrackedExtensionCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isUntracking, setIsUntracking] = useState(false)
  const router = useRouter()

  const handleUntrack = async () => {
    if (!confirm(`Are you sure you want to stop tracking ${extension.name}?`)) return
    
    setIsUntracking(true)
    try {
      const res = await fetch('/api/extension/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extensionId: extension.id, action: 'untrack' })
      })
      if (res.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error('Failed to untrack:', err)
    } finally {
      setIsUntracking(false)
      setShowMenu(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-5 hover:shadow-md transition-all group relative">
      {/* Unread Alert Indicator */}
      {hasUnreadAlerts && (
        <div className="absolute top-3 left-3 h-3 w-3 bg-accent-red rounded-full border-2 border-white z-10 animate-pulse" />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-lg border border-gray-100 p-1 bg-gray-50 flex items-center justify-center shrink-0">
            {extension.icon_url ? (
              <img src={extension.icon_url} alt="" className="h-full w-full object-contain rounded-md" />
            ) : (
              <div className="h-full w-full bg-blue-100 flex items-center justify-center rounded-md">
                <span className="text-accent-blue font-bold text-lg">{extension.name?.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-text-primary truncate pr-2 group-hover:text-accent-blue transition-colors">
              <Link href={`/extension/${extension.chrome_id}`}>{extension.name}</Link>
            </h3>
            <p className="text-xs text-text-muted truncate mt-0.5">by {extension.developer || 'Unknown Developer'}</p>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-md text-text-muted hover:bg-gray-100 hover:text-text-primary transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border-subtle rounded-lg shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <Link 
                  href={`/extension/${extension.chrome_id}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink size={16} className="text-text-muted" />
                  View Analytics
                </Link>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                  <Bell size={16} className="text-text-muted" />
                  Notifications
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button 
                  onClick={handleUntrack}
                  disabled={isUntracking}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent-red hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {isUntracking ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  Stop Tracking
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-text-muted mb-1">
            <Users size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Users</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatNumber(latestSnapshot?.user_count || 0)}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-text-muted mb-1">
            <Star size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Rating</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{latestSnapshot?.rating?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-[10px] font-medium text-text-muted uppercase">
          Monitoring Active
        </span>
        <Link 
          href={`/extension/${extension.chrome_id}`}
          className="text-xs font-bold text-accent-blue hover:underline flex items-center gap-1"
        >
          Details <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  )
}
