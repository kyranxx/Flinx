"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { languages, type Language } from "@/lib/languages";
import "flag-icons/css/flag-icons.min.css";

interface LanguageSwitcherProps {
    currentLang: Language;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLanguage = languages.find((lang) => lang.code === currentLang);

    const getLanguageUrl = (langCode: string) => {
        if (langCode === 'en') {
            return '/';
        }
        // Remove the current language prefix if it exists
        const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
        return `/${langCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-colors rounded-md hover:bg-white/10 border border-white/20"
                aria-label="Select language"
            >
                <span className={`fi fi-${currentLanguage?.flag} text-xl`}></span>
                <span className="hidden sm:inline font-semibold">{currentLanguage?.code.toUpperCase()}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-secondary)] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                    <div className="max-h-96 overflow-y-auto scrollbar-thin">
                        {languages.map((lang) => (
                            <Link
                                key={lang.code}
                                href={getLanguageUrl(lang.code)}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 transition-colors ${lang.code === currentLang
                                    ? 'bg-[var(--accent-primary)]/20 text-white font-semibold border-l-4 border-[var(--accent-primary)]'
                                    : 'text-gray-300'
                                    }`}
                            >
                                <span className={`fi fi-${lang.flag} text-2xl`}></span>
                                <span>{lang.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
