"use client";

interface HeroCtaProps {
    text: string;
}

export default function HeroCta({ text }: HeroCtaProps) {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToContact}
            className="btn btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5"
            aria-label="Get started with Flinx optimization"
        >
            {text}
        </button>
    );
}
