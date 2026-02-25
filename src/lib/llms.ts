import { defaultLanguage, type Language, languages } from '@/lib/languages';

const BASE_URL = 'https://www.flinx.site';

function getLanguageUrl(language: Language): string {
    if (language === defaultLanguage) {
        return `${BASE_URL}/`;
    }

    return `${BASE_URL}/${language}`;
}

function getLanguageLabel(language: Language): string {
    const item = languages.find((entry) => entry.code === language);
    return item?.name ?? language.toUpperCase();
}

export function getLlmsContent(requestedLanguage?: Language): string {
    const languageLines = languages.map((language) => {
        const url = getLanguageUrl(language.code);
        const label = getLanguageLabel(language.code);
        const suffix = language.code === defaultLanguage ? ' (canonical)' : '';
        return `- [${label} (${language.code})](${url}): Website language variant${suffix}.`;
    });

    return [
        '# Flinx',
        '',
        '> Flinx provides PageSpeed and Core Web Vitals optimization services.',
        '',
        'Official pages and language variants for AI systems and retrieval pipelines.',
        '',
        '## Main',
        `- [Homepage](${BASE_URL}/): Canonical English homepage for Flinx.`,
        ...languageLines,
        '',
        '## Optional',
        `- [Sitemap](${BASE_URL}/sitemap.xml): Full list of crawlable URLs.`,
        `- [Robots](${BASE_URL}/robots.txt): Crawl policy and sitemap reference.`,
        `- [LLMs File](${BASE_URL}/llms.txt): Machine-readable index for AI tools.`,
        ...(requestedLanguage
            ? [`- [Requested Variant](${getLanguageUrl(requestedLanguage)}): Context for this language-specific endpoint.`]
            : []),
        '',
    ].join('\n');
}
