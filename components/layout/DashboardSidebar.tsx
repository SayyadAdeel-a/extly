'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Zap, 
  LayoutDashboard, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react'

interface DashboardSidebarProps {
  activePath: string
  unreadAlertCount: number
}

export function DashboardSidebar({ activePath, unreadAlertCount }: DashboardSidebarProps) {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', path: '/alerts', icon: Bell, count: unreadAlertCount },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const secondaryItems = [
    { name: 'Pricing', path: '/pricing', icon: Zap },
  ]

  const NavLink = ({ item }: { item: any }) => {
    const isActive = activePath === item.path
    const Icon = item.icon

    return (
      <Link
        href={item.path}
        className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all group ${
          isActive 
            ? 'bg-accent-blue text-white shadow-md shadow-blue-100' 
            : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive ? 'text-white' : 'text-text-muted group-hover:text-text-primary'} />
          <span>{item.name}</span>
        </div>
        
        {item.count !== undefined && item.count > 0 && (
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            isActive ? 'bg-white text-accent-blue' : 'bg-accent-red text-white'
          }`}>
            {item.count}
          </span>
        )}

        {!isActive && !item.count && (
          <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </Link>
    )
  }

  return (
    <aside className="w-64 bg-bg-surface border-r border-border-subtle h-screen sticky top-0 flex flex-col pt-6 pb-8">
      {/* Header */}
      <div className="px-6 mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-serif text-2xl text-accent-blue">
          <Zap size={24} fill="currentColor" />
          <span>Extly</span>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
        
        <div className="py-4 px-3">
          <div className="h-px bg-border-subtle w-full" />
        </div>

        {secondaryItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="px-3 pt-4">
        <button 
          onClick={() => {/* Handle Logout */}}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-accent-red transition-all group"
        >
          <LogOut size={18} className="text-text-muted group-hover:text-accent-red" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
