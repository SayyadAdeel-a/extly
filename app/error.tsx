'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-4xl font-mono font-bold text-accent-red">Error</p>
        <h1 className="text-2xl font-semibold text-text-primary mt-4">Something went wrong</h1>
        <p className="text-text-secondary mt-2 max-w-xs mx-auto">
          An unexpected error occurred. Our team has been notified.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-accent-blue text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-bg-surface border border-border-subtle text-text-primary px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
