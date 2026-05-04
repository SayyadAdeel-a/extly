'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface TrackCTABannerProps {
  isLoggedIn: boolean
  extensionName: string
  onTrack?: () => void
  loading?: boolean
}

export function TrackCTABanner({ isLoggedIn, extensionName, onTrack, loading }: TrackCTABannerProps) {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    router.push(`/login?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center mt-12">
      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
        <Bell className="text-accent-blue" size={24} />
      </div>
      <h3 className="text-2xl font-bold mb-3">Get alerted when {extensionName} changes</h3>
      <p className="text-text-secondary mb-8 max-w-lg mx-auto">
        Join developers who never miss a beat. We'll monitor this extension and notify you of rating shifts, version updates, and user milestones.
      </p>
      
      {isLoggedIn ? (
        <Button onClick={onTrack} loading={loading} size="lg" className="px-8 h-12">
          Add to Dashboard <ArrowRight size={18} className="ml-2" />
        </Button>
      ) : (
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(val) => setEmail(val)}
            required
            className="h-12 bg-white"
          />
          <Button type="submit" size="lg" className="whitespace-nowrap h-12">
            Start Tracking Free <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      )}
    </div>
  )
}
