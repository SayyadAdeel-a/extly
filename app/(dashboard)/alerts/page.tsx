'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Bell, CheckCircle2, Filter, Loader2, Inbox } from 'lucide-react'
import { AlertItem } from '@/components/dashboard/AlertItem'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { createClient } from '@/lib/supabase/client'
import { useRealtimeAlerts } from '@/hooks/useRealtimeAlerts'
import type { Alert, Extension } from '@/types'

type AlertFilter = 'all' | 'unread' | 'rating_change' | 'version_update' | 'user_milestone'

export default function AlertsPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<Alert[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [filter, setFilter] = useState<AlertFilter>('all')

  const { alerts, unreadCount, markAsRead, markAllAsRead } = useRealtimeAlerts(
    userId || '',
    initialData
  )

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const res = await fetch(`/api/alerts?type=all&unread=false`)
        if (res.ok) {
          const data = await res.json()
          setInitialData(data.alerts || [])
        }
      }
      setIsDataLoaded(true)
    }
    init()
  }, [])

  // Filter alerts locally based on the selected filter
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    if (filter === 'unread') return !alert.read
    return alert.alert_type === filter
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight flex items-center gap-3">
            Alerts
            {unreadCount > 0 && (
              <span className="bg-accent-red text-white text-xs px-2.5 py-1 rounded-full animate-pulse">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-text-secondary mt-1">
            Real-time intelligence on your tracked extensions
          </p>
        </div>
        
        <Button 
          variant="secondary" 
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="group"
        >
          <CheckCircle2 size={18} className="mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border-subtle">
        <Filter size={16} className="text-text-muted mr-2 shrink-0" />
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: 'Unread' },
          { id: 'rating_change', label: 'Rating' },
          { id: 'version_update', label: 'Version' },
          { id: 'user_milestone', label: 'Milestones' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as AlertFilter)}
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
              filter === item.id 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4 min-h-[400px]">
        {!isDataLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={32} className="text-accent-blue animate-spin" />
            <p className="text-text-secondary font-medium">Analyzing your data...</p>
          </div>
        ) : filteredAlerts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredAlerts.map((alert) => (
              <AlertItem 
                key={alert.id} 
                alert={alert} 
                onMarkAsRead={() => markAsRead(alert.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title={filter === 'unread' ? "All caught up!" : "No alerts found"}
            description={
              filter === 'all' 
                ? "Start tracking extensions to receive real-time intelligence alerts."
                : "Try changing your filter to see more alerts."
            }
            icon={Inbox}
            action={
              filter !== 'all' ? {
                label: "Show all alerts",
                onClick: () => setFilter('all')
              } : {
                label: "Browse Extensions",
                href: "/search"
              }
            }
          />
        )}
      </div>
    </div>
  )
}
