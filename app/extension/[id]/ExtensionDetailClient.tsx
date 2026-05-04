'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExtensionHeader } from '@/components/extension/ExtensionHeader'
import { MetricsRow } from '@/components/extension/MetricsRow'
import { UserGrowthChart } from '@/components/extension/UserGrowthChart'
import { RatingChart } from '@/components/extension/RatingChart'
import { VersionTable } from '@/components/extension/VersionTable'
import { ChangeLog } from '@/components/extension/ChangeLog'
import { TrackCTABanner } from '@/components/extension/TrackCTABanner'
import { useRealtimeExtension } from '@/hooks/useRealtimeExtension'
import type { Extension, ExtensionSnapshot, Alert } from '@/types'

interface ExtensionDetailClientProps {
  extension: Extension
  initialSnapshots: ExtensionSnapshot[]
  initialAlerts: Alert[]
  initialIsTracking: boolean
  isLoggedIn: boolean
}

export function ExtensionDetailClient({
  extension,
  initialSnapshots,
  initialAlerts,
  initialIsTracking,
  isLoggedIn
}: ExtensionDetailClientProps) {
  const [isTracking, setIsTracking] = useState(initialIsTracking)
  const [isUpdating, setIsUpdating] = useState(false)
  const [snapshots, setSnapshots] = useState<ExtensionSnapshot[]>(initialSnapshots)
  const router = useRouter()

  const { latestSnapshot } = useRealtimeExtension(extension.id)

  React.useEffect(() => {
    if (latestSnapshot) {
      setSnapshots(prev => {
        // Only add if not already present (based on snapshot_date)
        const exists = prev.some(s => s.snapshot_date === latestSnapshot.snapshot_date)
        if (exists) return prev
        return [latestSnapshot, ...prev]
      })
    }
  }, [latestSnapshot])

  const snapshotsCount = snapshots.length
  const firstSnapshotDate = snapshotsCount > 0 
    ? new Date([...snapshots].sort((a, b) => new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime())[0].snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  // Filter snapshots (simplified for now)
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

    // Growth vs 7d ago
    const usersToday = snaps[0]?.user_count || extension.user_count || 0
    const users7d = snaps.find(s => {
      const diff = Date.now() - new Date(s.snapshot_date).getTime()
      return diff >= 7 * 24 * 60 * 60 * 1000 && diff < 8 * 24 * 60 * 60 * 1000
    })?.user_count || snaps[snaps.length - 1].user_count || usersToday
    
    // Rating vs 30d ago
    const ratingToday = snaps[0]?.rating || extension.rating || 0
    const rating30d = snaps.find(s => {
      const diff = Date.now() - new Date(s.snapshot_date).getTime()
      return diff >= 30 * 24 * 60 * 60 * 1000 && diff < 31 * 24 * 60 * 60 * 1000
    })?.rating || snaps[snaps.length - 1].rating || ratingToday

    // Reviews vs 7d ago
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

  const handleTrackAction = async () => {
    if (!isLoggedIn) {
      router.push(`/login?returnUrl=/extension/${extension.chrome_id}`)
      return
    }

    setIsUpdating(true)
    try {
      const res = await fetch('/api/extension/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chromeId: extension.chrome_id,
          action: isTracking ? 'untrack' : 'track'
        })
      })

      if (res.ok) {
        setIsTracking(!isTracking)
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to update tracking status')
      }
    } catch (err) {
      console.error('Tracking update failed:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const periodLabel = snapshotsCount > 7 ? 'Last 30 Days' : 'Since tracking started'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Left Sidebar */}
      <aside>
        <ExtensionHeader 
          extension={extension} 
          isTracking={isTracking}
          isUpdating={isUpdating}
          onTrack={handleTrackAction}
          onUntrack={handleTrackAction}
        />
      </aside>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Period Toggle & Metrics */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">Analytics Overview</h2>
            <div className="px-3 py-1 bg-gray-50 border border-border-subtle rounded-lg text-[10px] font-bold text-text-muted uppercase tracking-wider">
              {periodLabel}
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

        {/* Final CTA */}
        <TrackCTABanner 
          isLoggedIn={isLoggedIn} 
          extensionName={extension.name}
          onTrack={handleTrackAction}
          loading={isUpdating}
        />
      </div>
    </div>
  )
}
