import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { RealtimeProvider } from '@/components/dashboard/RealtimeProvider'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  // Get recent alerts for initial state
  const { data: recentAlerts } = await supabase
    .from('alerts')
    .select(`
      *,
      extension:extensions(id, name, icon_url, chrome_id)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <RealtimeProvider 
      userId={user.id} 
      initialAlerts={(recentAlerts || []) as any}
    >
      {children}
    </RealtimeProvider>
  )
}
