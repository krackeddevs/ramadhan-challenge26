"use client";

import * as React from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud, MapPin, X } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createSubmissionSchema, type CreateSubmissionInput } from "@/lib/validations";
import { createSubmission } from "@/actions/submissions";
import { TeamMembersInput } from "./team-members-input";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamically import map preview to avoid SSR issues
const MapPreview = dynamic(() => import("./map-preview"), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full animate-pulse bg-[#111111] rounded-md border border-[#222222]" />,
});

const TECH_OPTIONS = [
    "Next.js", "React", "Vue", "Laravel", "Flutter",
    "Node.js", "Python", "Django", "Express",
    "PostgreSQL", "MongoDB", "Firebase", "Tailwind CSS"
];

export function SubmissionForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [featureImageFile, setFeatureImageFile] = React.useState<File | null>(null);
    const [techInputValue, setTechInputValue] = React.useState("");

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<CreateSubmissionInput>({
        resolver: zodResolver(createSubmissionSchema),
        defaultValues: {
            appName: "",
            teamName: "",
            teamMembers: [],
            description: "",
            featureImage: undefined,
            techStack: [],
            mosqueName: "",
            latitude: undefined,
            longitude: undefined,
        },
    });

    const watchLat = watch("latitude");
    const watchLng = watch("longitude");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setFeatureImageFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const onSubmit = async (data: CreateSubmissionInput) => {
        if (!featureImageFile) {
            toast.error("Please upload a feature image");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", featureImageFile);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok || uploadData.error) {
                throw new Error(uploadData.error || "Failed to upload image");
            }

            // 2. Submit data via Server Action
            const submissionData = {
                ...data,
                featureImage: uploadData.data.url,
            };

            const result = await createSubmission(submissionData);

            if (result.error) {
                throw new Error(result.error);
            }

            toast.success("Submission successfully added!");
            router.push("/admin");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "An unexpected error occurred";
            console.error("Submission error:", error);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-[680px] mx-auto border-[#222222] bg-[#050505] shadow-xl">
            <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <div className="space-y-4">
                        <h3 className="text-lg font-heading text-white border-b border-[#222222] pb-2">Basic Info</h3>

                        {/* App Name */}
                        <div className="space-y-2">
                            <Label htmlFor="appName" className="text-gray-200">App Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="appName"
                                placeholder="e.g. Ramadhan Tracker"
                                className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                                {...register("appName")}
                            />
                            {errors.appName && <p className="text-sm text-red-500">{errors.appName.message}</p>}
                        </div>

                        {/* Team Info */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="teamName" className="text-gray-200">Team Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="teamName"
                                    placeholder="e.g. KD Warriors"
                                    className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                                    {...register("teamName")}
                                />
                                {errors.teamName && <p className="text-sm text-red-500">{errors.teamName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mosqueName" className="text-gray-200">Mosque Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="mosqueName"
                                    placeholder="e.g. Masjid Al-Falah"
                                    className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                                    {...register("mosqueName")}
                                />
                                {errors.mosqueName && <p className="text-sm text-red-500">{errors.mosqueName.message}</p>}
                            </div>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-2">
                            <Label className="text-gray-200">Team Members</Label>
                            <Controller
                                control={control}
                                name="teamMembers"
                                render={({ field }) => (
                                    <TeamMembersInput value={field.value || []} onChange={field.onChange} />
                                )}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-200">Description <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your app..."
                                className="min-h-[120px] bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary resize-y"
                                {...register("description")}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Media & Tech */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-heading text-white border-b border-[#222222] pb-2">Media & Tech</h3>

                        {/* Feature Image Upload */}
                        <div className="space-y-2">
                            <Label className="text-gray-200">Feature Image <span className="text-red-500">*</span></Label>
                            <div className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${previewUrl ? 'border-[#333333] bg-[#111111]' : 'border-[#333333] hover:border-primary bg-[#0a0a0a]'}`}>
                                {previewUrl ? (
                                    <div className="space-y-4 w-full">
                                        <div className="relative aspect-video w-full max-h-[300px] bg-black rounded-md overflow-hidden flex items-center justify-center">
                                            <Image
                                                src={previewUrl}
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex justify-center flex-col sm:flex-row gap-2">
                                            <Button type="button" variant="outline" size="sm" onClick={() => { setPreviewUrl(null); setFeatureImageFile(null); }} className="bg-[#222222] text-white border-[#333333] hover:bg-[#333333]">
                                                Remove Image
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-4">
                                        <div className="h-12 w-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3">
                                            <UploadCloud className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-300 font-medium">Click to upload or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (Max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                            <Label className="text-gray-200">Tech Stack <span className="text-red-500">*</span></Label>
                            <Controller
                                control={control}
                                name="techStack"
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2 mb-2 p-3 bg-[#111111] rounded-md border border-[#222222] min-h-[50px]">
                                            {field.value.length === 0 && <span className="text-muted-foreground text-sm">No technologies selected</span>}
                                            {field.value.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="bg-[#1a1a1a] text-gray-200 border border-primary/30 px-3 py-1 flex items-center gap-1">
                                                    {tech}
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange(field.value.filter(t => t !== tech))}
                                                        className="ml-1 rounded-full p-0.5 hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {TECH_OPTIONS.filter(opt => !field.value.includes(opt)).map(opt => (
                                                <Badge
                                                    key={opt}
                                                    variant="outline"
                                                    className="cursor-pointer border-[#333333] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                                                    onClick={() => field.onChange([...field.value, opt])}
                                                >
                                                    + {opt}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 mt-2">
                                            <Input
                                                placeholder="Add custom tech..."
                                                value={techInputValue}
                                                onChange={(e) => setTechInputValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        const trimmed = techInputValue.trim();
                                                        if (trimmed && !field.value.includes(trimmed)) {
                                                            field.onChange([...field.value, trimmed]);
                                                            setTechInputValue("");
                                                        }
                                                    }
                                                }}
                                                className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary h-8 max-w-[200px]"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                className="bg-[#222222] text-white hover:bg-[#333333] h-8"
                                                onClick={() => {
                                                    const trimmed = techInputValue.trim();
                                                    if (trimmed && !field.value.includes(trimmed)) {
                                                        field.onChange([...field.value, trimmed]);
                                                        setTechInputValue("");
                                                    }
                                                }}
                                            >
                                                Add Custom
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            />
                            {errors.techStack && <p className="text-sm text-red-500">{errors.techStack.message}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-heading text-white border-b border-[#222222] pb-2 flex items-center">
                            <MapPin className="mr-2 h-5 w-5 text-primary" /> Location
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="latitude" className="text-gray-200">Latitude <span className="text-red-500">*</span></Label>
                                <Input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 3.1390"
                                    className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                                    {...register("latitude")}
                                />
                                {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="longitude" className="text-gray-200">Longitude <span className="text-red-500">*</span></Label>
                                <Input
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 101.6869"
                                    className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                                    {...register("longitude")}
                                />
                                {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
                            </div>
                        </div>

                        {/* Map Preview */}
                        <div className="mt-4 border border-[#222222] rounded-md overflow-hidden relative z-0">
                            <MapPreview lat={Number(watchLat) || 3.1390} lng={Number(watchLng) || 101.6869} />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-[#222222]">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 text-black bg-[#39FF14] hover:bg-[#39FF14]/90 font-bold text-base transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Adding Submission...
                                </>
                            ) : (
                                "Add Submission"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
