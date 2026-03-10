import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { z } from "zod";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsedCredentials = credentialsSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null; // Invalid input format
                }

                const { email, password } = parsedCredentials.data;

                try {
                    // Query the admin table
                    const admin = await prisma.admin.findUnique({
                        where: { email },
                    });

                    if (!admin || !admin.password) {
                        return null; // Admin not found
                    }

                    // Verify the bcrypt hashed password
                    const passwordsMatch = await bcrypt.compare(password, admin.password);

                    if (passwordsMatch) {
                        // Return user object without the password
                        return {
                            id: admin.id,
                            email: admin.email,
                            name: "Admin User",
                        };
                    }

                    return null; // Incorrect password
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
