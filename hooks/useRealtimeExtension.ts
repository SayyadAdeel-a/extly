'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ExtensionSnapshot } from '@/types'

export function useRealtimeExtension(
  extensionId: string,
  initialSnapshot: ExtensionSnapshot | null = null
) {
  const [latestSnapshot, setLatestSnapshot] = useState(initialSnapshot)
  const supabase = createClient()

  useEffect(() => {
    if (!extensionId) return

    let isSubscribed = true
    const channelId = `extension-${extensionId}-${Date.now()}`

    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'extension_snapshots',
          filter: `extension_id=eq.${extensionId}`,
        },
        (payload: any) => {
          if (isSubscribed) {
            setLatestSnapshot(payload.new as ExtensionSnapshot)
          }
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to extension updates:', channelId)
        }
      })

    return () => {
      isSubscribed = false
      supabase.removeChannel(channel)
    }
  }, [extensionId, supabase])

  // Sync with initialSnapshot if it changes
  useEffect(() => {
    setLatestSnapshot(initialSnapshot)
  }, [initialSnapshot])

  return { latestSnapshot }
}
