"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

interface ContactFormProps {
    translations: any;
}

export default function ContactForm({ translations }: ContactFormProps) {
    const { contact } = translations;
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaValue) return;

        setFormState('submitting');
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    return (
        <section id="contact" className="py-12 md:py-20 px-4 relative overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-primary)]/5 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

            <div className="container mx-auto max-w-2xl relative z-10">
                <div className="relative">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)] via-purple-500 to-[var(--accent-primary)] rounded-2xl opacity-75 blur-sm animate-pulse"></div>

                    <div className="relative card border-2 border-[var(--accent-primary)]/30 bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-secondary)] shadow-2xl shadow-[var(--accent-primary)]/20">
                        <div className="text-center mb-8 md:mb-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-[var(--accent-primary)] to-white bg-clip-text text-transparent"
                            >
                                {contact.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-base md:text-lg text-gray-300"
                            >
                                {contact.subtitle}
                            </motion.p>
                        </div>

                        {formState === 'success' ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 md:w-24 h-20 md:h-24 bg-[var(--success)]/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={48} className="text-[var(--success)]" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">{contact.success.title}</h3>
                                <p className="text-base md:text-lg text-gray-400">{contact.success.subtitle}</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm md:text-base font-medium text-gray-300">{contact.form.name}</label>
                                        <input
                                            id="name"
                                            required
                                            type="text"
                                            placeholder={contact.form.namePlaceholder}
                                            className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white text-base"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="website" className="text-sm md:text-base font-medium text-gray-300">{contact.form.website}</label>
                                        <input
                                            id="website"
                                            required
                                            type="url"
                                            placeholder={contact.form.websitePlaceholder}
                                            className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm md:text-base font-medium text-gray-300">{contact.form.email}</label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        placeholder={contact.form.emailPlaceholder}
                                        className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm md:text-base font-medium text-gray-300">{contact.form.message}</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder={contact.form.messagePlaceholder}
                                        className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white resize-none text-base"
                                    />
                                </div>

                                {/* Google reCAPTCHA */}
                                <div className="flex justify-center py-2">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with your actual key
                                        onChange={handleCaptchaChange}
                                        theme="dark"
                                    />
                                </div>

                                {/* Powered by Google Badge */}
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <Image src="/Google_Favicon_2025.png" alt="Google" width={16} height={16} priority sizes="16px" />
                                    <span>{contact.protectedByRecaptcha}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!captchaValue || formState === 'submitting'}
                                    className={`w-full btn text-base md:text-lg py-4 ${captchaValue ? 'btn-primary' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                                >
                                    {formState === 'submitting' ? contact.form.sending : contact.form.submit}
                                    {formState === 'idle' && <Send size={20} className="ml-2" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
