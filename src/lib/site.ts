import { defaultLanguage, type Language, languages } from './languages';

export const SITE_URL = 'https://www.flinx.site';

export function getLanguageUrl(language: Language): string {
    if (language === defaultLanguage) {
        return SITE_URL;
    }

    return `${SITE_URL}/${language}`;
}

export function getLanguageAlternates(): Record<string, string> {
    const alternates: Record<string, string> = {};

    languages.forEach((language) => {
        alternates[language.code] = getLanguageUrl(language.code);
    });

    alternates['x-default'] = SITE_URL;
    return alternates;
}

export function getLocalizedLanguages() {
    return languages.filter((language) => language.code !== defaultLanguage);
}
