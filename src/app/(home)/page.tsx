import dynamic from 'next/dynamic';
import { getTranslation } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Process = dynamic(() => import("@/components/Process"));
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

export default async function Page() {
    const translations = await getTranslation('en');

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
