import { prisma } from "@/lib/db";
import { SubmissionsTable } from "@/components/admin/submissions-table";
import { buttonVariants } from "@/components/ui/button-variants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AdminDashboard() {
    let submissions: {
        id: string;
        appName: string;
        teamName: string;
        mosqueName: string;
        createdAt: Date;
    }[] = [];

    try {
        submissions = await prisma.submission.findMany({
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                appName: true,
                teamName: true,
                mosqueName: true,
                createdAt: true,
            },
        });
    } catch (error) {
        console.error("Database connection error in dashboard:", error);
    }

    return (
        <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-[#020202] min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-heading text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage and review all challenge submissions</p>
                </div>

                <Link
                    href="/admin/submissions/new"
                    className={cn(
                        buttonVariants({ variant: "default" }),
                        "bg-primary text-black font-bold hover:bg-primary/90 shadow-[0_0_15px_rgba(57,255,20,0.2)] h-9 px-4"
                    )}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Submission
                </Link>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-heading text-white text-sm uppercase tracking-widest opacity-80">
                        Recent Submissions
                    </h2>
                    <span className="text-xs text-muted-foreground bg-[#111111] px-3 py-1 rounded-full border border-[#222222]">
                        {submissions.length} Total
                    </span>
                </div>

                <SubmissionsTable submissions={submissions} />
            </div>
        </div>
    );
}
