import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export async function Header() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        <div className="relative h-8 w-8 overflow-hidden rounded-sm bg-white p-1">
                            <Image
                                src="/logos/kdlogo.png"
                                alt="Kracked Devs Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="hidden font-heading text-sm text-white sm:inline-block">
                            KD<span className="text-primary">RAMADHAN</span>
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {!session ? (
                        <Link
                            href="/admin/login"
                            className="text-xs font-medium text-muted-foreground transition-colors hover:text-white"
                        >
                            Admin Login
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin"
                                className="text-xs font-medium text-white transition-colors hover:text-primary"
                            >
                                Dashboard
                            </Link>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="submit"
                                    className="text-muted-foreground hover:text-red-400 hover:bg-[#111111]"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
