import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

// Configure Mona Sans font
const monaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PrepAi",
    description: "An AI-powered app designed to enhance your interview skills and boost confidence through personalized preparation",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
        <body className={`${monaSans.className} antialiased pattern`}>
        {children}
        <Toaster />
        </body>
        </html>
    );
}