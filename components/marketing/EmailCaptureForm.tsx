'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function EmailCaptureForm() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Redirect to login with email pre-filled
    router.push(`/login?email=${encodeURIComponent(email)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(val) => setEmail(val)}
          required
          className="h-12 bg-white"
        />
      </div>
      <Button type="submit" size="lg" className="whitespace-nowrap h-12">
        Start Tracking Free &rarr;
      </Button>
    </form>
  )
}
