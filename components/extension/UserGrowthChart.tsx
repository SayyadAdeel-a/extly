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

interface UserGrowthChartProps {
  data: ExtensionSnapshot[]
  period: string
}

export function UserGrowthChart({ data, period }: UserGrowthChartProps) {
  // Sort data by date ascending
  const sortedData = [...data].sort((a, b) => 
    new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime()
  )

  const formatYAxis = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`
    return value.toString()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card className="p-6 h-[400px] border-border-subtle shadow-sm bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-primary">User Growth</h3>
          <p className="text-xs text-text-muted mt-0.5">Active users over time</p>
        </div>
        <span className="px-2.5 py-1 bg-blue-50 text-accent-blue text-[11px] font-semibold rounded-md border border-blue-100">
          {period}
        </span>
      </div>
      
      <div className="h-[290px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sortedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="userGrowthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.01} />
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
              tickFormatter={formatYAxis}
              fontSize={11}
              tick={{ fill: '#9CA3AF', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '3 3' }}
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
              formatter={(value: number) => [`${value.toLocaleString()} users`, 'Active Users']}
            />
            <Area 
              type="monotone" 
              dataKey="user_count" 
              stroke="#2563EB" 
              strokeWidth={2.5}
              fill="url(#userGrowthAreaGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#2563EB', stroke: '#FFFFFF', strokeWidth: 2 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
