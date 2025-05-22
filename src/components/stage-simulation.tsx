import { useSimulation } from "@/contexts/simulation-provider";
import Loading from "./loading";
// import { useNavigate } from "react-router";
import Analysis from "./stages/analysis";
import Structuring from "./stages/structuring";
import { STAGE_NAMES } from "@/type/database";
const StageSimulation = () => {
  // const navigate = useNavigate();
  // Consider: handle navigate to dashboard when user participate in simulation
  const { stage, loading } = useSimulation();

  if (loading) return <Loading description="Loading simulation..." />;

  if (stage?.name === STAGE_NAMES.analysis) {
    return <Analysis />;
  }
  if (stage?.name === STAGE_NAMES.structuring) {
    return <Structuring />;
  }

  return <Structuring />;
};

export default StageSimulation;
