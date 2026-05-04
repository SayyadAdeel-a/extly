import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

interface PlanLimitBannerProps {
  count: number
  limit: number
}

export function PlanLimitBanner({ count, limit }: PlanLimitBannerProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-accent-blue text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-200">
          <Zap size={20} fill="currentColor" />
        </div>
        <div>
          <h4 className="font-bold text-accent-blue">You've reached the free plan limit ({count}/{limit} extensions)</h4>
          <p className="text-sm text-blue-700/80">Upgrade to Pro to track up to 25 extensions and get real-time alerts.</p>
        </div>
      </div>
      <Button href="/pricing" className="shrink-0 group">
        Upgrade to Pro
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  )
}
