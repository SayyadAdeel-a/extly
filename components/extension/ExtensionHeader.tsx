import React from 'react'
import { ExternalLink, Check, Bookmark, ShieldCheck, Globe, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
    <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-xs sticky top-24">
      <div className="flex flex-col items-center text-center">
        {/* Extension Icon */}
        <div className="h-20 w-20 bg-white border border-border-subtle rounded-2xl shadow-sm flex items-center justify-center p-2 mb-4 overflow-hidden">
          {extension.icon_url ? (
            <img 
              src={extension.icon_url} 
              alt={extension.name} 
              className="h-full w-full object-contain" 
            />
          ) : (
            <div className="text-accent-blue font-display text-3xl font-extrabold">
              {extension.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Title & Author */}
        <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary leading-tight mb-1.5">
          {extension.name}
        </h1>
        <p className="text-xs text-text-secondary mb-4 flex items-center justify-center gap-1">
          <span>by</span>
          <span className="font-medium text-text-primary">
            {extension.developer || 'Verified Store Author'}
          </span>
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          <Badge variant="blue">Chrome Extension</Badge>
          <Badge variant="green">Live Real-Time</Badge>
        </div>
        
        <div className="w-full h-px bg-border-subtle my-2" />
        
        {/* Key Attributes List */}
        <div className="w-full space-y-3.5 py-4 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-text-muted flex items-center gap-1.5">
              <Tag size={13} /> Version
            </span>
            <span className="font-mono font-semibold bg-gray-50 px-2 py-0.5 rounded border border-border-subtle text-text-primary">
              {extension.version || '1.0.0'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted flex items-center gap-1.5">
              <Calendar size={13} /> Last Checked
            </span>
            <span className="font-medium text-text-primary">{lastUpdatedDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted flex items-center gap-1.5">
              <ShieldCheck size={13} /> Access
            </span>
            <span className="text-accent-green font-semibold">100% Free Forever</span>
          </div>
        </div>

        <div className="w-full h-px bg-border-subtle my-2" />
        
        {/* Chrome Store Link */}
        <a 
          href={`https://chromewebstore.google.com/detail/${extension.chrome_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-accent-blue hover:text-blue-700 flex items-center justify-center gap-1.5 py-3 transition-colors group"
        >
          <span>Open on Chrome Web Store</span>
          <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
        
        {/* Action Button */}
        <div className="w-full pt-2">
          {isTracking ? (
            <Button 
              variant="secondary" 
              onClick={onUntrack}
              className="w-full h-11 border-emerald-300 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/60 font-semibold"
            >
              <Check size={16} className="mr-2 text-emerald-600 stroke-[2.5]" />
              Saved to My List
            </Button>
          ) : (
            <Button 
              onClick={onTrack} 
              className="w-full h-11 font-semibold shadow-sm"
            >
              <Bookmark size={16} className="mr-2" />
              Save to My List
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
