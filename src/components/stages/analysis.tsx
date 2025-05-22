import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, FileTextIcon } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import FormAnalysis from "@/components/stages/form-analysis";
import { VideoPlayer } from "@/components/video-player";
import { DrawerDialog } from "@/components/drawer-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppHeader from "../app-header";
import { useSimulation } from "@/contexts/simulation-provider";
import { useMemo } from "react";
import { calculateTimeLeft } from "@/lib/utils";

export default function Analysis() {
  const { simulation, stage, team, handleFinishStage } = useSimulation();
  const initialTimeInSeconds = useMemo(() => {
    return calculateTimeLeft(simulation?.created_at, stage?.duration);
  }, [simulation?.created_at, stage?.duration]);

  const isViewedGuidance = useMemo(() => {
    return !!simulation?.data.isViewedGuidance[team?.id || ""];
  }, []);

  return (
    <div className="bg-gradient-to-br from-background to-background/80 text-foreground min-h-screen p-8">
      <AppHeader
        leftSection={
          <>
            <div className="flex items-center space-x-3">
              <div className="w-[100px]">
                <CountdownTimer
                  initialTimeInSeconds={initialTimeInSeconds}
                  onTimeUp={handleFinishStage}
                />
              </div>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <p className="text-xl font-bold">Stage: ANALYSIS</p>
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary hover:bg-primary/30">
                  CURRENT
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FileTextIcon className="h-4 w-4" />
              <p className="text-sm">Next Stage: STRUCTURING - 1 hour</p>
              <div className="h-6 w-px bg-border"></div>
              <p className="text-sm">{team?.name}</p>
            </div>
          </>
        }
        confirmWhenLoggingOut
      />
      <div className="flex space-x-6">
        <nav className="flex flex-col space-y-2">
          <DrawerDialog
            title="Play simulator"
            className="w-[80vw] h-[80vh] max-h-[80vh] !max-w-[80vw] overflow-auto"
            trigger={
              <Button
                variant="outline"
                size="icon"
                aria-label="Play"
                className="cursor-pointer hover:bg-primary/10">
                <PlayIcon className="h-5 w-5" />
              </Button>
            }>
            <VideoPlayer
              url={simulation?.data.video.url || ""}
              classNames="w-[80vw] h-[80vh]"
            />
          </DrawerDialog>
          <DrawerDialog
            title="Documents"
            className="w-[50vw] h-[50vh] !max-w-[50vw] overflow-auto"
            trigger={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Document"
                className="cursor-pointer hover:bg-primary/10">
                <FileTextIcon className="h-5 w-5" />
              </Button>
            }>
            <ScrollArea className="h-[40vh]">
              {simulation?.data.documents.map((document) => (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {document.title}
                  </h3>
                  <p className="text-muted-foreground">{document.content}</p>
                </div>
              ))}
            </ScrollArea>
          </DrawerDialog>
        </nav>
        <div className="flex flex-col flex-grow border border-border rounded-lg p-4 bg-background/50 backdrop-blur-sm">
          <Accordion
            type="single"
            collapsible
            defaultValue={isViewedGuidance ? "" : "viewed-guidance"}
            className="w-full border border-border rounded-lg px-4 bg-background/30">
            <AccordionItem value="viewed-guidance" className="border-border">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline cursor-pointer">
                First Time Guidance
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <FormAnalysis />
        </div>
      </div>
    </div>
  );
}
