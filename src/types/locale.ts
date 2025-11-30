export interface Locale {
    nav: {
        features: string;
        testimonials: string;
        faq: string;
        contact: string;
    };
    process: {
        title: string;
        subtitle: string;
        steps: Array<{
            title: string;
            description: string;
        }>;
    };
    hero: {
        badge: string;
        title: string;
        titleGradient: string;
        description: string;
        cta: string;
    };
    scoreComparison: {
        before: {
            label: string;
            title: string;
            subtitle: string;
        };
        after: {
            label: string;
            title: string;
            subtitle: string;
        };
        categories: {
            performance: string;
            accessibility: string;
            bestPractices: string;
            seo: string;
        };
    };
    services: {
        title: string;
        subtitle: string;
        items: Array<{
            title: string;
            description: string;
        }>;
    };
    testimonials: {
        title: string;
        subtitle: string;
        items: Array<{
            name: string;
            role: string;
            text: string;
        }>;
    };
    faq: {
        title: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            name: string;
            namePlaceholder: string;
            website: string;
            websitePlaceholder: string;
            email: string;
            emailPlaceholder: string;
            message: string;
            messagePlaceholder: string;
            verify: string;
            verified: string;
            submit: string;
            sending: string;
        };
        success: {
            title: string;
            subtitle: string;
        };
        protectedByRecaptcha: string;
    };
    footer: {
        tagline: string;
        madeWith: string;
        rights: string;
    };
}
