import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SubmissionDetail } from "@/components/submissions/submission-detail";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SubmissionPageProps {
    params: Promise<{ id: string }>;
}

export default async function SubmissionPage({ params }: SubmissionPageProps) {
    const { id } = await params;

    const submission = await prisma.submission.findUnique({
        where: { id },
    });

    if (!submission) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur">
                <Link
                    href="/#map"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-none text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to map</span>
                </Link>
                <span className="font-heading text-xs text-primary truncate">
                    {submission.appName}
                </span>
            </header>

            <main className="flex-1 w-full max-w-3xl mx-auto">
                <SubmissionDetail submission={submission} />
            </main>
        </div>
    );
}
