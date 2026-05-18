"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Language } from "@/lib/languages";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/types/locale";

interface HeaderProps {
    lang: Language;
    translations: Locale;
}

export default function Header({ lang, translations }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { nav } = translations;

    const navItems = [
        { label: nav.features, href: '#features' },
        { label: nav.testimonials, href: '#testimonials' },
        { label: nav.faq, href: '#faq' },
        { label: nav.contact, href: '#contact' },
    ];

    const scrollToSection = (href: string) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 bg-[rgba(5,5,5,0.86)] backdrop-blur-md border-b border-white/[0.08]"
        >
            <div className="container mx-auto max-w-6xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href={lang === 'en' ? '/' : `/${lang}`} className="text-3xl md:text-4xl font-extrabold tracking-tighter font-logo uppercase italic">
                        <span className="text-white">Flinx</span>
                        <span className="text-[var(--accent-primary)]">.</span>
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                        <nav className="hidden md:flex items-center gap-7">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <LanguageSwitcher currentLang={lang} />

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white rounded-lg border border-white/10 bg-white/[0.04]"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav
                        className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in-up"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollToSection(item.href)}
                                className="text-left text-base font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
