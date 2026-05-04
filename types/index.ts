// types/index.ts — these are the only types used across the app

export interface Extension {
  id: string
  chrome_id: string
  name: string
  description: string | null
  developer: string | null
  category: string | null
  icon_url: string | null
  chrome_url: string
  created_at: string
  last_fetched_at: string | null
  is_active: boolean
  user_count?: number
  rating?: number
  review_count?: number
  version?: string
}

export interface ExtensionSnapshot {
  id: string
  extension_id: string
  user_count: number | null
  rating: number | null
  review_count: number | null
  version: string | null
  last_updated_date: string | null
  snapshot_date: string
  created_at: string
}

export interface UserTracking {
  id: string
  user_id: string
  extension_id: string
  notify_rating: boolean
  notify_version: boolean
  notify_users: boolean
  created_at: string
}

export interface Alert {
  id: string
  extension_id: string
  user_id: string
  alert_type: 'rating_change' | 'version_update' | 'user_milestone'
  old_value: string | null
  new_value: string | null
  message: string
  read: boolean
  created_at: string
  extension?: Extension
}

export interface Profile {
  id: string
  email: string | null
  name: string | null
  plan: 'free' | 'pro' | 'agency'
  created_at: string
}

export interface ScrapedExtension {
  chromeId: string
  name: string
  userCount: number | null
  rating: number | null
  reviewCount: number | null
  version: string | null
  iconUrl: string | null
  developer: string | null
  chromeUrl: string
  fetchedAt: string
}

export interface DetectedChange {
  type: 'rating_change' | 'version_update' | 'user_milestone'
  oldValue: string
  newValue: string
  message: string
  severity: 'info' | 'warning' | 'critical'
}
