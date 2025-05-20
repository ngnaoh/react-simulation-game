
-- Create the stages table
CREATE TABLE stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- e.g., 'analysis', 'structuring', 'execution'
    duration INTEGER NOT NULL  -- Duration in seconds
);

-- Create the simulations table
CREATE TABLE simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data JSONB,       --  Store the actual simulation data
    stage_id UUID
);

--  Populate the stages table
INSERT INTO stages (id, name, duration)
VALUES
    (gen_random_uuid(), 'analysis', 7200),
    (gen_random_uuid(), 'structuring', 7200),
    (gen_random_uuid(), 'execution', 7200);

