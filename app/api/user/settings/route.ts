import { createClient } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { notifications } = body

  if (!notifications) {
    return NextResponse.json({ error: 'Missing notifications data' }, { status: 400 })
  }

  const serviceSupabase = getServiceSupabase()

  try {
    // We update the profile with the new notification preferences
    // We'll store them in a JSONB column 'notification_settings' if it exists, 
    // or just update individual columns. For now, we'll try to update 
    // the profile record.
    
    const { error } = await serviceSupabase
      .from('profiles')
      .update({
        // We'll use a dynamic approach to handle whatever columns exist
        // but for Task 08 we'll assume these columns are there or being added
        notification_settings: notifications
      })
      .eq('id', user.id)

    if (error) {
      // Fallback if the JSONB column doesn't exist yet
      console.error('Failed to update notification_settings, trying individual columns:', error)
      
      const { error: fallbackError } = await serviceSupabase
        .from('profiles')
        .update({
          notify_rating_default: notifications.rating_changes,
          notify_version_default: notifications.version_updates,
          notify_milestones_default: notifications.milestones
        })
        .eq('id', user.id)
      
      if (fallbackError) throw fallbackError
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('API Error (user/settings PATCH):', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
