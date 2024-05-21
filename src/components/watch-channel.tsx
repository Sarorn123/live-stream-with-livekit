"use client";

import { createViewerToken } from "@/stream/actions";
import ChannelInfo from "@/components/channel-info";
import StreamPlayer from "@/components/stream-player";
import WatchingAsBar from "@/components/watching-as-bar";
import { LiveKitRoom } from "@livekit/components-react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import Chat from "./host-chat";
import { useSession } from "next-auth/react";
import { useSetAtom } from "jotai";
import { activeStreamAtom, StreamWithUser } from "@/jotai/active-stream";

export default function WatchChannel({
  slug,
  activeStream,
}: {
  slug: string;
  activeStream: StreamWithUser;
}) {
  const [viewerToken, setViewerToken] = useState("");
  const [viewerName, setViewerName] = useState("");
  const setActiveUserStream = useSetAtom(activeStreamAtom);

  useEffect(() => {
    setActiveUserStream(activeStream);
  }, [activeStream, setActiveUserStream]);

  const { data: session } = useSession();

  // NOTE: This is a hack to persist the viewer token in the session storage
  // so that the client doesn't have to create a viewer token every time they
  // navigate back to the page.
  useEffect(() => {
    if (!session?.user?.name) return;
    const getOrCreateViewerToken = async () => {
      const SESSION_VIEWER_TOKEN_KEY = `${slug}-viewer-token`;
      const sessionToken = sessionStorage.getItem(SESSION_VIEWER_TOKEN_KEY);

      if (sessionToken) {
        const payload: JwtPayload = jwtDecode(sessionToken);

        if (payload.exp) {
          const expiry = new Date(payload.exp * 1000);
          if (expiry < new Date()) {
            sessionStorage.removeItem(SESSION_VIEWER_TOKEN_KEY);
            const token = await createViewerToken(
              slug,
              session?.user?.name ?? "No Name"
            );
            setViewerToken(token);
            const jti = jwtDecode(token)?.jti;
            jti && setViewerName(jti);
            sessionStorage.setItem(SESSION_VIEWER_TOKEN_KEY, token);
            return;
          }
        }

        if (payload.jti) {
          setViewerName(payload.jti);
        }

        setViewerToken(sessionToken);
      } else {
        const token = await createViewerToken(
          slug,
          session?.user?.name ?? "No Name"
        );
        setViewerToken(token);
        const jti = jwtDecode(token)?.jti;
        jti && setViewerName(jti);
        sessionStorage.setItem(SESSION_VIEWER_TOKEN_KEY, token);
      }
    };
    void getOrCreateViewerToken();
  }, [slug, session?.user?.name]);

  if (viewerToken === "" || viewerName === "") {
    return null;
  }

  return (
    <LiveKitRoom
      token={viewerToken}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className="flex flex-1 flex-col"
    >
      <div className="flex h-full flex-1 gap-5 ">
        <div className="flex-1 flex-col">
          <StreamPlayer userId={slug} />
          <ChannelInfo viewerIdentity={viewerName} />
        </div>
        <div className="sticky hidden w-80 md:flex justify-end flex-col rounded border">
          <Chat participantName={viewerName} />
        </div>
      </div>
    </LiveKitRoom>
  );
}
