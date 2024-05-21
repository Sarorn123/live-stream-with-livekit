import prisma from "@/prisma/db";
import { faker } from '@faker-js/faker';
import { Stream, User } from "@prisma/client";

export async function GET() {

    function createRandomStream(): Stream {
        return {
            userId: faker.string.uuid(),
            title: faker.string.alpha(),
            description: faker.string.alpha(),
            streamKey: faker.string.alpha(),
            ingressId: faker.string.alpha(),
            url: faker.internet.url(),
            id: faker.string.uuid(),
            isLive: faker.datatype.boolean(),
            isPublic: faker.datatype.boolean(),
            thumnailUrl: faker.internet.url(),
            videoUrl: faker.internet.url(),
            views: 0,
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent(),
        };
    }

    const streams: Stream[] = faker.helpers.multiple(createRandomStream, {
        count: 100,
    });


    const maped = streams.map((stream) => {
        return { ...stream, userId: "clwec52370000rlb7afad3h5k" }
    })

    const created = await prisma.stream.createMany({
        data: maped
    })

    return new Response(JSON.stringify(created))

}

export async function POST() {

    function createRandomUser() {
        return {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: "",
            bio: faker.string.alpha(),
            isLive: faker.datatype.boolean(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent(),
        };
    }


    const users = faker.helpers.multiple(createRandomUser, {
        count: 100,
    });

    await prisma.user.createMany({
        data: users
    })

    return new Response("Success")

}