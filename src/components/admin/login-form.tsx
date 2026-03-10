"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Login successful");
                router.push("/admin");
                router.refresh();
            }
        } catch {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md border-[#222222] bg-[#050505] shadow-xl relative z-10">
            <CardHeader className="space-y-3 pb-6 text-center">
                <CardTitle className="font-heading text-xl text-white tracking-tight">Admin Login</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Enter your credentials to access the KD Hackathon dashboard
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@krackeddevs.com"
                                className="pl-10 bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50"
                                disabled={isLoading}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm font-medium text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-white">Password</Label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                className="pl-10 bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50"
                                disabled={isLoading}
                                {...register("password")}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-sm font-medium text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-black font-semibold hover:bg-primary/90 transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
