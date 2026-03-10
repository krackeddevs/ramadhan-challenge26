"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { createSubmissionSchema, type CreateSubmissionInput } from "@/lib/validations";
import { auth } from "@/lib/auth";

export async function createSubmission(data: CreateSubmissionInput) {
    const session = await auth();

    if (!session) {
        return { error: "Unauthorized. Please log in as an admin." };
    }

    const validatedFields = createSubmissionSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid form data. Please check your inputs." };
    }

    const {
        appName,
        teamName,
        teamMembers,
        description,
        featureImage,
        techStack,
        mosqueName,
        latitude,
        longitude,
    } = validatedFields.data;

    try {
        const submission = await prisma.submission.create({
            data: {
                appName,
                teamName,
                teamMembers: teamMembers || [],
                description,
                featureImage: featureImage || "",
                techStack,
                mosqueName,
                latitude,
                longitude,
            },
        });

        revalidatePath("/");
        revalidatePath("/admin");

        return { success: true, data: submission };
    } catch (error) {
        console.error("Database error creating submission:", error);
        return { error: "Failed to save submission to the database." };
    }
}
