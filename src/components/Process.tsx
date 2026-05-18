"use client";

import { FileText, Calculator, CheckCircle, Trophy } from "lucide-react";
import type { Locale } from "@/types/locale";

interface ProcessProps {
    translations: Locale;
}

export default function Process({ translations }: ProcessProps) {

    const stepsData = [
        {
            icon: FileText,
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Calculator,
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: CheckCircle,
            color: "from-orange-500 to-yellow-500"
        },
        {
            icon: Trophy,
            color: "from-green-500 to-emerald-500"
        }
    ];

    const steps = translations.process.steps.map((step, index) => ({
        ...step,
        ...stepsData[index]
    }));

    return (
        <section className="section-band py-16 md:py-20 px-4 bg-[var(--bg-secondary)]">
            <div className="container mx-auto max-w-6xl">
                <div
                    className="text-center mb-12 md:mb-14"
                >
                    <h2 className="section-title font-bold mb-3">{translations.process.title}</h2>
                    <p className="section-copy max-w-2xl mx-auto">{translations.process.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 pt-2 overflow-visible">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="relative overflow-visible"
                            >
                                {/* Arrow connector - hide on last item and on mobile */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 -right-4 z-0">
                                        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-[var(--accent-glow)] opacity-80">
                                            <path d="M0 12H28M28 12L20 4M28 12L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className="card h-full relative z-10 overflow-visible text-center md:text-left border-white/10">
                                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--success)] rounded-t-lg" />
                                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 text-white font-bold flex items-center justify-center text-base z-20">
                                        {index + 1}
                                    </div>

                                    <div className={`mb-5 w-14 h-14 rounded-lg bg-gradient-to-br ${step.color} p-px mx-auto md:mx-0`}>
                                        <div className="w-full h-full bg-[var(--bg-card)] rounded-lg flex items-center justify-center">
                                            <Icon size={27} className="text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold mb-2 pr-8 md:pr-4">{step.title}</h3>
                                    <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
