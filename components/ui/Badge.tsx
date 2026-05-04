import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant: 'blue' | 'green' | 'red' | 'amber' | 'gray'
  className?: string
}

export function Badge({
  children,
  variant,
  className = '',
}: BadgeProps) {
  const variants = {
    blue: 'bg-blue-50 text-accent-blue',
    green: 'bg-green-50 text-accent-green',
    red: 'bg-red-50 text-accent-red',
    amber: 'bg-amber-50 text-accent-amber',
    gray: 'bg-gray-100 text-text-secondary',
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium inline-flex items-center ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
