import type { Metadata } from "next";
import { Outfit, Exo_2 } from "next/font/google";
import "../../globals.css";
import { getTranslation, type Language } from "@/lib/i18n";

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

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#050505",
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { lang } = await params;
    const translations = getTranslation(lang as Language);

    return {
        title: "Flinx - 100% PageSpeed Optimization",
        description: translations.hero.description,
        icons: {
            icon: "/favicon.ico",
        },
    };
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <body className={`${outfit.variable} ${exo2.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
