import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { AccountInfoCard } from '@/components/settings/AccountInfoCard'
import { NotificationPreferences } from '@/components/settings/NotificationPreferences'
import { DangerZone } from '@/components/settings/DangerZone'
import { LayoutDashboard, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get tracking count
  const { count: trackedCount } = await supabase
    .from('user_tracking')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const limit = profile?.plan === 'pro' ? 25 : 3

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-2">
          Manage your account, notifications, and subscription preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-3xl">
        {/* Section 1: Account Info */}
        <AccountInfoCard 
          email={user.email!} 
          plan={profile?.plan || 'free'} 
          createdAt={profile?.created_at || user.created_at} 
        />

        {/* Section 2: Notifications */}
        <NotificationPreferences 
          initialPrefs={{
            rating_changes: true, // Default to true if not in DB yet
            version_updates: true,
            milestones: true
          }} 
        />

        {/* Section 3: Tracking Summary */}
        <div className="bg-white border border-border-subtle rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center text-text-muted">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">Tracked Extensions</p>
              <p className="text-xs text-text-secondary">Currently tracking {trackedCount || 0}/{limit} extensions</p>
            </div>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm font-bold text-accent-blue hover:underline flex items-center gap-1 group"
          >
            Manage <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Section 4: Danger Zone */}
        <DangerZone />
      </div>
    </div>
  )
}
