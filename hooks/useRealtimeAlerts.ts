'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Alert } from '@/types'

interface UseRealtimeAlertsReturn {
  alerts: Alert[]
  unreadCount: number
  markAsRead: (alertId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

export function useRealtimeAlerts(
  userId: string,
  initialAlerts: Alert[] = []
): UseRealtimeAlertsReturn {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    let isSubscribed = true
    
    // Subscribe to new alerts for this user
    // Use a unique suffix to avoid collisions during fast re-renders/Strict Mode
    const channelId = `alerts-${userId}-${Date.now()}`
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts',
          filter: `user_id=eq.${userId}`,
        },
        async (payload: any) => {
          if (!isSubscribed) return

          // Fetch the full alert with extension data joined
          const { data: newAlert } = await supabase
            .from('alerts')
            .select(`
              *,
              extension:extensions(id, name, icon_url, chrome_id)
            `)
            .eq('id', payload.new.id)
            .single()

          if (newAlert && isSubscribed) {
            // Add to top of alerts list
            // @ts-ignore - extension join mapping
            const alertWithExt = { ...newAlert, isNew: true } as Alert
            setAlerts(prev => {
              // Prevent duplicates
              if (prev.find(a => a.id === alertWithExt.id)) return prev
              return [alertWithExt, ...prev]
            })

            // Optional: Show browser notification if permitted
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`Extly: ${newAlert.extension?.name || 'Extension'} changed`, {
                body: newAlert.message,
                icon: newAlert.extension?.icon_url || '/favicon.ico',
              })
            }
          }
        }
      )
      .subscribe()

    return () => {
      isSubscribed = false
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])

  // Update internal state if initialAlerts changes (e.g. from server action or refresh)
  useEffect(() => {
    if (initialAlerts.length > 0) {
      setAlerts(initialAlerts)
    }
  }, [initialAlerts])

  const markAsRead = useCallback(async (alertId: string) => {
    // Optimistic update
    setAlerts(prev =>
      prev.map(a => a.id === alertId ? { ...a, read: true } : a)
    )

    const { error } = await supabase
      .from('alerts')
      .update({ read: true })
      .eq('id', alertId)
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to mark alert as read:', error)
      // Revert on error if needed
    }
  }, [userId, supabase])

  const markAllAsRead = useCallback(async () => {
    // Optimistic update
    setAlerts(prev => prev.map(a => ({ ...a, read: true })))

    const { error } = await supabase
      .from('alerts')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)

    if (error) {
      console.error('Failed to mark all as read:', error)
    }
  }, [userId, supabase])

  const unreadCount = alerts.filter(a => !a.read).length

  return { alerts, unreadCount, markAsRead, markAllAsRead }
}
