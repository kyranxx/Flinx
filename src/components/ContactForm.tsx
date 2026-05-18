"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import type { Locale } from "@/types/locale";

interface ContactFormProps {
    translations: Locale;
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!captchaValue) return;

        setFormState('submitting');
        const form = e.currentTarget;

        const formData = new FormData(form);
        const getValue = (name: string) => String(formData.get(name) ?? '');
        const data = {
            name: getValue('name'),
            email: getValue('email'),
            website: getValue('website'),
            message: getValue('message'),
            captchaToken: captchaValue,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setFormState('success');
                // Reset form
                form.reset();
                // Reset captcha
                recaptchaRef.current?.reset();
                setCaptchaValue(null);
            } else {
                console.error('Form submission error:', result.error);
                alert(result.error || 'An error occurred. Please try again.');
                setFormState('idle');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again.');
            setFormState('idle');
        }
    };

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    return (
        <section id="contact" className="section-band py-16 md:py-24 px-4 relative overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(109,40,217,0.18),transparent_38%),linear-gradient(180deg,#050505_0%,#080808_100%)]">

            <div className="container mx-auto max-w-3xl relative z-10">
                <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-[var(--accent-primary)] via-purple-500 to-[var(--success)] rounded-lg opacity-80"></div>

                    <div className="relative card border border-[var(--accent-primary)]/35 bg-gradient-to-b from-[#202020] to-[#151515] shadow-[0_24px_80px_rgba(109,40,217,0.16)] p-5 md:p-8">
                        <div className="text-center mb-8 md:mb-10">
                            <h2
                                className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-[var(--accent-glow)] to-white bg-clip-text text-transparent"
                            >
                                {contact.title}
                            </h2>
                            <p
                                className="section-copy max-w-xl mx-auto"
                            >
                                {contact.subtitle}
                            </p>
                        </div>

                        {formState === 'success' ? (
                            <div
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 md:w-24 h-20 md:h-24 bg-[var(--success)]/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={48} className="text-[var(--success)]" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">{contact.success.title}</h3>
                                <p className="text-base md:text-lg text-gray-300">{contact.success.subtitle}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-gray-200">{contact.form.name}</label>
                                        <input
                                            id="name"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            type="text"
                                            onFocus={handleFocus}
                                            placeholder={contact.form.namePlaceholder}
                                            className="w-full px-4 py-3.5 rounded-lg bg-black/60 border border-white/10 focus:border-[var(--accent-glow)] focus:outline-none transition-colors text-white text-base placeholder:text-gray-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="website" className="text-sm font-semibold text-gray-200">{contact.form.website}</label>
                                        <input
                                            id="website"
                                            name="website"
                                            autoComplete="url"
                                            required
                                            type="url"
                                            onFocus={handleFocus}
                                            placeholder={contact.form.websitePlaceholder}
                                            className="w-full px-4 py-3.5 rounded-lg bg-black/60 border border-white/10 focus:border-[var(--accent-glow)] focus:outline-none transition-colors text-white text-base placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-200">{contact.form.email}</label>
                                    <input
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        type="email"
                                        onFocus={handleFocus}
                                        placeholder={contact.form.emailPlaceholder}
                                        className="w-full px-4 py-3.5 rounded-lg bg-black/60 border border-white/10 focus:border-[var(--accent-glow)] focus:outline-none transition-colors text-white text-base placeholder:text-gray-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-gray-200">{contact.form.message}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        onFocus={handleFocus}
                                        placeholder={contact.form.messagePlaceholder}
                                        className="w-full px-4 py-3.5 rounded-lg bg-black/60 border border-white/10 focus:border-[var(--accent-glow)] focus:outline-none transition-colors text-white resize-none text-base placeholder:text-gray-600"
                                    />
                                </div>

                                <div className="flex justify-center py-2 min-h-[78px]">
                                    {isFormFocused && (
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcuYiAsAAAAAKx-9UBfcvU_zPhTZ2mxraVwHEW9"}
                                            onChange={handleCaptchaChange}
                                            theme="dark"
                                        />
                                    )}
                                </div>

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
                                    className={`w-full btn text-base md:text-lg py-4 ${captchaValue ? 'btn-primary' : 'bg-[#1d2736] text-gray-400 border border-white/10 cursor-not-allowed'}`}
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
