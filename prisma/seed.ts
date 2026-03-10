import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

const submissions = [
    {
        appName: "SolahTrack",
        teamName: "Pixel Ummah",
        teamMembers: ["Haziq Iman", "Nur Aisyah", "Danish Rizky"],
        description:
            "SolahTrack helps mosque-goers log their daily prayers and receive gentle reminders. Integrated with the mosque's prayer time API for real-time accuracy.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117713/ramadhan_challenge_seed/ahg6sjrrejuhwu7ztequ.webp",
        techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
        mosqueName: "Masjid Negara",
        latitude: 3.1427,
        longitude: 101.6929,
    },
    {
        appName: "IftarFinder",
        teamName: "KD Warriors",
        teamMembers: ["Arif Hakim", "Sofea Nadia"],
        description:
            "IftarFinder connects community members who want to open fast together. Find nearby mosques offering free iftar and book a spot in seconds.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117721/ramadhan_challenge_seed/c2uhdu4qw7lzn9ygvx8w.webp",
        techStack: ["React", "Node.js", "MongoDB"],
        mosqueName: "Masjid Jamek",
        latitude: 3.1493,
        longitude: 101.6961,
    },
    {
        appName: "QuranKids",
        teamName: "Team Barakah",
        teamMembers: ["Irdina Suffian", "Adam Farhan", "Umi Kalthum", "Zulaikha Musa"],
        description:
            "QuranKids is a gamified Quran learning app for children aged 4–12. Features tajweed exercises, progress badges, and parent dashboards.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117716/ramadhan_challenge_seed/exqtaod15condlszw9dh.webp",
        techStack: ["Flutter", "Firebase"],
        mosqueName: "Masjid Al-Falah Bangsar",
        latitude: 3.1193,
        longitude: 101.6773,
    },
    {
        appName: "ZakatCalc",
        teamName: "Devs of Deen",
        teamMembers: ["Mukhlis Aiman", "Farah Liyana"],
        description:
            "ZakatCalc guides Muslims through calculating their annual zakat obligations with an easy step-by-step wizard and localized nisab rates.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117728/ramadhan_challenge_seed/hk0kd4xyunqbzmximenv.webp",
        techStack: ["Vue", "Laravel", "PostgreSQL"],
        mosqueName: "Masjid Sultan Salahuddin Abdul Aziz Shah",
        latitude: 3.0731,
        longitude: 101.5183,
    },
    {
        appName: "WakafMap",
        teamName: "Codelisters",
        teamMembers: ["Irfan Danial", "Siti Mariam", "Luqmanul Hakim"],
        description:
            "WakafMap visualizes endowment lands across Malaysia, letting donors browse available wakaf plots and contribute directly through the app.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117724/ramadhan_challenge_seed/hmowpopm7j4bv9fvjdf6.webp",
        techStack: ["Next.js", "Tailwind CSS", "PostgreSQL"],
        mosqueName: "Masjid Putra",
        latitude: 2.9399,
        longitude: 101.6931,
    },
    {
        appName: "MosqueQueue",
        teamName: "Null Pointer",
        teamMembers: ["Hazwan Arif", "Ain Shahira"],
        description:
            "MosqueQueue eliminates crowding at Friday prayers by letting worshippers check live occupancy and reserve a spot in advance.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117718/ramadhan_challenge_seed/it4s59we0dhirvnj6hin.webp",
        techStack: ["React", "Node.js", "PostgreSQL"],
        mosqueName: "Masjid Al-Bukhary",
        latitude: 3.1568,
        longitude: 101.7036,
    },
    {
        appName: "RamadhanJournal",
        teamName: "HashtagHijrah",
        teamMembers: ["Faris Mustafa", "Nur Hidayah", "Amsyar Rizwan"],
        description:
            "A private journaling app that guides users through daily Ramadhan reflections, gratitude logs, and dua tracking for the 30 days of fasting.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117725/ramadhan_challenge_seed/jb2djx6pxxcukknd9lii.webp",
        techStack: ["Flutter", "Firebase"],
        mosqueName: "Masjid Al-Hidayah Ampang",
        latitude: 3.1474,
        longitude: 101.7607,
    },
    {
        appName: "SedekahGo",
        teamName: "KrakenCoders",
        teamMembers: ["Nazirul Hakim", "Athirah Nadwa", "Fadzlan Shah"],
        description:
            "SedekahGo enables instant QR-based charity donations at any mosque in Malaysia. Funds are tracked transparently on a public leaderboard.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117709/ramadhan_challenge_seed/jebg3pu7rk8stro36cpn.webp",
        techStack: ["Next.js", "Stripe", "PostgreSQL"],
        mosqueName: "Masjid Wilayah Persekutuan",
        latitude: 3.1740,
        longitude: 101.6901,
    },
    {
        appName: "HalaqahHub",
        teamName: "Team Sinergy",
        teamMembers: ["Shahrul Nizam", "Izzati Husna"],
        description:
            "HalaqahHub digitizes religious study circles. Scholars post session schedules, students RSVP, and notes are shared automatically post-halaqah.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117723/ramadhan_challenge_seed/jjnoxoj1z6m2zt9iho0h.webp",
        techStack: ["React", "Express", "MongoDB"],
        mosqueName: "Masjid Ahmad Swilem Shah Alam",
        latitude: 3.0887,
        longitude: 101.5378,
    },
    {
        appName: "ImsakAlert",
        teamName: "Binary Brothers",
        teamMembers: ["Danish Qayyum", "Hafizuddin Yusri", "Airil Anwar", "Syakir Nabilah"],
        description:
            "ImsakAlert sends hyper-local push notifications 10 minutes before imsak and adhan. Supports all Malaysian states with district-level accuracy.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117711/ramadhan_challenge_seed/llzzxvtx0fwenrysbnat.webp",
        techStack: ["React", "Firebase", "Node.js"],
        mosqueName: "Masjid Al-Khairiah Petaling Jaya",
        latitude: 3.1073,
        longitude: 101.6067,
    },
    {
        appName: "MasjidConnect",
        teamName: "DevCorp",
        teamMembers: ["Zharif Hakim", "Nur Syafiqah"],
        description:
            "MasjidConnect is a community platform for mosque committees to post announcements, coordinate volunteers, and manage event registration.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117714/ramadhan_challenge_seed/ncwuvdsqrcphobiwoxps.webp",
        techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
        mosqueName: "Masjid Saidina Abu Bakar As-Siddiq Damansara",
        latitude: 3.1545,
        longitude: 101.6333,
    },
    {
        appName: "TarawihBuddy",
        teamName: "Neon Nights",
        teamMembers: ["Haris Iskandar", "Soleha Zain", "Nik Azri"],
        description:
            "TarawihBuddy lets worshippers find nearby mosques offering tarawih prayers, check which rakaat they are at, and track their completion over Ramadhan.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117726/ramadhan_challenge_seed/nltssslmi5j4foayma4k.webp",
        techStack: ["Vue", "Django", "PostgreSQL"],
        mosqueName: "Masjid Al-Rahman Subang Jaya",
        latitude: 3.0530,
        longitude: 101.5801,
    },
    {
        appName: "FoodSahur",
        teamName: "Leftover Devs",
        teamMembers: ["Aidil Fitri", "Maisarah Yusof", "Ridhwan Fauzi"],
        description:
            "FoodSahur connects surplus sahur food from mosque kitchens to needy families nearby. Real-time listings, GPS pick-up, and live volunteer dispatch.",
        featureImage: "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773117719/ramadhan_challenge_seed/odka5uiwujnhuxfjycav.webp",
        techStack: ["Flutter", "Firebase", "Python"],
        mosqueName: "Masjid Al-Malik Cheras",
        latitude: 3.1042,
        longitude: 101.7357,
    },
];

async function main() {
    console.log("🌱 Seeding 13 submissions...");

    for (const submission of submissions) {
        await prisma.submission.create({ data: submission });
    }

    console.log(`✅ Seeded ${submissions.length} submissions.`);

    // Also seed admin if env vars present
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (email && password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.admin.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: { email, password: hashedPassword },
        });
        console.log(`✅ Admin user seeded for: ${email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
