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
            className="fixed top-0 left-0 w-full z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-white/5"
        >
            <div className="container mx-auto px-4 py-4 md:py-5">
                <div className="flex items-center justify-between">
                    {/* Logo - Bigger */}
                    <Link href={lang === 'en' ? '/' : `/${lang}`} className="text-4xl md:text-5xl font-extrabold tracking-tighter font-logo uppercase italic">
                        <span className="text-white">Flinx</span>
                        <span className="text-[var(--accent-primary)]">.</span>
                    </Link>

                    {/* Right Side: Desktop Nav + Language Switcher + Mobile Menu */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation - Moved to Right */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <LanguageSwitcher currentLang={lang} />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white"
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
