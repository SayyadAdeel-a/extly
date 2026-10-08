'use client'

import React from 'react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Card } from '@/components/ui/Card'
import type { ExtensionSnapshot } from '@/types'

interface RatingChartProps {
  data: ExtensionSnapshot[]
  period: string
  currentRating: number
}

export function RatingChart({ data, period, currentRating }: RatingChartProps) {
  // Sort data by date ascending
  const sortedData = [...data].sort((a, b) => 
    new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime()
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Calculate suitable Y-axis bounds so small fluctuations are visible
  const ratings = sortedData.map(d => d.rating).filter((r): r is number => r !== null && r !== undefined)
  const minRating = ratings.length ? Math.min(...ratings) : 4.0
  const maxRating = ratings.length ? Math.max(...ratings) : 5.0
  const yMin = Math.max(0, Math.floor((minRating - 0.2) * 10) / 10)
  const yMax = Math.min(5, Math.ceil((maxRating + 0.1) * 10) / 10)

  return (
    <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-display text-base font-bold text-text-primary">Rating History</h3>
          <p className="text-xs text-text-muted mt-0.5">Average score (out of 5.0)</p>
        </div>
        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-md border border-emerald-200/60 font-mono">
          {period}
        </span>
      </div>
      
      <div className="h-[290px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sortedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ratingAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E8ECF0" strokeDasharray="3 3" />
            <XAxis 
              dataKey="snapshot_date" 
              tickFormatter={formatDate}
              fontSize={11}
              tick={{ fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              minTickGap={28}
            />
            <YAxis 
              domain={[yMin, yMax]}
              tickFormatter={(v) => Number(v).toFixed(1)}
              fontSize={11}
              tick={{ fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E8ECF0', 
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)',
                padding: '10px 14px'
              }}
              labelFormatter={formatDate}
              formatter={(value: number) => [`${Number(value).toFixed(2)} ★`, 'Rating']}
            />
            <Area 
              type="monotone" 
              dataKey="rating" 
              stroke="#10B981" 
              strokeWidth={2.5}
              fill="url(#ratingAreaGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#10B981', stroke: '#FFFFFF', strokeWidth: 2 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
