'use client'

import React, { useState, useEffect } from 'react'
import { ExtensionHeader } from '@/components/extension/ExtensionHeader'
import { MetricsRow } from '@/components/extension/MetricsRow'
import { UserGrowthChart } from '@/components/extension/UserGrowthChart'
import { RatingChart } from '@/components/extension/RatingChart'
import { VersionTable } from '@/components/extension/VersionTable'
import { ChangeLog } from '@/components/extension/ChangeLog'
import { TrackCTABanner } from '@/components/extension/TrackCTABanner'
import type { Extension, ExtensionSnapshot, Alert } from '@/types'

const STORAGE_KEY = 'extly_saved_extensions'

interface ExtensionDetailClientProps {
  extension: Extension
  initialSnapshots: ExtensionSnapshot[]
  initialAlerts: Alert[]
}

export function ExtensionDetailClient({
  extension,
  initialSnapshots,
  initialAlerts,
}: ExtensionDetailClientProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [snapshots] = useState<ExtensionSnapshot[]>(initialSnapshots)

  // Sync saved status with localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const savedList: string[] = JSON.parse(raw)
        setIsSaved(savedList.includes(extension.chrome_id))
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, [extension.chrome_id])

  const handleToggleSave = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      let savedList: string[] = raw ? JSON.parse(raw) : []
      if (isSaved) {
        savedList = savedList.filter(id => id !== extension.chrome_id)
        setIsSaved(false)
      } else {
        savedList.push(extension.chrome_id)
        setIsSaved(true)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedList))
    } catch (e) {
      console.error('Failed to update saved extensions:', e)
    }
  }

  const snapshotsCount = snapshots.length
  const firstSnapshotDate = snapshotsCount > 0 
    ? new Date([...snapshots].sort((a, b) => new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime())[0].snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  const filteredSnapshots = [...snapshots].sort((a, b) => 
    new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime()
  )

  // Calculate trends
  const calculateStats = () => {
    const snaps = [...snapshots].sort((a, b) => 
      new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime()
    )
    
    if (snaps.length < 2) {
      return { userGrowth: 0, ratingChange: 0, reviewGrowth: 0 }
    }

    const usersToday = snaps[0]?.user_count || extension.user_count || 0
    const users7d = snaps.find(s => {
      const diff = Date.now() - new Date(s.snapshot_date).getTime()
      return diff >= 7 * 24 * 60 * 60 * 1000 && diff < 8 * 24 * 60 * 60 * 1000
    })?.user_count || snaps[snaps.length - 1].user_count || usersToday
    
    const ratingToday = snaps[0]?.rating || extension.rating || 0
    const rating30d = snaps.find(s => {
      const diff = Date.now() - new Date(s.snapshot_date).getTime()
      return diff >= 30 * 24 * 60 * 60 * 1000 && diff < 31 * 24 * 60 * 60 * 1000
    })?.rating || snaps[snaps.length - 1].rating || ratingToday

    const reviewsToday = snaps[0]?.review_count || extension.review_count || 0
    const reviews7d = snaps.find(s => {
      const diff = Date.now() - new Date(s.snapshot_date).getTime()
      return diff >= 7 * 24 * 60 * 60 * 1000 && diff < 8 * 24 * 60 * 60 * 1000
    })?.review_count || snaps[snaps.length - 1].review_count || reviewsToday

    return {
      userGrowth: usersToday - users7d,
      ratingChange: ratingToday - rating30d,
      reviewGrowth: reviewsToday - reviews7d
    }
  }

  const stats = calculateStats()
  const periodLabel = snapshotsCount > 7 ? 'Last 90 Days' : 'Real-time Analytics'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Left Sidebar */}
      <aside>
        <ExtensionHeader 
          extension={extension} 
          isTracking={isSaved}
          isUpdating={false}
          onTrack={handleToggleSave}
          onUntrack={handleToggleSave}
        />
      </aside>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Period Toggle & Metrics */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                Analytics Overview
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Real-time store metrics parsed on-demand
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-700 font-mono self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Store Sync</span>
            </div>
          </div>
          
          <MetricsRow 
            extension={extension} 
            stats={stats} 
            snapshotsCount={snapshotsCount}
            firstSnapshotDate={firstSnapshotDate}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserGrowthChart data={filteredSnapshots} period={periodLabel} />
          <RatingChart data={filteredSnapshots} period={periodLabel} currentRating={extension.rating || 0} />
        </div>

        {/* History Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VersionTable snapshots={snapshots} />
          <ChangeLog alerts={initialAlerts} />
        </div>

        {/* Share & Bookmark Banner */}
        <TrackCTABanner 
          extensionName={extension.name}
          isSaved={isSaved}
          onSave={handleToggleSave}
        />
      </div>
    </div>
  )
}
