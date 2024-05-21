import { ModeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { Input } from "./ui/input";
import { auth, signIn } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export async function NavBar() {
  async function googleSignin() {
    "use server";
    await signIn("google");
  }

  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full  bg-background px-5 ">
      <div className="mx-auto flex h-20 items-center space-x-4 justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-primary text-xl lg:text-2xl font-bold">STREAM</h1>
          </Link>
        </div>
        <div className="flex  items-center justify-end space-x-4  ">
          <nav className="flex items-center gap-2 lg:gap-5 space-x-1">
            <ModeToggle />
            {session?.user ? (
              <div
                className={
                  "flex items-center gap-4 bg-primary h-10 lg:h-14 rounded w-40 justify-center py-2"
                }
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={session.user.image ?? ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-white">{session.user.name}</p>
              </div>
            ) : (
              <form action={googleSignin}>
                <button
                  type="submit"
                  className={
                    "flex items-center gap-4 border bg-primary h-10 lg:h-14 rounded w-40 justify-center py-2"
                  }
                >
                  <Image
                    width={100}
                    height={100}
                    src={"/google.png"}
                    alt="google"
                    // className="w-40"
                  />
                </button>
              </form>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
