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

    const [isFormFocused, setIsFormFocused] = useState(false);

    const handleFocus = () => {
        if (!isFormFocused) {
            setIsFormFocused(true);
        }
    };

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
                                <p className="text-base md:text-lg text-gray-300">{contact.success.subtitle}</p>
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
                                            onFocus={handleFocus}
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
                                            onFocus={handleFocus}
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
                                        onFocus={handleFocus}
                                        placeholder={contact.form.emailPlaceholder}
                                        className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm md:text-base font-medium text-gray-300">{contact.form.message}</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        onFocus={handleFocus}
                                        placeholder={contact.form.messagePlaceholder}
                                        className="w-full px-4 py-3 md:py-4 rounded-lg bg-[var(--bg-primary)] border border-gray-800 focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-white resize-none text-base"
                                    />
                                </div>

                                {/* Google reCAPTCHA */}
                                <div className="flex justify-center py-2 min-h-[78px]">
                                    {isFormFocused && (
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with your actual key
                                            onChange={handleCaptchaChange}
                                            theme="dark"
                                        />
                                    )}
                                </div>

                                {/* Powered by Google Badge */}
                                <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
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
