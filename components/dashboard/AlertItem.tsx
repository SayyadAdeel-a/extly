'use client'

import React from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { TrendingUp, TrendingDown, RefreshCw, Trophy, ArrowRight, Circle } from 'lucide-react'
import type { Alert, Extension } from '@/types'

interface AlertItemProps {
  alert: Alert
  onMarkAsRead: (id: string) => void
}

export function AlertItem({ alert, onMarkAsRead }: AlertItemProps) {
  const [isNew, setIsNew] = React.useState((alert as any).isNew || false)
  const extension = alert.extension
  const isUnread = !alert.read

  React.useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsNew(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  const getTypeStyles = () => {
    switch (alert.alert_type) {
      case 'rating_change':
        return { 
          icon: <StarIcon direction={alert.message.includes('dropped') ? 'down' : 'up'} />, 
          badge: 'bg-red-100 text-red-700 border-red-200',
          label: 'Rating'
        }
      case 'version_update':
        return { 
          icon: <RefreshCw size={18} className="text-blue-500" />, 
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          label: 'Version'
        }
      case 'user_milestone':
        return { 
          icon: <Trophy size={18} className="text-green-500" />, 
          badge: 'bg-green-100 text-green-700 border-green-200',
          label: 'Milestone'
        }
      default:
        return { 
          icon: <Circle size={18} className="text-gray-400" />, 
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          label: 'Alert'
        }
    }
  }

  const { icon, badge, label } = getTypeStyles()

  return (
    <div 
      onClick={() => onMarkAsRead(alert.id)}
      className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
        isUnread 
          ? 'bg-red-50/30 border-l-4 border-l-accent-red border-border-subtle' 
          : 'bg-white border-border-subtle hover:border-gray-300'
      } ${isNew ? 'animate-pulse shadow-md ring-2 ring-accent-red/20' : ''}`}
    >
      {/* Icon */}
      <div className="h-12 w-12 rounded-lg border border-gray-100 p-1 bg-white flex items-center justify-center shrink-0 shadow-sm">
        {extension?.icon_url ? (
          <img src={extension.icon_url} alt="" className="h-full w-full object-contain rounded-md" />
        ) : (
          <div className="h-full w-full bg-blue-50 flex items-center justify-center rounded-md text-accent-blue font-bold">
            {extension?.name?.charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Link 
            href={`/extension/${extension?.chrome_id}`}
            className="font-bold text-text-primary hover:text-accent-blue transition-colors truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {extension?.name}
          </Link>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${badge}`}>
            {label}
          </span>
        </div>
        <p className="text-sm text-text-secondary leading-snug">
          {alert.message}
        </p>
        <p className="text-[10px] text-text-muted mt-1 font-medium">
          {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
        </p>
      </div>

      {/* Right Action */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="p-2 rounded-full bg-gray-50 text-text-muted group-hover:bg-accent-blue group-hover:text-white transition-all shadow-sm">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  )
}

function StarIcon({ direction }: { direction: 'up' | 'down' }) {
  return (
    <div className="relative">
      <Circle size={18} className="text-gray-200" />
      <div className={`absolute inset-0 flex items-center justify-center ${direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      </div>
    </div>
  )
}
