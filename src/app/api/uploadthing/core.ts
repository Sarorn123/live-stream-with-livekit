import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ metadata, file }) => {
            if (!metadata) return
            return { uploadedBy: metadata };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;