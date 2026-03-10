import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export interface SubmissionCardProps {
    id: string;
    appName: string;
    teamName: string;
    mosqueName: string;
    techStack: string[];
    featureImage: string | null;
    onClick: (id: string) => void;
}

export function SubmissionCard({
    id,
    appName,
    teamName,
    mosqueName,
    techStack,
    featureImage,
    onClick,
}: SubmissionCardProps) {
    return (
        <Card
            onClick={() => onClick(id)}
            className="group cursor-pointer overflow-hidden rounded-none border-border bg-[#111111] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_4px_20px_rgba(57,255,20,0.15)]"
        >
            {/* 16:9 Image Thumbnail */}
            <div className="relative aspect-video w-full bg-muted">
                {featureImage ? (
                    <Image
                        src={featureImage}
                        alt={appName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                        <MapPin className="h-8 w-8 text-muted-foreground opacity-50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
            </div>

            <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-lg leading-tight text-white group-hover:text-primary transition-colors">
                        {appName}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                        {teamName}
                    </p>
                </div>

                <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-sm text-primary/90">{mosqueName}</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    {techStack.slice(0, 3).map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="rounded-sm border-primary/50 bg-primary/5 text-xs text-primary group-hover:border-primary"
                        >
                            {tech}
                        </Badge>
                    ))}
                    {techStack.length > 3 && (
                        <Badge
                            variant="outline"
                            className="rounded-sm border-border bg-card text-xs text-muted-foreground"
                        >
                            +{techStack.length - 3} more
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
