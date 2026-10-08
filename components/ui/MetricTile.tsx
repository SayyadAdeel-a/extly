import React from 'react'
import { Card } from './Card'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

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
    <div className="bg-white rounded-xl border border-border-subtle p-5 shadow-xs hover:border-gray-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </span>
      </div>
      
      {loading ? (
        <div className="space-y-2 mt-1">
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-md" />
          <div className="h-4 w-32 bg-gray-50 animate-pulse rounded-md" />
        </div>
      ) : (
        <div>
          <div className="text-2xl sm:text-3xl font-mono text-text-primary font-bold tracking-tight leading-none mb-3">
            {value}
          </div>
          
          {trend && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                trend.direction === 'up' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                  : trend.direction === 'down' 
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/60' 
                  : 'bg-gray-50 text-text-muted border border-border-subtle'
              }`}>
                {trend.direction === 'up' ? (
                  <ArrowUpRight size={13} className="stroke-[2.5]" />
                ) : trend.direction === 'down' ? (
                  <ArrowDownRight size={13} className="stroke-[2.5]" />
                ) : (
                  <Minus size={13} />
                )}
                <span>{trend.value}</span>
              </span>
              {trend.period && (
                <span className="text-[11px] text-text-muted font-medium">
                  {trend.period}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
