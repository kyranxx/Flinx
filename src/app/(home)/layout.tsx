import type { Metadata } from "next";
import { outfit, exo2 } from "@/lib/fonts";
import Script from "next/script";
import "../globals.css";

export const metadata: Metadata = {
    title: "Flinx - 100% PageSpeed Optimization",
    description: "Make your website blazing fast with Flinx. We optimize for 100% PageSpeed Insights scores.",
    keywords: ["web performance", "PageSpeed", "optimization", "fast website", "SEO"],
    authors: [{ name: "Flinx" }],
    creator: "Flinx",
    publisher: "Flinx",
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
        locale: "en_US",
        url: "https://www.flinx.site",
        title: "Flinx - 100% PageSpeed Optimization",
        description: "Make your website blazing fast with Flinx. We optimize for 100% PageSpeed Insights scores.",
        siteName: "Flinx",
        images: [
            {
                url: "https://www.flinx.site/og-image.png",
                width: 1200,
                height: 630,
                alt: "Flinx - 100% PageSpeed Optimization",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Flinx - 100% PageSpeed Optimization",
        description: "Make your website blazing fast with Flinx. We optimize for 100% PageSpeed Insights scores.",
        images: ["https://www.flinx.site/og-image.png"],
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#050505",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
            </head>
            <body className={`${outfit.variable} ${exo2.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
