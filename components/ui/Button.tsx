import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  href?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  href,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: 'bg-accent-blue text-white hover:bg-blue-700',
    secondary: 'bg-bg-surface border border-border-subtle text-text-primary hover:bg-gray-50',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
