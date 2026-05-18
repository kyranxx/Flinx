

import type { Locale } from "@/types/locale";

interface ScoreRingProps {
    score: number;
    label: string;
    size?: number;
    tone?: "before" | "after";
}

function ScoreRing({ score, label, size = 120, tone = "after" }: ScoreRingProps) {
    let color = "#0cce6b"; // Green (90-100)
    if (score < 50) color = "#ff4e42"; // Red (0-49)
    else if (score < 90) color = "#ffa400"; // Orange (50-89)

    const width = size;
    const radius = (size / 2) - 4;
    const strokeWidth = size / 15;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div
            className="flex flex-col items-center gap-2"
            role="img"
            aria-label={`${label}: ${score}/100`}
        >
            <div
                className={`relative rounded-full ${tone === "after" ? "shadow-[0_0_24px_rgba(0,255,157,0.12)]" : ""}`}
                style={{ width: `min(${width}px, 18vw)`, height: `min(${width}px, 18vw)` }}
            >
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="font-bold"
                        style={{
                            color,
                            fontSize: size * 0.25
                        }}
                    >
                        {score}
                    </span>
                </div>
            </div>
            <span className="text-[11px] md:text-[13px] font-semibold text-gray-200 text-center max-w-[86px] leading-tight">{label}</span>
        </div>
    );
}

interface ScoreComparisonProps {
    translations: Locale;
}

export default function ScoreComparison({ translations }: ScoreComparisonProps) {
    const { scoreComparison } = translations;

    const categories = [
        { label: scoreComparison.categories.performance, before: 34, after: 100 },
        { label: scoreComparison.categories.accessibility, before: 67, after: 100 },
        { label: scoreComparison.categories.bestPractices, before: 58, after: 100 },
        { label: scoreComparison.categories.seo, before: 71, after: 100 },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto px-0 md:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6">
                <div className="rounded-lg border border-red-400/20 bg-red-500/[0.035] px-4 py-3.5 md:px-5">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-normal text-red-300">{scoreComparison.before.label}</p>
                            <p className="mt-1 text-sm text-gray-300">{scoreComparison.before.subtitle}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                    {categories.map((cat) => (
                        <ScoreRing
                            key={`before-${cat.label}`}
                            score={cat.before}
                            label={cat.label}
                            size={58}
                            tone="before"
                        />
                    ))}
                    </div>
                </div>

                <div className="hidden lg:flex items-center justify-center text-gray-400">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>

                <div className="rounded-lg border border-[var(--success)]/25 bg-[var(--success)]/[0.045] px-4 py-3.5 md:px-5">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-normal text-[var(--success)]">{scoreComparison.after.label}</p>
                            <p className="mt-1 text-sm text-gray-300">{scoreComparison.after.subtitle}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                    {categories.map((cat) => (
                        <ScoreRing
                            key={`after-${cat.label}`}
                            score={cat.after}
                            label={cat.label}
                            size={58}
                            tone="after"
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
