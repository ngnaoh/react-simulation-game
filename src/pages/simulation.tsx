import StageSimulation from "@/components/stage-simulation";
import { SimulationProvider } from "@/contexts/simulation-provider";

const Simulation = () => {
  return (
    <SimulationProvider>
      <StageSimulation />
    </SimulationProvider>
  );
};

export default Simulation;
