import React from 'react'
import { Card } from './Card'

export function SkeletonLine({ className = 'h-4 w-full' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
}

export function SkeletonCard({ padding = 'md' }: { padding?: 'sm' | 'md' | 'lg' }) {
  return (
    <Card padding={padding}>
      <div className="space-y-4">
        <SkeletonLine className="h-6 w-1/3" />
        <div className="space-y-2">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-5/6" />
          <SkeletonLine className="h-4 w-4/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <SkeletonLine className="h-8 w-20" />
          <SkeletonLine className="h-8 w-20" />
        </div>
      </div>
    </Card>
  )
}
