import { z } from "zod";

export const createSubmissionSchema = z.object({
    appName: z.string().min(1, "App name is required"),
    teamName: z.string().min(1, "Team name is required"),
    teamMembers: z.array(z.string()).default([]),
    description: z.string().min(1, "Description is required"),
    featureImage: z.string().min(1, "Feature image is required"),
    techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
    mosqueName: z.string().min(1, "Mosque name is required"),
    latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
