import { z } from "zod";

export const streamSchema = z.object({
    streamKey: z.string(),
    userId: z.string(),
    url: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    ingressId: z.string(),
    thumnailUrl: z.string(),
})

export type StreamInput = z.infer<typeof streamSchema>