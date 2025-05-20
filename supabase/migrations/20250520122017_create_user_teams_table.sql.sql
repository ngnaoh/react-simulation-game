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

-- Populate the teams table
INSERT INTO teams (id, name) VALUES
    (gen_random_uuid(), 'Team 1'),
    (gen_random_uuid(), 'Team 2');
