import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Submission {
    id: string;
    appName: string;
    teamName: string;
    mosqueName: string;
    createdAt: Date;
}

interface SubmissionsTableProps {
    submissions: Submission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
    if (submissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-[#222222] rounded-xl bg-[#050505]">
                <p className="text-muted-foreground mb-4">No submissions yet.</p>
                <Link
                    href="/admin/submissions/new"
                    className="text-primary hover:underline font-medium"
                >
                    Add the first submission
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-[#222222] bg-[#050505] overflow-hidden">
            <Table>
                <TableHeader className="bg-[#0a0a0a]">
                    <TableRow className="border-[#222222] hover:bg-transparent">
                        <TableHead className="text-gray-400 font-heading text-xs py-4">App Name</TableHead>
                        <TableHead className="text-gray-400 font-heading text-xs py-4">Team Name</TableHead>
                        <TableHead className="text-gray-400 font-heading text-xs py-4">Mosque</TableHead>
                        <TableHead className="text-gray-400 font-heading text-xs py-4">Date Added</TableHead>
                        <TableHead className="text-gray-400 font-heading text-xs py-4 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((submission) => (
                        <TableRow
                            key={submission.id}
                            className="border-[#222222] hover:bg-[#111111] odd:bg-[#070707] transition-colors"
                        >
                            <TableCell className="font-medium text-white py-4">{submission.appName}</TableCell>
                            <TableCell className="text-gray-300 py-4">{submission.teamName}</TableCell>
                            <TableCell className="text-gray-300 py-4">{submission.mosqueName}</TableCell>
                            <TableCell className="text-gray-400 py-4">
                                {format(new Date(submission.createdAt), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell className="text-right py-4">
                                <Link
                                    href={`/submission/${submission.id}`}
                                    target="_blank"
                                    className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                                >
                                    View <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
