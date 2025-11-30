"use client";

import { motion } from "framer-motion";

interface FAQProps {
    translations: any;
}

export default function FAQ({ translations }: FAQProps) {
    const { faq } = translations;

    return (
        <section id="faq" className="py-12 md:py-20 bg-[var(--bg-secondary)] px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{faq.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {faq.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3">{item.question}</h3>
                            <p className="text-base text-gray-400 leading-relaxed">{item.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
