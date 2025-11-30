import { getTranslation } from "@/lib/i18n";
import Hero from "@/components/Hero";
import ScoreComparison from "@/components/ScoreComparison";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
    const translations = getTranslation('en');

    return (
        <main className="min-h-screen flex flex-col">
            <Header lang="en" translations={translations} />
            <Hero translations={translations} />

            <Process translations={translations} />
            <Services translations={translations} />
            <Testimonials translations={translations} />
            <FAQ translations={translations} />
            <ContactForm translations={translations} />
            <Footer lang="en" translations={translations} />
        </main>
    );
}
