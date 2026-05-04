import React from 'react'
import { ExternalLink, Check, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Extension } from '@/types'

interface ExtensionHeaderProps {
  extension: Extension
  isTracking?: boolean
  isUpdating?: boolean
  onTrack?: () => void
  onUntrack?: () => void
}

export function ExtensionHeader({ 
  extension, 
  isTracking = false, 
  isUpdating = false,
  onTrack, 
  onUntrack 
}: ExtensionHeaderProps) {
  const lastUpdatedDate = extension.last_fetched_at 
    ? new Date(extension.last_fetched_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Never'
    
  const isActive = extension.last_fetched_at 
    ? (Date.now() - new Date(extension.last_fetched_at).getTime()) < 30 * 24 * 60 * 60 * 1000 
    : false

  return (
    <div className="space-y-8">
      {/* Brand Card */}
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 bg-white border border-border-subtle rounded-2xl shadow-sm flex items-center justify-center p-2 mb-4 overflow-hidden">
            {extension.icon_url ? (
              <img src={extension.icon_url} alt={extension.name} className="h-full w-full object-contain" />
            ) : (
              <div className="text-accent-blue font-serif text-4xl font-bold">{extension.name.charAt(0)}</div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-text-primary leading-tight mb-1">{extension.name}</h1>
          <p className="text-text-secondary mb-4">by {extension.developer}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="blue">Chrome Extension</Badge>
            {isActive && <Badge variant="green">Active</Badge>}
          </div>
          
          <div className="w-full h-px bg-border-subtle my-6" />
          
          <div className="w-full space-y-4 text-sm mb-6">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Version</span>
              <span className="font-mono font-medium">{extension.version || '0.0.0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Last Updated</span>
              <span>{lastUpdatedDate}</span>
            </div>
          </div>
          
          <a 
            href={`https://chromewebstore.google.com/detail/${extension.chrome_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent-blue hover:underline flex items-center gap-1.5 mb-8"
          >
            View on Chrome Web Store <ExternalLink size={14} />
          </a>
          
          <div className="w-full pt-2">
            {isTracking ? (
              <div className="flex flex-col gap-2">
                <Button variant="secondary" className="w-full border-accent-green text-accent-green hover:bg-green-50 pointer-events-none">
                  <Check size={16} className="mr-2" /> Tracking
                </Button>
                <button 
                  onClick={onUntrack}
                  disabled={isUpdating}
                  className="text-xs text-accent-red font-medium hover:underline flex items-center justify-center gap-1 py-2 disabled:opacity-50"
                >
                  {isUpdating ? <Loader2 size={12} className="animate-spin" /> : 'Stop Tracking'}
                </button>
              </div>
            ) : (
              <Button onClick={onTrack} loading={isUpdating} className="w-full">
                <Plus size={16} className="mr-2" /> Track This Extension
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
