
import type { Stream, User } from "@prisma/client";
import { atom } from "jotai"

export type StreamWithUser = Stream & {
    user: User
}

export const activeStreamAtom = atom<StreamWithUser | null>(null);