import { Language } from './languages';

export async function getTranslation(lang: Language) {
    try {
        const module = await import(`@/locales/${lang}`);
        return module.default;
    } catch (error) {
        console.warn(`Translation for language '${lang}' not found, falling back to English.`);
        const module = await import('@/locales/en');
        return module.default;
    }
}
