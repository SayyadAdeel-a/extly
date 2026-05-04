# Database Schema — Extly

## Overview
Extly uses Supabase (PostgreSQL) for data storage, leveraging Row Level Security (RLS) for user data protection.

## Tables

### 1. `extensions`
Stores the metadata for each Chrome extension indexed by the platform.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `chrome_id` | `text` | Unique ID from Chrome Web Store (e.g., `cfhdojb...`) |
| `name` | `text` | Extension Name |
| `description` | `text` | Short description |
| `developer` | `text` | Developer/Organization name |
| `category` | `text` | Store category |
| `icon_url` | `text` | URL to the extension icon |
| `chrome_url` | `text` | Full Web Store URL |
| `created_at` | `timestamp` | Record creation time |
| `last_fetched_at` | `timestamp` | Last time the scraper updated this record |

### 2. `extension_snapshots`
Daily time-series data for extensions.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `extension_id` | `uuid` | Foreign Key -> `extensions.id` |
| `user_count` | `bigint` | Total users at snapshot time |
| `rating` | `decimal` | Average rating (0.0 - 5.0) |
| `review_count` | `integer` | Total review count |
| `version` | `text` | Version string (e.g., `1.2.3`) |
| `last_updated_date` | `text` | Store's reported last update date |
| `snapshot_date` | `date` | Date of the snapshot (indexed for fast lookup) |
| `created_at` | `timestamp` | Record creation time |

### 3. `user_tracking`
Links users to the extensions they are following.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `user_id` | `uuid` | Foreign Key -> `auth.users` |
| `extension_id` | `uuid` | Foreign Key -> `extensions.id` |
| `notify_rating` | `boolean` | Default `true` |
| `notify_version` | `boolean` | Default `true` |
| `notify_users` | `boolean` | Default `true` |
| `created_at` | `timestamp` | Record creation time |

### 4. `alerts`
Historical record of changes detected.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `extension_id` | `uuid` | Foreign Key -> `extensions.id` |
| `user_id` | `uuid` | Foreign Key -> `auth.users` |
| `alert_type` | `text` | `rating_change`, `version_update`, `user_milestone` |
| `old_value` | `text` | Value before change |
| `new_value` | `text` | Value after change |
| `message` | `text` | Human readable summary |
| `read` | `boolean` | Default `false` |
| `created_at` | `timestamp` | Record creation time |

## Indexes & Constraints
- Unique constraint on `extensions.chrome_id`.
- Composite index on `extension_snapshots(extension_id, snapshot_date)` for fast chart rendering.
- Foreign Key with `ON DELETE CASCADE` for snapshots when an extension is removed (if ever).

## RLS Policies
- `extensions`: Public Read.
- `extension_snapshots`: Public Read.
- `user_tracking`: `user_id = auth.uid()` (Select, Insert, Delete).
- `alerts`: `user_id = auth.uid()` (Select, Update `read` status).