import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  url: string;
  title?: string;
  classNames?: string;
};

export const VideoPlayer = ({ url, title, classNames }: VideoPlayerProps) => {
  return (
    <div
      className={cn(
        "w-full mx-auto bg-background text-foreground rounded-lg shadow-lg overflow-hidden",
        classNames
      )}>
      {title && (
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={url}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          controls={true}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
    </div>
  );
};
