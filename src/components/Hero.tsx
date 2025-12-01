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
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8"
                >
                    <Zap size={16} className="text-[var(--success)]" />
                    <span className="text-xs md:text-sm font-medium text-gray-300">{hero.badge}</span>
                </div>

                <h1
                    className="max-w-4xl mb-4 md:mb-6 text-4xl md:text-6xl"
                >
                    {hero.title} <br />
                    <span className="gradient-text">{hero.titleGradient}</span>
                </h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-xl text-gray-300 max-w-2xl mb-8 md:mb-12 px-4"
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
                    <button
                        onClick={scrollToContact}
                        className="btn btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
                        aria-label="Get started with Flinx optimization"
                    >
                        {hero.cta}
                    </button>

                    {/* PageSpeed Insights Badge */}
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-sm text-gray-300">Optimized for</span>
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
