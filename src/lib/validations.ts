import { z } from "zod";

export const createSubmissionSchema = z.object({
    appName: z.string().min(1, "App Name is required"),
    teamName: z.string().min(1, "Team Name is required"),
    teamMembers: z.array(z.string()).optional(),
    description: z.string().min(1, "Description is required"),
    featureImage: z.string().url("Must be a valid URL").optional(),
    techStack: z.array(z.string()).min(1, "At least one technology is required"),
    mosqueName: z.string().min(1, "Mosque Name is required"),
    latitude: z.coerce.number().min(-90, "Latitude must be >= -90").max(90, "Latitude must be <= 90"),
    longitude: z.coerce.number().min(-180, "Longitude must be >= -180").max(180, "Longitude must be <= 180"),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
