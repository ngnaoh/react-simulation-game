/* eslint-disable no-useless-catch */
import { StageIndex, TemplateDataSimulation } from "@/constants/simulations";
import type { Simulation, Stage, Team } from "@/type/database";
import { supabase } from "@/utils/supabaseClient";
import { delay } from "lodash";

export type CreateSimulationHandler = {
  userIdsTeam1: string[];
  userIdsTeam2: string[];
};
export const createSimulation = async ({
  userIdsTeam1,
  userIdsTeam2,
}: CreateSimulationHandler) => {
  try {
    const { data: stage } = await supabase
      .from("stages")
      .select("*")
      .eq("name", "analysis")
      .single();

    TemplateDataSimulation.timeStart = {
      [stage.id]: new Date().toISOString(),
    };
    const { data: simulation, error: simulationError } = await supabase
      .from("simulations")
      .insert({
        stage_id: stage.id,
        data: TemplateDataSimulation,
      })
      .select()
      .single();

    if (simulationError) throw new Error("Simulation not created");

    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("*");

    if (teamsError) throw new Error("Teams not found");

    const team1 = teams.find((team) => team.name === "Team 1");
    const team2 = teams.find((team) => team.name === "Team 2");

    const team1UsersData = userIdsTeam1.map((userId) => ({
      team_id: team1.id,
      user_id: userId,
      simulation_id: simulation.id,
    }));

    const team2UsersData = userIdsTeam2.map((userId) => ({
      team_id: team2.id,
      user_id: userId,
      simulation_id: simulation.id,
    }));

    const allUsersTeamData = [...team1UsersData, ...team2UsersData];

    const { error: usersTeamError } = await supabase
      .from("users_team")
      .insert(allUsersTeamData)
      .select();

    if (usersTeamError) throw new Error("Users team not created");

    return true;
  } catch (error) {
    return error;
  }
};

export const updateSimulation = async (
  simulation: Simulation,
  simulationId: string
) => {
  try {
    const { error } = await supabase
      .from("simulations")
      .update(simulation)
      .eq("id", simulationId);

    if (error) throw error;
  } catch (err) {
    return err;
  }
};

export const updateStage = async (
  simulation: Simulation,
  currentStage: Stage
) => {
  try {
    const nextStageIndex = StageIndex.indexOf(currentStage.name) + 1;
    const nextStage = StageIndex[nextStageIndex];
    let stageId = currentStage.id;
    if (nextStage) {
      const { data: stage } = await supabase
        .from("stages")
        .select("*")
        .eq("name", nextStage)
        .single();
      stageId = stage.id;
      simulation.data.timeStart[stageId] = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("simulations")
      .update({ stage_id: nextStage ? stageId : null, data: simulation.data })
      .eq("id", simulation.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    return err;
  }
};

export const getStageByStageId = async (stageId: string) => {
  try {
    const { data, error } = await supabase
      .from("stages")
      .select("*")
      .eq("id", stageId)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    return err;
  }
};

export const fetchSimulation = async (
  simulationId: string
): Promise<{
  simulation: Simulation | null;
  stage: Stage | null;
  team: Team | null;
}> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("simulations")
      .select("*")
      .eq("id", simulationId)
      .single();

    if (error) throw error;

    const stage = data?.stage_id
      ? await getStageByStageId(data?.stage_id)
      : null;

    const { data: usersTeamData, error: usersTeamError } = await supabase
      .from("users_team")
      .select("*")
      .eq("simulation_id", data?.id)
      .eq("user_id", session?.user.id)
      .single();

    if (usersTeamError) throw usersTeamError;

    const { data: teamData, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", usersTeamData?.team_id)
      .single();

    if (teamError) throw teamError;

    if (stage?.name === "analysis") {
      delay(() => {
        data.data.isViewedGuidance[teamData.id] = true;
        updateSimulation(data, simulationId);
      }, 1000);
    }

    return {
      simulation: data as Simulation,
      stage: stage as Stage,
      team: teamData as Team,
    };
  } catch (err) {
    console.error(err);
    return { simulation: null, stage: null, team: null };
  }
};
