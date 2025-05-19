import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ url, title, classname }: any) => {
  return (
    <div
      className={cn(
        "w-full mx-auto bg-zinc-800 text-zinc-200 rounded-lg shadow-lg overflow-hidden",
        classname
      )}
    >
      {title && (
        <div className="p-4 border-b border-zinc-700">
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
