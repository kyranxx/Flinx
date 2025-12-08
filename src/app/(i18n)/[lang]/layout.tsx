import type { Metadata } from "next";
import "../../globals.css";
import { getTranslation } from "@/lib/i18n";
import { type Language, languages } from "@/lib/languages";
import { getFontConfig, isRTL } from "@/lib/fonts";
import Script from "next/script";

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
    // Add x-default fallback to root (English)
    languageAlternates['x-default'] = baseUrl;

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
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: "Flinx - 100% PageSpeed Optimization",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Flinx - 100% PageSpeed Optimization",
            description: translations.hero.description,
            images: [`${baseUrl}/og-image.png`],
        },
    };
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;
    const fontConfig = getFontConfig(lang);
    const rtl = isRTL(lang);

    return (
        <html lang={lang} dir={rtl ? 'rtl' : 'ltr'}>
            <head>
                {/* JSON-LD Schema Markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Corporation",
                            "name": "Flinx",
                            "url": "https://www.flinx.site",
                            "logo": "https://www.flinx.site/flinx-logo.png"
                        })
                    }}
                />
                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "ugamw1a4wd");
                    `}
                </Script>
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
            <body className={`${fontConfig.className} font-sans`}>
                {children}
            </body>
        </html>
    );
}
