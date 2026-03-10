"use client";

import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

export function Hero() {
    const scrollToMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const mapElement = document.getElementById("map");
        if (mapElement) {
            mapElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/20 blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-8">
                    <span>Ramadhan Challenge 2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-primary mb-6 leading-tight tracking-tight uppercase" style={{ textShadow: "0 0 20px rgba(57, 255, 20, 0.3)" }}>
                    Mosque Apps<br />for Malaysia
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                    Discover community-built applications bridging technology and faith for mosques and suraus across the nation.
                </p>

                <a
                    href="#map"
                    onClick={scrollToMap}
                    className={cn(
                        "group inline-flex h-12 items-center justify-center gap-2 bg-primary px-8 text-sm font-bold text-primary-foreground",
                        "transition-all hover:bg-primary/90 hover:scale-105 active:scale-95",
                        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                    style={{ boxShadow: "0 0 20px rgba(57, 255, 20, 0.4)" }}
                >
                    Explore map
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
            </div>
        </section>
    );
}
