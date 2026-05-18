import { Language } from './languages';
import type { Locale } from '@/types/locale';

export async function getTranslation(lang: Language): Promise<Locale> {
    try {
        const localeModule = await import(`@/locales/${lang}`) as { default: Locale };
        return localeModule.default;
    } catch {
        console.warn(`Translation for language '${lang}' not found, falling back to English.`);
        const localeModule = await import('@/locales/en') as { default: Locale };
        return localeModule.default;
    }
}
