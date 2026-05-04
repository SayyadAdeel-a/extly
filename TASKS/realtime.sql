-- Run this in Supabase SQL editor to enable realtime broadcasting
-- This allows the browser to receive instant updates when alerts or snapshots are inserted

-- 1. Enable realtime for alerts table
ALTER PUBLICATION supabase_realtime ADD TABLE alerts;

-- 2. Enable realtime for extension_snapshots table
ALTER PUBLICATION supabase_realtime ADD TABLE extension_snapshots;

-- Note: Ensure Row Level Security (RLS) is enabled and policies are set correctly
-- so users only receive their own alerts. Snapshots are public.
