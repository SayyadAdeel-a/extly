'use client'

import React, { useState } from 'react'
import { Bell, Save, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'

interface NotificationPreferencesProps {
  initialPrefs: {
    rating_changes: boolean
    version_updates: boolean
    milestones: boolean
  }
}

export function NotificationPreferences({ initialPrefs }: NotificationPreferencesProps) {
  const [prefs, setPrefs] = useState(initialPrefs)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
    setIsSaved(false)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifications: prefs })
      })
      if (res.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
      }
    } catch (err) {
      console.error('Failed to save preferences:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const ToggleRow = ({ label, description, checked, onToggle }: any) => (
    <div className="flex items-center justify-between py-4 group">
      <div className="pr-8">
        <p className="font-medium text-text-primary group-hover:text-accent-blue transition-colors">{label}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-accent-blue' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-accent-blue" />
          <div>
            <h3 className="font-bold text-text-primary text-lg">Default Notifications</h3>
            <p className="text-xs text-text-muted">Applied to all extensions you start tracking</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-2">
        <ToggleRow 
          label="Rating changes" 
          description="Notify me when an extension's rating drops or increases significantly."
          checked={prefs.rating_changes}
          onToggle={() => toggle('rating_changes')}
        />
        <div className="h-px bg-gray-50" />
        <ToggleRow 
          label="New version releases" 
          description="Get an alert whenever a tracked extension pushes a new update."
          checked={prefs.version_updates}
          onToggle={() => toggle('version_updates')}
        />
        <div className="h-px bg-gray-50" />
        <ToggleRow 
          label="User count milestones" 
          description="Celebrate and track major growth milestones (e.g., reaching 1M users)."
          checked={prefs.milestones}
          onToggle={() => toggle('milestones')}
        />

        <div className="pt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isSaved ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} /> Saved
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={18} /> Save Changes
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
