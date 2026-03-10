import { LoginForm } from "@/components/admin/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
    const session = await auth();

    if (session) {
        redirect("/admin");
    }

    return (
        <div className="flex relative min-h-[85vh] flex-col items-center justify-center p-6 bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none grid-pattern opacity-30" />
            <div className="relative z-10 w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}
