import { cn } from "@/lib/utils";
import { useRemoteParticipant } from "@livekit/components-react";
import Presence from "./presence";
import { Icons } from "./ui/icons";
import { useAtomValue } from "jotai";
import { activeStreamAtom } from "@/jotai/active-stream";
import Image from "next/image";
import LikeStream from "./like";

interface Props {
  viewerIdentity: string;
}

export default function ChannelInfo({ viewerIdentity }: Props) {
  const activeStream = useAtomValue(activeStreamAtom);
  const participant = useRemoteParticipant(activeStream?.id ?? "");

  return (
    <div className="space-y-6 border-t py-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="grid place-items-center">
            {participant && (
              <div className="absolute z-10 h-11 w-11 animate-ping rounded-full bg-red-600 dark:bg-red-400" />
            )}
            <Image
              className={cn(
                "z-20 h-16 w-16 rounded-full border-2 border-white bg-gray-500 dark:border-zinc-900",
                participant && "ring-2 ring-red-600"
              )}
              src={activeStream?.user.image ?? ""}
              alt={activeStream?.user.name ?? ""}
              width={64}
              height={64}
            />

            {participant && (
              <div className="absolute z-30 mt-14 w-12 rounded-xl border-2 border-white bg-red-600 p-1 text-center text-xs font-bold uppercase text-white transition-all dark:border-zinc-900">
                Live
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">{activeStream?.user.name}</h1>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                <Icons.check className="h-3 w-3 text-white dark:text-zinc-900" />
              </div>
            </div>
            <h2 className="text-sm font-medium">
              {activeStream?.user.followers.length} follower
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LikeStream />
          <Presence participantIdentity={viewerIdentity} />
        </div>
      </div>
      <pre className="font-sans">{activeStream?.user.bio}</pre>
    </div>
  );
}
