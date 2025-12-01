"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialsProps {
    translations: any;
}

export default function Testimonials({ translations }: TestimonialsProps) {
    const { testimonials } = translations;

    return (
        <section id="testimonials" className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{testimonials.title}</h2>
                    <p className="text-base md:text-lg text-gray-400">{testimonials.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="card bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-secondary)]"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--success)" color="var(--success)" />
                                ))}
                            </div>
                            <p className="text-sm md:text-base text-gray-300 mb-4 italic">"{item.text}"</p>
                            <div className="border-t border-white/10 pt-4">
                                <p className="font-bold text-sm md:text-base">{item.name}</p>
                                <p className="text-xs md:text-sm text-gray-300">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
