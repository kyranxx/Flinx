import type { Metadata } from "next";
import { Outfit, Exo_2 } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: 'swap',
});

const exo2 = Exo_2({
    subsets: ["latin"],
    variable: "--font-exo2",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Flinx - 100% PageSpeed Optimization",
    description: "Make your website blazing fast with Flinx. We optimize for 100% PageSpeed Insights scores.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${exo2.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
