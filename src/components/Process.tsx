"use client";

import { FileText, Calculator, CheckCircle, Trophy } from "lucide-react";

interface ProcessProps {
    translations: any;
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

    const steps = translations.process.steps.map((step: any, index: number) => ({
        ...step,
        ...stepsData[index]
    }));

    return (
        <section className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]">
            <div className="container mx-auto max-w-6xl">
                <div
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-4xl font-bold mb-3">{translations.process.title}</h2>
                    <p className="text-base md:text-lg text-gray-300">{translations.process.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-4 overflow-visible">
                    {steps.map((step: any, index: number) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="relative overflow-visible"
                            >
                                {/* Arrow connector - hide on last item and on mobile */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 -right-4 z-0">
                                        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-[var(--accent-primary)]">
                                            <path d="M0 12H28M28 12L20 4M28 12L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}

                                <div className="card hover:border-[var(--accent-primary)]/40 transition-all duration-300 h-full relative z-10 overflow-visible text-center md:text-left">
                                    {/* Step number */}
                                    <div className="absolute top-3 left-3 md:left-auto md:right-3 w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white font-bold flex items-center justify-center text-lg z-20 shadow-lg">
                                        {index + 1}
                                    </div>

                                    {/* Icon with gradient */}
                                    <div className={`mb-4 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mx-auto md:mx-0`}>
                                        <div className="w-full h-full bg-[var(--bg-card)] rounded-xl flex items-center justify-center">
                                            <Icon size={32} className="text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
