import React, { useMemo } from "react";
import { DrawerDialog } from "../drawer-dialog";
import { Button } from "../ui/button";
import { FileTextIcon } from "lucide-react";
import { PlayIcon } from "lucide-react";
import { VideoPlayer } from "../video-player";
import { useSimulation } from "@/contexts/simulation-provider";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const StageHelperButtons = ({ children }: { children: React.ReactNode }) => {
  const { simulation, team } = useSimulation();
  const isViewedGuidance = useMemo(() => {
    return !!simulation?.data.isViewedGuidance[team?.id || ""];
  }, []);

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4">
      <nav className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
        <DrawerDialog
          title="Play simulator"
          className="w-[95vw] sm:w-[80vw] max-h-[80vh] !max-w-[95vw] sm:!max-w-[80vw]"
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
            classNames="w-full h-full"
          />
        </DrawerDialog>
        <DrawerDialog
          title="Documents"
          className="w-full sm:w-[50vw] max-h-[80vh] !max-w-[95vw] sm:!max-w-[50vw]"
          trigger={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Document"
              className="cursor-pointer hover:bg-primary/10">
              <FileTextIcon className="h-5 w-5" />
            </Button>
          }>
          <ScrollArea className="h-[60vh] sm:h-full">
            {simulation?.data.documents.map((document) => (
              <div key={document.title} className="py-4">
                <h3 className="text-lg font-semibold mb-2">{document.title}</h3>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {children}
      </div>
    </div>
  );
};

export default StageHelperButtons;
