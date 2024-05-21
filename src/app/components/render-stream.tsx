"use client";

import { readStream, readStreamWithPaginate } from "@/action";
import StreamCard from "@/components/stream-card";
import { StreamWithUser } from "@/jotai/active-stream";
import { Loader2 } from "lucide-react";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";

type Props = {};

const limit = 20;

function RenderStream({}: Props) {
  const [skip, setSkip] = useState(0);
  const [streams, setStreams] = useState<StreamWithUser[]>([]);
  const loadMoreRef = useRef<any>();
  const { inViewport } = useInViewport(loadMoreRef);

  useEffect(() => {
    async function getStreams() {
      const newStreams = await readStreamWithPaginate(skip, limit);
      setStreams([...streams, ...newStreams]);
    }

    getStreams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useEffect(() => {
    if (inViewport) {
      setSkip(skip + limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewport]);

  return (
    <div className="flex justify-center flex-col items-center mt-5">
      <div className="w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full">
        {streams.map((stream, index) => (
          <StreamCard stream={stream} key={index} />
        ))}
      </div>
      {(streams.length >= limit) && (
        <Loader2
          ref={loadMoreRef}
          className="w-10 h-10 text-primary mt-10 animate-spin"
        />
      )}
    </div>
  );
}

export default RenderStream;
