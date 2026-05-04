'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Zap, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

function LoginForm() {
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get('email') || ''
  
  const [email, setEmail] = useState(initialEmail)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`
      }
    })

    setLoading(false)
    if (!error) {
      setSubmitted(true)
    } else {
      setError(error.message || 'Failed to send magic link. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full">
            <Mail className="text-accent-blue h-12 w-12" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We sent a magic link to <strong className="text-text-primary">{email}</strong>.<br />
          Click the link in your email to sign in. It expires in 10 minutes.
        </p>
        
        <div className="space-y-4">
          <Button variant="secondary" onClick={() => setSubmitted(false)} className="w-full">
            &larr; Use a different email
          </Button>
          <p className="text-xs text-text-muted">
            Didn't receive it? Check your spam folder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-text-secondary">Enter your email and we'll send you a magic link to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-accent-red">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
          <Input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(val) => setEmail(val)}
            required
            autoFocus
            className="h-11"
          />

        <Button type="submit" loading={loading} className="w-full h-11">
          Send Magic Link <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-text-muted">or</span>
        </div>
      </div>

      <button 
        disabled 
        className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-gray-50 border border-border-subtle text-text-muted cursor-not-allowed text-sm font-medium"
      >
        <svg className="h-5 w-5 opacity-50" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google (Coming soon)
      </button>

      <p className="text-center text-xs text-text-muted mt-8">
        Free forever. No credit card required.
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center pt-20 px-4">
      <Link href="/" className="flex items-center gap-2 font-serif text-2xl text-accent-blue mb-10">
        <Zap size={24} fill="currentColor" />
        <span>Extly</span>
      </Link>
      
      <Card className="w-full max-w-md p-8">
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-text-muted">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </Card>
    </div>
  )
}
