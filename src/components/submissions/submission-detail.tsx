import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Info } from "lucide-react";
import type { Submission } from "@prisma/client";

interface SubmissionDetailProps {
    submission: Submission;
}

export function SubmissionDetail({ submission }: SubmissionDetailProps) {
    return (
        <div className="flex flex-col w-full h-full max-h-[85vh] overflow-y-auto bg-card text-card-foreground">
            {/* Hero Image Section */}
            <div className="relative w-full h-48 sm:h-64 bg-muted shrink-0">
                {submission.featureImage ? (
                    <Image
                        src={submission.featureImage}
                        alt={submission.appName}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                        <MapPin className="w-12 h-12 text-muted-foreground opacity-50" />
                        <span className="sr-only">No image available</span>
                    </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />

                {/* App Title superimposed */}
                <div className="absolute bottom-0 left-0 w-full p-6 pt-12 text-left">
                    <h1 className="text-xl sm:text-2xl font-heading text-primary leading-tight [text-shadow:0_0_10px_rgba(57,255,20,0.5)]">
                        {submission.appName}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6 p-6">
                {/* Description */}
                <div className="flex flex-col gap-2">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        <Info className="w-4 h-4" /> About the App
                    </h3>
                    <p className="text-[#C0C0C0] leading-relaxed whitespace-pre-wrap">
                        {submission.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {submission.techStack.length > 0 ? (
                            submission.techStack.map((tech) => (
                                <Badge
                                    key={tech}
                                    variant="outline"
                                    className="border-primary text-primary bg-primary/5 hover:bg-primary/10 rounded-sm"
                                >
                                    {tech}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-sm text-muted-foreground italic">Not specified</span>
                        )}
                    </div>
                </div>

                {/* Team Info */}
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                        <Users className="w-4 h-4" /> {submission.teamName}
                    </h2>
                    {submission.teamMembers && submission.teamMembers.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {submission.teamMembers.map((member) => (
                                <li key={member} className="text-sm text-foreground flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-primary before:block before:rounded-full">
                                    {member}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-sm text-muted-foreground italic">No individual members listed</span>
                    )}
                </div>

                {/* Mosque Info */}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-foreground">{submission.mosqueName}</span>
                            <span className="font-mono text-xs text-muted-foreground opacity-70">
                                {submission.latitude.toFixed(6)}, {submission.longitude.toFixed(6)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
