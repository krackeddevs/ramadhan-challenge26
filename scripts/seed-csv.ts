import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "ramadhan_challenge_seed",
            overwrite: true,
        });
        return result.secure_url;
    } catch (e) {
        console.error("Cloudinary upload failed for", filePath, e);
        return null;
    }
};

const fuzzyMatch = (query: string, files: string[]) => {
    if (!query) return null;
    const qRaw = query.toLowerCase().replace(/[^a-z0-9]/g, "");

    let bestMatch = null;
    let score = -1;

    for (const f of files) {
        const fName = f.toLowerCase().replace(/\..+$/, "").replace(/[^a-z0-9]/g, "");
        if (fName.includes(qRaw) || qRaw.includes(fName)) {
            return f;
        }

        let currentScore = 0;
        const qWords = query.toLowerCase().split(/[\s,.-]+/);
        for (const w of qWords) {
            if (w.length > 3 && f.toLowerCase().includes(w)) currentScore++;
        }
        if (currentScore > score) {
            score = currentScore;
            bestMatch = f;
        }
    }
    return score > 0 ? bestMatch : null;
};

async function seed() {
    const csvData = fs.readFileSync(path.join(process.cwd(), "submission_seed.csv"), "utf-8");
    const records = parse(csvData, { columns: true, skip_empty_lines: true });

    const imgDir = path.join(process.cwd(), "masjid_img");
    const imageFiles = fs.readdirSync(imgDir).filter(f => f.endsWith('.webp') || f.endsWith('.png'));

    const submissions = [];

    const dbData = [];

    for (const row of records as any[]) {
        let featureImage = "";

        // Find best image match
        let bestImage = fuzzyMatch(row.masjid, imageFiles);
        if (!bestImage && row.title.includes("Zahir")) {
            bestImage = "Masjid Zahir Negeri Kedah.webp";
        }
        if (!bestImage) { // fallback
            bestImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        }

        if (bestImage) {
            console.log(`Uploading ${bestImage} for ${row.masjid || row.title}...`);
            const url = await uploadImage(path.join(imgDir, bestImage));
            if (url) featureImage = url;
            else featureImage = "https://placehold.co/600x400/png";
        }

        let lat = 3.1390;
        let lng = 101.6869;

        if (row.location) {
            const parts = row.location.replace(/['"]/g, "").split(",");
            if (parts.length === 2) {
                lat = parseFloat(parts[0].trim());
                lng = parseFloat(parts[1].trim());
            }
        }

        if (isNaN(lat)) lat = 3.1390;
        if (isNaN(lng)) lng = 101.6869;

        const sub = {
            appName: row.title || "Unknown App",
            teamName: row.Username || "Unknown Team",
            description: row.short_description || "No description provided.",
            featureImage,
            techStack: ["Next.js", "React", "PostgreSQL"],
            mosqueName: row.masjid || "Unknown Mosque",
            latitude: lat,
            longitude: lng,
            teamMembers: [row.Username],
            gitUrl: row.git_url || null,
            siteUrl: row.site_url || null,
            createdAt: new Date(row.submitted_at || Date.now())
        };

        dbData.push(sub);
    }

    console.log("Emptying submissions table...");
    await prisma.submission.deleteMany();

    console.log("Inserting new submissions...");
    for (const sub of dbData) {
        await prisma.submission.create({ data: sub });
    }

    console.log("Done! Creating backup in prisma/seed-data.ts");

    // Output code for prisma/seed.ts rewrite
    const fileContent = `
import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

export const submissions = ${JSON.stringify(dbData, null, 4).replace(/"(202[0-9]-[0-9]{2}-[0-9]{2}T[^"]+)"/g, 'new Date("$1")')};

async function main() {
    await prisma.submission.deleteMany();
    await prisma.admin.deleteMany();

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
        data: {
            email: "admin@krackeddevs.com",
            password: hashedPassword,
        },
    });

    for (const sub of submissions) {
        await prisma.submission.create({
            data: sub,
        });
    }

    console.log("Database seeded from CSV output!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
`;

    fs.writeFileSync(path.join(process.cwd(), "prisma/seed.ts"), fileContent, "utf-8");
    console.log("Success! Updated the database and regenerated prisma/seed.ts.");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
