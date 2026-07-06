import type { Metadata } from "next";
import "../../globals.css";
import { getTranslation } from "@/lib/i18n";
import { isLanguage } from "@/lib/languages";
import { getFontConfig, isRTL } from "@/lib/fonts";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getLanguageAlternates, getLanguageUrl, SITE_URL } from "@/lib/site";

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
    if (!isLanguage(lang)) {
        notFound();
    }

    const translations = await getTranslation(lang);
    const languageAlternates = getLanguageAlternates();
    const languageUrl = getLanguageUrl(lang);

    return {
        title: translations.meta.title,
        description: translations.meta.description,
        keywords: translations.meta.keywords,
        authors: [{ name: "Flinx" }],
        creator: "Flinx",
        publisher: "Flinx",
        icons: {
            icon: "/favicon.ico",
        },
        alternates: {
            canonical: languageUrl,
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
            url: languageUrl,
            title: translations.meta.title,
            description: translations.meta.description,
            siteName: "Flinx",
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: translations.meta.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: translations.meta.title,
            description: translations.meta.description,
            images: [`${SITE_URL}/og-image.png`],
        },
    };
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;
    if (!isLanguage(lang)) {
        notFound();
    }

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
                            "url": SITE_URL,
                            "logo": `${SITE_URL}/flinx-logo.png`
                        })
                    }}
                />
            </head>
            <body className={`${fontConfig.className} font-sans`}>
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "ugamw1a4wd");
                    `}
                </Script>
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
                {children}
            </body>
        </html>
    );
}
