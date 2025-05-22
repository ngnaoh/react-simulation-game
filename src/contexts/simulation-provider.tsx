import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/utils/supabaseClient";
import { useNavigate, useParams } from "react-router";
import type { DataSimulation, Simulation, Stage, Team } from "@/type/database";
import {
  fetchSimulation,
  getStageByStageId,
  updateSimulation,
  updateStage,
} from "@/services/simulations";
import { isNull } from "lodash";

type SimulationContextType = {
  simulation: Simulation | null;
  loading: boolean;
  stage: Stage | null;
  team: Team | null;
  finished: boolean;
  updateDataSimulation: (dataSimulation: DataSimulation) => Promise<void>;
  handleFinishStage: (newSimulation: Simulation) => Promise<void>;
};

const SimulationContext = createContext<SimulationContextType>({
  simulation: null,
  loading: true,
  stage: null,
  team: null,
  finished: false,
  updateDataSimulation: async () => {},
  handleFinishStage: async () => {},
});

export function SimulationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { simulationId } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  const updateDataSimulation = useCallback(
    async (dataSimulation: DataSimulation) => {
      if (!simulation) return;
      await updateSimulation(
        { ...simulation, data: dataSimulation },
        simulation.id
      );
    },
    [simulation]
  );

  const handleFinishStage = useCallback(
    async (newSimulation: Simulation) => {
      if (finished) {
        return await navigate("/dashboard");
      }
      if (!stage) return;
      const updatedSimulation = await updateStage(newSimulation, stage);
      setSimulation(updatedSimulation as Simulation);
    },
    [finished, stage, navigate]
  );

  useEffect(() => {
    async function fetchSimulationData() {
      if (!simulationId) return;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await fetchSimulation(simulationId);
      setSimulation(data.simulation);
      setStage(data.stage);
      setTeam(data.team);
      setLoading(false);
    }
    fetchSimulationData();
  }, [simulationId]);

  useEffect(() => {
    const subscription = supabase
      .channel("listen-data-simulations")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "simulations",
          filter: `id=eq.${simulationId}`,
        },
        async (payload) => {
          if (payload.new.id) {
            const stage = await getStageByStageId(payload.new.stage_id);
            setStage(stage as Stage);
            setSimulation(payload.new as Simulation);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [simulationId]);

  useEffect(() => {
    if (isNull(simulation?.stage_id)) {
      setFinished(true);
    }
  }, [simulation]);

  return (
    <SimulationContext.Provider
      value={{
        simulation,
        stage,
        team,
        loading,
        finished,
        updateDataSimulation,
        handleFinishStage,
      }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
}
