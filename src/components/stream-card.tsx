import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { type User, type Stream } from "@prisma/client";

type Props = {
  stream: Stream & {
    user: User;
  };
};

const StreamCard = ({ stream }: Props) => {
  return (
    <Link
      href={"/playing/" + stream.user?.id}
      className=" h-72 relative hover:scale-95 transition-all"
    >
      {stream.isLive && (
        <Badge variant="destructive" className="absolute right-2 top-2">
          LIVE
        </Badge>
      )}

      <Image
        src={"/kof.jpg"}
        height={200}
        width={200}
        alt="streamer video"
        className="h-[60%] md:h-[70%] w-full rounded-2xl"
      />
      <p className="mt-2 text-xl font-medium">{stream.title}</p>

      <div className="flex items-center gap-4 mt-2">
        {/* <Image
          src={stream.user?.image ?? ""}
          height={200}
          width={200}
          alt={stream?.user?.name ?? ""}
          className="rounded-full w-10 h-10 object-cover"
        /> */}
        <p className="text-sm">{stream?.user?.name}</p>
      </div>
    </Link>
  );
};

export default StreamCard;
