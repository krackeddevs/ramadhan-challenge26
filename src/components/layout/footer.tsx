import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-[#222222] bg-[#050505] py-8 mt-auto">
            <div className="container flex flex-col items-center justify-between gap-6 px-4 md:px-6 sm:flex-row sm:gap-4">

                {/* Left Side: Logo & Copyright */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-md bg-white p-1">
                            <Image
                                src="/logos/KD-Logo-M-Red.jpg"
                                alt="Kracked Devs Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-heading text-lg font-bold text-white tracking-tighter">
                            KRACKED<span className="text-primary">DEVS</span>
                        </span>
                    </Link>
                    <span className="text-xs text-[#666666] sm:text-sm border-l border-[#222222] pl-4 ml-2 max-sm:border-none max-sm:pl-0 max-sm:ml-0">
                        © 2026 Kracked Devs. All rights reserved.
                    </span>
                </div>

                {/* Right Side: Social Media Links */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://krackeddevs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5"
                        aria-label="Website"
                    >
                        <Globe className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/company/krackeddevs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://x.com/KrackedDevs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5 font-bold font-mono text-lg leading-none"
                        aria-label="X (Twitter)"
                    >
                        𝕏
                    </Link>
                    <Link
                        href="https://www.facebook.com/profile.php?id=61587943460342"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5"
                        aria-label="Facebook"
                    >
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://www.instagram.com/krackeddev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://www.threads.com/@krackeddev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#666666] transition-colors duration-200 hover:text-primary hover:-translate-y-0.5 font-bold font-mono text-xl leading-none"
                        aria-label="Threads"
                    >
                        @
                    </Link>
                </div>

            </div>
        </footer>
    );
}
