'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, LayoutDashboard, Bell, Settings, LogOut, Search, ExternalLink } from 'lucide-react'

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: number
  active?: boolean
}

function SidebarItem({ href, icon, label, badge, active }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
        active 
          ? 'bg-blue-50 text-accent-blue shadow-sm' 
          : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? 'text-accent-blue' : 'text-text-muted group-hover:text-text-primary'}`}>
          {icon}
        </span>
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="bg-accent-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </Link>
  )
}

interface DashboardSidebarProps {
  unreadAlertCount: number
}

export function DashboardSidebar({ unreadAlertCount }: DashboardSidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    // In a real app, we'd call supabase.auth.signOut()
    // For now we'll just redirect to login
    window.location.href = '/login'
  }

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-border-subtle flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 font-serif text-2xl text-accent-blue hover:opacity-90 transition-opacity"
        >
          <Zap size={24} fill="currentColor" />
          <span>Extly</span>
        </Link>
      </div>

      {/* Nav Section */}
      <nav className="flex-1 px-3 space-y-1">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2 mt-4">
          Intelligence
        </div>
        <SidebarItem 
          href="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Overview" 
          active={pathname === '/dashboard'} 
        />
        <SidebarItem 
          href="/alerts" 
          icon={<Bell size={20} />} 
          label="Alerts" 
          badge={unreadAlertCount}
          active={pathname === '/alerts'} 
        />
        <SidebarItem 
          href="/search" 
          icon={<Search size={20} />} 
          label="Discovery" 
          active={pathname === '/search'} 
        />

        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2 mt-8">
          System
        </div>
        <SidebarItem 
          href="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={pathname === '/settings'} 
        />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border-subtle space-y-1">
        <Link 
          href="https://chromewebstore.google.com" 
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-text-primary text-sm transition-colors"
        >
          <ExternalLink size={16} />
          <span>Chrome Store</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-text-muted hover:text-accent-red text-sm transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
