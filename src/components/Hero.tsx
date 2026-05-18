import { Zap } from "lucide-react";
import ScoreComparison from "./ScoreComparison";
import HeroCta from "./HeroCta";
import type { Locale } from "@/types/locale";

interface HeroProps {
    translations: Locale;
}

export default function Hero({ translations }: HeroProps) {
    const { hero } = translations;

    return (
        <section className="min-h-[82vh] flex flex-col items-center justify-center pt-16 md:pt-24 pb-8 md:pb-10 px-4 relative overflow-hidden bg-[radial-gradient(circle_at_18%_22%,rgba(109,40,217,0.18),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(0,255,157,0.10),transparent_32%),linear-gradient(180deg,#050505_0%,#080808_72%,#101010_100%)]">

            <div className="container mx-auto flex flex-col items-center text-center z-10 max-w-6xl">
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 mb-4 md:mb-7 shadow-[0_0_32px_rgba(139,92,246,0.10)]"
                >
                    <Zap size={16} className="text-[var(--success)]" />
                    <span className="text-xs md:text-sm font-semibold text-gray-200">{hero.badge}</span>
                </div>

                <h1
                    className="max-w-4xl mb-3 md:mb-5 text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl"
                >
                    {hero.title} <br />
                    <span className="gradient-text">{hero.titleGradient}</span>
                </h1>

                <p
                    className="section-copy max-w-2xl mb-5 md:mb-8 px-2"
                >
                    {hero.description}
                </p>

                <ScoreComparison translations={translations} />

                <div
                    className="mt-5 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <HeroCta text={hero.cta} />

                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 bg-white/[0.04] border border-white/10 rounded-full">
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
                </div>
            </div>
        </section>
    );
}
