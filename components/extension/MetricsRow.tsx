import React from 'react'
import { MetricTile } from '@/components/ui/MetricTile'
import type { Extension } from '@/types'

interface MetricsRowProps {
  extension: Extension
  stats: {
    userGrowth: number
    ratingChange: number
    reviewGrowth: number
  }
  snapshotsCount: number
  firstSnapshotDate: string
}

export function MetricsRow({ extension, stats, snapshotsCount, firstSnapshotDate }: MetricsRowProps) {
  const formatNumber = (num: number) => new Intl.NumberFormat().format(num)
  const isNew = snapshotsCount <= 1

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricTile 
        label="Total Users"
        value={formatNumber(extension.user_count || 0)}
        trend={isNew ? {
          value: `Since ${firstSnapshotDate}`,
          direction: 'neutral',
          period: ''
        } : {
          value: `${stats.userGrowth > 0 ? '+' : ''}${formatNumber(stats.userGrowth)}`,
          direction: stats.userGrowth > 0 ? 'up' : stats.userGrowth < 0 ? 'down' : 'neutral',
          period: 'vs prev'
        }}
      />
      
      <MetricTile 
        label="Rating"
        value={extension.rating?.toFixed(2) || '0.00'}
        trend={isNew ? {
          value: `Since ${firstSnapshotDate}`,
          direction: 'neutral',
          period: ''
        } : {
          value: `${stats.ratingChange > 0 ? '+' : ''}${stats.ratingChange.toFixed(2)}`,
          direction: stats.ratingChange > 0 ? 'up' : stats.ratingChange < 0 ? 'down' : 'neutral',
          period: 'vs prev'
        }}
      />
      
      <MetricTile 
        label="Total Reviews"
        value={formatNumber(extension.review_count || 0)}
        trend={isNew ? {
          value: `Since ${firstSnapshotDate}`,
          direction: 'neutral',
          period: ''
        } : {
          value: `${stats.reviewGrowth > 0 ? '+' : ''}${formatNumber(stats.reviewGrowth)}`,
          direction: stats.reviewGrowth > 0 ? 'up' : stats.reviewGrowth < 0 ? 'down' : 'neutral',
          period: 'vs prev'
        }}
      />
      
      <MetricTile 
        label="Current Version"
        value={extension.version || '0.0.0'}
        trend={{
          value: 'Live',
          direction: 'neutral',
          period: ''
        }}
      />
    </div>
  )
}
