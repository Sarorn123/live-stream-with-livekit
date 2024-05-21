import prisma from "@/prisma/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";


const reciever = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);

export async function POST(request: Request) {
    const body = await request.text()
    const auth = headers().get('Authorization')
    if (!auth) {
        return new Response('Unauthorized', { status: 401 })
    }
    const event = reciever.receive(body, auth)
    const ingressId = event.ingressInfo?.ingressId
    if (!ingressId) return new Response('IngressId not found', { status: 400 })

    if (event.event === 'ingress_started') {
        const stream = await prisma.stream.findFirst({
            where: {
                ingressId
            }
        })
        if (stream) {
            await Promise.all([
                prisma.stream.update({
                    where: {
                        id: stream.id
                    },
                    data: {
                        isLive: true
                    }
                }),
                prisma.user.updateMany({
                    where: {
                        id: stream.userId
                    },
                    data: {
                        isLive: true,
                        totalLive: {
                            increment: 1
                        }
                    }
                }),
            ])
        }
    }

    if (event.event === 'ingress_ended') {
        const stream = await prisma.stream.findFirst({
            where: {
                ingressId
            }
        })
        if (stream) {
            await Promise.all([
                prisma.stream.delete({
                    where: {
                        id: stream.id
                    },
                }),
                prisma.user.updateMany({
                    where: {
                        id: stream.userId
                    },
                    data: {
                        isLive: false
                    }
                }),
            ])
        }
    }

    return new Response('OK')
}