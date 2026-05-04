import { ExtensionSnapshot, ScrapedExtension, DetectedChange } from '@/types'

export function detectChanges(
  oldSnapshot: ExtensionSnapshot,
  newData: ScrapedExtension
): DetectedChange[] {
  const changes: DetectedChange[] = []

  // 1. Rating Change (0.1 or more)
  if (oldSnapshot.rating !== null && newData.rating !== null) {
    const diff = Math.abs(newData.rating - oldSnapshot.rating)
    if (diff >= 0.1) {
      const direction = newData.rating > oldSnapshot.rating ? 'increased' : 'decreased'
      changes.push({
        type: 'rating_change',
        oldValue: oldSnapshot.rating.toString(),
        newValue: newData.rating.toString(),
        message: `Rating ${direction} from ${oldSnapshot.rating} to ${newData.rating}`,
        severity: direction === 'increased' ? 'info' : 'warning'
      })
    }
  }

  // 2. Version Update
  if (oldSnapshot.version && newData.version && oldSnapshot.version !== newData.version) {
    changes.push({
      type: 'version_update',
      oldValue: oldSnapshot.version,
      newValue: newData.version,
      message: `New version shipped: ${newData.version} (was ${oldSnapshot.version})`,
      severity: 'info'
    })
  }

  // 3. User Milestones (100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000)
  const milestones = [100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000]
  if (oldSnapshot.user_count !== null && newData.userCount !== null) {
    const reachedMilestone = milestones.find(m => 
      oldSnapshot.user_count! < m && newData.userCount! >= m
    )
    if (reachedMilestone) {
      changes.push({
        type: 'user_milestone',
        oldValue: oldSnapshot.user_count.toString(),
        newValue: newData.userCount.toString(),
        message: `Reached ${reachedMilestone.toLocaleString()}+ users!`,
        severity: 'critical'
      })
    }
  }

  return changes
}
