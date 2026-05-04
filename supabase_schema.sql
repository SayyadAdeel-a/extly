-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Extensions (public metadata)
CREATE TABLE IF NOT EXISTS extensions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chrome_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  developer TEXT,
  category TEXT,
  icon_url TEXT,
  chrome_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_fetched_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. Daily snapshots (historical stats)
CREATE TABLE IF NOT EXISTS extension_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  user_count BIGINT,
  rating DECIMAL(3,2),
  review_count INTEGER,
  version TEXT,
  last_updated_date TEXT,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(extension_id, snapshot_date)
);

-- 3. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. User tracking (which user tracks which extension)
CREATE TABLE IF NOT EXISTS user_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  notify_rating BOOLEAN DEFAULT TRUE,
  notify_version BOOLEAN DEFAULT TRUE,
  notify_users BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, extension_id)
);

-- 5. Alerts (notification history)
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  extension_id UUID REFERENCES extensions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS SETTINGS --

-- Enable RLS on all tables
ALTER TABLE extensions ENABLE ROW LEVEL SECURITY;
ALTER TABLE extension_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Extensions: Public read
CREATE POLICY "Extensions are viewable by everyone" ON extensions
  FOR SELECT USING (true);

-- Extension Snapshots: Public read
CREATE POLICY "Snapshots are viewable by everyone" ON extension_snapshots
  FOR SELECT USING (true);

-- Profiles: Users see only their own
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User Tracking: Users see only their own
CREATE POLICY "Users can view their own tracking" ON user_tracking
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tracking" ON user_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tracking" ON user_tracking
  FOR DELETE USING (auth.uid() = user_id);

-- Alerts: Users see only their own
CREATE POLICY "Users can view their own alerts" ON alerts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own alerts" ON alerts
  FOR UPDATE USING (auth.uid() = user_id);

-- AUTH TRIGGER --
-- Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
