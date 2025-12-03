import type { Metadata } from "next";
import { Outfit, Exo_2 } from "next/font/google";
import "../../globals.css";
import { getTranslation } from "@/lib/i18n";
import { type Language, languages } from "@/lib/languages";
import Script from "next/script";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: 'optional',
});

const exo2 = Exo_2({
    subsets: ["latin"],
    variable: "--font-exo2",
    display: 'optional',
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
    const translations = await getTranslation(lang as Language);
    const baseUrl = 'https://www.flinx.site';

    // Generate language alternates for hreflang tags
    const languageAlternates: Record<string, string> = {};
    languages.forEach((locale) => {
        languageAlternates[locale.code] = `${baseUrl}/${locale.code}`;
    });
    // Add x-default fallback to English
    languageAlternates['x-default'] = `${baseUrl}/en`;

    return {
        title: "Flinx - 100% PageSpeed Optimization",
        description: translations.hero.description,
        keywords: ["web performance", "PageSpeed", "optimization", "fast website", "SEO"],
        authors: [{ name: "Flinx" }],
        creator: "Flinx",
        publisher: "Flinx",
        icons: {
            icon: "/favicon.ico",
        },
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages: languageAlternates,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            type: "website",
            locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
            url: `${baseUrl}/${lang}`,
            title: "Flinx - 100% PageSpeed Optimization",
            description: translations.hero.description,
            siteName: "Flinx",
        },
        twitter: {
            card: "summary_large_image",
            title: "Flinx - 100% PageSpeed Optimization",
            description: translations.hero.description,
        },
    };
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <head>
                {/* Google Analytics 4 */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-C71XQTQNX1"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-C71XQTQNX1', {
                            page_path: window.location.pathname,
                        });
                    `}
                </Script>
            </head>
            <body className={`${outfit.variable} ${exo2.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
