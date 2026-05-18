"use client";

import Link from "next/link";
import type { Language } from "@/lib/languages";
import type { Locale } from "@/types/locale";

interface FooterProps {
    lang: Language;
    translations: Locale;
}

export default function Footer({ lang, translations }: FooterProps) {
    const { footer, nav } = translations;
    const currentYear = new Date().getFullYear();

    const navItems = [
        { label: nav.features, href: '#features' },
        { label: nav.testimonials, href: '#testimonials' },
        { label: nav.faq, href: '#faq' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <footer className="py-12 md:py-16 border-t border-white/5 bg-[var(--bg-secondary)] px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
                    {/* Logo & Tagline */}
                    <div>
                        <Link href={lang === 'en' ? '/' : `/${lang}`} className="inline-block text-4xl md:text-5xl font-extrabold tracking-tighter font-logo uppercase italic mb-4">
                            <span className="text-white">Flinx</span>
                            <span className="text-[var(--accent-primary)]">.</span>
                        </Link>
                        <p className="text-base text-gray-300 mt-4">{footer.tagline}</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold mb-4 text-white">Quick Links.</h3>
                        <nav className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-left text-sm text-gray-300 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Resources - External Links for SEO */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold mb-4 text-white">Resources.</h3>
                        <nav className="flex flex-col gap-3">
                            {/* Internal link to homepage for SEO */}
                            <Link
                                href="/"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                Flinx Homepage
                            </Link>
                            <a
                                href="https://pagespeed.web.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                Google PageSpeed Insights
                            </a>
                            <a
                                href="https://web.dev/articles/vitals"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                Core Web Vitals
                            </a>
                            <a
                                href="https://web.dev/explore/fast"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                Web Performance Guide
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-xs md:text-sm text-gray-300">
                        &copy; {currentYear} Flinx. {footer.rights}
                    </p>
                    <p className="text-xs md:text-sm text-gray-300">{footer.madeWith}</p>
                </div>
            </div>
        </footer>
    );
}
