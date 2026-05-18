import { defaultLanguage, type Language, languages } from '@/lib/languages';
import { getLanguageUrl, SITE_URL } from '@/lib/site';

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
        `- [Homepage](${SITE_URL}/): Canonical English homepage for Flinx.`,
        ...languageLines,
        '',
        '## Optional',
        `- [Sitemap](${SITE_URL}/sitemap.xml): Full list of crawlable URLs.`,
        `- [Robots](${SITE_URL}/robots.txt): Crawl policy and sitemap reference.`,
        `- [LLMs File](${SITE_URL}/llms.txt): Machine-readable index for AI tools.`,
        ...(requestedLanguage
            ? [`- [Requested Variant](${getLanguageUrl(requestedLanguage)}): Context for this language-specific endpoint.`]
            : []),
        '',
    ].join('\n');
}
