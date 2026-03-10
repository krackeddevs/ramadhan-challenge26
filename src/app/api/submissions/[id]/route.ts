import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const submission = await prisma.submission.findUnique({
            where: { id },
        });

        if (!submission) {
            return NextResponse.json(
                { error: { message: "Submission not found", code: 404 } },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: submission });
    } catch (error) {
        console.error("Failed to fetch submission:", error);
        return NextResponse.json(
            { error: { message: "Internal server error", code: 500 } },
            { status: 500 }
        );
    }
}
