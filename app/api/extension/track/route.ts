import { createClient } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { extractChromeId } from '@/lib/scraper/extractId'
import { fetchExtensionFromStore } from '@/lib/scraper/fetchExtension'
import { backfillExtensionHistory } from '@/lib/scraper/backfillHistory'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { chromeId, extensionId, action } = body

  if (action === 'track') {
    if (!chromeId) return NextResponse.json({ error: 'Missing chromeId' }, { status: 400 })
    
    const validId = extractChromeId(chromeId)
    if (!validId) return NextResponse.json({ error: 'Invalid chromeId' }, { status: 400 })

    const serviceSupabase = getServiceSupabase()

    // 1. Check plan limits
    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const { count } = await serviceSupabase
      .from('user_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const limit = profile?.plan === 'free' ? 3 : 50 // Assume 50 for paid
    if ((count || 0) >= limit) {
      return NextResponse.json({ error: `Free plan limit reached (${limit} extensions)` }, { status: 403 })
    }

    // 2. Ensure extension exists in DB
    let { data: extension } = await serviceSupabase
      .from('extensions')
      .select('id')
      .eq('chrome_id', validId)
      .single()

    if (!extension) {
      try {
        const scraped = await fetchExtensionFromStore(validId)
        const { data: newExt, error: upsertError } = await serviceSupabase
          .from('extensions')
          .upsert({
            chrome_id: validId,
            name: scraped.name,
            developer: scraped.developer,
            icon_url: scraped.iconUrl,
            chrome_url: scraped.chromeUrl,
            last_fetched_at: new Date().toISOString()
          })
          .select()
          .single()
        
        if (upsertError) throw upsertError
        extension = newExt
        
        // Initial snapshot
        await serviceSupabase.from('extension_snapshots').upsert({
          extension_id: newExt.id,
          user_count: scraped.userCount,
          rating: scraped.rating,
          review_count: scraped.reviewCount,
          version: scraped.version,
          snapshot_date: new Date().toISOString().split('T')[0]
        })
      } catch (e: any) {
        return NextResponse.json({ error: 'Failed to find or scrape extension' }, { status: 500 })
      }
    }

    // 3. Check if already tracking
    const { data: existing } = await serviceSupabase
      .from('user_tracking')
      .select('id')
      .eq('user_id', user.id)
      .eq('extension_id', extension!.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Already tracking this extension' }, { status: 409 })
    }

    // 4. Start tracking
    const { data: tracking, error: trackError } = await serviceSupabase
      .from('user_tracking')
      .insert({
        user_id: user.id,
        extension_id: extension!.id,
        notify_rating: true,
        notify_version: true,
        notify_users: true
      })
      .select()
      .single()

    if (trackError) {
      return NextResponse.json({ error: 'Failed to start tracking' }, { status: 500 })
    }

    // Trigger backfill in background if needed
    const { count: snapshotCount } = await serviceSupabase
      .from('extension_snapshots')
      .select('*', { count: 'exact', head: true })
      .eq('extension_id', extension!.id)

    if ((snapshotCount ?? 0) < 7) {
      // Run backfill in background — don't await so user doesn't wait
      void backfillExtensionHistory(validId, extension!.id, serviceSupabase)
        .catch(err => console.error('[track] Backfill error:', err))
    }

    return NextResponse.json({ success: true, action: 'tracked', extensionId: extension!.id })
  }

  if (action === 'untrack') {
    if (!extensionId) return NextResponse.json({ error: 'Missing extensionId' }, { status: 400 })

    const serviceSupabase = getServiceSupabase()
    const { error } = await serviceSupabase
      .from('user_tracking')
      .delete()
      .eq('user_id', user.id)
      .eq('extension_id', extensionId)

    if (error) {
      return NextResponse.json({ error: 'Failed to untrack' }, { status: 500 })
    }

    return NextResponse.json({ success: true, action: 'untracked' })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
