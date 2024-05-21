import React, { Suspense } from "react";
import StreamCard from "@/components/stream-card";
import { readFollowing, readStream } from "@/action";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import RenderStream from "./components/render-stream";
import Link from "next/link";

type Props = {};

const MainSection = async (props: Props) => {
  const session = await auth();

  return (
    <section className="p-5 w-full">
      <div>
        <h1 className="text-2xl lg:text-5xl font-bold text-primary animate-bounce">
          Enjoy your favorites streamer 🥰
        </h1>
        <p className="mt-5 text-muted-foreground ">
          With 10k+ streamer and more than 10 live everyday
        </p>
      </div>

      <div className="flex gap-10 mt-10">
        <div className="hidden md:block w-[20%]">
          <h2 className="text-primary font-semibold">Following</h2>
          {!session?.user ? (
            <p className="mt-5 text-muted-foreground">
              Please login to see your following 🥺
            </p>
          ) : (
            <Suspense
              fallback={
                <div className="flex justify-center mt-10">
                  <Loader2 className="w-5 h-5 animate-spin text-primary " />
                </div>
              }
            >
              <FollowingSide id={session.user.id!} />
            </Suspense>
          )}
        </div>

        <div className="w-full">
          <h2 className="text-primary font-semibold">Live Streaming</h2>
          <RenderStream />
        </div>
      </div>
    </section>
  );
};

export default MainSection;

async function FollowingSide({ id }: { id: string }) {
  const followings = await readFollowing(id);

  return (
    <div className="mt-5 space-y-2">
      {followings.map((streamer) => (
        <FollowingCard key={streamer.id} streamer={streamer} />
      ))}
    </div>
  );
}

function FollowingCard({ streamer }: { streamer: User }) {
  return (
    <Link
      href={streamer.isLive ? "/playing/" + streamer.id ?? "" : "/"}
      className="flex justify-between items-center rounded hover:bg-secondary cursor-pointer py-2 transition-all px-2"
    >
      <div className="flex items-center gap-4">
        <Image
          src={streamer.image ?? ""}
          height={200}
          width={200}
          alt=""
          className={`rounded-full w-14 h-14 flex-shrink-0 object-cover border-2 ${
            streamer.isLive && "border-destructive animate-pulse"
          }`}
        />
        <div>
          <p className="font-semibold">{streamer.name}</p>
          <p className="text-muted-foreground text-sm">
            {streamer.followers.length} follower
          </p>
        </div>
      </div>
      {streamer.isLive && <Badge variant="destructive">LIVE</Badge>}
    </Link>
  );
}
