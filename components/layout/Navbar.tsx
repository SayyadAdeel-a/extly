'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Bell, Menu, X, Settings, LogOut, LayoutDashboard, Search, DollarSign } from 'lucide-react'
import { Button } from '../ui/Button'

interface NavbarProps {
  user?: { email: string } | null
  unreadAlertCount?: number
}

export function Navbar({ user, unreadAlertCount = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()

  const getInitials = (email: string) => email.charAt(0).toUpperCase()

  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/alerts') || pathname.startsWith('/settings')

  return (
    <nav className="bg-bg-surface border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link 
              href={user ? "/dashboard" : "/"} 
              className="flex items-center gap-2 font-serif text-2xl text-accent-blue hover:opacity-90 transition-opacity"
            >
              <Zap size={24} fill="currentColor" />
              <span>Extly</span>
            </Link>
          </div>

          {/* Center/Right: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link href="/search" className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors">Search</Link>
                <Link href="/pricing" className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors">Pricing</Link>
                <div className="flex items-center gap-3 ml-2">
                  <Button variant="secondary" size="sm" href="/login">Login</Button>
                  <Button size="sm" href="/login">Start Free</Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-accent-blue' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Dashboard
                </Link>
                
                <div className="flex items-center gap-4 ml-4">
                  <Link href="/alerts" className="relative text-text-secondary hover:text-text-primary transition-colors">
                    <Bell size={20} />
                    {unreadAlertCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent-red rounded-full border-2 border-bg-surface" />
                    )}
                  </Link>

                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="h-8 w-8 rounded-full bg-blue-100 text-accent-blue flex items-center justify-center font-bold text-xs border border-blue-200 hover:bg-blue-200 transition-colors"
                    >
                      {getInitials(user.email)}
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-bg-surface border border-border-subtle rounded-md shadow-lg py-1 z-50">
                        <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-gray-50">
                          <Settings size={16} className="text-text-secondary" />
                          Settings
                        </Link>
                        <button 
                          onClick={() => {/* Handle Logout */}}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-accent-red hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg-surface border-t border-border-subtle pb-4 pt-2">
          {!user ? (
            <div className="flex flex-col px-4 gap-4">
              <Link href="/search" className="py-2 text-text-secondary font-medium">Search</Link>
              <Link href="/pricing" className="py-2 text-text-secondary font-medium">Pricing</Link>
              <Button href="/login" variant="secondary" className="w-full">Login</Button>
              <Button href="/login" className="w-full">Start Free</Button>
            </div>
          ) : (
            <div className="flex flex-col px-4 gap-4">
              <div className="flex items-center gap-3 py-2 border-b border-border-subtle mb-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-accent-blue flex items-center justify-center font-bold">
                  {getInitials(user.email)}
                </div>
                <div className="text-sm truncate">
                  <p className="font-medium text-text-primary">{user.email}</p>
                </div>
              </div>
              <Link href="/dashboard" className="flex items-center gap-3 py-2 text-text-secondary font-medium">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link href="/alerts" className="flex items-center gap-3 py-2 text-text-secondary font-medium">
                <Bell size={20} />
                Alerts ({unreadAlertCount})
              </Link>
              <Link href="/settings" className="flex items-center gap-3 py-2 text-text-secondary font-medium">
                <Settings size={20} />
                Settings
              </Link>
              <button 
                onClick={() => {/* Handle Logout */}}
                className="flex items-center gap-3 py-2 text-accent-red font-medium"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
