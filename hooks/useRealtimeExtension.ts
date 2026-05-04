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

    const channel = supabase
      .channel(`extension-${extensionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'extension_snapshots',
          filter: `extension_id=eq.${extensionId}`,
        },
        (payload) => {
          setLatestSnapshot(payload.new as ExtensionSnapshot)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [extensionId, supabase])

  // Sync with initialSnapshot if it changes
  useEffect(() => {
    setLatestSnapshot(initialSnapshot)
  }, [initialSnapshot])

  return { latestSnapshot }
}
