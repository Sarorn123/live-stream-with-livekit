import { auth, signOut } from "@/auth";
import { Heart, Home, LogOut, Plus, Settings, User } from "lucide-react";
import Link from "next/link";
import Navlink from "./nav-link";

type Props = {};

const style =
  "py-2 w-10 lg:w-14 h-10 lg:h-14 flex items-center text-primary justify-center cursor-pointer rounded transition-all";

const Sidebar = async (props: Props) => {
  const session = await auth();

  let links = [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
    },
  ];

  if (session?.user) {
    links = [
      ...links,
      {
        name: "Favorites",
        href: "/favorites",
        icon: <Heart />,
      },
      {
        name: "Streaming",
        href: "/setup?channel=" + session?.user?.id, // userId as channelId coZ we don't have channel
        icon: <Plus />,
      },
      {
        name: "Channel",
        href: "/channel",
        icon: <User />,
      },
    ];
  }

  return (
    <section className="px-2 lg:px-5 space-y-5 ">
      <Navlink links={links} style={style} />
      {session?.user && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className={style}
        >
          <button type="submit">
            <LogOut />
          </button>
        </form>
      )}
    </section>
  );
};

export default Sidebar;
