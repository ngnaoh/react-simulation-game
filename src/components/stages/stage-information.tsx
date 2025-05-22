import { FileTextIcon } from "lucide-react";
import { CountdownTimer } from "../countdown-timer";
import { Badge } from "../ui/badge";
import { useSimulation } from "@/contexts/simulation-provider";
import { useMemo } from "react";
import { calculateTimeLeft } from "@/lib/utils";

type StageInformationProps = {
  stageName: string;
  nextStageName: string;
  nextStageDuration: string;
};

const StageInformation = ({
  stageName,
  nextStageName,
  nextStageDuration,
}: StageInformationProps) => {
  const { simulation, stage, team, handleFinishStage } = useSimulation();
  const initialTimeInSeconds = useMemo(() => {
    return calculateTimeLeft(simulation?.created_at, stage?.duration);
  }, [simulation?.created_at, stage?.duration]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
        <div className="w-[100px]">
          <CountdownTimer
            initialTimeInSeconds={initialTimeInSeconds}
            onTimeUp={handleFinishStage}
          />
        </div>
        <div className="hidden sm:block h-6 w-px bg-border"></div>
        <div className="flex items-center space-x-2">
          <p className="text-base sm:text-lg md:text-xl font-bold">
            Stage: {stageName}
          </p>
          <Badge
            variant="secondary"
            className="bg-primary/20 text-primary hover:bg-primary/30">
            CURRENT
          </Badge>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-muted-foreground mt-2 sm:mt-0">
        <div className="flex items-center space-x-2">
          <FileTextIcon className="h-4 w-4" />
          <p className="text-xs sm:text-sm">
            Next Stage: {nextStageName} - {nextStageDuration}
          </p>
        </div>
        <div className="hidden sm:block h-6 w-px bg-border"></div>
        <p className="text-xs sm:text-sm">{team?.name}</p>
      </div>
    </div>
  );
};

export default StageInformation;
