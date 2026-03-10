import Image from "next/image";

const SPONSORS = [
    {
        name: "Kracked Devs",
        src: "/logos/KD-Logo-M-Red.jpg",
        width: 120,
        height: 48,
    },
    {
        name: "Kadikku",
        src: "/logos/Logo-Kadikku-Final_horizontal_white.png", // This is the user-requested logo based on existing public asset
        width: 160,
        height: 48,
    },
];

export function SupportedBy() {
    return (
        <section
            id="supported-by"
            className="w-full py-16 border-t border-[#222222] bg-[#050505]"
        >
            <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-10">
                <h2 className="font-heading text-xl sm:text-2xl text-center text-white [text-shadow:0_0_10px_rgba(57,255,20,0.3)]">
                    Supported By
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20">
                    {SPONSORS.map((sponsor) => (
                        <div
                            key={sponsor.name}
                            className="relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                        >
                            <Image
                                src={sponsor.src}
                                alt={`${sponsor.name} Logo`}
                                width={sponsor.width}
                                height={sponsor.height}
                                className="object-contain max-h-[48px] w-auto drop-shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
