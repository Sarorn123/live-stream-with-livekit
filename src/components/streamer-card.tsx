"use client";

import { type User } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { follow } from "@/action/follow";
import { useSession } from "next-auth/react";

function StreamerCard({
  user,
  isFollowing,
}: {
  user: User;
  isFollowing?: boolean;
}) {
  const { data: session } = useSession();

  return (
    <div className="border flex flex-col items-center py-5 lg:py-8 rounded border-primary">
      <Image
        src={user.image ?? ""}
        width={200}
        height={200}
        alt={user.image ?? ""}
        className="border rounded-full w-20 h-20 object-cover"
      />
      <div className="mt-2 text-center">
        <h1 className="font-semibold text-xl">{user.name}</h1>
        <pre className="font-sans">{user.bio}</pre>

        <div className="flex items-center gap-10 mt-5">
          <div>
            <p className="font-semibold">{user.followers.length}</p>
            <p className="text-sm">Followers</p>
          </div>

          <div>
            <p className="font-semibold">{user.totalLive}</p>
            <p className="text-sm">Total Live</p>
          </div>
        </div>
      </div>

      {isFollowing ? (
        <Button
          variant={"secondary"}
          className="mt-10 rounded w-[80%] mx-auto flex items-center gap-2"
          onClick={() => follow(session?.user?.id ?? "", user.id, true)}
        >
          Unfollow <Minus className="h-4 w-4" />{" "}
        </Button>
      ) : (
        <Button
          className="mt-10 rounded w-[80%] mx-auto flex items-center gap-2"
          onClick={() => follow(session?.user?.id ?? "", user.id)}
        >
          Follow <Plus className="h-4 w-4" />{" "}
        </Button>
      )}
    </div>
  );
}

export default StreamerCard;
