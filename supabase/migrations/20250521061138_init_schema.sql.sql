-- Create a table for public profiles
CREATE TABLE profiles (
  id UUID NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  permissions TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
ALTER TABLE profiles
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, permissions)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'username',
    COALESCE(new.raw_user_meta_data->>'permissions', 'dashboard:view')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up Storage!
INSERT INTO storage.buckets (id, name)
  VALUES ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update their own avatar." ON storage.objects
  FOR UPDATE USING ((SELECT auth.uid()) = owner) WITH CHECK (bucket_id = 'avatars');

-- Create the stages table
CREATE TABLE stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g., 'analysis', 'structuring', 'execution'
  duration INTEGER NOT NULL  -- Duration in seconds
);

CREATE POLICY "Allow authenticated users to read stages"
ON public.stages FOR SELECT
USING (auth.uid() IS NOT NULL);


-- Create the simulations table
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB,       --  Store the actual simulation data
  stage_id UUID
);

CREATE POLICY "Allow authenticated users to read simulations"
ON public.simulations FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create the users_team table to store the relationship between users and teams
CREATE TABLE users_team (
  user_id UUID NOT NULL,
  team_id UUID NOT NULL,
  simulation_id UUID NOT NULL,
  PRIMARY KEY (user_id, team_id, simulation_id), -- Composite primary key
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

begin;
-- remove the supabase_realtime publication
drop
  publication if exists supabase_realtime;
-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;
commit;
-- add a table called 'messages' to the publication
-- (update this to match your tables)
alter
  publication supabase_realtime add table simulations;

alter
  publication supabase_realtime add table users_team;