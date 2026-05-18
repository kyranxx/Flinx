"use client";

import type { Locale } from "@/types/locale";

interface FAQProps {
    translations: Locale;
}

export default function FAQ({ translations }: FAQProps) {
    const { faq } = translations;

    return (
        <section id="faq" className="section-band py-16 md:py-24 bg-[var(--bg-secondary)] px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="section-title font-bold mb-4">{faq.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {faq.items.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-[#1b1b1b]"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">{item.question}</h3>
                            <p className="text-base text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
