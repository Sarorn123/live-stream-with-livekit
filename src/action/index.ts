"use server"

import { StreamWithUser } from "@/jotai/active-stream";
import prisma from "@/prisma/db";
import { type StreamInput } from "@/schema";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function readStreamWithPaginate(skip: number, limit: number) {
    const streams = await prisma.stream.findMany({
        skip,
        take: limit,
        include: {
            user: true
        },
        where: {
            isLive: true
        }
    })

    return streams
}

export async function createStream(input: StreamInput) {
    return await prisma.stream.create({ data: input })
}

export async function readStream(userId?: string) {
    return await prisma.stream.findMany({
        where: {
            userId,
        },
        include: {
            user: true
        },
    });
}

export async function findStreamByUser(userId: string): Promise<StreamWithUser> {
    const stream = await prisma.stream.findFirst({
        where: {
            userId
        },
        include: {
            user: true
        }
    })
    if (!stream) {
        throw new Error("Stream not found")
    }

    return stream
}

export async function findUserByUsername(names: string[]): Promise<User[]> {
    return await prisma.user.findMany({
        where: {
            name: {
                in: names
            }
        }
    })
}

export async function readFollowing(userId: string) {

    if (!userId) return []

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            followings: true
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    const followings = await prisma.user.findMany({
        where: {
            id: {
                in: user.followings
            }
        }
    })

    return followings

}

export async function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
}

export async function readRecommend(userId: string) {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            followings: true
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    const sugestion = await prisma.user.findMany({
        where: {
            id: {
                notIn: [...user.followings, userId]
            }
        }
    })

    return sugestion

}

export async function findUserById(id: string): Promise<User> {

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user
}

export async function onEditBio(id: string, bio: string) {
    await prisma.user.update({
        where: {
            id
        },
        data: {
            bio
        }
    })
    revalidatePath(`/channel`)
}