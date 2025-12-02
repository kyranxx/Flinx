"use client";

import { Gauge, Image as ImageIcon, FileCode, Smartphone, Zap, Server, Layers, Shield } from "lucide-react";

interface ServicesProps {
    translations: any;
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
        <section id="features" className="py-12 md:py-20 bg-[var(--bg-secondary)] px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{services.title}</h2>
                    <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto px-4">
                        {services.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {services.items.map((service: any, index: number) => {
                        const Icon = icons[index];
                        return (
                            <div
                                key={index}
                                className="card hover:bg-white/5 transition-colors"
                            >
                                <div className="mb-4 text-[var(--accent-primary)]">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-xs md:text-sm text-gray-300">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
