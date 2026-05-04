import React from 'react'
import Link from 'next/link'
import { Star, Users, History, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Extension } from '@/types'

interface ExtensionCardProps {
  extension: Extension
}

export function ExtensionCard({ extension }: ExtensionCardProps) {
  const formattedUsers = new Intl.NumberFormat().format(extension.user_count || 0)
  
  return (
    <Card className="hover:border-accent-blue transition-all group p-5">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="h-16 w-16 bg-gray-50 border border-border-subtle rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
          {extension.icon_url ? (
            <img src={extension.icon_url} alt={extension.name} className="h-12 w-12 object-contain" />
          ) : (
            <div className="text-accent-blue font-serif text-2xl font-bold">
              {extension.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-lg truncate group-hover:text-accent-blue transition-colors">
                {extension.name}
              </h3>
              <p className="text-sm text-text-secondary truncate">
                by {extension.developer}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star size={14} className="text-accent-amber fill-current" />
              <span>{extension.rating?.toFixed(1) || '0.0'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <Users size={14} />
              <span>{formattedUsers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <Badge variant="gray" className="font-mono text-[10px]">v{extension.version || '0.0.0'}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border-subtle flex justify-between items-center">
        <Link 
          href={`/extension/${extension.chrome_id}`}
          className="text-sm font-semibold text-accent-blue hover:underline flex items-center gap-1"
        >
          View Details <ArrowRight size={14} />
        </Link>
        
        <Button size="sm" variant="secondary" href="/login">
          Track
        </Button>
      </div>
    </Card>
  )
}

export function SkeletonCard() {
  return (
    <Card className="p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="h-16 w-16 bg-gray-100 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="flex gap-4 pt-2">
            <div className="h-4 bg-gray-100 rounded w-12" />
            <div className="h-4 bg-gray-100 rounded w-16" />
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border-subtle flex justify-between items-center">
        <div className="h-4 bg-gray-100 rounded w-24" />
        <div className="h-8 bg-gray-100 rounded w-20" />
      </div>
    </Card>
  )
}
