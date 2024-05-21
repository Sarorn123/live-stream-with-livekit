import { findStreamByUser } from "@/action";
import WatchChannel from "@/components/watch-channel";
import { Metadata } from "next";

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const stream = await findStreamByUser(slug);
  return {
    title: `Watching ${stream.title}`,
    description: stream.description,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ChannelPage({ params: { slug } }: PageProps) {
  const stream = await findStreamByUser(slug); // slug is userId
  return <WatchChannel slug={slug} activeStream={stream} />;
}
