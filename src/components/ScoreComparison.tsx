"use client";

import { motion } from "framer-motion";
interface ScoreRingProps {
    score: number;
    label: string;
    delay?: number;
    size?: number;
}

function ScoreRing({ score, label, delay = 0, size = 120 }: ScoreRingProps) {
    let color = "#0cce6b"; // Green (90-100)
    if (score < 50) color = "#ff4e42"; // Red (0-49)
    else if (score < 90) color = "#ffa400"; // Orange (50-89)

    const width = size;
    const radius = (size / 2) - 4; // Adjust radius based on size, keeping stroke width in mind
    const strokeWidth = size / 15; // Scale stroke width
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
            role="img"
            aria-label={`${label}: ${score}/100`}
        >
            <div className="relative" style={{ width, height: width }}>
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke="#1a1a1a"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <motion.circle
                        cx={width / 2}
                        cy={width / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className="font-bold"
                        style={{ color, fontSize: size * 0.25 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.5 }}
                    >
                        {score}
                    </motion.span>
                </div>
            </div>
            <span className="text-[10px] md:text-xs font-semibold text-gray-300 text-center max-w-[60px] leading-tight">{label}</span>
        </motion.div>
    );
}

interface ScoreComparisonProps {
    translations: any;
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
        <div className="py-8 w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Before Scores */}
                <div className="flex items-center gap-4">
                    <span className="text-red-400 font-bold text-sm uppercase mr-2">{scoreComparison.before.label}</span>
                    {categories.map((cat, index) => (
                        <ScoreRing
                            key={`before-${cat.label}`}
                            score={cat.before}
                            label={cat.label}
                            delay={index * 0.1}
                            size={60}
                        />
                    ))}
                </div>

                {/* Arrow / Divider */}
                <div className="hidden md:block text-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>

                {/* After Scores */}
                <div className="flex items-center gap-4">
                    <span className="text-green-400 font-bold text-sm uppercase mr-2">{scoreComparison.after.label}</span>
                    {categories.map((cat, index) => (
                        <ScoreRing
                            key={`after-${cat.label}`}
                            score={cat.after}
                            label={cat.label}
                            delay={1 + index * 0.1}
                            size={60}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
