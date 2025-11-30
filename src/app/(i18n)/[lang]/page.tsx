import { getTranslation, type Language, languages } from "@/lib/i18n";
import Hero from "@/components/Hero";
import ScoreComparison from "@/components/ScoreComparison";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
    const { lang } = await params;
    const translations = getTranslation(lang as Language);

    return (
        <main className="min-h-screen flex flex-col">
            <Header lang={lang as Language} translations={translations} />
            <Hero translations={translations} />

            <Process translations={translations} />
            <Services translations={translations} />
            <Testimonials translations={translations} />
            <FAQ translations={translations} />
            <ContactForm translations={translations} />
            <Footer lang={lang as Language} translations={translations} />
        </main>
    );
}

export async function generateStaticParams() {
    return languages
        .filter((lang) => lang.code !== 'en')
        .map((lang) => ({ lang: lang.code }));
}
