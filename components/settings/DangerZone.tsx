'use client'

import React, { useState } from 'react'
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'

export function DangerZone() {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' })
      if (res.ok) {
        window.location.href = '/'
      }
    } catch (err) {
      console.error('Account deletion failed:', err)
      alert('Failed to delete account. Please contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white border border-accent-red/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-red-50 bg-red-50/30 flex items-center gap-3">
          <AlertTriangle size={20} className="text-accent-red" />
          <h3 className="font-bold text-accent-red text-lg">Danger Zone</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-sm text-text-secondary">
            Permanently delete your account, your tracking history, and all saved preferences. This action cannot be undone.
          </p>
          <div className="pt-2">
            <Button 
              variant="secondary" 
              className="border-accent-red/30 text-accent-red hover:bg-red-50"
              onClick={() => setShowModal(true)}
            >
              <Trash2 size={18} className="mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-accent-red mb-6">
                <AlertTriangle size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-2">Are you sure?</h3>
              <p className="text-text-secondary mb-8">
                This will permanently delete your account and all associated data. You will lose access to all tracked extensions and alert history.
              </p>

              <div className="flex flex-col w-full gap-3">
                <Button 
                  onClick={handleDelete} 
                  disabled={isLoading}
                  className="w-full bg-accent-red hover:bg-red-700 text-white border-transparent"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Yes, Delete My Account"}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                  disabled={isLoading}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
