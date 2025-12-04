import { Outfit, Exo_2, Noto_Sans_SC, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_Arabic, Noto_Sans_Devanagari, Noto_Sans_Bengali } from "next/font/google";

/**
 * Font Configuration for Multi-Language Support
 * 
 * CRITICAL: We use display: 'swap' for ALL fonts to ensure:
 * 1. Text appears immediately using system fallback fonts (fixes LCP)
 * 2. Custom fonts load in the background and swap in when ready
 * 3. No invisible text during font loading (FOIT prevention)
 */

// === BASE FONTS (Latin) ===
// These are loaded for all pages - small file size (~20KB)
export const outfit = Outfit({
    subsets: ["latin", "latin-ext"],
    variable: "--font-outfit",
    display: 'swap',  // CRITICAL: Show text immediately, swap when font loads
    preload: true,
});

export const exo2 = Exo_2({
    subsets: ["latin", "latin-ext"],
    variable: "--font-exo2",
    display: 'swap',
    preload: true,
});

// === CJK FONTS (Chinese/Japanese/Korean) ===
// These are ONLY loaded on their respective routes
// File sizes: ~2-4MB each, hence route-specific loading

export const notoSansSC = Noto_Sans_SC({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-cjk",
    display: 'swap',
    preload: false, // Don't preload - only load when needed
});

export const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-cjk",
    display: 'swap',
    preload: false,
});

export const notoSansKR = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-cjk",
    display: 'swap',
    preload: false,
});

// === OTHER NON-LATIN SCRIPTS ===
export const notoSansArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "700"],
    variable: "--font-arabic",
    display: 'swap',
    preload: false,
});

export const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari"],
    weight: ["400", "500", "700"],
    variable: "--font-devanagari",
    display: 'swap',
    preload: false,
});

export const notoSansBengali = Noto_Sans_Bengali({
    subsets: ["bengali"],
    weight: ["400", "500", "700"],
    variable: "--font-bengali",
    display: 'swap',
    preload: false,
});

// === LANGUAGE TO FONT MAPPING ===
export type FontConfig = {
    primary: typeof outfit;
    secondary?: typeof notoSansSC;
    className: string;
};

/**
 * Get the appropriate font configuration based on language
 * This ensures each language route only loads the fonts it needs
 */
export function getFontConfig(lang: string): FontConfig {
    // CJK Languages - these need specific fonts
    switch (lang) {
        case 'zh':
            return {
                primary: outfit,
                secondary: notoSansSC,
                className: `${outfit.variable} ${exo2.variable} ${notoSansSC.variable}`,
            };
        case 'ja':
            return {
                primary: outfit,
                secondary: notoSansJP,
                className: `${outfit.variable} ${exo2.variable} ${notoSansJP.variable}`,
            };
        case 'ko':
            return {
                primary: outfit,
                secondary: notoSansKR,
                className: `${outfit.variable} ${exo2.variable} ${notoSansKR.variable}`,
            };
        case 'ar':
            return {
                primary: outfit,
                secondary: notoSansArabic,
                className: `${outfit.variable} ${exo2.variable} ${notoSansArabic.variable}`,
            };
        case 'hi':
            return {
                primary: outfit,
                secondary: notoSansDevanagari,
                className: `${outfit.variable} ${exo2.variable} ${notoSansDevanagari.variable}`,
            };
        case 'bn':
            return {
                primary: outfit,
                secondary: notoSansBengali,
                className: `${outfit.variable} ${exo2.variable} ${notoSansBengali.variable}`,
            };
        default:
            // Latin-based languages - only need base fonts
            return {
                primary: outfit,
                className: `${outfit.variable} ${exo2.variable}`,
            };
    }
}

/**
 * Languages that require Right-to-Left (RTL) text direction
 */
export const RTL_LANGUAGES = ['ar'] as const;

export function isRTL(lang: string): boolean {
    return RTL_LANGUAGES.includes(lang as typeof RTL_LANGUAGES[number]);
}
