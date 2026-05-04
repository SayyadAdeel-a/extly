import React from 'react'
import { Card } from './Card'

interface MetricTileProps {
  label: string
  value: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
    period: string
  }
  loading?: boolean
}

export function MetricTile({
  label,
  value,
  trend,
  loading = false,
}: MetricTileProps) {
  return (
    <Card padding="sm">
      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1 font-medium">
        {label}
      </p>
      
      {loading ? (
        <div className="space-y-2 mt-1">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-mono text-text-primary font-semibold leading-tight">
            {value}
          </p>
          
          {trend && (
            <p className={`text-sm mt-1 flex items-center gap-1 font-medium ${
              trend.direction === 'up' ? 'text-accent-green' :
              trend.direction === 'down' ? 'text-accent-red' :
              'text-text-muted'
            }`}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '—'}
              {trend.value}
              <span className="text-text-muted font-normal ml-0.5">{trend.period}</span>
            </p>
          )}
        </>
      )}
    </Card>
  )
}
