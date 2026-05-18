import { getTranslation } from "@/lib/i18n";
import { defaultLanguage, isLanguage, languages } from "@/lib/languages";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { notFound } from "next/navigation";

const Process = dynamic(() => import("@/components/Process"));
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

interface PageProps {
    params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
    const { lang } = await params;
    if (!isLanguage(lang) || lang === defaultLanguage) {
        notFound();
    }

    const translations = await getTranslation(lang);

    return (
        <main className="min-h-screen flex flex-col">
            <Header lang={lang} translations={translations} />
            <Hero translations={translations} />

            <Process translations={translations} />
            <Services translations={translations} />
            <Testimonials translations={translations} />
            <FAQ translations={translations} />
            <ContactForm translations={translations} />
            <Footer lang={lang} translations={translations} />
        </main>
    );
}

export async function generateStaticParams() {
    return languages
        .filter((language) => language.code !== defaultLanguage)
        .map((language) => ({ lang: language.code }));
}
