import React from 'react'
import Link from 'next/link'
import { Plus, Search, Telescope } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { QuickAddBar } from '@/components/dashboard/QuickAddBar'
import { TrackedExtensionCard } from '@/components/dashboard/TrackedExtensionCard'
import { PlanLimitBanner } from '@/components/dashboard/PlanLimitBanner'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // 1. Get user profile for name/plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 2. Get tracked extensions with snapshots
  const { data: trackedData } = await supabase
    .from('user_tracking')
    .select(`
      id,
      extension_id,
      extensions (
        *,
        extension_snapshots (
          *
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // 3. Get total alerts for today
  const today = new Date().toISOString().split('T')[0]
  const { count: alertCount } = await supabase
    .from('alerts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', today)

  // Process data
  const extensions = trackedData?.map(item => {
    const ext: any = item.extensions
    // Get latest snapshot for this extension
    const snapshots = ext.extension_snapshots || []
    const latestSnapshot = snapshots.sort((a: any, b: any) => 
      new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime()
    )[0] || null

    return {
      ...ext,
      latestSnapshot
    }
  }) || []

  const trackedCount = extensions.length
  const limit = profile?.plan === 'pro' ? 25 : 3
  const isAtLimit = trackedCount >= limit && profile?.plan === 'free'

  // Determine greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const displayName = profile?.name || user.email?.split('@')[0] || 'there'

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            {greeting}, {displayName} 👋
          </h1>
          <p className="text-text-secondary mt-2">
            You're tracking <span className="font-bold text-text-primary">{trackedCount} extensions</span> · <span className="font-bold text-text-primary">{alertCount || 0} new alerts</span> today
          </p>
        </div>
        <Button href="/search" className="shrink-0 group">
          <Plus size={18} className="mr-2" />
          Track New Extension
        </Button>
      </div>

      {/* Quick Add Section */}
      <section className="bg-white p-2 rounded-2xl border border-border-subtle shadow-sm">
        <QuickAddBar />
      </section>

      {/* Plan Limit Banner */}
      {isAtLimit && (
        <PlanLimitBanner count={trackedCount} limit={limit} />
      )}

      {/* Grid Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Tracked Extensions</h2>
          <Link href="/dashboard" className="text-sm font-bold text-accent-blue hover:underline">
            Refresh Data
          </Link>
        </div>

        {extensions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extensions.map((ext) => (
              <TrackedExtensionCard 
                key={ext.id}
                extension={ext}
                latestSnapshot={ext.latestSnapshot}
                hasUnreadAlerts={false} // We can calculate this if needed
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No extensions tracked yet"
            description="Start monitoring your first extension by pasting a URL above or searching our directory."
            icon={Telescope}
            action={{
              label: "Search Directory",
              href: "/search"
            }}
          />
        )}
      </section>
    </div>
  )
}
