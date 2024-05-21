import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
        session: ({ session, token }) => {
            return { ...session, ...token };
        },
        jwt: ({ user, token }) => {

            if (user) {
                token.user = user
            }

            return { ...token }
        },
    },
})