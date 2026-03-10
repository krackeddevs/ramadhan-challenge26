
import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

export const submissions = [
    {
        "appName": "Sajda-community",
        "teamName": "smashing_pumpkins",
        "description": "\"Komuniti masjid anda, dalam poket anda.\"",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132891/ramadhan_challenge_seed/gwbdakw58k4fxwfypmdx.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Saujana Utama",
        "latitude": 3.202785803120564,
        "longitude": 101.48857990913815,
        "teamMembers": [
            "smashing_pumpkins"
        ],
        "createdAt": new Date("2026-03-10T06:55:42.349Z")
    },
    {
        "appName": "Jejak Masjid",
        "teamName": "loqmandev",
        "description": "Pokemon GO but for Masjids",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132892/ramadhan_challenge_seed/ymmzgx9cgnfsyxppc5iz.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Unknown Mosque",
        "latitude": 3.139,
        "longitude": 101.6869,
        "teamMembers": [
            "loqmandev"
        ],
        "createdAt": new Date("2026-03-10T04:59:47.982Z")
    },
    {
        "appName": "MASJID JAMEK FASTABIQUL KHAYRAT BATU 3",
        "teamName": "fadilaiman",
        "description": "One hub for all digital content of Masjid Jamek Fastabiqül Khayrat Batu 3.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132893/ramadhan_challenge_seed/wkq5zuu77z67nhssij3n.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "MASJID JAMEK FASTABIQUL KHAYRAT BATU 3",
        "latitude": 3.0595645490734737,
        "longitude": 101.55719181004875,
        "teamMembers": [
            "fadilaiman"
        ],
        "createdAt": new Date("2026-03-10T04:41:29.419Z")
    },
    {
        "appName": "Zahir Digital",
        "teamName": "Ajwdxr",
        "description": "Kracked Devs Ramadhan Challenge 2026",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132894/ramadhan_challenge_seed/yyoqqt3irmcbz949hgoy.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Zahir",
        "latitude": 6.1205561474934385,
        "longitude": 100.36519484073983,
        "teamMembers": [
            "Ajwdxr"
        ],
        "createdAt": new Date("2026-03-10T03:59:40.685Z")
    },
    {
        "appName": "Masjid Al Rahmah Mergong Alor Setar",
        "teamName": "taufec",
        "description": "Hub online Masjid Al Rahmah Anda!",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132896/ramadhan_challenge_seed/mo3bpc7lvy4bpfmqjpun.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Al Rahmah Mergong Alor Setar",
        "latitude": 6.142418873218813,
        "longitude": 100.35682359655911,
        "teamMembers": [
            "taufec"
        ],
        "createdAt": new Date("2026-03-10T03:54:43.776Z")
    },
    {
        "appName": "JomSolat: Masjid Al-Malik Khalid Digital Companion",
        "teamName": "akaNazrul",
        "description": "JomSolat is a mobile first progressive web app built for the Muslim community of Masjid Al-Malik Khalid, Gelugor, Penang",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132897/ramadhan_challenge_seed/lbgkv7r0bldlgu3hgew2.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Al-Malik",
        "latitude": 5.353862511269816,
        "longitude": 100.30201439205112,
        "teamMembers": [
            "akaNazrul"
        ],
        "createdAt": new Date("2026-03-10T03:42:26.895Z")
    },
    {
        "appName": "TerawihTribe",
        "teamName": "arysya",
        "description": "Your mosque community, gamified",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132898/ramadhan_challenge_seed/vnmz3gi2ct5fopjlelli.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Salahuddin Al-Ayubbi",
        "latitude": 3.222874217213024,
        "longitude": 101.72033174073776,
        "teamMembers": [
            "arysya"
        ],
        "createdAt": new Date("2026-03-10T03:40:59.580Z")
    },
    {
        "appName": "suraunurhidayahkmf.com",
        "teamName": "Ijam",
        "description": "A smarter surau experience — live prayer times, infaq, Quran & Hadith, and livestreamed classes.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132899/ramadhan_challenge_seed/trenpiqw6owmanioq9ek.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Surau Nur Hidayah",
        "latitude": 5.325077064138225,
        "longitude": 100.2757509587047,
        "teamMembers": [
            "Ijam"
        ],
        "createdAt": new Date("2026-03-10T03:16:38.156Z")
    },
    {
        "appName": "Landing Website for Surau Nur Asy-Syura",
        "teamName": "nhily",
        "description": "A welcoming space for worship, knowledge, and community for Surau Nur Asy-Syura.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132900/ramadhan_challenge_seed/rdzcwh5gupdyyds0ylvr.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Surau Nur Asy-Syura",
        "latitude": 5.852262152547652,
        "longitude": 100.47183178306695,
        "teamMembers": [
            "nhily"
        ],
        "createdAt": new Date("2026-03-09T23:46:24.930Z")
    },
    {
        "appName": "Masjid Ubudiah Kuala Kangsar",
        "teamName": "AbahKau",
        "description": "moh ke mesjid",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132901/ramadhan_challenge_seed/vxxdors9hblxhyjclfwm.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Ubudiah Kuala Kangsar",
        "latitude": 4.764241679966177,
        "longitude": 100.95092306957397,
        "teamMembers": [
            "AbahKau"
        ],
        "createdAt": new Date("2026-03-09T22:24:09.974Z")
    },
    {
        "appName": "Qiyam: Masjid Tracker",
        "teamName": "muazamcode",
        "description": "Find nearby masjids, track prayers, and grow your worship journey with Qiyam.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132902/ramadhan_challenge_seed/fmr2hyzfaiqjzrxjhori.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Unknown Mosque",
        "latitude": 3.139,
        "longitude": 101.6869,
        "teamMembers": [
            "muazamcode"
        ],
        "createdAt": new Date("2026-03-09T16:01:10.303Z")
    },
    {
        "appName": "Masjid Al-Ikhlas Seksyen 13",
        "teamName": "Meursault",
        "description": "A Mosque architecture and UI inspired my modern and neobrtualism",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132903/ramadhan_challenge_seed/ummidfyhkbdwpphibbjm.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Al-Ikhlas Seksyen 13",
        "latitude": 3.0867532959567296,
        "longitude": 101.54532532539322,
        "teamMembers": [
            "Meursault"
        ],
        "createdAt": new Date("2026-03-09T14:42:08.721Z")
    },
    {
        "appName": "MSI UTHM",
        "teamName": "yunn",
        "description": "Smart mosque companion for UTHM students: prayer times, events, announcements, and community tools in one platform.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132904/ramadhan_challenge_seed/gmynsyffo3hx5kl8gdms.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Sultan Ibrahim UTHM",
        "latitude": 1.8553992271959383,
        "longitude": 103.0811783343166,
        "teamMembers": [
            "yunn"
        ],
        "createdAt": new Date("2026-03-09T14:11:17.303Z")
    },
    {
        "appName": "Saf",
        "teamName": "irfanrff",
        "description": "A serene digital companion connecting worshippers to mosque updates, prayer times, and community life.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132904/ramadhan_challenge_seed/brazxhzsfiph8hhh87vz.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Masjid Al-Azim",
        "latitude": 2.215428114118292,
        "longitude": 102.26216645423071,
        "teamMembers": [
            "irfanrff"
        ],
        "createdAt": new Date("2026-03-09T14:00:20.322Z")
    },
    {
        "appName": "Pemuda Surau SABAS",
        "teamName": "fizlaw96",
        "description": "Menghubungkan anak muda dengan program dan aktiviti komuniti Surau Sabas.",
        "featureImage": "https://res.cloudinary.com/dl2mjlme7/image/upload/v1773132905/ramadhan_challenge_seed/udqnp8y49z2esf2k9wo3.webp",
        "techStack": [
            "Next.js",
            "React",
            "PostgreSQL"
        ],
        "mosqueName": "Surau Saidina Abu Bakar",
        "latitude": 3.0018921933947134,
        "longitude": 101.65266441190187,
        "teamMembers": [
            "fizlaw96"
        ],
        "createdAt": new Date("2026-03-07T08:49:06.681Z")
    }
];

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
