import { findUserById, readStream } from "@/action";
import { auth } from "@/auth";
import Image from "next/image";
import EditForm from "./components/form";
import StreamCard from "@/components/stream-card";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

type Props = {};

const ChannelPage = async (props: Props) => {
  const session = await auth();
  const user = await findUserById(session?.user?.id ?? "");

  return (
    <main className="p-5">
      <h1 className="mb-5 text-xl text-primary font-bold">Your Channel</h1>
      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="lg:border flex flex-col items-center py-5 lg:py-8 rounded border-primary lg:w-[40%]">
          <Image
            src={user.image ?? ""}
            width={1000}
            height={1000}
            alt={user.name ?? ""}
            className="border rounded-full  w-20 h-20 object-cover"
          />
          <div className="mt-5 text-center">
            <h1 className="font-semibold text-xl">{user.name}</h1>
            <pre className="font-sans text-muted-foreground">{user.bio}</pre>

            <div className="flex items-center gap-5 lg:gap-10 mt-5">
              <div>
                <p className="font-semibold">{user.followers.length}</p>
                <p className="text-sm">Followers</p>
              </div>

              <div>
                <p className="font-semibold">{user.followings.length}</p>
                <p className="text-sm">Followings</p>
              </div>

              <div>
                <p className="font-semibold">{user.totalLive}</p>
                <p className="text-sm">Total Live</p>
              </div>
            </div>
          </div>
        </div>

        <EditForm bio={user.bio} userId={user.id} />
      </div>
      <Suspense
        fallback={
          <div className="mt-10 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        }
      >
        <MyStream userId={user.id} />
      </Suspense>
    </main>
  );
};

export default ChannelPage;

async function MyStream({ userId }: { userId: string }) {
  const streams = await readStream(userId);
  return (
    <>
      <h1 className="mt-5 font-semibold text-primary">Your Stream</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </>
  );
}
