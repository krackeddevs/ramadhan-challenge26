import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth();

    // If the user is unauthenticated and attempting to access an /admin route (excluding /admin/login)
    const isAuthRoute = request.nextUrl.pathname.startsWith("/admin/login");

    if (!session && !isAuthRoute) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If the user is already authenticated and attempts to access /admin/login, bump them to /admin
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
