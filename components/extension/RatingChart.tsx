'use client'

import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
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

  const getGradientId = (rating: number | null) => {
    if (!rating) return 'ratingGreen'
    if (rating >= 4.0) return 'ratingGreen'
    if (rating >= 3.5) return 'ratingAmber'
    return 'ratingRed'
  }

  return (
    <Card className="p-6 h-[400px] border-border-subtle shadow-sm bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary">Rating History</h3>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
          {period}
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={sortedData.length === 1 ? 60 : undefined}>
            <defs>
              <linearGradient id="ratingGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                <stop offset="100%" stopColor="#6EE7B7" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="ratingAmber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                <stop offset="100%" stopColor="#FDE68A" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="ratingRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#FCA5A5" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E8ECF0" strokeDasharray="0" />
            <XAxis 
              dataKey="snapshot_date" 
              tickFormatter={formatDate}
              fontSize={11}
              tick={{ fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />
            <YAxis 
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              fontSize={11}
              tick={{ fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: '#F9FAFB' }}
              contentStyle={{ 
                backgroundColor: '#FFF', 
                border: '1px solid #E8ECF0', 
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              labelFormatter={formatDate}
              formatter={(value: number) => [value.toFixed(2), 'Rating']}
            />
            <ReferenceLine y={4.0} stroke="#9CA3AF" strokeDasharray="3 3" />
            <Bar 
              dataKey="rating" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#${getGradientId(entry.rating)})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
