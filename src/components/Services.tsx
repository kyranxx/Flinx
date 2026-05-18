"use client";

import { Gauge, Image as ImageIcon, FileCode, Smartphone, Zap, Server, Layers, Shield } from "lucide-react";
import type { Locale } from "@/types/locale";

interface ServicesProps {
    translations: Locale;
}

export default function Services({ translations }: ServicesProps) {
    const { services } = translations;

    const icons = [
        Gauge,          // Core Web Vitals
        Layers,         // Critical CSS
        ImageIcon,      // Next-Gen Images
        FileCode,       // JS Optimization
        Zap,            // Resource Hints
        Server,         // Server Response
        Smartphone,     // Mobile Optimization
        Shield          // Third-Party Scripts
    ];

    return (
        <section id="features" className="section-band py-16 md:py-24 bg-[#0b0b0b] px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="section-title font-bold mb-3 md:mb-4">{services.title}</h2>
                    <p className="section-copy max-w-2xl mx-auto px-2">
                        {services.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {services.items.map((service, index) => {
                        const Icon = icons[index] ?? Gauge;
                        const highlighted = index === 0 || index === 3;
                        return (
                            <div
                                key={index}
                                className={`card relative overflow-hidden ${highlighted ? "border-[var(--accent-primary)]/45 bg-gradient-to-b from-[rgba(109,40,217,0.16)] to-[var(--bg-card)]" : ""}`}
                            >
                                {highlighted && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--success)]" />}
                                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-[var(--accent-glow)]">
                                    <Icon size={22} />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight">{service.title}</h3>
                                <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
