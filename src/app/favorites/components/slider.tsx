import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StreamerCard from "@/components/streamer-card";
import { type User } from "@prisma/client";

type Props = {
  users: User[];
  isFollowing?: boolean;
};

export default function Slider({ users, isFollowing }: Props) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-5"
    >
      <CarouselContent>
        {users.map((recommend, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
            <StreamerCard
              key={recommend.id}
              user={recommend}
              isFollowing={isFollowing}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
