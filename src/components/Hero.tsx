"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Image from "next/image";
import ScoreComparison from "./ScoreComparison";

interface HeroProps {
    translations: any;
}

export default function Hero({ translations }: HeroProps) {
    const { hero } = translations;

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-green-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto flex flex-col items-center text-center z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8"
                >
                    <Zap size={16} className="text-[var(--success)]" />
                    <span className="text-xs md:text-sm font-medium text-gray-300">{hero.badge}</span>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl mb-4 md:mb-6 text-4xl md:text-6xl"
                >
                    {hero.title} <br />
                    <span className="gradient-text">{hero.titleGradient}</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-xl text-gray-400 max-w-2xl mb-8 md:mb-12 px-4"
                >
                    {hero.description}
                </motion.p>

                <ScoreComparison translations={translations} />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 md:mt-12 flex flex-col items-center gap-6"
                >
                    <button onClick={scrollToContact} className="btn btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5">
                        {hero.cta}
                    </button>

                    {/* PageSpeed Insights Badge */}
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                        <Image src="/Google_Favicon_2025.png" alt="Google" width={20} height={20} />
                        <span className="text-sm text-gray-400">Optimized for</span>
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#4285F4">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="text-sm font-semibold text-white">PageSpeed Insights</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
