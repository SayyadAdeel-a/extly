import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Icon className="text-text-muted" size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium text-text-primary">
        {title}
      </h3>
      <p className="text-text-secondary text-sm mt-1 max-w-xs">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          href={action.href}
          className="mt-6"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
