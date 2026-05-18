"use client";

import { Star } from "lucide-react";
import type { Locale } from "@/types/locale";

interface TestimonialsProps {
    translations: Locale;
}

export default function Testimonials({ translations }: TestimonialsProps) {
    const { testimonials } = translations;

    return (
        <section id="testimonials" className="section-band py-16 md:py-24 px-4 bg-[var(--bg-primary)]">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="section-title font-bold mb-3 md:mb-4">{testimonials.title}</h2>
                    <p className="section-copy">{testimonials.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {testimonials.items.map((item, index) => (
                        <div
                            key={index}
                            className={`card relative bg-gradient-to-b from-[var(--bg-card-soft)] to-[var(--bg-card)] ${index === 1 ? "border-[var(--success)]/30" : ""}`}
                        >
                            <div className="absolute right-5 top-4 text-5xl font-black leading-none text-white/[0.04]">&quot;</div>
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} fill="var(--success)" color="var(--success)" />
                                ))}
                            </div>
                            <p className="text-base text-gray-200 mb-5 leading-relaxed italic">&quot;{item.text}&quot;</p>
                            <div className="border-t border-white/10 pt-4">
                                <p className="font-bold text-base text-white">{item.name}</p>
                                <p className="text-sm text-gray-400">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
