import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Clock } from 'lucide-react'
import type { ExtensionSnapshot } from '@/types'

interface VersionTableProps {
  snapshots: ExtensionSnapshot[]
}

export function VersionTable({ snapshots }: VersionTableProps) {
  // Extract unique version changes
  const versions = snapshots
    .sort((a, b) => new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime())
    .filter((snap, index, self) => 
      index === 0 || snap.version !== self[index - 1].version
    )
    .slice(0, 10) // Show last 10 versions

  const calculateDaysBetween = (date1: string, date2?: string) => {
    if (!date2) return '-'
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d1.getTime() - d2.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays}d`
  }

  // Calculate average frequency if we have enough data
  let averageDays = 0
  if (versions.length > 1) {
    let totalDays = 0
    for (let i = 0; i < versions.length - 1; i++) {
      const d1 = new Date(versions[i].snapshot_date)
      const d2 = new Date(versions[i+1].snapshot_date)
      totalDays += Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24))
    }
    averageDays = totalDays / (versions.length - 1)
  }

  const isFrequent = averageDays > 0 && averageDays < 14
  const showEmptyState = versions.length <= 1

  return (
    <Card className="overflow-hidden p-0 border-border-subtle shadow-sm bg-white">
      <div className="p-6 border-b border-border-subtle flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-primary">Version History</h3>
        {isFrequent && <Badge variant="blue">Ships frequently</Badge>}
      </div>
      
      {showEmptyState ? (
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-accent-blue" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            History is building up
          </p>
          <p className="text-xs text-text-muted max-w-[200px]">
            Version history builds over time as we track daily updates
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-text-muted font-bold border-b border-border-subtle">
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Detected</th>
                <th className="px-6 py-4 text-right">Cadence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {versions.map((v, i) => (
                <tr key={v.id} className={i === 0 ? 'bg-blue-50/30' : 'hover:bg-gray-50 transition-colors'}>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-text-primary">
                    {v.version || '0.0.0'}
                    {i === 0 && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-tight">Latest</span>}
                  </td>
                  <td className="px-6 py-4 text-xs text-text-secondary">
                    {new Date(v.snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-text-muted text-right">
                    {i < versions.length - 1 ? calculateDaysBetween(v.snapshot_date, versions[i+1].snapshot_date) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
