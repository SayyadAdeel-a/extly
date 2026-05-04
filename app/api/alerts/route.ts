import { createClient } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
  const offset = parseInt(searchParams.get('offset') || '0')
  const type = searchParams.get('type') || 'all'
  const unreadOnly = searchParams.get('unread') === 'true'

  const serviceSupabase = getServiceSupabase()

  try {
    let query = serviceSupabase
      .from('alerts')
      .select(`
        *,
        extension:extensions (
          name,
          icon_url,
          chrome_id
        )
      `, { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (type !== 'all') {
      query = query.eq('alert_type', type)
    }

    if (unreadOnly) {
      query = query.eq('read', false)
    }

    const { data: alerts, error, count } = await query

    if (error) throw error

    // Fetch unread count separately
    const { count: unreadCount } = await serviceSupabase
      .from('alerts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false)

    return NextResponse.json({
      alerts: alerts || [],
      total: count || 0,
      unreadCount: unreadCount || 0
    })

  } catch (error: any) {
    console.error('API Error (alerts GET):', error)
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { alertIds, markAllRead } = body

  const serviceSupabase = getServiceSupabase()

  try {
    let query = serviceSupabase
      .from('alerts')
      .update({ read: true })
      .eq('user_id', user.id)

    if (markAllRead) {
      // No extra filter needed, update all for this user
    } else if (Array.isArray(alertIds) && alertIds.length > 0) {
      query = query.in('id', alertIds)
    } else {
      return NextResponse.json({ error: 'Missing alertIds or markAllRead' }, { status: 400 })
    }

    const { data, error, count } = await query.select()

    if (error) throw error

    return NextResponse.json({ success: true, updated: count || 0 })

  } catch (error: any) {
    console.error('API Error (alerts PATCH):', error)
    return NextResponse.json({ error: 'Failed to update alerts' }, { status: 500 })
  }
}
