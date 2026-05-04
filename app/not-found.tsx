import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-mono font-bold text-border-subtle">404</p>
        <h1 className="text-2xl font-semibold text-text-primary mt-4">Page not found</h1>
        <p className="text-text-secondary mt-2 max-w-xs mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="mt-8 inline-block bg-accent-blue text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
