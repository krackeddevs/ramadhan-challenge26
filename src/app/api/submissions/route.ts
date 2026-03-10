import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const submissions = await prisma.submission.findMany({
            select: {
                id: true,
                appName: true,
                teamName: true,
                mosqueName: true,
                techStack: true,
                featureImage: true,
                latitude: true,
                longitude: true,
                gitUrl: true,
                siteUrl: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ data: submissions });
    } catch (error) {
        console.error("Failed to fetch submissions for map:", error);
        return NextResponse.json(
            { error: { message: "Internal server error", code: 500 } },
            { status: 500 }
        );
    }
}
