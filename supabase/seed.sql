-- Populate the teams table
INSERT INTO
  teams (id, name)
VALUES
  (gen_random_uuid (), 'Team 1'),
  (gen_random_uuid (), 'Team 2');

--  Populate the stages table
INSERT INTO
  stages (id, name, duration)
VALUES
  (gen_random_uuid (), 'analysis', 7200),
  (gen_random_uuid (), 'structuring', 3600)