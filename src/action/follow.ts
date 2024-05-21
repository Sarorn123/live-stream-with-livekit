"use server"

import prisma from "@/prisma/db"
import { revalidatePath } from "next/cache"
import { delay } from "."

export async function follow(id: string, followId: string, isUnFollowing?: boolean) {

    if (!isUnFollowing) {
        await Promise.all([
            prisma.user.update({
                where: {
                    id
                },
                data: {
                    followings: {
                        push: followId
                    }
                }
            }),
            prisma.user.update({
                where: {
                    id: followId
                },
                data: {
                    followers: {
                        push: id
                    }
                }
            })
        ])

    } else {

        const [user, follower] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    id
                },
                select: {
                    followings: true
                }
            }),

            prisma.user.findUnique({
                where: {
                    id: followId
                },
                select: {
                    followers: true
                }
            })
        ])

        if (!user || !follower) throw new Error("User not found")

        await Promise.all([
            prisma.user.update({
                where: {
                    id
                },
                data: {
                    followings: user.followings.filter((following) => following !== followId)
                }
            }),
            prisma.user.update({
                where: {
                    id: followId
                },
                data: {
                    followers: follower.followers.filter((follower) => follower !== id)
                }
            })
        ])


    }

    revalidatePath("/favorites")
}