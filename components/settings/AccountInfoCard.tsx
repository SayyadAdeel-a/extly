import React from 'react'
import { User, CreditCard, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

interface AccountInfoCardProps {
  email: string
  plan: string
  createdAt: string
}

export function AccountInfoCard({ email, plan, createdAt }: AccountInfoCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
        <User size={20} className="text-accent-blue" />
        <h3 className="font-bold text-text-primary text-lg">Account</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Email Address</p>
            <p className="font-medium text-text-primary">{email}</p>
          </div>
          <span className="text-xs text-text-muted bg-gray-100 px-2 py-1 rounded">Primary</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-y border-gray-50">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-accent-blue flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Current Plan</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary capitalize">{plan}</span>
                {plan === 'free' && (
                  <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold uppercase">Basic</span>
                )}
              </div>
            </div>
          </div>
          <Button href="/pricing" variant="secondary" size="sm" className="group">
            Upgrade Plan
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex items-center gap-3 text-text-muted">
          <Calendar size={16} />
          <span className="text-sm">Member since {formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
