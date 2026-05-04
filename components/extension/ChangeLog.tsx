import React from 'react'
import { Card } from '@/components/ui/Card'
import { Bell } from 'lucide-react'
import type { Alert } from '@/types'

interface ChangeLogProps {
  alerts: Alert[]
}

export function ChangeLog({ alerts }: ChangeLogProps) {
  const sortedAlerts = [...alerts].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const getDotColor = (type: string) => {
    switch (type) {
      case 'rating_change': return 'bg-accent-red'
      case 'version_update': return 'bg-accent-blue'
      case 'user_milestone': return 'bg-accent-green'
      default: return 'bg-text-muted'
    }
  }

  const showEmptyState = sortedAlerts.length === 0

  return (
    <Card className="p-6 border-border-subtle shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-8 text-text-primary">Change Log</h3>
      
      {showEmptyState ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            Monitoring for changes
          </p>
          <p className="text-xs text-text-muted max-w-[200px]">
            Changes will appear here as we detect them daily
          </p>
        </div>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-1.5 before:h-full before:w-0.5 before:bg-border-subtle">
          {sortedAlerts.map((alert) => (
            <div key={alert.id} className="relative flex items-start gap-6 pl-8">
              <div className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-white ring-1 ring-border-subtle ${getDotColor(alert.alert_type)}`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-4 mb-1">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    {new Date(alert.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="flex gap-2">
                    {alert.alert_type === 'rating_change' && (
                      <span className="text-[9px] font-bold text-accent-red bg-red-50 px-2 py-0.5 rounded-full uppercase border border-red-100">Rating</span>
                    )}
                    {alert.alert_type === 'version_update' && (
                      <span className="text-[9px] font-bold text-accent-blue bg-blue-50 px-2 py-0.5 rounded-full uppercase border border-blue-100">Update</span>
                    )}
                    {alert.alert_type === 'user_milestone' && (
                      <span className="text-[9px] font-bold text-accent-green bg-green-50 px-2 py-0.5 rounded-full uppercase border border-green-100">Milestone</span>
                    )}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-text-primary leading-tight">
                  {alert.message}
                </h4>
                {(alert.old_value || alert.new_value) && (
                  <div className="mt-3 text-[10px] font-mono text-text-secondary bg-gray-50/80 p-2 rounded-lg border border-border-subtle flex items-center gap-2">
                    <span className="opacity-60">{alert.old_value || '-'}</span> 
                    <span className="text-text-muted">→</span> 
                    <span className="font-bold text-text-primary">{alert.new_value || '-'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
