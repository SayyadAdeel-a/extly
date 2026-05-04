import type { ExtensionSnapshot, DetectedChange } from '@/types'

export function detectChanges(
  previous: ExtensionSnapshot,
  current: ExtensionSnapshot
): DetectedChange[] {
  const changes: DetectedChange[] = []

  // Rating change (0.1 threshold)
  if (previous.rating && current.rating) {
    const diff = current.rating - previous.rating
    if (Math.abs(diff) >= 0.1) {
      changes.push({
        type: 'rating_change',
        oldValue: previous.rating.toString(),
        newValue: current.rating.toString(),
        message: diff > 0
          ? `Rating improved from ${previous.rating} to ${current.rating}`
          : `Rating dropped from ${previous.rating} to ${current.rating}`,
        severity: diff < -0.2 ? 'critical' : diff < 0 ? 'warning' : 'info'
      })
    }
  }

  // Version change
  if (previous.version && current.version && previous.version !== current.version) {
    changes.push({
      type: 'version_update',
      oldValue: previous.version,
      newValue: current.version,
      message: `New version released: ${previous.version} → ${current.version}`,
      severity: 'info'
    })
  }

  // User milestones
  const milestones = [1000, 5000, 10000, 50000, 100000, 500000, 1000000]
  if (previous.user_count && current.user_count) {
    for (const milestone of milestones) {
      if (previous.user_count < milestone && current.user_count >= milestone) {
        changes.push({
          type: 'user_milestone',
          oldValue: previous.user_count.toString(),
          newValue: current.user_count.toString(),
          message: `Reached ${milestone.toLocaleString()} users`,
          severity: 'info'
        })
      }
    }
  }

  return changes
}
