import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const openSansHeading = Open_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "KD Ramadhan Challenge 2026",
  description:
    "Community-built apps for mosques across Malaysia — A Kracked Devs initiative",
  keywords: [
    "Kracked Devs",
    "Ramadhan",
    "mosque",
    "hackathon",
    "Malaysia",
    "community",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${openSansHeading.variable} antialiased`}
      >
        <TooltipProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111111",
                border: "1px solid #222222",
                color: "#E0E0E0",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
