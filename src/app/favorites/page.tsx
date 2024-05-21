import { readFollowing, readRecommend } from "@/action";
import { auth } from "@/auth";
import StreamerCard from "@/components/streamer-card";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Slider from "./components/slider";

type Props = {};

const FavoriteStreamer = async (props: Props) => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const [followings, recommends] = await Promise.all([
    readFollowing(session.user.id!),
    readRecommend(session.user.id!),
  ]);

  return (
    <main className="p-5">
      <h1 className="font-bold text-xl text-primary">Streamer</h1>
      <p className="text-muted-foreground">
        Find your favorite streamer and follow theme to get notification when
        they re-live
      </p>

      <h2 className="font-semibold mt-5 text-primary">Following</h2>
      <Slider users={followings} isFollowing />

      {followings.length === 0 && (
        <h1 className="text-center font-semibold">No Following yet</h1>
      )}

      <h2 className="font-semibold mt-5 text-primary">Recommend</h2>
      <Slider users={recommends} />

      {recommends.length === 0 && (
        <h1 className="text-center font-semibold">No Recommend</h1>
      )}
    </main>
  );
};

export default FavoriteStreamer;
