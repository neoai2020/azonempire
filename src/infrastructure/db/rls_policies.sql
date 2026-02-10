-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts during re-run, though in SQL editor it might just error)
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Public can view all projects" ON projects;

-- Create Policy: Public can view ALL projects (since these are public review pages)
CREATE POLICY "Public can view all projects"
ON projects FOR SELECT
USING (true);

-- Create Policy: Users can only insert their own projects
-- Note: You might need to drop existing policies first if running this repeatedly
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;
CREATE POLICY "Users can insert own projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create Policy: Users can only update their own projects
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
CREATE POLICY "Users can update own projects"
ON projects FOR UPDATE
USING (auth.uid() = user_id);

-- Create Policy: Users can only delete their own projects
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;
CREATE POLICY "Users can delete own projects"
ON projects FOR DELETE
USING (auth.uid() = user_id);
