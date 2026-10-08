import React from 'react'
import { ExternalLink, Check, Bookmark, Loader2 } from 'lucide-react'
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
    : 'Today'
    
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
          <p className="text-text-secondary mb-4">by {extension.developer || 'Unknown Developer'}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="blue">Chrome Extension</Badge>
            <Badge variant="green">Live Real-time</Badge>
          </div>
          
          <div className="w-full h-px bg-border-subtle my-6" />
          
          <div className="w-full space-y-4 text-sm mb-6">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Version</span>
              <span className="font-mono font-medium">{extension.version || '1.0.0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Last Checked</span>
              <span>{lastUpdatedDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Access</span>
              <span className="text-accent-green font-semibold">100% Free</span>
            </div>
          </div>
          
          <a 
            href={`https://chromewebstore.google.com/detail/${extension.chrome_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent-blue hover:underline flex items-center gap-1.5 mb-6"
          >
            View on Chrome Web Store <ExternalLink size={14} />
          </a>
          
          <div className="w-full pt-2">
            {isTracking ? (
              <Button 
                variant="secondary" 
                onClick={onUntrack}
                className="w-full border-accent-green text-accent-green hover:bg-green-50"
              >
                <Check size={16} className="mr-2" /> Saved in Browser
              </Button>
            ) : (
              <Button onClick={onTrack} className="w-full">
                <Bookmark size={16} className="mr-2" /> Save to My List
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
