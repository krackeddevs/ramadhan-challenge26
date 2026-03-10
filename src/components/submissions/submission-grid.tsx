"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SubmissionDetail } from "@/components/submissions/submission-detail";
import { SubmissionCard } from "@/components/submissions/submission-card";
import type { Submission } from "@prisma/client";

interface SubmissionsGridProps {
    submissions: Submission[];
}

export function SubmissionsGrid({ submissions }: SubmissionsGridProps) {
    const router = useRouter();

    // Dialog State (lifted from similar map pattern)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    const handleCardClick = (id: string) => {
        const isDesktop = window.innerWidth >= 640;

        if (!isDesktop) {
            router.push(`/submission/${id}`);
            return;
        }

        // On Desktop, find the full submission details directly from props and open dialog
        const submission = submissions.find((s) => s.id === id);
        if (submission) {
            setSelectedSubmission(submission);
            setDialogOpen(true);
        }
    };

    return (
        <section id="submissions" className="w-full py-20 lg:py-32 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white [text-shadow:0_0_15px_rgba(57,255,20,0.3)]">
                        Submissions
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-lg">
                        Explore the incredible mosque apps built by the KD community during the Ramadhan Challenge.
                    </p>
                </div>

                {submissions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {submissions.map((sub) => (
                            <SubmissionCard
                                key={sub.id}
                                id={sub.id}
                                appName={sub.appName}
                                teamName={sub.teamName}
                                mosqueName={sub.mosqueName}
                                techStack={sub.techStack}
                                featureImage={sub.featureImage}
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-48 border border-dashed border-border flex items-center justify-center bg-card/50">
                        <p className="text-muted-foreground font-mono">No submissions yet.</p>
                    </div>
                )}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="p-0 border-border bg-card max-w-[680px] overflow-hidden gap-0">
                    <DialogTitle className="sr-only">Submission Details</DialogTitle>
                    <DialogDescription className="sr-only">Detailed view of the selected application submission</DialogDescription>
                    {selectedSubmission && <SubmissionDetail submission={selectedSubmission} />}
                </DialogContent>
            </Dialog>
        </section>
    );
}
