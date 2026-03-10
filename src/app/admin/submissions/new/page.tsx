import { SubmissionForm } from "@/components/admin/submission-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewSubmissionPage() {
    return (
        <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-[#020202] min-h-screen">
            <div className="max-w-[680px] mx-auto space-y-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-heading text-white tracking-tight">Add Submission</h1>
                        <p className="text-muted-foreground">Submit a new project for the Ramadhan Challenge 2026</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-white">
                        <Link href="/admin">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>

            <SubmissionForm />
        </div>
    );
}
