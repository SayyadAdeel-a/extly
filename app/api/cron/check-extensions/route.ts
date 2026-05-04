import { NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { fetchExtensionFromStore, delay } from '@/lib/scraper/fetchExtension'
import { detectChanges } from '@/lib/utils/changeDetection'
import { sendAlertEmail } from '@/lib/email/sendAlert'
import type { DetectedChange } from '@/types'

export async function GET(request: Request) {
  // 1. Authorization check
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceSupabase()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const stats = {
    extensionsChecked: 0,
    changesDetected: 0,
    alertsSent: 0,
    emailsSent: 0,
    errors: [] as string[]
  }

  try {
    // 2. Get extensions with at least one tracker
    // We join with user_tracking to filter only active extensions
    const { data: extensions, error: extError } = await supabase
      .from('extensions')
      .select('id, chrome_id, name')
      .in('id', (
        await supabase.from('user_tracking').select('extension_id')
      ).data?.map(t => t.extension_id) || [])

    if (extError) throw extError
    if (!extensions || extensions.length === 0) {
      return NextResponse.json({ message: 'No extensions to check', stats })
    }

    for (const extension of extensions) {
      try {
        stats.extensionsChecked++

        // 3. Fetch fresh data
        const scrapedData = await fetchExtensionFromStore(extension.chrome_id)

        // 4. Save today's snapshot
        await supabase.from('extension_snapshots').upsert({
          extension_id: extension.id,
          user_count: scrapedData.userCount,
          rating: scrapedData.rating,
          review_count: scrapedData.reviewCount,
          version: scrapedData.version,
          snapshot_date: today
        }, { onConflict: 'extension_id,snapshot_date' })

        // 5. Update extension last_fetched_at
        await supabase.from('extensions').update({
          last_fetched_at: new Date().toISOString()
        }).eq('id', extension.id)

        // 6. Get yesterday's snapshot for change detection
        const { data: yesterdaySnapshot } = await supabase
          .from('extension_snapshots')
          .select('*')
          .eq('extension_id', extension.id)
          .eq('snapshot_date', yesterday)
          .single()

        if (yesterdaySnapshot) {
          const changes = detectChanges(yesterdaySnapshot as any, scrapedData)
          
          if (changes.length > 0) {
            stats.changesDetected += changes.length

            // 7. Process alerts for each user tracking this extension
            const { data: trackers } = await supabase
              .from('user_tracking')
              .select('user_id, notify_rating, notify_version, notify_users')
              .eq('extension_id', extension.id)

            if (trackers) {
              for (const tracker of trackers) {
                // Get user email from profiles (or auth table if we had access, but profiles is safer)
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('email')
                  .eq('id', tracker.user_id)
                  .single()

                if (!profile?.email) continue

                for (const change of changes) {
                  // Respect user preferences
                  const isEnabled = 
                    (change.type === 'rating_change' && tracker.notify_rating) ||
                    (change.type === 'version_update' && tracker.notify_version) ||
                    (change.type === 'user_milestone' && tracker.notify_users)

                  if (!isEnabled) continue

                  // 8. Create alert record
                  await supabase.from('alerts').insert({
                    user_id: tracker.user_id,
                    extension_id: extension.id,
                    alert_type: change.type,
                    old_value: change.oldValue,
                    new_value: change.newValue,
                    message: change.message,
                    read: false
                  })
                  stats.alertsSent++

                  // 9. Send email (Rate limited: 1 per extension per user per day)
                  // Check if we already sent an email TODAY for this extension to this user
                  // (We check by looking for other alerts created today for this user+extension)
                  const todayStart = new Date().setHours(0,0,0,0)
                  const { count: alertsToday } = await supabase
                    .from('alerts')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', tracker.user_id)
                    .eq('extension_id', extension.id)
                    .gt('created_at', new Date(todayStart).toISOString())

                  // If this is the FIRST alert today for this user/extension, send the email
                  if (alertsToday === 1) {
                    try {
                      await sendAlertEmail({
                        toEmail: profile.email,
                        extensionName: extension.name,
                        extensionId: extension.id,
                        change
                      })
                      stats.emailsSent++
                    } catch (emailErr) {
                      console.error(`Failed to send email to ${profile.email}:`, emailErr)
                    }
                  }
                }
              }
            }
          }
        }

        // 10. Rate limiting delay
        await delay(500)

      } catch (err: any) {
        const errMsg = `Error checking ${extension.chrome_id}: ${err.message}`
        console.error(errMsg)
        stats.errors.push(errMsg)
      }
    }

    return NextResponse.json({ success: true, stats })

  } catch (error: any) {
    console.error('Cron job fatal error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
