import { createClient } from '@/lib/supabase/server'
import { getServiceSupabase } from '@/lib/supabase/service'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const serviceSupabase = getServiceSupabase()

  try {
    // 1. Delete user from auth (this should cascade to profiles and other tables via FK)
    const { error } = await serviceSupabase.auth.admin.deleteUser(user.id)

    if (error) {
      // If admin delete fails (e.g. no permissions), try deleting just the profile/data
      console.warn('Auth admin delete failed, attempting data-only delete:', error)
      
      const { error: profileError } = await serviceSupabase
        .from('profiles')
        .delete()
        .eq('id', user.id)
      
      if (profileError) throw profileError
    }

    // Sign out the user from the current session
    await supabase.auth.signOut()

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('API Error (user/delete DELETE):', error)
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
