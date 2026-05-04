'use client'

import React, { useEffect } from 'react'
import { useRealtimeAlerts } from '@/hooks/useRealtimeAlerts'
import { DashboardSidebar } from './DashboardSidebar'
import type { Alert } from '@/types'

interface RealtimeProviderProps {
  userId: string
  initialAlerts: Alert[]
  children: React.ReactNode
}

export function RealtimeProvider({ 
  userId, 
  initialAlerts, 
  children 
}: RealtimeProviderProps) {
  const { unreadCount } = useRealtimeAlerts(userId, initialAlerts)

  // Browser Notification Permission Request
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('Notification' in window && Notification.permission === 'default') {
      // Don't ask immediately — wait 30 seconds so user is settled in
      const timer = setTimeout(() => {
        Notification.requestPermission()
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-bg-main">
      <DashboardSidebar unreadAlertCount={unreadCount} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
