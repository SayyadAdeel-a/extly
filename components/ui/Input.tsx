import React from 'react'

interface InputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password'
  disabled?: boolean
  error?: string
  label?: string
  className?: string
  id?: string
  required?: boolean
  autoFocus?: boolean
}

export function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  label,
  className = '',
  id,
  required = false,
  autoFocus = false,
}: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm text-text-secondary mb-1.5 font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-surface ${
          error ? 'border-accent-red' : 'border-border-subtle'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="mt-1.5 text-accent-red text-xs font-medium">
          {error}
        </p>
      )}
    </div>
  )
}
