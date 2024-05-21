import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import { findUserByUsername } from "@/action";
import { User } from "@prisma/client";
import Image from "next/image";

export default function Presence({
  participantIdentity,
}: {
  participantIdentity: string;
}) {
  const [open, setOpen] = useState(false);
  const participants = useParticipants();

  const [peoples, setPeoples] = useState<User[]>([]);

  useEffect(() => {
    async function getPeoples() {
      const users = await findUserByUsername(
        participants.map((participant) => participant.identity)
      );

      setPeoples(users);
    }

    getPeoples();
  }, [participants]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="flex items-center gap-2 rounded border-primary"
        >
          <Icons.user className="h-5 w-5 text-primary " />
          <div className="font-bold text-primary text-xl">
            {participants.length}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="border-b pb-4 text-xl font-semibold text-primary">
              {participants.length}{" "}
              {participants.length > 1 ? "People" : "Person"} Here
            </div>
          </DialogTitle>
        </DialogHeader>
        <ul className="space-y-2">
          {peoples.map((participant) => (
            <li key={participant.name}>
              <div className="flex items-center gap-3">
                <div className={"h-6 w-6 rounded-full bg-slate-600"}>
                  <Image
                    className="rounded-full"
                    src={participant.image ?? ""}
                    alt={participant.name ?? ""}
                    width={64}
                    height={64}
                  />
                </div>

                <div className="text-sm">
                  {participant.name}
                  {participant.name === participantIdentity && " (You)"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
